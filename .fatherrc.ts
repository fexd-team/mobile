import { defineConfig } from 'father'

export default defineConfig({
  cjs: {
    output: 'lib',
    platform: 'browser',
    transformer: 'babel',
    parallel: true,
  },
  esm: {
    output: 'es',
    platform: 'browser',
    transformer: 'babel',
    parallel: true,
  },
})
