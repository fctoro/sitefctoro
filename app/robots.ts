import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const aiBots = [
    'GPTBot',
    'ClaudeBot',
    'anthropic-ai',
    'PerplexityBot',
    'Google-Extended',
    'cohere-ai',
    'Meta-ExternalAgent',
  ];

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: '/api/',
      },
      ...aiBots.map((bot) => ({
        userAgent: bot,
        allow: '/',
      })),
    ],
    sitemap: [
      'https://fctoro.com/sitemap.xml',
      'https://fctoro.com/llms.txt',
    ],
    // Custom note for llms.txt
    host: 'https://fctoro.com',
  };
}
