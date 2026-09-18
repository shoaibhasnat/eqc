export default function robots() {
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://easyquranclass.com').replace(/\/$/, '');

  const allowAll = {
    allow: '/',
    disallow: '/api/',
  };

  return {
    rules: [
      { userAgent: '*', ...allowAll },
      { userAgent: 'Googlebot', ...allowAll },
      { userAgent: 'Googlebot-Image', ...allowAll },
      { userAgent: 'Googlebot-Video', ...allowAll },
      { userAgent: 'Bingbot', ...allowAll },
      { userAgent: 'DuckDuckBot', ...allowAll },
      { userAgent: 'Yandex', ...allowAll },
      { userAgent: 'GPTBot', ...allowAll },
      { userAgent: 'OAI-SearchBot', ...allowAll },
      { userAgent: 'ChatGPT-User', ...allowAll },
      { userAgent: 'ClaudeBot', ...allowAll },
      { userAgent: 'Claude-User', ...allowAll },
      { userAgent: 'Claude-SearchBot', ...allowAll },
      { userAgent: 'Anthropic-AI', ...allowAll },
      { userAgent: 'PerplexityBot', ...allowAll },
      { userAgent: 'Perplexity-User', ...allowAll },
      { userAgent: 'Google-Extended', ...allowAll },
      { userAgent: 'Google-CloudVertexBot', ...allowAll },
      { userAgent: 'GoogleOther', ...allowAll },
      { userAgent: 'Applebot', ...allowAll },
      { userAgent: 'Applebot-Extended', ...allowAll },
      { userAgent: 'Amazonbot', ...allowAll },
      { userAgent: 'Bytespider', ...allowAll },
      { userAgent: 'CCBot', ...allowAll },
      { userAgent: 'meta-externalagent', ...allowAll },
      { userAgent: 'FacebookBot', ...allowAll },
      { userAgent: 'LinkedInBot', ...allowAll },
      { userAgent: 'YouBot', ...allowAll },
      { userAgent: 'cohere-ai', ...allowAll },
      { userAgent: 'Diffbot', ...allowAll },
      { userAgent: 'MistralAI-User', ...allowAll },
      { userAgent: 'DuckAssistBot', ...allowAll },
      { userAgent: 'AI2Bot', ...allowAll },
      { userAgent: 'Google-InspectionTool', ...allowAll },
      { userAgent: 'Storebot-Google', ...allowAll },
      { userAgent: 'iaskspider', ...allowAll },
      { userAgent: 'PhindBot', ...allowAll },
      { userAgent: 'Timpibot', ...allowAll },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
