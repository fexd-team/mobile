const { execSync } = require('child_process')
const { getRegistry } = require('./versionHelpers')

const registry = getRegistry()
const isPublic = process.argv.includes('--public')
const isForce = process.argv.includes('--force')
const tag = process.argv.find((a) => a.startsWith('--tag='))?.split('=')[1]

const accessFlag = isPublic || !process.argv.includes('--private') ? ' --access=public' : ''
const tagFlag = tag ? ` --tag=${tag}` : ''

function run(cmd, label, cwd = process.cwd()) {
  console.log(`\n> ${label || cmd}`)
  execSync(cmd, { stdio: 'inherit', cwd })
}

function getExitCode(error) {
  return typeof error?.status === 'number' ? error.status : 1
}

function finishFailure(error) {
  console.error('\n❌ 发布失败\n')
  process.exit(getExitCode(error))
}

console.log(`\n📦 发布目标 registry: ${registry}`)
if (tag) console.log(`   tag: ${tag}`)

const publishCmd = `pnpm -r publish --no-git-checks --force${accessFlag}${tagFlag} --registry=${registry}`

if (isForce) {
  try {
    run(publishCmd, 'pnpm publish (force)')
  } catch (error) {
    finishFailure(error)
  }
} else {
  const registryArg = `--registry=${registry}`
  let failedError = null

  try {
    run(`node ./scripts/checkVersionAndMarkPrivate.js check ${registryArg}`, 'version:check')
    run(publishCmd, 'pnpm publish')
  } catch (error) {
    failedError = error
  } finally {
    try {
      run(`node ./scripts/checkVersionAndMarkPrivate.js restore ${registryArg}`, 'version:restore')
    } catch (error) {
      failedError = failedError || error
    }
  }

  if (failedError) {
    finishFailure(failedError)
  }
}

console.log('\n✅ 发布完成\n')
