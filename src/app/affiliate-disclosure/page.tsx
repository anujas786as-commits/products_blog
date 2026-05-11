import React from 'react';
import LegalLayout from '@/components/layout/LegalLayout';

export default function AffiliateDisclosurePage() {
  return (
    <LegalLayout title="Affiliate Disclosure" lastUpdated="May 10, 2026">
      <p className="text-xl font-medium">In compliance with the FTC guidelines, please assume the following about links and posts on this site:</p>
      
      <section>
        <h2 className="text-2xl font-bold">1. Affiliate Links</h2>
        <p>Many of the links on BestPicks are affiliate links. This means that a special tracking code is used and that we may make a small commission on the sale of an item if you purchase through one of these links. The price of the item is the same for you whether it is an affiliate link or not, and using affiliate links helps us to maintain this website and support our research team.</p>
      </section>

      <section>
        <h2 className="text-2xl font-bold">2. Amazon Associate Disclosure</h2>
        <p>BestPicks is a participant in the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.in or Amazon.com.</p>
      </section>

      <section>
        <h2 className="text-2xl font-bold">3. Other Partnerships</h2>
        <p>We also participate in affiliate programs with Flipkart, Meesho, and other marketplaces. We only recommend products we believe will add value to our readers. We are independently owned and the opinions expressed here are our own.</p>
      </section>

      <section>
        <h2 className="text-2xl font-bold">4. How It Affects You</h2>
        <p>Your support in purchasing through these links enables us to keep BestPicks free of intrusive display ads and allows us to continue providing high-quality, research-backed product guides. We thank you for your support!</p>
      </section>
    </LegalLayout>
  );
}
