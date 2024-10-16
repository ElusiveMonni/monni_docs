
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
        label: 'types',
        link: {
          type: 'doc',
          id: 'commands/info/index',
        },
        collapsed: true,
        items: [
          'commands/info/slash',
          'commands/info/ephemeral',
          'commands/info/admin',
        ]
      },

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
          label: 'Global',
          link: {
            type: 'doc',
            id: 'commands/slash/global-commands',
          },
          items: [
              'commands/slash/global/discord-avatar',
              'commands/slash/global/reminder-create',
              'commands/slash/global/reminder-manage',
              'commands/slash/global/tag-create',
              'commands/slash/global/tag-get',
              'commands/slash/global/tag-manage',
              'commands/slash/global/timestamp',
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
          label: 'General Commands',
          link: {
            type: 'doc',
            id: 'commands/prefix/prefix-index',
          },
          collapsed: true,
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
      "modules/anti-bot",
    ],
  },

  {
    type: 'category',
    label: 'Control Panel',
    link: {
      type: 'doc',
      id: 'control-panel/index'
    },
    collapsed: true,
    items: [
        'control-panel/mass-actions',
        'control-panel/timestamp-tool',
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
      type: 'doc',
      id: "misc/faq/index",
    },
    collapsed: true,
    items: [
        'misc/faq/permissions',
        'misc/faq/tokens',
    ]
  },
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
      "guides/setting-up-points",
      "guides/mass-actions",
      "guides/monni-role-position",
    ],
  },

  {
    type: 'category',
    label: 'Simpukka',
    link: {
      type: 'doc',
      id: 'simpukka/index',
    },
    collapsed: true,
    items: [
      {
        type: 'category',
        label: 'Simpukka API',
        link: {
          type: 'doc',
          id: 'simpukka/api/index',
        },
        collapsed: true,
        items: [
          'simpukka/api/misc',
          'simpukka/api/discord'
        ]
      },
      {
        type: 'category',
        label: 'Supported languages',
        link: {
          type: 'doc',
          id: 'simpukka/supported-languages/index',
        },
        collapsed: true,
        items: [
        ]
      },
      {
        type: 'category',
        label: 'Objects',
        link: {
          type: 'doc',
          id: 'simpukka/objects/index',
        },
        collapsed: true,
        items: [
          'simpukka/objects/discord/user'
        ]
      },
    ],
  },

  {
    type: 'category',
    label: 'Developer',
    link: {
      type: 'doc',
      id: 'developer/index',
    },
    collapsed: true,
    items: [
        'developer/monni-api',
    ],
  },
 "localisation",
],





};

export default sidebars;
