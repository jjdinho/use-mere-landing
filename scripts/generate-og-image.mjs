#!/usr/bin/env node
/**
 * Generates the static OG image (public/mere-og-image.png)
 * showing the three-step hero flow: You ship → We detect → Signals in Slack
 *
 * Run:  node scripts/generate-og-image.mjs
 */

import satori from "satori"
import { Resvg } from "@resvg/resvg-js"
import { readFileSync, writeFileSync } from "node:fs"
import { join, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))

const logoBase64 = "data:image/png;base64," + readFileSync(join(__dirname, "..", "public", "logo-512.png")).toString("base64")

// -- Fonts -------------------------------------------------------------------
async function loadFont(url) {
  const res = await fetch(url)
  return res.arrayBuffer()
}

const [geistRegular, geistSemiBold, geistMono] = await Promise.all([
  loadFont("https://cdn.jsdelivr.net/fontsource/fonts/geist-sans@latest/latin-400-normal.woff"),
  loadFont("https://cdn.jsdelivr.net/fontsource/fonts/geist-sans@latest/latin-600-normal.woff"),
  loadFont("https://cdn.jsdelivr.net/fontsource/fonts/geist-mono@latest/latin-400-normal.woff"),
])

// -- Reusable bits -----------------------------------------------------------
const CARD_BG = "#1a1d21"
const CARD_BORDER = "1px solid rgba(255,255,255,0.08)"
const CARD_RADIUS = "10px"
const TEAL = "#5CC8C8"
const GREEN = "#3fb950"
const MUTED = "#8b949e"
const TEXT = "#dcddde"
const TEXT_BRIGHT = "#d1d2d3"

const checkIcon = {
  type: "svg",
  props: {
    width: 14,
    height: 14,
    viewBox: "0 0 24 24",
    fill: GREEN,
    children: {
      type: "path",
      props: {
        d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z",
      },
    },
  },
}

function smallCheck() {
  return {
    type: "svg",
    props: {
      width: 12,
      height: 12,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: GREEN,
      strokeWidth: 3,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      children: {
        type: "polyline",
        props: { points: "20 6 9 17 4 12" },
      },
    },
  }
}

function arrowRight() {
  return {
    type: "div",
    props: {
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 100,
        paddingLeft: 12,
        paddingRight: 12,
      },
      children: {
        type: "svg",
        props: {
          width: 24,
          height: 24,
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: TEAL,
          strokeWidth: 2,
          strokeLinecap: "round",
          strokeLinejoin: "round",
          opacity: 0.5,
          children: [
            { type: "line", props: { x1: 5, y1: 12, x2: 19, y2: 12 } },
            { type: "polyline", props: { points: "12 5 19 12 12 19" } },
          ],
        },
      },
    },
  }
}

function slackLogo() {
  return {
    type: "svg",
    props: {
      width: 14,
      height: 14,
      viewBox: "0 0 24 24",
      children: [
        { type: "path", props: { d: "M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zm1.271 0a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313z", fill: "#E01E5A" } },
        { type: "path", props: { d: "M8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zm0 1.271a2.527 2.527 0 0 1 2.521 2.521 2.527 2.527 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312z", fill: "#36C5F0" } },
        { type: "path", props: { d: "M18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zm-1.27 0a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.163 0a2.528 2.528 0 0 1 2.523 2.522v6.312z", fill: "#2EB67D" } },
        { type: "path", props: { d: "M15.163 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.163 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zm0-1.27a2.527 2.527 0 0 1-2.52-2.523 2.527 2.527 0 0 1 2.52-2.52h6.315A2.528 2.528 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.315z", fill: "#ECB22E" } },
      ],
    },
  }
}

function avatarBadge(letter) {
  return {
    type: "div",
    props: {
      style: {
        width: 28,
        height: 28,
        borderRadius: 6,
        backgroundColor: TEAL,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      },
      children: {
        type: "span",
        props: {
          style: { fontSize: 14, fontWeight: 600, color: "#0a0a0a" },
          children: letter,
        },
      },
    },
  }
}

function appBadge() {
  return {
    type: "span",
    props: {
      style: {
        fontSize: 9,
        fontWeight: 600,
        backgroundColor: "rgba(255,255,255,0.08)",
        color: "#b9bbbe",
        padding: "1px 4px",
        borderRadius: 3,
      },
      children: "APP",
    },
  }
}

