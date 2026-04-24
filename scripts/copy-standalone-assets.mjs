import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()

const copyIfExists = (sourceRelative, destRelative) => {
  const source = path.join(root, sourceRelative)
  const destination = path.join(root, destRelative)

  if (!fs.existsSync(source)) {
    return
  }

  fs.mkdirSync(path.dirname(destination), { recursive: true })
  fs.cpSync(source, destination, { recursive: true })
}

copyIfExists('.next/static', '.next/standalone/.next/static')
copyIfExists('public', '.next/standalone/public')
copyIfExists('media', '.next/standalone/media')
copyIfExists('gallery', '.next/standalone/gallery')
