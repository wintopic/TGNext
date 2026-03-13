const { spawnSync } = require('node:child_process')
const { existsSync } = require('node:fs')
const path = require('node:path')
const process = require('node:process')

const isWin = process.platform === 'win32'
const pnpmCmd = isWin ? 'pnpm.cmd' : 'pnpm'
const binExt = isWin ? '.cmd' : ''

function hasBin(name) {
  return existsSync(path.join(process.cwd(), 'node_modules', '.bin', `${name}${binExt}`))
}

function run(args) {
  const result = spawnSync(pnpmCmd, ['exec', ...args], { stdio: 'inherit' })
  return result.status === 0
}

if (existsSync(path.join(process.cwd(), '.git')) && hasBin('simple-git-hooks')) {
  run(['simple-git-hooks'])
}
