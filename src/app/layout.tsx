import { SanityLive } from '@/sanity/live';
import { VisualEditing } from 'next-sanity/visual-editing';
import { draftMode } from 'next/headers';
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from '@/components/theme-provider';
import { AuthProvider } from '@/context/auth';
import { CartProvider } from '@/context/cart';
import { LanguageProvider } from '@/context/language';

const velocitySans = localFont({
  src: '../fonts/Velocity-Sans.otf',
  variable: '--font-velocity-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Watlys | Premium Mineral Water Bottle",
  description: "Experience the cleanest, most refreshing mineral water in a beautifully crafted container.",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const isDraftMode = (await draftMode()).isEnabled;

  return (
    <html
      lang="en"
      className={`${velocitySans.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <link rel="preload" href="/patterns/pattern-01.svg" as="image" />
        <link rel="preload" href="/patterns/pattern-02.svg" as="image" />
        <link rel="preload" href="/patterns/pattern-03.svg" as="image" />
        <link rel="preload" href="/patterns/pattern-04.svg" as="image" />
        <link rel="preload" href="/patterns/pattern-05.svg" as="image" />
        <link rel="preload" href="/patterns/pattern-06.svg" as="image" />
      </head>
      <body
        className="min-h-full flex flex-col bg-[#FAF9F6] dark:bg-[#0a1128] text-slate-900 dark:text-[#FAFAFA] font-sans transition-colors duration-300"
        suppressHydrationWarning
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <LanguageProvider>
            <AuthProvider>
              <CartProvider>
                {children}
                <SanityLive />
                {isDraftMode && <VisualEditing />}
              </CartProvider>
            </AuthProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
