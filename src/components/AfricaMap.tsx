import React, { useState, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { Wrapper, Status } from '@googlemaps/react-wrapper';

interface CountryData {
  code: string;
  name: string;
  inflation: number;
  fxStress: number;
  climate: string;
  coordinates: { lat: number; lng: number };
}

const countryData: CountryData[] = [
  { code: "KE", name: "Kenya", inflation: 0.085, fxStress: 0.12, climate: "Flood risk ↑", coordinates: { lat: -0.0236, lng: 37.9062 } },
  { code: "UG", name: "Uganda", inflation: 0.075, fxStress: 0.08, climate: "Crop yield ↓", coordinates: { lat: 1.3733, lng: 32.2903 } },
  { code: "ZM", name: "Zambia", inflation: 0.097, fxStress: 0.18, climate: "Drought risk ↑", coordinates: { lat: -13.1339, lng: 27.8493 } },
  { code: "ZW", name: "Zimbabwe", inflation: 0.22, fxStress: 0.35, climate: "FX volatility ↑", coordinates: { lat: -19.0154, lng: 29.1549 } },
];

const getRiskColor = (inflation: number, fxStress: number) => {
  const riskScore = (inflation + fxStress) / 2;
  // Turquoise for low, orange spectrum for medium/high/very high
  if (riskScore < 0.1) return "#06b6d4"; // turquoise (cyan-500)
  if (riskScore < 0.2) return "#f97316"; // orange-500
  return "#ea580c"; // orange-600
};

const getRiskLevel = (inflation: number, fxStress: number) => {
  const riskScore = (inflation + fxStress) / 2;
  if (riskScore < 0.1) return "Low";
  if (riskScore < 0.15) return "Medium";
  if (riskScore < 0.25) return "High";
  return "Very High";
};

// Map component
const MapComponent: React.FC<{ 
  onCountryHover: (country: CountryData) => void;
  onCountryLeave: () => void;
}> = ({ onCountryHover, onCountryLeave }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);

  const onLoad = useCallback((map: google.maps.Map) => {
    mapInstanceRef.current = map;
    
    // Clear existing markers
    markersRef.current.forEach(marker => marker.setMap(null));
    markersRef.current = [];

    // Add markers for each country
    countryData.forEach((country) => {
      const riskColor = getRiskColor(country.inflation, country.fxStress);
      
      const marker = new google.maps.Marker({
        position: country.coordinates,
        map,
        title: `${country.name} - Risk Level: ${getRiskLevel(country.inflation, country.fxStress)}`,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 16,
          fillColor: riskColor,
          fillOpacity: 0.95,
          strokeColor: '#ffffff',
          strokeWeight: 4,
        },
        label: {
          text: country.code,
          color: '#ffffff',
          fontSize: '12px',
          fontWeight: 'bold',
        },
        animation: google.maps.Animation.DROP,
      });

      // Add hover effects
      marker.addListener('mouseover', () => {
        marker.setIcon({
          path: google.maps.SymbolPath.CIRCLE,
          scale: 20,
          fillColor: riskColor,
          fillOpacity: 1,
          strokeColor: '#ffffff',
          strokeWeight: 4,
        });
        onCountryHover(country);
      });

      marker.addListener('mouseout', () => {
        marker.setIcon({
          path: google.maps.SymbolPath.CIRCLE,
          scale: 16,
          fillColor: riskColor,
          fillOpacity: 0.95,
          strokeColor: '#ffffff',
          strokeWeight: 4,
        });
        onCountryLeave();
      });

      markersRef.current.push(marker);
    });
  }, [onCountryHover, onCountryLeave]);

  React.useEffect(() => {
    const initializeMap = () => {
      if (mapRef.current && !mapInstanceRef.current && window.google && window.google.maps) {
        const map = new google.maps.Map(mapRef.current, {
          center: { lat: -8, lng: 30 }, // Center on East Africa
          zoom: 3,
          mapTypeId: 'roadmap',
          styles: [
            {
              featureType: 'water',
              elementType: 'geometry',
              stylers: [{ color: '#e1f5fe' }]
            },
            {
              featureType: 'landscape',
              elementType: 'geometry',
              stylers: [{ color: '#f5f5f5' }]
            },
            {
              featureType: 'administrative.country',
              elementType: 'geometry.stroke',
              stylers: [{ color: '#757575', weight: 1 }]
            },
            {
              featureType: 'administrative.country',
              elementType: 'labels.text.fill',
              stylers: [{ color: '#424242' }]
            }
          ]
        });
        onLoad(map);
      } else {
        // Retry after a short delay if Google Maps isn't loaded yet
        setTimeout(initializeMap, 100);
      }
    };

    initializeMap();
  }, [onLoad]);

  return <div ref={mapRef} className="w-full h-full rounded-2xl" />;
};

