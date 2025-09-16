import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const SimplePDFTest: React.FC = () => {
  const testRef = useRef<HTMLDivElement>(null);

  const downloadPDF = async () => {
    if (!testRef.current) return;

    try {
      // Dynamic import to avoid SSR issues
      const html2canvas = (await import('html2canvas')).default;
      const jsPDF = (await import('jspdf')).default;

      const canvas = await html2canvas(testRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false,
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save('test-export.pdf');
      alert('PDF exported successfully!');
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please check console for details.');
    }
  };

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
            <Button onClick={downloadPDF} variant="outline">
              Test PDF Export
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
