import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { FiveWaysCalculator } from "./calculator"

export const metadata: Metadata = {
  title: "5 ways to build a $100M SaaS — free ARR calculator | Mere Analytics",
  description:
    "Calculate your ARR from ARPA and customer count. See which $100M SaaS archetype you match — flies, mice, rabbits, deer, or elephants.",
  alternates: { canonical: "/5-ways-to-build-saas" },
}

export default function FiveWaysPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main className="max-w-5xl mx-auto px-6 py-16 md:py-24">
        <div className="max-w-2xl mb-12">
          <p className="text-xs font-mono uppercase tracking-widest text-sv-teal-500 mb-3">
            Free SaaS tool
          </p>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">
            5 ways to build a $100M SaaS
          </h1>
          <p className="text-muted-foreground text-[15px] leading-relaxed">
            Plug in your ARPA and customer count to see your ARR, which
            growth archetype you match, and what it takes to hit $100M.
            Based on{" "}
            <a href="https://medium.com/point-nine-news/five-ways-to-build-a-100-million-business-82ac6ea8ffd9" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-foreground transition-colors">Christoph Janz&apos;s framework</a>{" "}
            from Point Nine Capital.
          </p>
          <p className="text-muted-foreground/60 text-xs mt-2">
            Built by <a href="/" className="underline underline-offset-2 hover:text-foreground transition-colors">Mere Analytics</a> — analytics that detect churn signals before customers leave.
          </p>
        </div>

        <FiveWaysCalculator />

        {/* CTA */}
        <div className="mt-12 border border-border/40 bg-card/30 p-8 text-center">
          <p className="text-lg font-semibold mb-2">
            Stop modeling growth. Start protecting it.
          </p>
          <p className="text-sm text-muted-foreground mb-5 max-w-md mx-auto">
            Mere Analytics detects disengagement patterns in real-time — rage clicks,
            feature drop-off, silent users — so you can act before accounts churn.
          </p>
          <div className="inline-flex">
            <div className="cta-pulse relative bg-[url('/gradient-bg.png')] bg-cover bg-center rounded-sm">
              <Button variant="primitive" size="lg" className="relative z-10 font-bold text-white text-base px-12" nativeButton={false} render={<a href="https://app.usemere.com/register?plan=free&utm_source=website&utm_medium=5_ways_saas_cta&utm_campaign=try_for_free" />}>
                Get started
              </Button>
              <div className="cta-pulse__wave cta-pulse__wave--1" />
              <div className="cta-pulse__wave cta-pulse__wave--2" />
              <div className="cta-pulse__wave cta-pulse__wave--3" />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