// Loading component
const LoadingComponent: React.FC = () => (
  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
      <p className="text-slate-600 font-medium">Loading map...</p>
    </div>
  </div>
);

// Error component
const ErrorComponent: React.FC = () => (
  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl">
    <div className="text-center p-6">
      <div className="text-red-500 text-4xl mb-4">🗺️</div>
      <p className="text-red-600 font-medium text-lg">Google Maps Loading...</p>
      <p className="text-red-500 text-sm mt-2">Please wait for the map to load</p>
      <div className="mt-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500 mx-auto"></div>
      </div>
    </div>
  </div>
);

export const AfricaMap: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState<CountryData | null>(null);

  const handleCountryHover = useCallback((country: CountryData) => {
    setSelectedCountry(country);
  }, []);

  const handleCountryLeave = useCallback(() => {
    setSelectedCountry(null);
  }, []);

  const render = (status: Status) => {
    switch (status) {
      case Status.LOADING:
        return <LoadingComponent />;
      case Status.FAILURE:
        return <ErrorComponent />;
      case Status.SUCCESS:
        return (
          <MapComponent 
            onCountryHover={handleCountryHover}
            onCountryLeave={handleCountryLeave}
          />
        );
    }
  };

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl overflow-hidden">
      {/* Google Maps */}
      <Wrapper 
        apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
        render={render}
        libraries={['places']}
      />

      {/* Risk legend */}
      <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-2xl border border-slate-200 p-4 shadow-lg z-10">
        <h3 className="text-sm font-bold text-slate-800 mb-3">Risk Level</h3>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{backgroundColor:'#06b6d4'}}></div>
            <span className="text-xs text-slate-600">Low (Turquoise)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{backgroundColor:'#f97316'}}></div>
            <span className="text-xs text-slate-600">Medium (Orange)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{backgroundColor:'#ea580c'}}></div>
            <span className="text-xs text-slate-600">High (Deep Orange)</span>
          </div>
        </div>
      </div>

      {/* Map title */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white/95 backdrop-blur-sm rounded-2xl border border-slate-200 px-4 py-2 shadow-lg z-10">
        <h3 className="text-sm font-bold text-slate-800">East & Southern Africa Risk Map</h3>
      </div>

      {/* Instructions */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/80 backdrop-blur-sm rounded-xl px-4 py-2 border border-slate-200 z-10">
        <p className="text-xs text-slate-600 font-medium">
          Click on markers to view detailed risk metrics
        </p>
      </div>

      {/* Country details modal */}
      {selectedCountry && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          className="absolute inset-4 bg-white/95 backdrop-blur-sm rounded-3xl border-2 border-slate-200/50 p-6 z-20 shadow-2xl"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div 
                className="w-6 h-6 rounded-full shadow-lg"
                style={{ backgroundColor: getRiskColor(selectedCountry.inflation, selectedCountry.fxStress) }}
              />
              <h3 className="font-bold text-slate-800 text-2xl">{selectedCountry.name}</h3>
              <span className="text-sm font-bold text-slate-600 bg-gradient-to-r from-slate-100 to-slate-200 px-3 py-1 rounded-full">
                {selectedCountry.code}
              </span>
            </div>
            <button
              onClick={() => setSelectedCountry(null)}
              className="text-slate-400 hover:text-slate-600 text-2xl"
            >
              ×
            </button>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-50">
              <span className="text-sm font-medium text-slate-600">Inflation Rate</span>
              <p className="text-2xl font-bold text-slate-800 mt-1">{(selectedCountry.inflation * 100).toFixed(1)}%</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50">
              <span className="text-sm font-medium text-slate-600">FX Stress</span>
              <p className="text-2xl font-bold text-slate-800 mt-1">{(selectedCountry.fxStress * 100).toFixed(0)}%</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50">
              <span className="text-sm font-medium text-slate-600">Risk Level</span>
              <span 
                className="inline-block font-bold px-3 py-1 rounded-full text-sm mt-1"
                style={{ 
                  backgroundColor: getRiskColor(selectedCountry.inflation, selectedCountry.fxStress) + '20',
                  color: getRiskColor(selectedCountry.inflation, selectedCountry.fxStress)
                }}
              >
                {getRiskLevel(selectedCountry.inflation, selectedCountry.fxStress)}
              </span>
            </div>
            <div className="p-4 rounded-xl bg-slate-50">
              <span className="text-sm font-medium text-slate-600">Climate Impact</span>
              <p className="text-sm font-semibold text-slate-800 mt-1">
                🌡️ {selectedCountry.climate}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};