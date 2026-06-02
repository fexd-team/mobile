const fs = require('fs')
const path = require('path')
const { execFileSync, execSync } = require('child_process')
const { getRegistry, getRemoteVersion, compareVersions } = require('./versionHelpers')

const rootDir = path.resolve(__dirname, '..')
const statePath = path.join(rootDir, 'node_modules', '.cache', 'fexd-release-private-state.json')
const registry = getRegistry()

function readJson(filepath) {
  return JSON.parse(fs.readFileSync(filepath, 'utf-8'))
}

function writeJson(filepath, content) {
  fs.writeFileSync(filepath, `${JSON.stringify(content, null, 2)}\n`)
}

function writeState(markedPackages) {
  fs.mkdirSync(path.dirname(statePath), { recursive: true })
  writeJson(statePath, {
    packages: markedPackages.map(({ packagePath, content }) => ({
      path: path.relative(rootDir, packagePath),
      content,
    })),
  })
}

function readState() {
  if (!fs.existsSync(statePath)) return []

  try {
    return readJson(statePath).packages.map((entry) => {
      if (typeof entry === 'string') {
        return { packagePath: path.resolve(rootDir, entry), content: null }
      }

      return {
        packagePath: path.resolve(rootDir, entry.path),
        content: entry.content,
      }
    })
  } catch {
    return []
  }
}

function clearState() {
  if (fs.existsSync(statePath)) {
    fs.unlinkSync(statePath)
  }
}

function getWorkspacePatterns() {
  const rootPkg = readJson(path.join(rootDir, 'package.json'))
  return Array.isArray(rootPkg.workspaces) ? rootPkg.workspaces : rootPkg.workspaces?.packages || []
}

function getPackageFilesFromPattern(pattern) {
  if (!pattern.endsWith('/*')) {
    throw new Error(`暂不支持的 workspace pattern: ${pattern}`)
  }

  const packageRoot = path.resolve(rootDir, pattern.slice(0, -2))
  return fs
    .readdirSync(packageRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => path.join(packageRoot, entry.name, 'package.json'))
    .filter((filepath) => fs.existsSync(filepath))
}

function getPackageFiles() {
  return getWorkspacePatterns()
    .flatMap(getPackageFilesFromPattern)
    .sort((a, b) => a.localeCompare(b))
}

function isVersionPublished(packageName, version) {
  try {
    const result = execSync(`npm view ${packageName}@${version} version --registry=${registry}`, {
      encoding: 'utf-8',
      stdio: ['pipe', 'pipe', 'pipe'],
      timeout: 15000,
    }).trim()
    return result === version
  } catch {
    return false
  }
}

function hasPackageVersionChanged(packagePath) {
  try {
    const statusResult = execFileSync('git', ['status', '--porcelain', '--', packagePath], {
      cwd: rootDir,
      encoding: 'utf-8',
      stdio: ['pipe', 'pipe', 'pipe'],
    }).trim()

    if (!statusResult) return false

    const diffResult = execFileSync('git', ['diff', 'HEAD', '--', packagePath], {
      cwd: rootDir,
      encoding: 'utf-8',
      stdio: ['pipe', 'pipe', 'pipe'],
    })

    return diffResult.split(/\r?\n/).some((line) => /^[+-]\s*"version":/.test(line))
  } catch (error) {
    console.error(`检查 ${packagePath} 版本变更时发生错误:`, error.message)
    return false
  }
}

function setPackagePrivate(packagePath, isPrivate) {
  const originalContent = fs.readFileSync(packagePath, 'utf-8')
  const pkg = JSON.parse(originalContent)
  const hadPrivate = pkg.private === true

  if (isPrivate && !hadPrivate) {
    pkg.private = true
    writeJson(packagePath, pkg)
    console.log(`已标记 ${pkg.name} 为 private (版本未更新)`)
    return { packagePath, content: originalContent }
  }

  if (!isPrivate && hadPrivate) {
    delete pkg.private
    writeJson(packagePath, pkg)
    console.log(`已取消 ${pkg.name} 的 private 标记`)
    return { packagePath, content: originalContent }
  }

  return null
}

function processPackages(shouldCheck = true) {
  let hasUnchangedPackages = false
  const markedPackages = []
  const invalidPackages = []

  getPackageFiles().forEach((packagePath) => {
    if (!shouldCheck) {
      setPackagePrivate(packagePath, false)
      return
    }

    const pkg = readJson(packagePath)
    if (pkg.private) return

    const hasChanged = hasPackageVersionChanged(packagePath)
    if (!hasChanged) {
      const published = isVersionPublished(pkg.name, pkg.version)
      if (published) {
        const markedPackage = setPackagePrivate(packagePath, true)
        if (markedPackage) {
          markedPackages.push(markedPackage)
        }
        hasUnchangedPackages = true
        return
      }

      console.log(`  ${pkg.name}@${pkg.version} 版本未变更但远端未发布，仍需发布`)
    }

    const remoteVersion = getRemoteVersion(pkg.name, registry)
    if (remoteVersion) {
      console.log(`  ${pkg.name}@${pkg.version} 远端 latest: ${remoteVersion}`)
      if (compareVersions(pkg.version, remoteVersion) <= 0) {
        invalidPackages.push({
          name: pkg.name,
          localVersion: pkg.version,
          remoteVersion,
        })
      }
      return
    }

    console.log(`  ${pkg.name}@${pkg.version} 远端 latest: (首次发布)`)
  })

  return { hasUnchangedPackages, markedPackages, invalidPackages }
}

function restoreMarkedPackages() {
  const markedPackages = readState()

  markedPackages.forEach(({ packagePath, content }) => {
    if (fs.existsSync(packagePath)) {
      if (content) {
        fs.writeFileSync(packagePath, content)
        console.log(`已恢复 ${readJson(packagePath).name} 的 package.json`)
      } else {
        setPackagePrivate(packagePath, false)
      }
    }
  })

  clearState()
}

const action = process.argv[2]

function exitIfInvalidVersions(invalidPackages) {
  if (invalidPackages.length === 0) return

  console.error('\n❌ 以下包本地版本不高于远端 latest，请先升版本：')
  invalidPackages.forEach(({ name, localVersion, remoteVersion }) => {
    console.error(`  ${name}: local ${localVersion} <= remote ${remoteVersion}`)
  })
  restoreMarkedPackages()
  process.exit(1)
}

if (action === 'check') {
  const { hasUnchangedPackages, markedPackages, invalidPackages } = processPackages(true)
  writeState(markedPackages)
  exitIfInvalidVersions(invalidPackages)
  if (hasUnchangedPackages) {
    console.log('存在未变更版本的包，已将其标记为 private。')
  } else {
    console.log('没有需要临时标记为 private 的包，继续发布流程。')
  }
} else if (action === 'mark-private') {
  const { markedPackages, invalidPackages } = processPackages(true)
  writeState(markedPackages)
  exitIfInvalidVersions(invalidPackages)
  console.log('已完成包的 private 标记。')
} else if (action === 'restore') {
  restoreMarkedPackages()
  console.log('已恢复所有包的发布设置。')
} else {
  console.log('无效的命令。可用命令: check, mark-private, restore')
  process.exit(1)
}
