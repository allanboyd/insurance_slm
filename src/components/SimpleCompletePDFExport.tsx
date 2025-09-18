import React, { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { FileText } from 'lucide-react';
import { AllSectionsForPDF } from './AllSectionsForPDF';

export const SimpleCompletePDFExport: React.FC = () => {
  const [isExporting, setIsExporting] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const downloadCompletePDF = async () => {
    if (!contentRef.current) return;

    try {
      setIsExporting(true);
      
      // Dynamic import to avoid SSR issues
      const html2canvas = (await import('html2canvas')).default;
      const jsPDF = (await import('jspdf')).default;

      const canvas = await html2canvas(contentRef.current, {
        scale: 1.5,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false,
        width: contentRef.current.scrollWidth,
        height: contentRef.current.scrollHeight,
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

      pdf.save('Insurance-SLM-Platform-Complete-Report.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <>
      {/* Hidden component for PDF generation */}
      <div 
        ref={contentRef} 
        style={{ 
          position: 'absolute', 
          left: '-9999px', 
          top: '-9999px',
          visibility: 'hidden',
          pointerEvents: 'none'
        }}
      >
        <AllSectionsForPDF />
      </div>

      <Button 
        onClick={downloadCompletePDF} 
        variant="default" 
        size="sm"
        disabled={isExporting}
        className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-xs lg:text-sm"
      >
        <FileText className="w-3 h-3 lg:w-4 lg:h-4 mr-1 lg:mr-2" />
        <span className="hidden sm:inline">{isExporting ? 'Exporting...' : 'Export Complete Report as PDF'}</span>
        <span className="sm:hidden">{isExporting ? 'Exporting...' : 'Export All'}</span>
      </Button>
    </>
  );
};
