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
        libraryName: '@fexd/icons',
        camel2DashComponentName: false,
        libraryDirectory: 'es',
      },
      '@fexd/icons',
    ],
    [
      'babel-plugin-import',
      {
        libraryName: '@fexd/icons-bootstrap',
        camel2DashComponentName: false,
        libraryDirectory: 'es',
      },
      '@fexd/icons-bootstrap',
    ],
    [
      'babel-plugin-import',
      {
        libraryName: '@fexd/icons-antd',
        camel2DashComponentName: false,
        libraryDirectory: 'es',
      },
      '@fexd/icons-antd',
    ],
    [
      'babel-plugin-import',
      {
        libraryName: '@fexd/icons-mono',
        camel2DashComponentName: false,
        libraryDirectory: 'es',
      },
      '@fexd/icons-mono',
    ],
    [
      'babel-plugin-import',
      {
        libraryName: '@fexd/icons-bytesize',
        camel2DashComponentName: false,
        libraryDirectory: 'es',
      },
      '@fexd/icons-bytesize',
    ],
    [
      'babel-plugin-import',
      {
        libraryName: 'react-transition-group',
        libraryDirectory: 'esm',
        camel2DashComponentName: false,
      },
      'react-transition-group',
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