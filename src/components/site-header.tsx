"use client"

import Link from "next/link"
import { SearchForm } from "@/components/search-form"
import { GitHubIcon } from "@/components/github-icon"
import { ThemeToggle } from "@/components/theme-toggle"
import { buttonVariants } from "@/components/ui/button"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

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
          <ThemeToggle />
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
