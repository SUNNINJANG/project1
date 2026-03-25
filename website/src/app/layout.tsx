import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NUVA | Global Wellness Trends",
  description:
    "AI 기반 맞춤형 웰니스 플랫폼 — 매일 업데이트되는 글로벌 웰니스 트렌드와 영양 인사이트",
};

function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-xl font-bold tracking-tight">
          <span className="gradient-text">NUVA</span>
        </Link>
        <div className="flex items-center gap-8 text-sm font-medium text-muted">
          <Link href="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <Link href="/trends" className="hover:text-foreground transition-colors">
            Trends
          </Link>
          <Link href="/about" className="hover:text-foreground transition-colors">
            About
          </Link>
        </div>
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-card-bg">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          <div>
            <p className="text-xl font-bold gradient-text">NUVA</p>
            <p className="mt-2 text-sm text-muted max-w-xs">
              AI 기반 맞춤형 웰니스 플랫폼. 당신의 건강에 꼭 맞는 영양을 추천합니다.
            </p>
          </div>
          <div className="flex gap-12 text-sm text-muted">
            <div className="flex flex-col gap-2">
              <p className="font-semibold text-foreground">서비스</p>
              <Link href="/trends" className="hover:text-foreground transition-colors">
                웰니스 트렌드
              </Link>
              <Link href="/about" className="hover:text-foreground transition-colors">
                소개
              </Link>
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-semibold text-foreground">소셜</p>
              <span className="hover:text-foreground transition-colors cursor-pointer">
                Instagram
              </span>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-border pt-6 text-center text-xs text-muted">
          &copy; {new Date().getFullYear()} NUVA. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
