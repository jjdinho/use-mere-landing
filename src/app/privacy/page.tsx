import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Privacy Policy | Mere Analytics",
  description: "How Mere Analytics collects, processes, and protects data from your website visitors.",
  alternates: { canonical: "https://usemere.com/privacy" },
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
          Privacy Policy
        </h1>
        <p className="text-sm text-muted-foreground mb-12">
          Last updated: March 2, 2026
        </p>

        <div className="space-y-10 text-[15px] leading-relaxed text-muted-foreground">
          {/* Scope */}
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">What this policy covers</h2>
            <p>
              This policy explains what data{" "}
              <span className="font-mono text-foreground">Mere Analytics</span> collects
              when our tracking script runs on your website, how we handle that data, and
              the choices available to you and your visitors. It applies to the{" "}
              <span className="font-mono text-foreground">Mere Analytics</span> platform,
              SDK, and any associated services.
            </p>
          </section>

          {/* Automatic collection */}
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">Information we collect automatically</h2>
            <p className="mb-3">
              When a visitor loads a page with the{" "}
              <span className="font-mono text-foreground">Mere Analytics</span> script, we automatically
              collect:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Browser name and version</li>
              <li>Device type (desktop, tablet, mobile)</li>
              <li>Operating system</li>
              <li>Page URLs and referrer URLs</li>
              <li>Click targets and scroll depth</li>
              <li>Form field metadata (which fields exist, focus/blur timing) — <strong className="text-foreground">not</strong> the values typed into them</li>
              <li>Screen resolution and viewport size</li>
              <li>Approximate geolocation derived from IP address (country/region level)</li>
            </ul>
          </section>

          {/* Masking and redaction */}
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">Masking and redaction</h2>
            <p className="mb-3">
              <span className="font-mono text-foreground">Mere Analytics</span> is events-only — it captures structured events (page views,
              clicks, form interactions, and custom events) and does not record session
              replays or video. To protect visitor privacy:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Form field values are never captured — only metadata such as field names, types, and whether a field was filled.</li>
              <li>Text captured from click targets is automatically scanned for patterns that look like email addresses, phone numbers, credit card numbers, and social security numbers, which are masked before the event is sent.</li>
              <li>You can mask any element&apos;s text by adding the <code className="text-xs bg-muted px-1.5 py-0.5 rounded font-mono">data-mere-mask</code> attribute.</li>
              <li>You can exclude an element and everything inside it from capture with <code className="text-xs bg-muted px-1.5 py-0.5 rounded font-mono">data-mere-ignore</code>.</li>
            </ul>
          </section>

          {/* What we do NOT collect */}
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">What we do not collect</h2>
            <p>
              <span className="font-mono text-foreground">Mere Analytics</span> does not capture the actual values visitors enter into forms —
              including passwords, search queries, credit card details, or any other input
              content. We also do not read or write browser cookies. We do not intercept
              network requests made by your site.
            </p>
          </section>

          {/* Identification */}
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">Identification</h2>
            <p>
              By default, each visitor is assigned a random anonymous UUID. This identifier
              is stored in the visitor&apos;s browser via <code className="text-xs bg-muted px-1.5 py-0.5 rounded font-mono">localStorage</code> and
              contains no personal information. If you choose to call the{" "}
              <code className="text-xs bg-muted px-1.5 py-0.5 rounded font-mono">mere.identify()</code> method
              in your code, you can attach your own user ID or traits to that visitor. Any
              personally identifiable information sent through <code className="text-xs bg-muted px-1.5 py-0.5 rounded font-mono">identify()</code> is
              your responsibility to disclose in your own privacy policy.
            </p>
          </section>

          {/* Local storage */}
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">Local storage</h2>
            <p className="mb-3">
              <span className="font-mono text-foreground">Mere Analytics</span> uses browser storage (<code className="text-xs bg-muted px-1.5 py-0.5 rounded font-mono">localStorage</code> and <code className="text-xs bg-muted px-1.5 py-0.5 rounded font-mono">sessionStorage</code>), not cookies,
              to persist a small amount of data in the visitor&apos;s browser. The keys we set are:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li><code className="text-xs bg-muted px-1.5 py-0.5 rounded font-mono">mere_anonymous_id</code> — anonymous visitor identifier</li>
              <li><code className="text-xs bg-muted px-1.5 py-0.5 rounded font-mono">mere_session</code> — current session identifier (stored in <code className="text-xs bg-muted px-1.5 py-0.5 rounded font-mono">sessionStorage</code>)</li>
              <li><code className="text-xs bg-muted px-1.5 py-0.5 rounded font-mono">mere_registered</code> / <code className="text-xs bg-muted px-1.5 py-0.5 rounded font-mono">mere_registered_once</code> — properties set via <code className="text-xs bg-muted px-1.5 py-0.5 rounded font-mono">register()</code> / <code className="text-xs bg-muted px-1.5 py-0.5 rounded font-mono">registerOnce()</code></li>
              <li><code className="text-xs bg-muted px-1.5 py-0.5 rounded font-mono">mere_opt_out</code> — set only if the visitor opts out of tracking</li>
            </ul>
            <p className="mt-3">
              No third-party cookies are set. Because we rely only on browser storage, the <span className="font-mono text-foreground">Mere Analytics</span> script is not affected by cookie-consent requirements in most
              jurisdictions, though you should consult your own legal counsel.
            </p>
          </section>

          {/* Connected services */}
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">Connected services</h2>
            <p>
              You may optionally connect <span className="font-mono text-foreground">Mere Analytics</span> to external services such as Slack,
              email, Linear, or GitHub. These integrations are activated only when you
              explicitly configure them and are used to deliver alerts, summaries, or issue
              creation on your behalf. <span className="font-mono text-foreground">Mere Analytics</span> sends only the data you configure in
              each integration (e.g., a session summary to a Slack channel) and does not
              grant these services access to your raw analytics data.
            </p>
          </section>

          {/* Choices */}
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">Your choices</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <strong className="text-foreground">Opt-out:</strong> You can call{" "}
                <code className="text-xs bg-muted px-1.5 py-0.5 rounded font-mono">mere.optOut()</code> at
                any time to stop tracking for a specific visitor. This sets a localStorage
                flag and all subsequent calls become no-ops.
              </li>
              <li>
                <strong className="text-foreground">Disable autocapture:</strong> Pass{" "}
                <code className="text-xs bg-muted px-1.5 py-0.5 rounded font-mono">{`{ autocapture: false }`}</code> in
                your <code className="text-xs bg-muted px-1.5 py-0.5 rounded font-mono">init()</code> options to turn
                off automatic click and form tracking entirely.
              </li>
              <li>
                <strong className="text-foreground">Masking:</strong> Add the{" "}
                <code className="text-xs bg-muted px-1.5 py-0.5 rounded font-mono">data-mere-mask</code> attribute
                to mask an element&apos;s text, or{" "}
                <code className="text-xs bg-muted px-1.5 py-0.5 rounded font-mono">data-mere-ignore</code> to
                exclude an element from capture entirely.
              </li>
            </ul>
          </section>

          {/* Data retention */}
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">Data retention</h2>
            <p>
              We retain the event data you collect for up to 2 years, after which it is
              automatically deleted from our systems. You can delete a project at any time,
              which immediately and permanently removes its data. If you close your account,
              we delete your project data within 30 days.
            </p>
          </section>

          {/* Updates */}
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">Updates to this policy</h2>
            <p>
              We may update this policy from time to time. If we make material changes, we
              will notify you through the <span className="font-mono text-foreground">Mere Analytics</span> dashboard or by email. The &ldquo;Last
              updated&rdquo; date at the top reflects the most recent revision.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">Contact</h2>
            <p>
              Questions about this policy? Reach us at{" "}
              <a
                href="mailto:hello@usemere.com"
                className="text-foreground underline underline-offset-4 hover:text-foreground/80 transition-colors"
              >
                hello@usemere.com
              </a>.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}
