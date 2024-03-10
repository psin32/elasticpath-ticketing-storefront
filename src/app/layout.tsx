import { config } from '@/constant/config'
import '../styles/globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import NextAuthSessionProvider from "./providers/sessionProviders";
import StoryblokProvider from "@/components/storyblok/StoryblokProvider";
import { CartProvider } from '@/lib/hooks/cart';

export const metadata: Metadata = {
  title: config.title,
  description: config.description,
  robots: { index: true, follow: true },
  icons: {
    icon: '/favicon/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <CartProvider>
      <StoryblokProvider>
        <html lang="en">
          <body>
            <NextAuthSessionProvider>{children}</NextAuthSessionProvider>
          </body>
        </html>
      </StoryblokProvider>
    </CartProvider>
  )
}
