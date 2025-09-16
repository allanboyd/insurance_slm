import React from 'react';
import { SimplePDFTest } from '@/components/SimplePDFTest';

export const TestPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">PDF Export Test Page</h1>
        <p className="text-center text-muted-foreground mb-8">
          This page tests the PDF export functionality. Try the test button below.
        </p>
        <SimplePDFTest />
      </div>
    </div>
  );
};
