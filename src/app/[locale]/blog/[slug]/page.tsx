import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';

import { BlogPost } from '@/components/blog/blog-post';
import { SUPPORTED_LOCALES } from '@/constants/config';
import { getPostBySlug, getAllPosts } from '@/lib/blog';
import type { PageProps } from '@/types/common';

type PostPageProps = PageProps & {
  params: Promise<{
    slug: string;
  }>;
};

const formatPageTitle = (title: string) => `${title} | Tim Lee`;

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = await getPostBySlug(slug, locale);

  if (!post) {
    return {};
  }

  const ogImageUrl = `/api/og?type=blog&title=${encodeURIComponent(post.title)}&date=${encodeURIComponent(post.date)}${post.excerpt ? `&excerpt=${encodeURIComponent(post.excerpt)}` : ''}`;

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
    title: formatPageTitle(post.title),
    description: post.excerpt,
    authors: [{ name: 'Tim Lee', url: 'https://timlee.now' }],
    openGraph: {
      title: formatPageTitle(post.title),
      description: post.excerpt,
      type: 'article',
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      siteName: 'Tim Lee',
      url: `/${locale}/blog/${post.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: formatPageTitle(post.title),
      description: post.excerpt,
      images: [ogImageUrl],
    },
  };
}

export async function generateStaticParams() {
  const allPosts = await Promise.all(
    SUPPORTED_LOCALES.map(async locale => {
      const posts = await getAllPosts(locale);
      return posts.map(post => ({
        locale,
        slug: post.slug,
      }));
    })
  );

  return allPosts.flat();
}

export default async function BlogPostPage({ params }: PostPageProps) {
  const { locale, slug } = await params;

  // Enable static rendering
  setRequestLocale(locale);

  const post = await getPostBySlug(slug, locale);

  if (!post) {
    notFound();
  }

  return <BlogPost post={post} />;
}
