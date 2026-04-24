const { execSync } = require('child_process')
const path = require('path')
const fs = require('fs')

const root = path.join(__dirname, '..')
const standalone = path.join(root, '.next', 'standalone')
const staticSrc = path.join(root, '.next', 'static')
const staticDest = path.join(standalone, '.next', 'static')
const publicSrc = path.join(root, 'public')
const publicDest = path.join(standalone, 'public')

if (fs.existsSync(staticSrc) && !fs.existsSync(staticDest)) {
    execSync(`cp -r "${staticSrc}" "${staticDest}"`, { stdio: 'inherit' })
}

if (fs.existsSync(publicSrc) && !fs.existsSync(publicDest)) {
    execSync(`cp -r "${publicSrc}" "${publicDest}"`, { stdio: 'inherit' })
}

require(path.join(standalone, 'server.js'))
