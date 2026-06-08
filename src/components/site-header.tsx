"use client"

import Link from "next/link"
import { SearchForm } from "@/components/search-form"
import { buttonVariants } from "@/components/ui/button"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12 .5C5.37.5 0 5.78 0 12.29c0 5.21 3.44 9.63 8.21 11.19.6.11.82-.25.82-.56 0-.28-.01-1.02-.02-2-3.34.71-4.04-1.58-4.04-1.58-.55-1.36-1.34-1.73-1.34-1.73-1.09-.73.08-.72.08-.72 1.21.08 1.84 1.22 1.84 1.22 1.07 1.8 2.81 1.28 3.5.98.11-.76.42-1.28.76-1.57-2.67-.3-5.47-1.31-5.47-5.83 0-1.29.47-2.34 1.24-3.17-.12-.3-.54-1.52.12-3.16 0 0 1.01-.32 3.3 1.21a11.5 11.5 0 0 1 3-.4c1.02 0 2.05.13 3 .4 2.29-1.53 3.3-1.21 3.3-1.21.66 1.64.24 2.86.12 3.16.77.83 1.24 1.88 1.24 3.17 0 4.53-2.81 5.53-5.49 5.82.43.37.81 1.1.81 2.22 0 1.6-.01 2.89-.01 3.28 0 .31.21.68.83.56A12.01 12.01 0 0 0 24 12.29C24 5.78 18.63.5 12 .5z" />
    </svg>
  )
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 flex w-full items-center border-b bg-background">
      <div className="flex h-(--header-height) w-full items-center gap-2 px-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <Link href="/" className="wordmark-pulse shrink-0">
                <span aria-label="Mere Analytics" style={{ fontFamily: "var(--font-pixel)" }} className="text-lg font-bold tracking-tight text-foreground select-none">
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
              </Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Docs</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="flex items-center gap-4 ml-auto">
          <a
            href="https://github.com/jjdinho/use-mere-landing/tree/main/docs"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View docs on GitHub"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <GitHubIcon className="size-5" />
          </a>
          <SearchForm className="hidden sm:block w-auto" />
          <div className="hidden md:flex items-center gap-4 text-sm">
            <a href="https://app.usemere.com/login" className="text-muted-foreground hover:text-foreground transition-colors">Sign in</a>
            <a href="https://app.usemere.com/register" className={buttonVariants({ variant: "outline", className: "font-bold" })}>
              Get started
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
