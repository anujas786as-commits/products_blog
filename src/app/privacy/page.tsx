import React from 'react';
import LegalLayout from '@/components/layout/LegalLayout';

export default function PrivacyPage() {
  return (
    <LegalLayout title="Privacy Policy" lastUpdated="May 10, 2026">
      <section>
        <h2 className="text-2xl font-bold">1. Introduction</h2>
        <p>Welcome to BestPicks. We value your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website.</p>
      </section>
      <section>
        <h2 className="text-2xl font-bold">2. Data We Collect</h2>
        <p>We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Identity Data:</strong> first name, last name, username or similar identifier.</li>
          <li><strong>Contact Data:</strong> email address and telephone numbers.</li>
          <li><strong>Technical Data:</strong> internet protocol (IP) address, your login data, browser type and version, time zone setting and location.</li>
        </ul>
      </section>
      <section>
        <h2 className="text-2xl font-bold">3. How We Use Your Data</h2>
        <p>We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
          <li>Where it is necessary for our legitimate interests and your interests and fundamental rights do not override those interests.</li>
        </ul>
      </section>
      <section>
        <h2 className="text-2xl font-bold">4. Affiliate Disclosure Integration</h2>
        <p>Please note that some links on this site are affiliate links. Our privacy policy extends to how we handle tracking data from these links, which is primarily used for commission attribution and performance analytics.</p>
      </section>
    </LegalLayout>
  );
}
