import { defineConfig } from 'father'

export default defineConfig({
  extends: '../../.fatherrc.ts',
  extraBabelPlugins: [
    'react-node-key/babel',
    [
      'babel-plugin-import',
      {
        libraryName: '@fexd/tools',
        camel2DashComponentName: false,
        libraryDirectory: 'es',
      },
      '@fexd/tools',
    ],
    [
      'babel-plugin-import',
      {
        libraryName: '@fexd/mobile',
        libraryDirectory: 'es/exports', // or 'es/exports'
        camel2DashComponentName: false,
        style: (name) => `${name}/style.less`, // or `${name}/style.css`
      },
      '@fexd/mobile',
    ],
    [
      'babel-plugin-import',
      {
        libraryName: '@fexd/icons',
        camel2DashComponentName: false,
        libraryDirectory: 'es',
      },
      '@fexd/icons',
    ],
    [
      'babel-plugin-import',
      {
        libraryName: 'ahooks',
        libraryDirectory: 'es',
        camel2DashComponentName: false,
      },
      'ahooks',
    ],
  ],
})
