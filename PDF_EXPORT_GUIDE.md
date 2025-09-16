# PDF Export Guide for Insurance SLM Platform

## 🎯 Overview

The Insurance SLM Platform now includes comprehensive PDF export functionality that allows you to generate professional PDF reports from any section of the website.

## 📋 Available Export Options

### 1. **Individual Section Exports**
Each tab/section has its own PDF export button:
- **Dashboard**: KPIs, charts, and country markers
- **Knowledge Engine**: Chat interface and regulatory feeds
- **What-If Room**: Simulation tools and scenario results
- **Pricing & Actuarial**: Dynamic pricing tools and actuarial models
- **Product Canvas**: Product development environment
- **Data & Signals**: Data ingestion pipelines and model status
- **Governance**: RBAC and compliance management

### 2. **Complete Report Export**
- **Export Complete Report as PDF**: Generates a single PDF with all sections
- Located in the top-right corner of the header
- Includes all 7 sections in one comprehensive document

## 🚀 How to Use

### Individual Section Export
1. Navigate to any section using the tabs
2. Scroll to the bottom of the section
3. Click the "Export [Section Name] as PDF" button
4. The PDF will automatically download to your device

### Complete Report Export
1. Click the "Export Complete Report as PDF" button in the header
2. Wait for the PDF generation to complete
3. The complete report will download as a single PDF file

## 📄 PDF Features

### High-Quality Output
- **Resolution**: 2x scale for crisp, professional quality
- **Format**: A4 portrait orientation
- **Colors**: Full color preservation
- **Charts**: All charts and visualizations are included

### Multi-Page Support
- **Automatic pagination**: Long sections are split across multiple pages
- **Section headers**: Each section includes clear titles
- **Professional layout**: Clean, business-ready formatting

### File Naming
- Individual sections: `[Section-Name]-Insurance-SLM-Platform.pdf`
- Complete report: `Insurance-SLM-Platform-Complete-Report.pdf`

## 🛠️ Technical Details

### Libraries Used
- **html2canvas**: Converts HTML elements to high-quality images
- **jsPDF**: Generates PDF documents from images
- **React refs**: Captures specific sections for export

### Browser Compatibility
- Works in all modern browsers
- Requires JavaScript enabled
- No additional software needed

## 💡 Tips for Best Results

1. **Wait for charts to load**: Ensure all visualizations are fully rendered before exporting
2. **Use full-screen mode**: For best quality, use the browser's full-screen mode
3. **Check content visibility**: Make sure all content is visible and not cut off
4. **Test individual sections**: Export individual sections first to verify quality

## 🔧 Troubleshooting

### Common Issues
- **Charts not appearing**: Wait a moment for charts to fully load, then try again
- **Poor quality**: Ensure you're using a modern browser with good resolution
- **Export fails**: Check browser console for error messages

### Performance
- Large sections may take a few moments to process
- Complete report export may take 30-60 seconds depending on content
- Browser may show "Page Unresponsive" - this is normal for large exports

## 📊 Use Cases

### Business Reports
- **Executive summaries**: Dashboard and key metrics
- **Technical documentation**: Knowledge engine and data sections
- **Compliance reports**: Governance and regulatory information

### Presentations
- **Stakeholder meetings**: Complete platform overview
- **Client demos**: Specific section exports
- **Training materials**: Step-by-step process documentation

### Archival
- **Project documentation**: Complete platform state
- **Version control**: Snapshot of current implementation
- **Backup purposes**: Offline access to platform information

## 🎨 Customization

The PDF export system is built with React components and can be easily customized:
- Modify export quality settings in `PDFExport.tsx`
- Adjust page layout and formatting
- Add custom headers/footers
- Include additional metadata

## 📞 Support

If you encounter any issues with PDF export:
1. Check browser console for error messages
2. Ensure all dependencies are properly installed
3. Try exporting individual sections first
4. Contact the development team for technical support
