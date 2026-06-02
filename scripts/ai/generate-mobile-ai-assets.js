const fs = require('fs')
const { paths, generateManifestText, generateLlmsTxt } = require('./mobile-ai-assets')

fs.writeFileSync(paths.manifest, generateManifestText(), 'utf8')
fs.writeFileSync(paths.llms, generateLlmsTxt(), 'utf8')

console.log(`Generated ${paths.manifest}`)
console.log(`Generated ${paths.llms}`)
