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

    const text = `# BestPicks - Expertly Curated Product Reviews & Buying Guides

Welcome to BestPicks, an expert-backed affiliate showcase platform reviewing the best electronics, fashion, home essentials, and lifestyle products. We research, compare, and provide direct product deals from Amazon, Flipkart, and Meesho.

## Primary Pages
- [Home Page](${baseUrl}/)
- [Buying Guides & Blogs](${baseUrl}/blogs)
- [All Categories](${baseUrl}/categories)

## Product Categories
${categories.map(c => `- [${c.name}](${baseUrl}/category/${c.slug}): ${c.description || 'Top curated picks'}`).join('\n')}

## Featured Buying Guides
${blogs.slice(0, 5).map(b => `- [${b.title}](${baseUrl}/blog/${b.slug}) - ${b.excerpt}`).join('\n')}

## Curated Products
${products.slice(0, 10).map(p => `- [${p.title}](${baseUrl}/product/${p.slug}) - Price: ₹${p.price?.toLocaleString() || 'N/A'} (Brand: ${p.brand || 'N/A'})`).join('\n')}

---
For an exhaustive, full-text catalog containing descriptions, all products, all guides, and affiliate links for AI crawlers, visit [Full LLM Catalog Output](${baseUrl}/llms-full.txt).
`;

    return new Response(text, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=59',
      },
    });
  } catch (error: any) {
    return new Response(`Error generating llms.txt: ${error.message}`, { status: 500 });
  }
}
