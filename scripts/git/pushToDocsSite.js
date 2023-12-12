const child = require('child_process')
const { getCurrentBranch } = require('./helpers')

const currentBranch = getCurrentBranch()

if (currentBranch !== 'main') {
  console.log('该命令仅支持从 main 合入 docs-site 分支')
  process.exit(0)
}

const command = [
  'git checkout docs-site',
  'git pull',
  `git merge ${currentBranch}`,
  'npm run build',
  'npm run size',
  'git add --all',
  'git commit -am "docs: auto merge main"',
  'git push',
  `git checkout ${currentBranch}`,
  'git pull',
  'git push',
].join(' && ')

// const command = `git checkout docs-site && git pull && git merge ${currentBranch} && git push && git checkout ${currentBranch} && git pull && git push`

console.log(command)

const childProcess = child.exec(command)
childProcess.stdout.pipe(process.stdout)
childProcess.stderr.pipe(process.stderr)
