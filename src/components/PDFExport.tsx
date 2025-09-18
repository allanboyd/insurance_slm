import React, { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download, FileText } from 'lucide-react';

interface PDFExportProps {
  sectionName: string;
  contentRef: React.RefObject<HTMLDivElement>;
  className?: string;
}

export const PDFExport: React.FC<PDFExportProps> = ({ 
  sectionName, 
  contentRef, 
  className = "" 
}) => {
  const downloadPDF = async () => {
    if (!contentRef.current) return;

    try {
      // Dynamic import to avoid SSR issues
      const html2canvas = (await import('html2canvas')).default;
      const jsPDF = (await import('jspdf')).default;

      // Create canvas from the content
      const canvas = await html2canvas(contentRef.current, {
        scale: 2, // Higher quality
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false,
        width: contentRef.current.scrollWidth,
        height: contentRef.current.scrollHeight,
      });

      // Create PDF
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const imgWidth = 210; // A4 width in mm
      const pageHeight = 295; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;

      // Add first page
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      // Add additional pages if content is longer than one page
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      // Save the PDF
      pdf.save(`${sectionName}-Insurance-SLM-Platform.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    }
  };

  return (
    <Button 
      onClick={downloadPDF} 
      variant="outline" 
      size="sm"
      className={`text-xs lg:text-sm ${className}`}
    >
      <Download className="w-3 h-3 lg:w-4 lg:h-4 mr-1 lg:mr-2" />
      <span className="hidden sm:inline">Export {sectionName} as PDF</span>
      <span className="sm:hidden">Export PDF</span>
    </Button>
  );
};

// Component for exporting all sections as a single PDF
export const ExportAllSectionsPDF: React.FC<{
  sections: Array<{ name: string; ref: React.RefObject<HTMLDivElement> }>;
  onExportStart?: () => void;
  onExportComplete?: () => void;
}> = ({ sections, onExportStart, onExportComplete }) => {
  const downloadAllSectionsPDF = async () => {
    try {
      onExportStart?.();
      
      // Dynamic import to avoid SSR issues
      const html2canvas = (await import('html2canvas')).default;
      const jsPDF = (await import('jspdf')).default;

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      // Add title page
      pdf.setFontSize(20);
      pdf.text('Insurance SLM Platform', 20, 30);
      pdf.setFontSize(14);
      pdf.text('Complete Report', 20, 40);
      pdf.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 50);
      pdf.addPage();

      for (let i = 0; i < sections.length; i++) {
        const { name, ref } = sections[i];
        
        if (!ref.current) {
          console.warn(`Section ${name} ref is null, skipping...`);
          continue;
        }

        // Temporarily make the section visible for capture
        const originalDisplay = ref.current.style.display;
        const originalVisibility = ref.current.style.visibility;
        const originalPosition = ref.current.style.position;
        
        ref.current.style.display = 'block';
        ref.current.style.visibility = 'visible';
        ref.current.style.position = 'static';
        ref.current.style.height = 'auto';
        ref.current.style.overflow = 'visible';

        // Wait a bit for any animations or charts to render
        await new Promise(resolve => setTimeout(resolve, 500));

        const canvas = await html2canvas(ref.current, {
          scale: 1.5, // Slightly lower scale for better performance
          useCORS: true,
          allowTaint: true,
          backgroundColor: '#ffffff',
          logging: false,
          width: ref.current.scrollWidth,
          height: ref.current.scrollHeight,
          scrollX: 0,
          scrollY: 0,
        });

        // Restore original styles
        ref.current.style.display = originalDisplay;
        ref.current.style.visibility = originalVisibility;
        ref.current.style.position = originalPosition;

        const imgData = canvas.toDataURL('image/png');
        const imgWidth = 210;
        const pageHeight = 295;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;

        // Add section title
        pdf.addPage();
        pdf.setFontSize(16);
        pdf.text(name, 10, 20);
        
        // Add content
        pdf.addImage(imgData, 'PNG', 0, 30, imgWidth, imgHeight);
        heightLeft -= (pageHeight - 30);

        // Add additional pages for this section if needed
        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }
      }

      pdf.save('Insurance-SLM-Platform-Complete-Report.pdf');
      onExportComplete?.();
    } catch (error) {
      console.error('Error generating complete PDF:', error);
      alert('Error generating PDF. Please try again.');
      onExportComplete?.();
    }
  };

  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    try {
      await downloadAllSectionsPDF();
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Button 
      onClick={handleExport} 
      variant="default" 
      size="sm"
      disabled={isExporting}
      className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
    >
      <FileText className="w-4 h-4 mr-2" />
      {isExporting ? 'Exporting...' : 'Export Complete Report as PDF'}
    </Button>
  );
};
