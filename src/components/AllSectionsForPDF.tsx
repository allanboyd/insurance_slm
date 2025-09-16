import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import {
  Brain,
  LineChart as LineChartIcon,
  Settings,
  ShieldCheck,
  TrendingUp,
  Database,
  Activity,
  Calculator,
  FlaskConical,
  Scale,
  Lock,
  BookOpen,
  Play,
  Send,
  Wand2,
  LayoutTemplate,
  Layers,
  Globe,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as ReTooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
  BarChart,
  Bar,
} from "recharts";

// Mock data
const lossRatioData = [
  { month: "Jan", base: 0.62, stressed: 0.71 },
  { month: "Feb", base: 0.59, stressed: 0.69 },
  { month: "Mar", base: 0.57, stressed: 0.66 },
  { month: "Apr", base: 0.60, stressed: 0.72 },
  { month: "May", base: 0.58, stressed: 0.70 },
  { month: "Jun", base: 0.56, stressed: 0.68 },
];

const pricingBands = [
  { tier: "Low risk", premium: 6500, uptake: 0.42 },
  { tier: "Standard", premium: 7800, uptake: 0.36 },
  { tier: "High risk", premium: 9800, uptake: 0.18 },
  { tier: "Very high", premium: 11800, uptake: 0.10 },
];

const countryMarkers = [
  { code: "KE", name: "Kenya", inflation: 0.085, fxStress: 0.12, climate: "Flood risk ↑" },
  { code: "UG", name: "Uganda", inflation: 0.075, fxStress: 0.08, climate: "Crop yield ↓" },
  { code: "ZM", name: "Zambia", inflation: 0.097, fxStress: 0.18, climate: "Drought risk ↑" },
  { code: "ZW", name: "Zimbabwe", inflation: 0.22, fxStress: 0.35, climate: "FX volatility ↑" },
];

const Kpi = ({ label, value, sub }: { label: string; value: string; sub?: string }) => (
  <Card className="rounded-2xl shadow-sm">
    <CardHeader className="pb-2">
      <CardDescription className="text-muted-foreground">{label}</CardDescription>
      <CardTitle className="text-3xl">{value}</CardTitle>
      {sub && <div className="text-xs text-muted-foreground mt-1">{sub}</div>}
    </CardHeader>
  </Card>
);

const SectionHeader = ({ icon: Icon, title, desc }: { icon: any; title: string; desc?: string }) => (
  <div className="flex items-start gap-3 mb-4">
    <div className="p-2 rounded-xl bg-muted"><Icon className="w-5 h-5" /></div>
    <div>
      <h3 className="text-xl font-semibold">{title}</h3>
      {desc && <p className="text-sm text-muted-foreground mt-1">{desc}</p>}
    </div>
  </div>
);

