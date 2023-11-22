import { defineConfig } from 'father'

export default defineConfig({
  cjs: {
    output: 'lib',
    platform: 'browser',
    transformer: 'babel',
  },
  esm: {
    output: 'es',
    platform: 'browser',
    transformer: 'babel',
  },
})
