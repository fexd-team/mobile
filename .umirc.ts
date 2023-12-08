import { defineConfig } from 'dumi'
import path from 'path'

import { version } from './packages/mobile/package.json'

export default defineConfig({
  title: 'Fexd Mobile',
  favicon: './logo.png',
  logo: process.env.NODE_ENV === 'production' ? '/mobile/logo.png' : '/logo.png',
  outputPath: 'docs',
  publicPath: process.env.NODE_ENV === 'production' ? '/mobile/' : '/',
  mode: 'site',
  locales: [['zh-CN', '中文']],
  // history: { type: 'hash' },
  resolve: {
    includes: ['documents', 'packages/mobile/src', 'packages/mobile-router5/src'],
  },
  themeConfig: {
    hd: {
      rules: [],
    },
  },
  sass: {},
  navs: [
    null,
    {
      title: 'GitHub',
      path: 'https://github.com/fexd-team/mobile',
    },
    { title: `v${version}`, path: 'https://www.npmjs.com/package/@fexd/mobile' },
  ],
  alias: {
    '@root': process.cwd(),
    '@documents': path.resolve(__dirname, './documents'),
    '@dumiTheme': path.resolve(__dirname, './.dumi/theme'),
  },
  nodeModulesTransform: {
    type: 'none',
  },
  extraBabelPlugins: [
    [
      'babel-plugin-jsx-css-modules',
      {
        styleFileReg: [/\.module\.(css|less|scss)$/],
        prefer: 'local',
        helperImportType: 'esm',
      },
    ],
    [
      'babel-plugin-import',
      {
        libraryName: '@fexd/tools',
        camel2DashComponentName: false,
        libraryDirectory: 'es',
      },
      '@fexd/tools',
    ],
    ...(process.env.NODE_ENV === 'development'
      ? []
      : [
          [
            'babel-plugin-import',
            {
              libraryName: '@fexd/mobile',
              libraryDirectory: 'src/exports',
              camel2DashComponentName: false,
              style: false // () => '@root/packages/mobile/src/style.less',
            },
            '@fexd/mobile',
          ],
        ]),
  ],
  // 使用 mfsu 配置来进行加速，具体参考以下地址
  // https://github.com/umijs/umi/issues/6766
  // mfsu: {}, // 感觉没啥明显的效果，还会引发一些奇怪的样式问题，先关了
})