export const AllSectionsForPDF: React.FC = () => {
  return (
    <div className="bg-white text-black" style={{ minHeight: '100vh', padding: '20px' }}>
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Insurance SLM Platform</h1>
        <p className="text-lg text-gray-600">Complete Report - Generated on {new Date().toLocaleDateString()}</p>
      </div>

      {/* Dashboard Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <LineChartIcon className="w-6 h-6" />
          Dashboard
        </h2>
        
        <div className="grid xl:grid-cols-4 md:grid-cols-2 gap-4 mb-6">
          <Kpi label="Loss Ratio (base)" value="58%" sub="Trailing 6‑mo weighted" />
          <Kpi label="Loss Ratio (stressed)" value="70%" sub="Flood + FX shock" />
          <Kpi label="Fraud Flags (30d)" value="+14.8%" sub="Anomaly model v0.9" />
          <Kpi label="Time to Quote" value="< 90s" sub="Dynamic pricing API" />
        </div>

        <div className="grid lg:grid-cols-3 gap-4">
          <Card className="lg:col-span-2 rounded-2xl shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><LineChartIcon className="w-5 h-5"/> Portfolio Loss Ratios</CardTitle>
              <CardDescription>Base vs. stressed (Monte Carlo 10k paths)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={lossRatioData}>
                    <defs>
                      <linearGradient id="base" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="currentColor" stopOpacity={0.25}/>
                        <stop offset="95%" stopColor="currentColor" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis tickFormatter={(v)=>`${Math.round(v*100)}%`} />
                    <ReTooltip formatter={(v)=>typeof v==="number"?`${Math.round(v*100)}%`:v} />
                    <Area type="monotone" dataKey="base" stroke="currentColor" fillOpacity={1} fill="url(#base)" />
                    <Line type="monotone" dataKey="stressed" stroke="currentColor" strokeDasharray="4 4" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><TrendingUp className="w-5 h-5"/> Country Markers</CardTitle>
              <CardDescription>Macro & climate drivers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {countryMarkers.map((c)=> (
                  <div key={c.code} className="p-3 rounded-xl border flex items-center justify-between">
                    <div>
                      <div className="font-medium">{c.name}</div>
                      <div className="text-xs text-muted-foreground">Inflation {(c.inflation*100).toFixed(1)}% • FX stress {(c.fxStress*100).toFixed(0)}% • {c.climate}</div>
                    </div>
                    <Badge variant="outline">{c.code}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Knowledge Engine Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <BookOpen className="w-6 h-6" />
          Knowledge Engine
        </h2>
        
        <div className="grid lg:grid-cols-3 gap-4">
          <Card className="lg:col-span-2 rounded-2xl shadow-sm">
            <CardHeader>
              <SectionHeader icon={BookOpen} title="Chat – Insurance Knowledge Engine" desc="Cited Q&A across policies, regulation, actuarial notes & market research" />
            </CardHeader>
            <CardContent>
              <div className="h-72 overflow-auto rounded-xl border p-3 bg-muted/30 space-y-3">
                <div className="max-w-[85%] rounded-2xl px-3 py-2 bg-background border">
                  <p className="text-sm leading-relaxed">Hi! I'm your Insurance Knowledge Engine. Ask about policies, pricing bands, IFRS17, or run a scenario.</p>
                </div>
              </div>
              <div className="text-xs text-muted-foreground mt-2">Sources: IRA circulars • IPEC bulletins • PIA Zambia • IRA Uganda • Actuarial journals • Internal policy docs</div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-sm">
            <CardHeader>
              <SectionHeader icon={Globe} title="Crawler & Feeds" desc="Schedule regulatory & market crawls" />
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-xl border">
                <div>
                  <div className="font-medium">IRA Kenya – Circulars</div>
                  <div className="text-xs text-muted-foreground">Weekly • Diff-based ingestion • Auto-citation</div>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl border">
                <div>
                  <div className="font-medium">IPEC Zimbabwe – Bulletins</div>
                  <div className="text-xs text-muted-foreground">Weekly</div>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* What-If Room Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <FlaskConical className="w-6 h-6" />
          What-If Room
        </h2>
        
        <Card className="rounded-2xl shadow-sm">
          <CardHeader>
            <SectionHeader icon={FlaskConical} title="What‑If Simulation Room" desc="Run interactive shocks & visualize solvency, reserves, and premiums" />
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-3">
                <Label>Market Shock</Label>
                <Select defaultValue="fx15">
                  <SelectTrigger><SelectValue placeholder="Select shock"/></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fx15">FX deval −15% (USDKES)</SelectItem>
                    <SelectItem value="infl10">Inflation +10% (YoY)</SelectItem>
                    <SelectItem value="flood2x">Flood frequency ×2</SelectItem>
                    <SelectItem value="drought1in50">Drought 1‑in‑50 event</SelectItem>
                  </SelectContent>
                </Select>

                <Label className="mt-2">Portfolio</Label>
                <Select defaultValue="motor">
                  <SelectTrigger><SelectValue placeholder="Select portfolio"/></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="motor">Motor (KE)</SelectItem>
                    <SelectItem value="health">Health (UG)</SelectItem>
                    <SelectItem value="crop">Crop (ZM)</SelectItem>
                    <SelectItem value="property">Property (ZW)</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex items-center justify-between mt-2">
                  <Label>Monte Carlo Paths</Label>
                  <Badge variant="outline">10,000</Badge>
                </div>

                <Button className="w-full mt-2"><Play className="w-4 h-4 mr-2"/>Run Scenario</Button>
              </div>

              <div className="md:col-span-2">
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <Kpi label="Solvency Ratio (post‑shock)" value="142%" sub=": −18% vs base" />
                  <Kpi label="Reserve Uplift" value="+$2.7M" sub="95% VaR" />
                </div>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={pricingBands}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="tier" />
                      <YAxis />
                      <ReTooltip />
                      <Bar dataKey="premium" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="text-xs text-muted-foreground mt-2">Recommendation: uplift high‑risk tier by 8–12%; negotiate +5% reinsurance rate cap.</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add more sections as needed... */}
    </div>
  );
};
