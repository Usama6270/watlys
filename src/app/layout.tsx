import { SanityLive } from '@/sanity/live';
import { VisualEditing } from 'next-sanity/visual-editing';
import { draftMode } from 'next/headers';
import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from '@/components/theme-provider';
import { AuthProvider } from '@/context/auth';
import { CartProvider } from '@/context/cart';
import { LanguageProvider } from '@/context/language';

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
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
      className={`${fraunces.variable} ${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <link rel="preload" href="/patterns/Patterns-01.png" as="image" />
        <link rel="preload" href="/patterns/Patterns-02.png" as="image" />
        <link rel="preload" href="/patterns/Patterns-03.png" as="image" />
        <link rel="preload" href="/patterns/Patterns-04.png" as="image" />
        <link rel="preload" href="/patterns/Patterns-05.png" as="image" />
        <link rel="preload" href="/patterns/Patterns-06.png" as="image" />
      </head>
      <body className="min-h-full flex flex-col bg-white dark:bg-[#0A0A0A] text-[#111111] dark:text-[#FAFAFA] font-sans transition-colors duration-400">
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
