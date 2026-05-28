#!/usr/bin/env node
/**
 * Generates the Mere favicon by rendering the letter "M" in Press Start 2P
 * (the same font used for the header wordmark) over a dark rounded square.
 *
 * Writes:
 *   public/icon.svg        — vector favicon (satori output)
 *   public/icon.png        — 512x512 rasterized
 *   public/apple-icon.png  — 180x180 rasterized
 *
 * Run: node scripts/generate-favicon.mjs
 */

import satori from "satori"
import { Resvg } from "@resvg/resvg-js"
import { writeFileSync } from "node:fs"
import { join, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))

const fontRes = await fetch(
  "https://cdn.jsdelivr.net/fontsource/fonts/press-start-2p@latest/latin-400-normal.woff",
)
const fontData = await fontRes.arrayBuffer()

const markup = {
  type: "div",
  props: {
    style: {
      width: "100%",
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#0a0a0a",
      borderRadius: 56,
      fontFamily: "Press Start 2P",
    },
    children: {
      type: "span",
      props: {
        style: {
          fontSize: 180,
          color: "#ffffff",
          lineHeight: 1,
        },
        children: "M",
      },
    },
  },
}

const rawSvg = await satori(markup, {
  width: 320,
  height: 320,
  fonts: [
    { name: "Press Start 2P", data: fontData, weight: 400, style: "normal" },
  ],
})

// Satori positions the glyph by font metrics — its bounding box is offset
// from the viewBox center by ~11px. Translate the glyph path so the M is
// optically centered in the rounded square.
const VIEWBOX = 320
const glyphPathMatch = rawSvg.match(/<path[^>]*fill="#ffffff"[^>]*d="([^"]+)"/)
if (!glyphPathMatch) throw new Error("Could not find glyph path in satori output")
const d = glyphPathMatch[1]
const nums = d.match(/-?\d+(?:\.\d+)?/g).map(Number)
const xs = nums.filter((_, i) => i % 2 === 0)
const ys = nums.filter((_, i) => i % 2 === 1)
const minX = Math.min(...xs), maxX = Math.max(...xs)
const minY = Math.min(...ys), maxY = Math.max(...ys)
const dx = VIEWBOX / 2 - (minX + maxX) / 2
const dy = VIEWBOX / 2 - (minY + maxY) / 2

const svg = rawSvg.replace(
  /<g\s*>(<path[^>]*fill="#ffffff"[^/]*\/>)<\/g>/,
  `<g transform="translate(${dx} ${dy})">$1</g>`,
)

writeFileSync(join(__dirname, "..", "public", "icon.svg"), svg)
console.log(`✓ centered M by (${dx.toFixed(2)}, ${dy.toFixed(2)})`)

for (const [size, file] of [
  [512, "icon.png"],
  [180, "apple-icon.png"],
]) {
  const png = new Resvg(svg, { fitTo: { mode: "width", value: size } })
    .render()
    .asPng()
  writeFileSync(join(__dirname, "..", "public", file), png)
  console.log(`✓ ${file} (${png.length} bytes)`)
}

console.log("✓ icon.svg")
