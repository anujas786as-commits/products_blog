import React from 'react';
import LegalLayout from '@/components/layout/LegalLayout';

export default function DisclaimerPage() {
  return (
    <LegalLayout title="Disclaimer" lastUpdated="May 10, 2026">
      <section>
        <h2 className="text-2xl font-bold">1. General Information</h2>
        <p>The information provided by BestPicks on our website is for general informational purposes only. All information on the site is provided in good faith, however we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability or completeness of any information on the site.</p>
      </section>
      <section>
        <h2 className="text-2xl font-bold">2. External Links Disclaimer</h2>
        <p>The site may contain (or you may be sent through the site) links to other websites or content belonging to or originating from third parties or links to websites and features in banners or other advertising. Such external links are not investigated, monitored, or checked for accuracy, adequacy, validity, reliability, availability or completeness by us.</p>
      </section>
      <section>
        <h2 className="text-2xl font-bold">3. Professional Disclaimer</h2>
        <p>The site cannot and does not contain professional advice. The product information is provided for general informational and educational purposes only and is not a substitute for professional advice. Accordingly, before taking any actions based upon such information, we encourage you to consult with the appropriate professionals.</p>
      </section>
      <section>
        <h2 className="text-2xl font-bold">4. Product Performance</h2>
        <p>Product results and performance may vary. We are not responsible for any issues arising from the use of products recommended on our platform. Always read the manufacturer's manual and safety guidelines before use.</p>
      </section>
    </LegalLayout>
  );
}
