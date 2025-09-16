import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PDFExport } from './PDFExport';

export const PDFTest: React.FC = () => {
  const testRef = useRef<HTMLDivElement>(null);

  return (
    <div className="p-4">
      <Card ref={testRef} className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>PDF Export Test</CardTitle>
        </CardHeader>
        <CardContent>
          <p>This is a test component to verify PDF export functionality.</p>
          <p>Click the button below to export this card as a PDF.</p>
          <div className="mt-4">
            <PDFExport sectionName="Test" contentRef={testRef} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
