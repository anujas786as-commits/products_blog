import mongoose from 'mongoose';
import dbConnect from '../lib/mongodb';
import Category from '../models/Category';
import Product from '../models/Product';
import Blog from '../models/Blog';

const SEED_DATA = {
  categories: [
    { name: 'Electronics', slug: 'electronics', description: 'Latest gadgets and tech.' },
    { name: 'Home & Kitchen', slug: 'home-kitchen', description: 'Everything for your home.' },
    { name: 'Fashion', slug: 'fashion', description: 'Trendy clothes and accessories.' },
    { name: 'Beauty', slug: 'beauty', description: 'Skincare and makeup essentials.' },
    { name: 'Fitness', slug: 'fitness', description: 'Gear for your workouts.' },
    { name: 'Books', slug: 'books', description: 'Must-read titles and bestsellers.' },
  ],
  products: [
    {
      title: 'Wireless Noise Cancelling Headphones',
      slug: 'wireless-noise-cancelling-headphones',
      description: 'Experience premium sound quality with these wireless noise cancelling headphones. Perfect for travel and office work.',
      images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000'],
      category: 'electronics',
      tags: ['headphones', 'electronics', 'audio'],
      brand: 'AudioMax',
      price: 14999,
      rating: 4.8,
      externalLinks: [
        { store: 'Amazon', url: 'https://amazon.in', isAffiliate: true },
        { store: 'Flipkart', url: 'https://flipkart.com', isAffiliate: true }
      ],
      featured: true,
      trending: true,
    },
    {
      title: 'Smart Coffee Maker with App Control',
      slug: 'smart-coffee-maker',
      description: 'Brew your perfect cup of coffee from your smartphone. Includes scheduled brewing and strength settings.',
      images: ['https://images.unsplash.com/photo-1520970014086-2208d157c9e2?q=80&w=1000'],
      category: 'home-kitchen',
      tags: ['coffee', 'kitchen', 'smart-home'],
      brand: 'BrewSmart',
      price: 8999,
      rating: 4.5,
      externalLinks: [
        { store: 'Amazon', url: 'https://amazon.in', isAffiliate: true }
      ],
      featured: true,
      trending: false,
    },
    {
      title: 'Ergonomic Standing Desk',
      slug: 'ergonomic-standing-desk',
      description: 'Height-adjustable standing desk for a healthier workspace. Durable steel frame and smooth motor.',
      images: ['https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?q=80&w=1000'],
      category: 'home-kitchen',
      tags: ['desk', 'office', 'furniture'],
      brand: 'WorkWell',
      price: 24999,
      rating: 4.9,
      externalLinks: [
        { store: 'Meesho', url: 'https://meesho.com', isAffiliate: true }
      ],
      featured: false,
      trending: true,
    }
  ],
  blogs: [
    {
      title: 'Top 5 Tech Gadgets for 2026',
      slug: 'top-tech-gadgets-2026',
      excerpt: 'Discover the most innovative gadgets that are changing the way we live and work this year.',
      content: 'Full content about tech gadgets...',
      featuredImage: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1000',
    },
    {
      title: 'Ultimate Kitchen Essentials Guide',
      slug: 'kitchen-essentials-guide',
      excerpt: 'Upgrade your cooking game with these must-have tools for every modern kitchen.',
      content: 'Full content about kitchen essentials...',
      featuredImage: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=1000',
    }
  ]
};

async function seed() {
  await dbConnect();
  
  console.log('Clearing existing data...');
  await Category.deleteMany({});
  await Product.deleteMany({});
  await Blog.deleteMany({});

  console.log('Seeding categories...');
  const createdCategories = await Category.insertMany(SEED_DATA.categories);
  const categoryMap = createdCategories.reduce((acc, cat) => {
    acc[cat.slug] = cat._id;
    return acc;
  }, {} as any);

  console.log('Seeding products...');
  const productsToSeed = SEED_DATA.products.map(p => ({
    ...p,
    category: categoryMap[p.category as string]
  }));
  const createdProducts = await Product.insertMany(productsToSeed);

  console.log('Seeding blogs...');
  const blogsToSeed = SEED_DATA.blogs.map(b => ({
    ...b,
    relatedProducts: [createdProducts[0]._id]
  }));
  await Blog.insertMany(blogsToSeed);

  console.log('Seeding complete!');
  process.exit(0);
}

seed().catch(err => {
  console.error('Seed failed:', err);
  process.exit(1);
});
