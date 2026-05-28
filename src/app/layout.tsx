import type { Metadata } from "next"
import { Geist, Geist_Mono, Press_Start_2P } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

const pixel = Press_Start_2P({
  variable: "--font-pixel",
  subsets: ["latin"],
  weight: "400",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://usemere.com"),
  title: "Mere Analytics | Sometimes less is more",
  description: "Headless analytics that agents love. Collect events and query them. That's it.",
  alternates: {
    canonical: "https://usemere.com",
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon.png", type: "image/png" },
    ],
    apple: "/apple-icon.png",
  },
  openGraph: {
    title: "Mere Analytics | Sometimes less is more",
    description: "Headless analytics that agents love. Collect events and query them. That's it.",
    images: [
      {
        url: "/mere-og-image.png",
        width: 1200,
        height: 630,
        alt: "Mere Analytics — Sometimes less is more",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mere Analytics | Sometimes less is more",
    description: "Headless analytics that agents love. Collect events and query them. That's it.",
    images: [
      {
        url: "/mere-og-image.png",
        alt: "Mere Analytics — Sometimes less is more",
      },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geist.variable} ${geistMono.variable} ${pixel.variable} font-sans text-lg antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
