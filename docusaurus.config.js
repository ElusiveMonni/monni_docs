
// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Monni',
  tagline: 'Monni, perhaps the only pet you need. Keeps you cozy and parasite free.',
  favicon: 'img/favicon.png',

  // Set the production url of your site here
  url: 'https://monni-docs-f7dj.onrender.com/',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'facebook', // Usually your GitHub org/user name.
  projectName: 'docusaurus', // Usually your repo name.

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          admonitions: {
            keywords: ['slash', 'ephemeral', 'admin'],
            extendDefaults: true,
          },

          sidebarPath: './sidebars.js',
          routeBasePath: '/',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/ElusiveMonni/monni_docs/blob/source/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/ElusiveMonni/monni_docs',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/social_card_image.png',
      metadata: [{name: "theme-color", content: "#e48404"}, {property: "og:site_name", content: "Monni"}],
      colorMode: {
        defaultMode: 'dark',
        disableSwitch: false,
        respectPrefersColorScheme: false,
      },
      navbar: {
        title: 'Monni docs',
        logo: {
          alt: 'Monni logo',
          src: 'img/logo.png',
        },
        items: [
          {to: '/modules', label: 'Modules', position: 'left'},
          {to: '/commands', label: 'Commands', position: 'left'},
          {to: '/guides', label: 'Guides', position: 'left'},
          {to: '/simpukka', label: 'Simpukka', position: 'left'},
          {to: '/developer', label: 'Developer', position: 'left'},
          {to: '/blog', label: 'Blog', position: 'right'},
          {
            href: 'https://github.com/ElusiveMonni/monni_docs',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Community',
            items: [

              {
                label: 'Discord',
                href: 'https://discord.com/invite/kEKuDRE3Jv',
              },
              {
                label: 'Reddit',
                href: 'https://www.reddit.com/r/MonniDiscordBot/',
              },
              {
                label: 'Youtube',
                href: 'https://www.youtube.com/channel/UCOJ8K79MuBVpPjsBeHPts2g',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Blog',
                to: '/blog',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/ElusiveMonni/monni_docs',
              },
            ],
          },
          {
            title: 'Legal',
            items: [
              {
                label: 'Privacy policy',
                href: 'https://monni.fyi/privacy',
              },
              {
                label: 'Terms of use',
                href: 'https://monni.fyi/terms-of-service',
              },
            ],
          },
        ],

        copyright: `Copyright © ${new Date().getFullYear()} Monni`,
      },
     announcementBar: {
       id: 'migrating',
     content:
     'We are migrating our docs, you can visit the old docs at <a target="_blank" rel="noopener noreferrer" href="https://docs.monni.fyi/">docs.monni.fyi</a>',
     backgroundColor: '#fafbfc',
     textColor: '#091E42',
     isCloseable: true,
     },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
