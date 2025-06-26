// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer').themes.github;
const darkCodeTheme = require('prism-react-renderer').themes.dracula;
const path = require('path');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Juice',
  tagline: 'Application Documentation',
  url: 'https://docs.juicelabs.co',

  baseUrl: '/',
  trailingSlash: false,
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'https://app.juicelabs.co/Juice@64px.png',
  organizationName: 'Juice Labs', // Usually your GitHub org/user name.
  projectName: 'juice-docs', // Usually your repo name.

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/juice-labs/juice-docs/edit/master/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: '',
        logo: {
          alt: 'Juice Logo',
          src: 'img/juice-logo.png',
          srcDark: 'img/juice-logo.png',
          href: '/juice-docs/docs/juice/intro'
        },
        items: [
          {
            href: 'https://juicelabs.co',
            label: 'Juice',
            position: 'left',
          },
          {
            href: 'https://github.com/juice-labs/juice-docs',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        copyright: `Copyright © ${new Date().getFullYear()} Juice Labs`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
      colorMode: {
        defaultMode: 'dark',
        disableSwitch: true,
        respectPrefersColorScheme: false,
      },
      meta: [
        {name: "google-site-verification", content: "Q2Jau5IJ5jerq6GeucbDY4Lj6CsMDv"},
      ]
    }),
  themes: [
  ]
};

module.exports = config;
