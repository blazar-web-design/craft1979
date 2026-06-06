import { spawn } from 'node:child_process'
import { once } from 'node:events'
import { createRequire } from 'node:module'
import process from 'node:process'

const require = createRequire(import.meta.url)
const lighthouse = require('lighthouse').default ?? require('lighthouse')
const chromeLauncher = require('chrome-launcher')

const HOST = '127.0.0.1'
const PORT = 4173
const URL = `http://${HOST}:${PORT}/`
const MIN_SCORE = 1

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function waitForServer(maxAttempts = 60) {
  for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
    try {
      const response = await fetch(URL)
      if (response.ok) return
    } catch {
      // retry until preview is ready
    }
    await sleep(500)
  }

  throw new Error(`Preview server did not become ready at ${URL}`)
}

async function runLighthouse() {
  const chrome = await chromeLauncher.launch({
    chromeFlags: ['--headless', '--no-sandbox', '--disable-gpu'],
  })

  try {
    const result = await lighthouse(
      URL,
      {
        logLevel: 'error',
        output: 'json',
        onlyCategories: [
          'performance',
          'accessibility',
          'best-practices',
          'seo',
        ],
        port: chrome.port,
        formFactor: 'mobile',
        screenEmulation: { mobile: true },
      },
      undefined
    )

    return result.lhr
  } finally {
    await chrome.kill()
  }
}

function formatFailures(report) {
  const lines = []

  for (const [id, audit] of Object.entries(report.audits)) {
    if (audit.score === null || audit.score >= 1) continue
    lines.push(`  - ${audit.title} (${id}): ${Math.round(audit.score * 100)}`)
  }

  return lines
}

async function main() {
  const preview = spawn(
    'pnpm',
    ['preview', '--port', String(PORT), '--host', HOST],
    {
      stdio: ['ignore', 'pipe', 'pipe'],
      env: process.env,
    }
  )

  let output = ''
  preview.stdout.on('data', (chunk) => {
    output += chunk.toString()
  })
  preview.stderr.on('data', (chunk) => {
    output += chunk.toString()
  })

  const exitWithCleanup = async (code) => {
    preview.kill('SIGTERM')
    await once(preview, 'close').catch(() => undefined)
    process.exit(code)
  }

  try {
    await waitForServer()
    async function warmup() {
      const html = await fetch(URL).then((response) => response.text())
      const assets = [
        ...html.matchAll(/(?:href|src)="(\/[^"]+\.(?:css|js|webp))"/g),
      ].map((match) => `${URL.replace(/\/$/, '')}${match[1]}`)

      await Promise.all(
        [URL, ...assets].map((assetUrl) =>
          fetch(assetUrl).catch(() => undefined)
        )
      )
    }

    let lastReport = null

    for (let attempt = 1; attempt <= 3; attempt += 1) {
      await warmup()
      await sleep(250)
      lastReport = await runLighthouse()
      const scores = Object.fromEntries(
        Object.entries(lastReport.categories).map(([name, category]) => [
          name,
          category.score,
        ])
      )

      console.log(`Lighthouse scores (run ${attempt}):`)
      for (const [name, score] of Object.entries(scores)) {
        console.log(`  ${name}: ${Math.round(score * 100)}`)
      }

      const failedCategories = Object.entries(scores).filter(
        ([, score]) => score < MIN_SCORE
      )

      if (failedCategories.length === 0) {
        await exitWithCleanup(0)
      }
    }

    const scores = Object.fromEntries(
      Object.entries(lastReport.categories).map(([name, category]) => [
        name,
        category.score,
      ])
    )

    console.error('\nCategories below 100:')
    for (const [name, score] of Object.entries(scores)) {
      if (score < MIN_SCORE) {
        console.error(`  - ${name}: ${Math.round(score * 100)}`)
      }
    }

    const failures = formatFailures(lastReport)
    if (failures.length > 0) {
      console.error('\nFailed audits:')
      console.error(failures.join('\n'))
    }

    await exitWithCleanup(1)
  } catch (error) {
    console.error(output)
    console.error(error)
    await exitWithCleanup(1)
  }
}

await main()
