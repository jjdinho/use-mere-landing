import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Terms of Service | Mere Analytics",
  description: "Terms and conditions for using the Mere Analytics analytics platform.",
  alternates: { canonical: "https://usemere.com/terms" },
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
          Terms of Service
        </h1>
        <p className="text-sm text-muted-foreground mb-12">
          Last updated: March 2, 2026
        </p>

        <div className="space-y-10 text-[15px] leading-relaxed text-muted-foreground">
          {/* Agreement */}
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">Agreement to terms</h2>
            <p>
              By accessing or using{" "}
              <span className="font-mono text-foreground">Mere Analytics</span>, you agree
              to be bound by these terms. If you do not agree, do not use the service.
            </p>
          </section>

          {/* What Mere Analytics is */}
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">What <span className="font-mono">Mere Analytics</span> is</h2>
            <p>
              <span className="font-mono text-foreground">Mere Analytics</span> is a product analytics platform. You add a lightweight script to
              your website, and we collect usage data — page views, clicks, session
              recordings, and custom events — so you can understand how people interact with
              your product. We also provide AI-powered insights, alerting, and integrations
              with tools like Slack, email, Linear, and GitHub.
            </p>
          </section>

          {/* Your account */}
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">Your account</h2>
            <p>
              To use <span className="font-mono text-foreground">Mere Analytics</span> you need to create an account with a valid email address.
              You are responsible for keeping your login credentials secure. One person may
              not maintain multiple free-tier accounts. If we detect abuse or duplicate
              accounts, we may suspend them without notice.
            </p>
          </section>

          {/* Acceptable use */}
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">Acceptable use</h2>
            <p className="mb-3">You agree not to:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Use <span className="font-mono text-foreground">Mere Analytics</span> to track visitors without any form of disclosure on your site.</li>
              <li>Attempt to reverse-engineer, decompile, or extract the source code of the <span className="font-mono text-foreground">Mere Analytics</span> platform or SDK.</li>
              <li>Abuse the service in a way that degrades performance for other customers (e.g., flooding events programmatically).</li>
              <li>Use the platform for any activity that violates applicable law.</li>
            </ul>
            <p className="mt-3">
              You are solely responsible for the data you collect through <span className="font-mono text-foreground">Mere Analytics</span> and
              for ensuring your use complies with the laws that apply to you and your users.
            </p>
          </section>

          {/* Your data */}
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">Your data</h2>
            <p>
              The analytics data collected through your <span className="font-mono text-foreground">Mere Analytics</span> project belongs to you.
              We process it on your behalf to provide the service. We do not sell your data
              to third parties. We do not use your data to train machine-learning models
              outside of your account. If you delete your account, we delete your data — see
              the Termination section below.
            </p>
          </section>

          {/* Responsibility to your users */}
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">Your responsibility to your users</h2>
            <p>
              If you install <span className="font-mono text-foreground">Mere Analytics</span> on a website that has end users, you are
              responsible for disclosing your use of analytics in accordance with applicable
              privacy laws. We give you tools to help — automatic PII masking, an opt-out
              API, input blocking, and configurable data collection — but the obligation to
              inform your visitors is yours.
            </p>
          </section>

          {/* Pricing & payment */}
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">Pricing and payment</h2>
            <p>
              <span className="font-mono text-foreground">Mere Analytics</span> offers a free tier with usage limits and paid plans with
              additional capacity and features. Paid subscriptions are billed monthly or
              annually depending on the plan you choose. If we change our pricing, we will
              give you at least 30 days&apos; notice before the new price applies to your
              account.
            </p>
          </section>

          {/* Availability */}
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">Availability</h2>
            <p>
              We work to keep <span className="font-mono text-foreground">Mere Analytics</span> available around the clock, but we do not
              guarantee 100% uptime. The service may be temporarily unavailable for
              maintenance, upgrades, or circumstances beyond our control. We will make
              reasonable efforts to notify you of planned downtime in advance.
            </p>
          </section>

          {/* IP */}
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">Intellectual property</h2>
            <p>
              <span className="font-mono text-foreground">Mere Analytics</span> and its source code, design, and branding are owned by us. These
              terms do not grant you any rights to our trademarks or intellectual property
              beyond what is needed to use the service. Conversely, we claim no ownership
              over the data you collect or the content of your website.
            </p>
          </section>

          {/* Termination */}
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">Termination</h2>
            <p>
              You can close your account at any time from the dashboard settings. We may also
              suspend or terminate your account if you violate these terms. On termination,
              we will delete your project data within 30 days. Any prepaid fees for unused
              billing periods are non-refundable unless required by law.
            </p>
          </section>

          {/* Liability */}
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">Limitation of liability</h2>
            <p>
              To the maximum extent permitted by law, <span className="font-mono text-foreground">Mere Analytics</span>&apos;s total liability to
              you for any claim arising from your use of the service is limited to the amount
              you paid us in the 12 months before the claim arose, or $50, whichever is
              greater. We are not liable for indirect, incidental, or consequential damages
              such as lost profits, lost data, or business interruption.
            </p>
          </section>

          {/* Changes */}
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">Changes to these terms</h2>
            <p>
              We may revise these terms from time to time. If we make material changes, we
              will notify you through the <span className="font-mono text-foreground">Mere Analytics</span> dashboard or by email at least
              15 days before they take effect. Continued use of the service after that notice
              period constitutes acceptance of the updated terms.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">Contact</h2>
            <p>
              Questions about these terms? Reach us at{" "}
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
