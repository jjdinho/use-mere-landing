"use client"

import { useState, useMemo } from "react"
import { Info } from "lucide-react"
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip"

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const ANIMALS = [
  {
    name: "Flies",
    emoji: "🪰",
    customers: 1_000_000,
    arpa: 100,
    description: "Consumer / prosumer freemium, massive scale",
  },
  {
    name: "Mice",
    emoji: "🐭",
    customers: 100_000,
    arpa: 1_000,
    description: "SMB self-serve, product-led growth",
  },
  {
    name: "Rabbits",
    emoji: "🐰",
    customers: 10_000,
    arpa: 10_000,
    description: "Mid-market, transactional sales",
  },
  {
    name: "Deer",
    emoji: "🦌",
    customers: 1_000,
    arpa: 100_000,
    description: "Upper mid-market, relationship sales",
  },
  {
    name: "Elephants",
    emoji: "🐘",
    customers: 100,
    arpa: 1_000_000,
    description: "Large enterprise, long sales cycles",
  },
]

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function fmtDollar(n: number): string {
  if (!isFinite(n)) return "—"
  if (Math.abs(n) >= 1_000_000_000)
    return "$" + (n / 1_000_000_000).toFixed(1) + "B"
  if (Math.abs(n) >= 1_000_000)
    return "$" + (n / 1_000_000).toFixed(1) + "M"
  if (Math.abs(n) >= 1_000) return "$" + (n / 1_000).toFixed(1) + "K"
  return "$" + n.toLocaleString("en-US", { maximumFractionDigits: 0 })
}

function fmtNum(n: number): string {
  return n.toLocaleString("en-US")
}

function getClosestAnimal(arpa: number, customers: number) {
  let closest = ANIMALS[0]
  let minDist = Infinity
  for (const animal of ANIMALS) {
    const dA = Math.log10(arpa || 1) - Math.log10(animal.arpa)
    const dC = Math.log10(customers || 1) - Math.log10(animal.customers)
    const dist = Math.sqrt(dA ** 2 + dC ** 2)
    if (dist < minDist) {
      minDist = dist
      closest = animal
    }
  }
  return closest
}

function getProgressTo100M(arr: number): number {
  if (arr <= 0) return 0
  const logMin = Math.log10(10_000)
  const logMax = Math.log10(100_000_000)
  const logVal = Math.log10(Math.min(arr, 100_000_000))
  return Math.max(
    0,
    Math.min(100, ((logVal - logMin) / (logMax - logMin)) * 100)
  )
}

/* ------------------------------------------------------------------ */
/*  Shared UI (matching churn calculator style)                        */
/* ------------------------------------------------------------------ */

function InfoTip({ text }: { text: string }) {
  return (
    <Tooltip>
      <TooltipTrigger
        className="inline-flex text-muted-foreground hover:text-foreground transition-colors"
        render={<button type="button" />}
      >
        <Info className="size-3.5" />
      </TooltipTrigger>
      <TooltipContent className="max-w-56">{text}</TooltipContent>
    </Tooltip>
  )
}

