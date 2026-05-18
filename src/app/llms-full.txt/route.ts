import { getAllProducts } from '@/services/productService';
import { getAllCategories } from '@/services/categoryService';
import { getAllBlogs } from '@/services/blogService';

export const dynamic = 'force-dynamic';

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  
  try {
    const [products, categories, blogs] = await Promise.all([
      getAllProducts(),
      getAllCategories(),
      getAllBlogs(),
    ]);

    let text = `# BestPicks - Full Dynamic Catalog (SEO & AI Agent Crawler Optimized)

This document contains the complete database of product reviews, marketplace buy links, categories, and shopping guides hosted on BestPicks.

---

## 1. COMPREHENSIVE PRODUCT CATALOG

`;

    products.forEach((p: any) => {
      text += `### ${p.title}
- **Slug / Route**: \`/product/${p.slug}\`
- **URL**: ${baseUrl}/product/${p.slug}
- **Brand**: ${p.brand || 'N/A'}
- **Category**: ${p.category?.name || 'N/A'}
- **Price**: ₹${p.price?.toLocaleString() || 'N/A'}
- **Rating**: ${p.rating || 'N/A'}/5
- **Affiliate Stores**: ${p.externalLinks.map((l: any) => `${l.store} (${l.url})`).join(', ')}
- **Description**: ${p.description}
- **Tags**: ${p.tags?.join(', ') || 'N/A'}

`;
    });

    text += `\n---\n\n## 2. COMPLETE BUYING GUIDES & ARTICLES\n\n`;

    blogs.forEach((b: any) => {
      // Basic HTML stripping helper
      const cleanContent = b.content ? b.content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim() : '';
      text += `### ${b.title}
- **Slug / Route**: \`/blog/${b.slug}\`
- **URL**: ${baseUrl}/blog/${b.slug}
- **Excerpt**: ${b.excerpt}
- **Publish Date**: ${new Date(b.createdAt).toLocaleDateString()}
- **Featured Image**: ${b.featuredImage || 'N/A'}
- **Content Outline**:
${cleanContent.substring(0, 1500)}...

`;
    });

    return new Response(text, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=59',
      },
    });
  } catch (error: any) {
    return new Response(`Error generating llms-full.txt: ${error.message}`, { status: 500 });
  }
}
