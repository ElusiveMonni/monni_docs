/**
 * Recover from stale chunks after a redeploy.
 *
 * Docusaurus ships content-hashed JS chunks and loads route bundles lazily via
 * dynamic import(). When the site is redeployed, those hashed files are replaced
 * on the server. Any tab still running the previous runtime bundle references
 * the old filenames, so the next client-side navigation to a lazily-loaded route
 * fetches a chunk that no longer exists and throws a `ChunkLoadError`.
 *
 * Chunk loads can also fail transiently on the current build (flaky mobile
 * networks, or Safari cancelling a request mid-flight) even though the file
 * still exists. Those are retried a couple of times before giving up, so they
 * recover silently instead of reloading the page under the user.
 *
 * If the retries are exhausted, there is nothing the tab can do except fetch the
 * fresh build, so we force a one-time reload. A sessionStorage guard prevents a
 * reload loop in the (unlikely) case the error persists after refreshing.
 */

const RELOAD_GUARD_KEY = 'docusaurus-chunk-reload-attempt';
const CHUNK_LOAD_RETRIES = 2;
const CHUNK_LOAD_RETRY_DELAY_MS = 500;

function isChunkLoadError(error) {
  if (!error) {
    return false;
  }
  const name = error.name || '';
  const message = error.message || '';
  return (
    name === 'ChunkLoadError' ||
    /Loading chunk [\w-]+ failed/i.test(message) ||
    /Loading CSS chunk [\w-]+ failed/i.test(message) ||
    /import\(\) module .* failed/i.test(message)
  );
}

function reloadOnce() {
  let alreadyTried = false;
  try {
    alreadyTried = window.sessionStorage.getItem(RELOAD_GUARD_KEY) === 'true';
  } catch (e) {
    // sessionStorage may be unavailable (private mode / blocked cookies).
    // Fall through and attempt the reload anyway.
  }

  if (alreadyTried) {
    // We already reloaded once and the chunk still failed — stop here to avoid
    // an infinite refresh loop and let the error surface normally.
    return;
  }

  try {
    window.sessionStorage.setItem(RELOAD_GUARD_KEY, 'true');
  } catch (e) {
    // Ignore storage failures; a missing guard just means no loop protection.
  }

  window.location.reload();
}

// Every dynamic import() goes through webpack's `__webpack_require__.e`, which
// clears a failed chunk's state so it can be requested again. Wrap it to retry
// with a short backoff before letting the ChunkLoadError propagate.
function retryChunkLoads() {
  const loadChunk = __webpack_require__.e;
  if (typeof loadChunk !== 'function') {
    return;
  }

  __webpack_require__.e = function retryingLoadChunk(chunkId) {
    const attempt = (retriesLeft) =>
      loadChunk.call(this, chunkId).catch((error) => {
        if (retriesLeft <= 0 || !isChunkLoadError(error)) {
          throw error;
        }
        const delay =
          CHUNK_LOAD_RETRY_DELAY_MS * (CHUNK_LOAD_RETRIES - retriesLeft + 1);
        return new Promise((resolve) => setTimeout(resolve, delay)).then(() =>
          attempt(retriesLeft - 1),
        );
      });
    return attempt(CHUNK_LOAD_RETRIES);
  };
}

if (typeof window !== 'undefined') {
  retryChunkLoads();

  // A dynamic import() rejection surfaces as an unhandled promise rejection.
  window.addEventListener('unhandledrejection', (event) => {
    if (isChunkLoadError(event.reason)) {
      reloadOnce();
    }
  });

  // Some chunk failures surface as a synchronous error instead.
  window.addEventListener('error', (event) => {
    if (isChunkLoadError(event.error)) {
      reloadOnce();
    }
  });

  // Clear the guard once a page has loaded successfully so a future redeploy
  // gets a fresh reload attempt rather than being blocked by a stale flag.
  window.addEventListener('load', () => {
    try {
      window.sessionStorage.removeItem(RELOAD_GUARD_KEY);
    } catch (e) {
      // Ignore storage failures.
    }
  });
}

export default {};
