/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  docs: ["introduction",

  {
    type: 'category',
    label: 'Commands',
    link: {
      type: 'doc',
      id: 'commands/index',
    },
    collapsed: true,
    items: [
      {
        type: 'category',
        label: 'Slash',
        link: {
          type: 'doc',
          id: 'commands/slash/index',
        },
        items: [
        {
          type: 'category',
          label: 'Misc',
          link: {
            type: 'doc',
            id: 'commands/slash/misc-commands',
          },
          items: [
              'commands/slash/misc/roblox-get-info',
              'commands/slash/misc/ping',
              'commands/slash/misc/pet',
              'commands/slash/misc/invite-monni',
              'commands/slash/misc/help',
              'commands/slash/misc/heart-beat',
              'commands/slash/misc/discord-get-info',
              'commands/slash/misc/dashboard',
          ],
          },

          {
          type: 'category',
          label: 'Invite',
          link: {
            type: 'doc',
            id: 'commands/slash/invite-commands',
          },
          items: [
              'commands/slash/invite/invite-create',
              'commands/slash/invite/invite-delete',
              'commands/slash/invite/invite-sync',
              'commands/slash/invite/invite-info',
          ],
          },

          {
          type: 'category',
          label: 'Moderation',
          link: {
            type: 'doc',
            id: 'commands/slash/moderation-commands',
          },
          items: [
              'commands/slash/moderation/ban',
              'commands/slash/moderation/kick',
              'commands/slash/moderation/clear-history',
              'commands/slash/moderation/history',
              'commands/slash/moderation/kick',
              'commands/slash/moderation/mute',
              'commands/slash/moderation/purge',
              'commands/slash/moderation/remove-case',
              'commands/slash/moderation/remove-timeout',
              'commands/slash/moderation/timeout',
              'commands/slash/moderation/warn',
          ],
          },

          {
          type: 'category',
          label: 'Points',
          link: {
            type: 'doc',
            id: 'commands/slash/point-commands',
          },
          items: [
              'commands/slash/points/balance',
              'commands/slash/points/edit',
              'commands/slash/points/info',
              'commands/slash/points/leaderboard',
              'commands/slash/points/send',
              'commands/slash/points/shop',
          ],
          },

          {
          type: 'category',
          label: 'Verification',
          link: {
            type: 'doc',
            id: 'commands/slash/verification-commands',
          },
          items: [
              'commands/slash/verification/verified-account',
              'commands/slash/verification/update',
              'commands/slash/verification/verify',
          ],
          },

          {
          type: 'category',
          label: 'Rewards',
          link: {
            type: 'doc',
            id: 'commands/slash/reward-commands',
          },
          items: [
              'commands/slash/rewards/give-badge',
              'commands/slash/rewards/give-item',
              'commands/slash/rewards/inventory',
              'commands/slash/rewards/remove-badge',
              'commands/slash/rewards/remove-item',
          ],
          },
         ],
      },


      {
        type: 'category',
        label: 'Prefix',
        link: {
          type: 'doc',
          id: 'commands/prefix/index',
        },
        items: [
          {
          type: 'category',
          label: 'general-commands',
          link: {
            type: 'doc',
            id: 'commands/prefix/index',
          },
          items: [
              'commands/prefix/general-commands/pets',
          ],
          },

        ],
      },
    ],
  },

  {
    type: 'category',
    label: 'Misc',
    link: {
      type: 'doc',
      id: 'misc/index',
    },
    collapsed: true,
    items: [

  {
    type: 'category',
    label: 'Faq',
    link: {
      type: 'generated-index',
      title: "Faq",
      slug: "/misc/faq",
    },
    collapsed: true,
    items: [
        'misc/faq/placehold',
    ]
  },

  {
    type: 'category',
    label: 'Simpukka',
    link: {
      type: 'generated-index',
      title: "Simpukka",
      slug: "/misc/simpukka",
    },
    collapsed: true,
    items: [
        'misc/simpukka/placehold',
    ],
  },

  {
    type: 'category',
    label: 'Developer',
    link: {
      type: 'generated-index',
      title: "Developer",
      slug: "/misc/developer",
    },
    collapsed: true,
    items: [
        'misc/developer/colored-text-on-discord',
    ],
  },

  {
    type: 'category',
    label: 'Info',
    link: {
      type: 'generated-index',
      title: "Developer",
      slug: "/misc/info",
    },
    collapsed: true,
    items: [
        'misc/info/slash',
        'misc/info/admin',
        'misc/info/ephemeral',
    ],
  },
  ],
 },

  {
    type: 'category',
    label: 'Control panel',
    link: {
      type: 'doc',
      id: 'control-panel/index',
    },
    collapsed: true,
    items: [
        'control-panel/mass-actions',
        'control-panel/timestamp-tool',
    ],
  },

  {
    type: 'category',
    label: 'Modules',
    link: {
      type: 'doc',
      id: 'modules/index',
    },
    collapsed: true,
    items: [
      "modules/verification",
      "modules/logging",
      "modules/points",
      "modules/rewards",
      "modules/roles",
      "modules/automod",
      "modules/moderation",
    ],
  },

  {
    type: 'category',
    label: 'Guides',
    link: {
      type: 'doc',
      id: "guides/index",
    },
    collapsed: true,
    items: [
      "guides/verification-guide",
      "guides/logging-guide",
    ],
  },
 "localisation",
],





};

export default sidebars;
