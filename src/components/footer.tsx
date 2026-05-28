export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative py-12 border-t border-border/30">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="/" className="wordmark-pulse">
              <span aria-label="Mere" style={{ fontFamily: "var(--font-pixel)" }} className="text-lg font-bold tracking-tight text-foreground select-none">
                Mere
              </span>
              <span aria-hidden="true" style={{ fontFamily: "var(--font-pixel)" }} className="wordmark-pulse__fill wordmark-pulse__fill--1 text-lg font-bold tracking-tight select-none">
                Mere
              </span>
              <span aria-hidden="true" style={{ fontFamily: "var(--font-pixel)" }} className="wordmark-pulse__fill wordmark-pulse__fill--2 text-lg font-bold tracking-tight select-none">
                Mere
              </span>
              <span aria-hidden="true" style={{ fontFamily: "var(--font-pixel)" }} className="wordmark-pulse__fill wordmark-pulse__fill--3 text-lg font-bold tracking-tight select-none">
                Mere
              </span>
            </a>
            <a href="/privacy" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="/terms" className="hover:text-foreground transition-colors">Terms</a>
            <a href="/docs" className="hover:text-foreground transition-colors">Docs</a>
          </div>

          <div className="flex items-center gap-4 text-muted-foreground">
            <span className="text-sm">© {currentYear} Mere Analytics</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
