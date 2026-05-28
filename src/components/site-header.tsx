"use client"

import { SearchForm } from "@/components/search-form"
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
              <a href="/" className="shrink-0">
                <img src="/logo.png" alt="Mere Analytics" className="h-6" />
              </a>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Docs</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="flex items-center gap-4 ml-auto">
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
