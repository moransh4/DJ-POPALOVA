import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { spawn } from 'node:child_process'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const root = path.join(__dirname, '..')
const standalone = path.join(root, '.next', 'standalone')
const staticSrc = path.join(root, '.next', 'static')
const staticDest = path.join(standalone, '.next', 'static')
const publicSrc = path.join(root, 'public')
const publicDest = path.join(standalone, 'public')
const serverPath = path.join(standalone, 'server.js')

if (fs.existsSync(staticSrc) && !fs.existsSync(staticDest)) {
    fs.mkdirSync(path.dirname(staticDest), { recursive: true })
    fs.cpSync(staticSrc, staticDest, { recursive: true })
}

if (fs.existsSync(publicSrc) && !fs.existsSync(publicDest)) {
    fs.cpSync(publicSrc, publicDest, { recursive: true })
}

const child = spawn(process.execPath, [serverPath], {
    stdio: 'inherit',
  env: {
    ...process.env,
    PORT: process.env.PORT || '3000',
    HOSTNAME: '0.0.0.0',
  },
child.on('exit', (code, signal) => {
    if (signal) {
        process.kill(process.pid, signal)
        return
    }
    process.exit(code ?? 0)
})