/* Filled-track slider (matching churn calculator) */
function FilledSlider({
  min = 0,
  max,
  step,
  value,
  onChange,
}: {
  min?: number
  max: number
  step?: number
  value: number
  onChange: (v: number) => void
}) {
  const pct = max > min ? ((value - min) / (max - min)) * 100 : 0

  return (
    <div className="relative h-5 flex items-center mt-1">
      <div className="absolute inset-x-0 h-[6px] rounded-full bg-border/40 overflow-hidden">
        <div
          className="h-full rounded-full"
          style={{
            width: `${pct}%`,
            background: "linear-gradient(90deg, oklch(0.80 0.08 195 / 0.5), oklch(0.85 0.10 195))",
          }}
        />
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="
          absolute inset-0 w-full h-full appearance-none bg-transparent cursor-pointer
          [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3
          [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white
          [&::-webkit-slider-thumb]:shadow-[0_0_0_1px_rgba(0,0,0,0.08),0_1px_3px_rgba(0,0,0,0.2)]
          [&::-webkit-slider-thumb]:relative [&::-webkit-slider-thumb]:z-10
        "
      />
    </div>
  )
}

function NumInput({
  label,
  value,
  onChange,
  prefix,
  suffix,
  tip,
  placeholder,
  min = 0,
  max,
  step,
  sliderMax,
  sliderStep,
  logScale,
}: {
  label: string
  value: number
  onChange: (v: number) => void
  prefix?: string
  suffix?: string
  tip?: string
  placeholder?: string
  min?: number
  max?: number
  step?: number
  sliderMax?: number
  sliderStep?: number
  logScale?: boolean
}) {
  const resolvedSliderMax = sliderMax ?? max ?? Math.max(value * 3, 100)
  const resolvedSliderStep =
    sliderStep ?? step ?? (resolvedSliderMax > 200 ? Math.round(resolvedSliderMax / 100) : 1)

  // Log scale: slider position 0–1000 maps to 1–sliderMax on a log curve
  const LOG_STEPS = 1000
  const logMin = Math.log10(1)
  const logMax = Math.log10(resolvedSliderMax)

  const valueToSlider = (v: number): number => {
    if (!logScale) return v
    if (v <= 0) return 0
    return Math.round(
      ((Math.log10(Math.max(v, 1)) - logMin) / (logMax - logMin)) * LOG_STEPS
    )
  }

  const sliderToValue = (s: number): number => {
    if (!logScale) return s
    if (s <= 0) return 0
    const raw = Math.pow(10, logMin + (s / LOG_STEPS) * (logMax - logMin))
    // Round to nice numbers
    if (raw >= 1_000_000) return Math.round(raw / 100_000) * 100_000
    if (raw >= 100_000) return Math.round(raw / 10_000) * 10_000
    if (raw >= 10_000) return Math.round(raw / 1_000) * 1_000
    if (raw >= 1_000) return Math.round(raw / 100) * 100
    if (raw >= 100) return Math.round(raw / 10) * 10
    return Math.round(raw)
  }

  return (
    <div className="space-y-1.5">
      <label className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground uppercase tracking-wide">
        {label}
        {tip && <InfoTip text={tip} />}
      </label>
      <div className="relative flex items-center">
        {prefix && (
          <span className="absolute left-3 text-sm text-muted-foreground pointer-events-none select-none">
            {prefix}
          </span>
        )}
        <input
          type="number"
          value={value || ""}
          onChange={(e) => onChange(Number(e.target.value))}
          placeholder={placeholder ?? "0"}
          min={min}
          max={max}
          step={step ?? 1}
          className={`
            h-8 w-full rounded-md border border-input bg-transparent text-sm
            transition-colors outline-none
            focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50
            dark:bg-input/30
            ${prefix ? "pl-7" : "pl-3"}
            ${suffix ? "pr-8" : "pr-3"}
            [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none
          `}
        />
        {suffix && (
          <span className="absolute right-3 text-sm text-muted-foreground pointer-events-none select-none">
            {suffix}
          </span>
        )}
      </div>
      <FilledSlider
        min={logScale ? 0 : min}
        max={logScale ? LOG_STEPS : resolvedSliderMax}
        step={logScale ? 1 : resolvedSliderStep}
        value={valueToSlider(value)}
        onChange={(s) => onChange(sliderToValue(s))}
      />
    </div>
  )
}

function Metric({
  label,
  value,
  color = "teal",
  tip,
}: {
  label: string
  value: string
  color?: "teal" | "warning" | "neutral"
  tip?: string
}) {
  const colorClass =
    color === "teal"
      ? "text-sv-teal-400"
      : color === "warning"
        ? "text-warning"
        : "text-foreground"

  return (
    <div>
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide flex items-center gap-1.5 mb-1">
        {label}
        {tip && <InfoTip text={tip} />}
      </p>
      <p
        className={`text-2xl md:text-3xl font-black tabular-nums tracking-tight ${colorClass}`}
      >
        {value}
      </p>
    </div>
  )
}

function ResultDivider() {
  return (
    <div className="flex items-center gap-3 py-1">
      <div className="h-px flex-1 bg-border/60" />
      <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
        Results
      </span>
      <div className="h-px flex-1 bg-border/60" />
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Main calculator                                                    */
/* ------------------------------------------------------------------ */

export function FiveWaysCalculator() {
  const [arpa, setArpa] = useState(10_000)
  const [customers, setCustomers] = useState(1_000)

  const arr = arpa * customers
  const progress = getProgressTo100M(arr)
  const closest = useMemo(
    () => (arpa > 0 && customers > 0 ? getClosestAnimal(arpa, customers) : null),
    [arpa, customers]
  )
  const customersNeeded = arpa > 0 ? Math.ceil(100_000_000 / arpa) : 0
  const arpaNeeded = customers > 0 ? Math.ceil(100_000_000 / customers) : 0
  const hasInput = arpa > 0 && customers > 0

  return (
    <TooltipProvider>
      <div className="rounded-md border border-border/50 bg-card/30 p-6 md:p-8 glow-border">
        <div className="grid md:grid-cols-[1fr_1px_1fr] gap-8">
          {/* Inputs */}
          <div className="space-y-5">
            <NumInput
              label="ARPA (Annual Revenue Per Account)"
              value={arpa}
              onChange={setArpa}
              prefix="$"
              tip="Average annual revenue generated per customer account"
              min={0}
              sliderMax={100_000_000}
              sliderStep={10_000}
              logScale
            />
            <NumInput
              label="Number of Customers"
              value={customers}
              onChange={setCustomers}
              tip="Total number of paying customer accounts"
              min={0}
              sliderMax={100_000_000}
              sliderStep={1_000}
              logScale
            />

            {/* Inline metrics below sliders — always rendered to prevent layout jump */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="min-h-[2.5rem]">
                {hasInput && arr < 100_000_000 && (
                  <>
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-0.5">
                      Customers needed
                    </p>
                    <p className="text-sm font-bold tabular-nums text-foreground">
                      {fmtNum(customersNeeded)}
                    </p>
                  </>
                )}
              </div>
              <div className="min-h-[2.5rem]">
                {hasInput && arr < 100_000_000 && (
                  <>
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-0.5">
                      ARPA needed
                    </p>
                    <p className="text-sm font-bold tabular-nums text-foreground">
                      {fmtDollar(arpaNeeded)}
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="hidden md:block w-px bg-border/60" />

          {/* Results */}
          <div className="space-y-6">
            <ResultDivider />

            <Metric
              label="Annual Recurring Revenue"
              value={fmtDollar(arr)}
              color={arr >= 100_000_000 ? "teal" : "neutral"}
            />

            {/* Progress bar */}
            {hasInput && (
              <div>
                <div className="flex justify-between text-xs font-mono text-muted-foreground mb-1.5">
                  <span>$10K</span>
                  <span className="text-foreground font-medium">
                    {arr >= 100_000_000
                      ? "You made it!"
                      : `${progress.toFixed(0)}% to $100M`}
                  </span>
                  <span>$100M</span>
                </div>
                <div className="h-1.5 rounded-full bg-border/40 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500 ease-out"
                    style={{
                      width: `${progress}%`,
                      background: "linear-gradient(90deg, oklch(0.80 0.08 195 / 0.5), oklch(0.85 0.10 195))",
                    }}
                  />
                </div>
              </div>
            )}

            {/* Archetype */}
            {hasInput && closest && (
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3">
                  Your archetype
                </p>
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{closest.emoji}</span>
                  <div>
                    <p className="text-xl font-black tracking-tight text-sv-teal-400">
                      {closest.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {closest.description}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 5 archetypes reference */}
      <div className="mt-8">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-4">
          The 5 Archetypes
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {ANIMALS.map((animal) => (
            <button
              key={animal.name}
              type="button"
              onClick={() => {
                setArpa(animal.arpa)
                setCustomers(animal.customers)
              }}
              className={`rounded-md border p-4 text-left transition-all cursor-pointer hover:border-sv-teal-500/50 ${
                closest?.name === animal.name
                  ? "border-sv-teal-500 bg-sv-teal-500/5 glow-border"
                  : "border-border/50 bg-card/30"
              }`}
            >
              <span className="text-2xl block mb-2">{animal.emoji}</span>
              <p className="text-sm font-bold">{animal.name}</p>
              <p className="text-xs font-mono text-muted-foreground mt-1">
                {fmtNum(animal.customers)} customers
              </p>
              <p className="text-xs font-mono text-muted-foreground">
                {fmtDollar(animal.arpa)}/yr
              </p>
            </button>
          ))}
        </div>
      </div>
    </TooltipProvider>
  )
}
