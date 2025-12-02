import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { ThemeProvider } from 'next-themes';

import { Footer } from '@/components/layout/footer';
import { Navigation } from '@/components/layout/navigation';
import { BackgroundGradient } from '@/components/ui/background-gradient';
import { SUPPORTED_LOCALES } from '@/constants/config';
import { isValidLocale } from '@/i18n/utils';
import type { PageProps } from '@/types/common';

import '@/styles/globals.css';

/**
 * Next.js Revalidation Configuration
 * ---------------------------------
 * revalidate = 31536000 means:
 * 1. Pages are cached for 1 year (31536000 seconds)
 * 2. When a new request comes after the cache period:
 *    - The cached (stale) version is served first
 *    - Next.js triggers a regeneration in the background
 *    - Future requests will receive the new version
 * 3. Revalidation only occurs when there's a new visitor after the cache period
 *
 * Important notes:
 * - This is a root layout setting, affecting all pages under this layout
 * - Cache is automatically reset on new deployments, so long cache is safe
 * - Individual pages can override this with their own revalidate value
 * - Individual fetch requests can set a lower revalidate time to increase
 *   revalidation frequency for specific data within a route
 * - Static pages will be served from the edge cache for better performance
 * - Setting a long cache maximizes edge performance for static content
 */
export const revalidate = 31536000; // Cache for 1 year

const inter = Inter({ subsets: ['latin'] });

type LocaleLayoutProps = PageProps & {
  children: React.ReactNode;
};

export async function generateMetadata({ params }: LocaleLayoutProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });
  const homeT = await getTranslations({ locale, namespace: 'HomePage' });

  const title = t('title');
  const description = t('description');
  const subtitle = homeT('subtitle');
  const ogImageUrl = `/api/og?title=Tim%20Lee&subtitle=${encodeURIComponent(subtitle)}`;

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
    title,
    description,
    authors: [{ name: 'Tim Lee', url: 'https://timlee.now' }],
    openGraph: {
      title,
      description,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
        },
      ],
      siteName: 'Tim Lee',
      url: `/${locale}`,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImageUrl],
    },
  };
}

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map(locale => ({ locale }));
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!isValidLocale(locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning className={inter.className}>
      <body className="bg-white text-gray-900 dark:bg-gray-900 dark:text-white transition-colors duration-300">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <NextIntlClientProvider messages={messages}>
            <Navigation />
            <main className="min-h-screen">{children}</main>
            <Footer />
            <BackgroundGradient />
          </NextIntlClientProvider>
        </ThemeProvider>

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
