import { blogPosts } from '@/data/blogPosts';

export default function sitemap() {
    const baseUrl = 'https://mailburst.vercel.app';

    // Core pages
    const coreRoutes = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: `${baseUrl}/blog`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
    ];

    // Dynamic blog post pages
    const blogRoutes = blogPosts.map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(post.date), // Ensure date parses correctly or use current date for now
        changeFrequency: 'monthly',
        priority: 0.6,
    }));

    return [...coreRoutes, ...blogRoutes];
}
