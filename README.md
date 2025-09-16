# Insurance SLM Platform

A comprehensive insurance platform built with React, TypeScript, and modern UI components. This platform provides tools for knowledge management, simulation, dynamic pricing, product development, and governance for insurance operations across multiple African markets.

## Features

- **Dashboard**: Real-time KPIs, loss ratio tracking, and country-specific market markers
- **Knowledge Engine**: AI-powered chat interface with regulatory document integration
- **What-If Room**: Interactive scenario simulation and stress testing
- **Pricing & Actuarial**: Dynamic pricing tools and actuarial model configuration
- **Product Canvas**: Product development and simulation environment
- **Data & Signals**: Data ingestion pipelines and model monitoring
- **Governance**: Role-based access control and compliance management

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **UI Components**: shadcn/ui with Radix UI primitives
- **Styling**: Tailwind CSS with custom design system
- **Charts**: Recharts for data visualization
- **Animations**: Framer Motion
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/
│   └── ui/           # Reusable UI components
├── lib/
│   └── utils.ts      # Utility functions
├── App.tsx           # Main application component
├── main.tsx          # Application entry point
└── index.css         # Global styles
```

## Key Components

- **InsuranceSLMPlatformPreview**: Main application component with tabbed interface
- **Kpi**: KPI display component for metrics
- **SectionHeader**: Section headers with icons and descriptions
- **UI Components**: Complete set of accessible UI primitives

## Data Sources

The application includes mock data for:
- Loss ratio trends and projections
- Country-specific economic indicators
- Pricing band configurations
- Regulatory feed status
- Model performance metrics

## Customization

The platform is designed to be easily customizable:
- Modify color schemes in `tailwind.config.js`
- Update mock data in `App.tsx`
- Add new tabs or sections as needed
- Integrate with real APIs and data sources

## License

This is a demo application for design and stakeholder alignment purposes.
