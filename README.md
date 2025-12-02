# Tim Lee

A modern, internationalized portfolio and blog website built with Next.js 15 and React 19.

## Features

- 🌐 Internationalization support via next-intl
- 🎨 Dark/Light mode theming with next-themes
- 🎭 Smooth animations powered by Framer Motion
- 📱 Responsive design with Tailwind CSS
- 🧩 Modern UI components using Headless UI
- ⚡ Fast development with Turbopack
- 🖼️ Dynamic OG images for social sharing
- 📧 Integrated with [Buttondown](https://buttondown.email/) for newsletter management

## Getting Started

First, install the dependencies:

```bash
pnpm install
```

Then, run the development server:

```bash
pnpm dev
```

The development server uses Turbopack for faster builds and better development experience.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Tech Stack

- [Next.js 15](https://nextjs.org/) - React framework
- [React 19](https://react.dev/) - UI library
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [next-mdx-remote](https://github.com/hashicorp/next-mdx-remote) - MDX support
- [next-intl](https://next-intl-docs.vercel.app/) - Internationalization
- [next-themes](https://github.com/pacocoursey/next-themes) - Theme management
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Headless UI](https://headlessui.com/) - Unstyled UI components
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Heroicons](https://heroicons.com/) - Beautiful hand-crafted SVG icons
- [Lucide Icons](https://lucide.dev/) - Beautiful & consistent icons
- [@vercel/og](https://vercel.com/docs/functions/edge-functions/og-image-generation) - Dynamic OG image generation
- [Buttondown](https://buttondown.email/) - Newsletter service
- [Vercel](https://vercel.com/) - Hosting

## Social Sharing

The website includes dynamic Open Graph (OG) image generation for better social media sharing. When your site is shared on platforms like Twitter, LinkedIn, or Facebook, it will display a beautiful preview image with:

- Your profile picture
- The page title
- Your role description
- A beautiful gradient background with decorative blobs

The OG images are generated on-demand using the `@vercel/og` library and Edge Functions. You can test how your pages will look when shared by visiting:

```
https://your-domain.com/api/og?title=Your+Page+Title
```

## Environment Variables

To enable GitHub integration for the projects section:

1. Create a `.env.local` file in the root directory
2. Add the following variables:

```bash
# Required: The base URL of your application
# Used for server-side API calls
# In production, this should be your deployed URL (e.g., https://example.com)
# For local development, use http://localhost:3000
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Required: Buttondown API key for newsletter subscription
BUTTONDOWN_API_KEY=your_api_key

# Optional: GitHub personal access token (Classic)
# Increases API rate limit from 60 to 5000 requests per hour
# Generate at: https://github.com/settings/tokens/new
# No additional scopes needed for public repositories
GITHUB_TOKEN=your_github_token
```

To get a GitHub personal access token:

1. Go to [GitHub Settings > Developer settings > Personal access tokens (Classic)](https://github.com/settings/tokens/new)
2. Generate a new token (no additional scopes needed for public repositories)
3. Copy the token and add it to your `.env.local` file

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
