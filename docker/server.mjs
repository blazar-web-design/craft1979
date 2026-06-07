import { createServer } from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import { dirname, extname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), 'dist')
const port = Number(process.env.PORT ?? 8080)

const types = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain; charset=utf-8',
  '.webmanifest': 'application/manifest+json',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.xml': 'application/xml',
}

function resolveFilePath(pathname) {
  const relative = pathname === '/' ? 'index.html' : pathname.replace(/^\/+/, '')
  const filePath = join(root, relative)

  if (filePath !== root && !filePath.startsWith(`${root}/`)) {
    return null
  }

  return filePath
}

async function sendFile(filePath, res) {
  const body = await readFile(filePath)
  const ext = extname(filePath)

  res.writeHead(200, {
    'Content-Type': types[ext] ?? 'application/octet-stream',
    'X-Content-Type-Options': 'nosniff',
  })
  res.end(body)
}

async function servePath(pathname, res) {
  const filePath = resolveFilePath(pathname)
  if (!filePath) {
    res.writeHead(403).end()
    return
  }

  try {
    const fileStat = await stat(filePath)
    if (fileStat.isFile()) {
      await sendFile(filePath, res)
      return
    }
  } catch {
    // fall through to SPA index
  }

  await sendFile(join(root, 'index.html'), res)
}

createServer((req, res) => {
  if (req.url === '/healthz') {
    res.writeHead(200, { 'Content-Type': 'text/plain' }).end('ok')
    return
  }

  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.writeHead(405).end()
    return
  }

  const url = new URL(req.url ?? '/', `http://${req.headers.host ?? 'localhost'}`)
  servePath(url.pathname, res).catch(() => {
    res.writeHead(500).end()
  })
}).listen(port, '0.0.0.0')