function slackButton(label) {
  return {
    type: "span",
    props: {
      style: {
        fontSize: 10,
        fontWeight: 600,
        color: TEXT_BRIGHT,
        backgroundColor: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.08)",
        padding: "3px 8px",
        borderRadius: 4,
      },
      children: label,
    },
  }
}

// -- Main markup (Satori virtual-DOM) ----------------------------------------
const markup = {
  type: "div",
  props: {
    style: {
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#0a0a0a",
      fontFamily: "Geist Sans",
      padding: "48px 56px",
    },
    children: [
      // Hero heading
      {
        type: "div",
        props: {
          style: { fontSize: 40, fontWeight: 600, color: "#ffffff", letterSpacing: "-0.03em", marginBottom: 36 },
          children: "Analytics that work without you",
        },
      },
      // Three cards
      {
        type: "div",
        props: {
          style: { display: "flex", alignItems: "flex-start", width: "100%", maxWidth: 1080 },
          children: [
            // Card 1: You ship
            {
              type: "div",
              props: {
                style: { display: "flex", flexDirection: "column", alignItems: "center", flex: 1 },
                children: [
                  {
                    type: "span",
                    props: {
                      style: { fontSize: 13, color: MUTED, marginBottom: 12, fontWeight: 600, letterSpacing: "0.04em" },
                      children: "You ship",
                    },
                  },
                  {
                    type: "div",
                    props: {
                      style: { display: "flex", flexDirection: "column", backgroundColor: CARD_BG, border: CARD_BORDER, borderRadius: CARD_RADIUS, overflow: "hidden", width: "100%" },
                      children: [
                        // PR header
                        {
                          type: "div",
                          props: {
                            style: { display: "flex", alignItems: "center", gap: 8, padding: "12px 14px", borderBottom: "1px solid rgba(255,255,255,0.04)" },
                            children: [
                              {
                                type: "svg",
                                props: {
                                  width: 16, height: 16, viewBox: "0 0 24 24", fill: "none", stroke: GREEN, strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round",
                                  children: [
                                    { type: "circle", props: { cx: 18, cy: 18, r: 3 } },
                                    { type: "circle", props: { cx: 6, cy: 6, r: 3 } },
                                    { type: "path", props: { d: "M13 6h3a2 2 0 0 1 2 2v7" } },
                                    { type: "line", props: { x1: 6, y1: 9, x2: 6, y2: 21 } },
                                  ],
                                },
                              },
                              { type: "span", props: { style: { fontSize: 13, fontWeight: 600, color: TEXT_BRIGHT }, children: "feat: onboarding redesign" } },
                              { type: "span", props: { style: { fontSize: 10, fontWeight: 600, backgroundColor: "rgba(35,134,54,0.2)", color: GREEN, padding: "2px 8px", borderRadius: 999, marginLeft: "auto" }, children: "Open" } },
                            ],
                          },
                        },
                        // Merge area
                        {
                          type: "div",
                          props: {
                            style: { display: "flex", flexDirection: "column", padding: 14, backgroundColor: "#161b22" },
                            children: [
                              // Checks
                              {
                                type: "div",
                                props: {
                                  style: { display: "flex", alignItems: "center", gap: 6, marginBottom: 12 },
                                  children: [checkIcon, checkIcon, checkIcon, { type: "span", props: { style: { fontSize: 11, color: MUTED }, children: "All checks passed" } }],
                                },
                              },
                              // Merge button
                              {
                                type: "div",
                                props: {
                                  style: { display: "flex", alignItems: "center", justifyContent: "center", gap: 8, backgroundColor: "#238636", color: "white", fontSize: 13, fontWeight: 600, padding: "10px 16px", borderRadius: 6 },
                                  children: [
                                    {
                                      type: "svg",
                                      props: {
                                        width: 16, height: 16, viewBox: "0 0 24 24", fill: "none", stroke: "white", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round",
                                        children: [
                                          { type: "circle", props: { cx: 18, cy: 18, r: 3 } },
                                          { type: "circle", props: { cx: 6, cy: 6, r: 3 } },
                                          { type: "path", props: { d: "M6 21V9a9 9 0 0 0 9 9" } },
                                        ],
                                      },
                                    },
                                    "Merge pull request",
                                  ],
                                },
                              },
                              // Branch info
                              {
                                type: "div",
                                props: {
                                  style: { display: "flex", fontSize: 10, color: MUTED, marginTop: 8, justifyContent: "center", gap: 4 },
                                  children: [
                                    "into ",
                                    { type: "span", props: { style: { fontFamily: "Geist Mono", color: TEXT_BRIGHT }, children: "main" } },
                                    " from ",
                                    { type: "span", props: { style: { fontFamily: "Geist Mono", color: TEXT_BRIGHT }, children: "feat/onboarding-v2" } },
                                  ],
                                },
                              },
                            ],
                          },
                        },
                      ],
                    },
                  },
                ],
              },
            },
            // Arrow 1
            arrowRight(),
            // Card 2: We detect
            {
              type: "div",
              props: {
                style: { display: "flex", flexDirection: "column", alignItems: "center", flex: 1 },
                children: [
                  {
                    type: "span",
                    props: {
                      style: { fontSize: 13, color: MUTED, marginBottom: 12, fontWeight: 600, letterSpacing: "0.04em" },
                      children: "We detect",
                    },
                  },
                  {
                    type: "div",
                    props: {
                      style: { display: "flex", flexDirection: "column", backgroundColor: CARD_BG, border: CARD_BORDER, borderRadius: CARD_RADIUS, overflow: "hidden", width: "100%", padding: "20px 16px" },
                      children: [
                        // Pixel grid
                        {
                          type: "div",
                          props: {
                            style: { display: "flex", justifyContent: "center", marginBottom: 18 },
                            children: {
                              type: "div",
                              props: {
                                style: { display: "flex", flexWrap: "wrap", width: 24, gap: 3 },
                                children: [0.9, 0.1, 0.9, 0.1, 0.9, 0.1, 0.9, 0.1, 0.9].map((opacity, i) => ({
                                  type: "div",
                                  props: {
                                    key: i,
                                    style: { width: 6, height: 6, borderRadius: 1, backgroundColor: TEAL, opacity },
                                  },
                                })),
                              },
                            },
                          },
                        },
                        // Analysis lines
                        {
                          type: "div",
                          props: {
                            style: { display: "flex", flexDirection: "column", gap: 10 },
                            children: [
                              {
                                type: "div",
                                props: {
                                  style: { display: "flex", alignItems: "center", gap: 8 },
                                  children: [
                                    { type: "div", props: { style: { width: 6, height: 6, borderRadius: 1, backgroundColor: TEAL, flexShrink: 0 } } },
                                    { type: "span", props: { style: { fontSize: 12, color: TEXT }, children: "Scanning $pageviews, $clicks, custom events" } },
                                  ],
                                },
                              },
                              {
                                type: "div",
                                props: {
                                  style: { display: "flex", alignItems: "center", gap: 8 },
                                  children: [smallCheck(), { type: "span", props: { style: { fontSize: 12, color: TEXT }, children: "4 new pages detected" } }],
                                },
                              },
                              {
                                type: "div",
                                props: {
                                  style: { display: "flex", alignItems: "center", gap: 8 },
                                  children: [smallCheck(), { type: "span", props: { style: { fontSize: 12, color: TEXT }, children: "Detected 1 new feature" } }],
                                },
                              },
                              {
                                type: "div",
                                props: {
                                  style: { display: "flex", alignItems: "center", gap: 8 },
                                  children: [
                                    { type: "div", props: { style: { width: 6, height: 6, borderRadius: 1, backgroundColor: "rgba(92,200,200,0.3)", flexShrink: 0 } } },
                                    { type: "span", props: { style: { fontSize: 12, color: TEXT }, children: "Watching for regressions..." } },
                                  ],
                                },
                              },
                            ],
                          },
                        },
                      ],
                    },
                  },
                ],
              },
            },
            // Arrow 2
            arrowRight(),
            // Card 3: Signals in Slack
            {
              type: "div",
              props: {
                style: { display: "flex", flexDirection: "column", alignItems: "center", flex: 1 },
                children: [
                  {
                    type: "span",
                    props: {
                      style: { fontSize: 13, color: MUTED, marginBottom: 12, fontWeight: 600, letterSpacing: "0.04em" },
                      children: "Signals in Slack",
                    },
                  },
                  {
                    type: "div",
                    props: {
                      style: { display: "flex", flexDirection: "column", backgroundColor: CARD_BG, border: CARD_BORDER, borderRadius: CARD_RADIUS, overflow: "hidden", width: "100%" },
                      children: [
                        // Slack header
                        {
                          type: "div",
                          props: {
                            style: { display: "flex", alignItems: "center", gap: 8, padding: "10px 14px", borderBottom: "1px solid rgba(255,255,255,0.04)" },
                            children: [
                              slackLogo(),
                              { type: "span", props: { style: { fontSize: 13, fontWeight: 600, color: TEXT_BRIGHT }, children: "product-signals" } },
                            ],
                          },
                        },
                        // Messages
                        {
                          type: "div",
                          props: {
                            style: { display: "flex", flexDirection: "column", padding: "12px 14px", gap: 16 },
                            children: [
                              // Message 1
                              {
                                type: "div",
                                props: {
                                  style: { display: "flex", gap: 10 },
                                  children: [
                                    avatarBadge("S"),
                                    {
                                      type: "div",
                                      props: {
                                        style: { display: "flex", flexDirection: "column" },
                                        children: [
                                          {
                                            type: "div",
                                            props: {
                                              style: { display: "flex", alignItems: "center", gap: 6 },
                                              children: [
                                                { type: "span", props: { style: { fontSize: 11, fontWeight: 600, color: TEXT_BRIGHT }, children: "Mere Analytics" } },
                                                appBadge(),
                                                { type: "span", props: { style: { fontSize: 10, color: "#a3a6aa" }, children: "9:02 AM" } },
                                              ],
                                            },
                                          },
                                          {
                                            type: "div",
                                            props: {
                                              style: { display: "flex", fontSize: 11, color: TEXT, marginTop: 3, lineHeight: 1.5, flexWrap: "wrap" },
                                              children: [
                                                'Rage click spike on ',
                                                { type: "span", props: { style: { fontWeight: 600, color: "white" }, children: '"Get started"' } },
                                                ' — ',
                                                { type: "span", props: { style: { color: "#fb923c", fontWeight: 600 }, children: "812 clicks" } },
                                                ' in 1hr',
                                              ],
                                            },
                                          },
                                          {
                                            type: "div",
                                            props: {
                                              style: { display: "flex", gap: 6, marginTop: 8 },
                                              children: [slackButton("Create ticket"), slackButton("Tag @cursor")],
                                            },
                                          },
                                        ],
                                      },
                                    },
                                  ],
                                },
                              },
                              // Message 2
                              {
                                type: "div",
                                props: {
                                  style: { display: "flex", gap: 10 },
                                  children: [
                                    avatarBadge("S"),
                                    {
                                      type: "div",
                                      props: {
                                        style: { display: "flex", flexDirection: "column" },
                                        children: [
                                          {
                                            type: "div",
                                            props: {
                                              style: { display: "flex", alignItems: "center", gap: 6 },
                                              children: [
                                                { type: "span", props: { style: { fontSize: 11, fontWeight: 600, color: TEXT_BRIGHT }, children: "Mere Analytics" } },
                                                appBadge(),
                                                { type: "span", props: { style: { fontSize: 10, color: "#a3a6aa" }, children: "9:14 AM" } },
                                              ],
                                            },
                                          },
                                          {
                                            type: "div",
                                            props: {
                                              style: { display: "flex", fontSize: 11, color: TEXT, marginTop: 3, lineHeight: 1.5, flexWrap: "wrap" },
                                              children: [
                                                "New onboarding live for first ",
                                                { type: "span", props: { style: { fontWeight: 600, color: "white" }, children: "15 users" } },
                                              ],
                                            },
                                          },
                                          {
                                            type: "div",
                                            props: {
                                              style: { display: "flex", gap: 6, marginTop: 8 },
                                              children: [slackButton("See funnel"), slackButton("Watch replay")],
                                            },
                                          },
                                        ],
                                      },
                                    },
                                  ],
                                },
                              },
                            ],
                          },
                        },
                      ],
                    },
                  },
                ],
              },
            },
          ],
        },
      },
    ],
  },
}

// -- Render ------------------------------------------------------------------
const svg = await satori(markup, {
  width: 1200,
  height: 630,
  fonts: [
    { name: "Geist Sans", data: geistRegular, weight: 400, style: "normal" },
    { name: "Geist Sans", data: geistSemiBold, weight: 600, style: "normal" },
    { name: "Geist Mono", data: geistMono, weight: 400, style: "normal" },
  ],
})

const resvg = new Resvg(svg, {
  fitTo: { mode: "width", value: 1200 },
})
const png = resvg.render().asPng()

const out = join(__dirname, "..", "public", "mere-og-image.png")
writeFileSync(out, png)
console.log(`✓ OG image written to ${out} (${(png.length / 1024).toFixed(0)} KB)`)
