import React from 'react';

interface LegalLayoutProps {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
}

const LegalLayout: React.FC<LegalLayoutProps> = ({ title, lastUpdated, children }) => {
  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl">
      <header className="mb-12 border-b pb-8">
        <h1 className="text-4xl font-black mb-4">{title}</h1>
        <p className="text-sm text-muted-foreground italic">Last Updated: {lastUpdated}</p>
      </header>
      <div className="prose prose-blue dark:prose-invert max-w-none space-y-6 text-foreground/80 leading-relaxed">
        {children}
      </div>
    </div>
  );
};

export default LegalLayout;
