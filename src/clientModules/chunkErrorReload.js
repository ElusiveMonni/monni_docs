/**
 * Recover from stale chunks after a redeploy.
 *
 * Docusaurus ships content-hashed JS chunks and loads route bundles lazily via
 * dynamic import(). When the site is redeployed, those hashed files are replaced
 * on the server. Any tab still running the previous runtime bundle references
 * the old filenames, so the next client-side navigation to a lazily-loaded route
 * fetches a chunk that no longer exists and throws a `ChunkLoadError`.
 *
 * There is nothing the stale tab can do except fetch the fresh build, so we force
 * a one-time reload when a chunk fails to load. A sessionStorage guard prevents a
 * reload loop in the (unlikely) case the error persists after refreshing.
 */

const RELOAD_GUARD_KEY = 'docusaurus-chunk-reload-attempt';

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

if (typeof window !== 'undefined') {
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
