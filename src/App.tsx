import React, { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
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
  CloudRain,
  Scale,
  Lock,
  BookOpen,
  Play,
  Send,
  Wand2,
  LayoutTemplate,
  Layers,
  Globe,
  Factory,
  MessageSquare,
  Phone,
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
import { AfricaMap } from "@/components/AfricaMap";
import LandingPage from "./LandingPage";

// --- Mock data (for charts & tables) ---
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

// Utility components
const Kpi = ({ label, value, sub, color = "blue" }: { label: string; value: string; sub?: string; color?: string }) => {
  const colorClasses = {
    cyan: "bg-gradient-to-br from-cyan-50 to-cyan-100 border-cyan-200",
    orange: "bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200",
    teal: "bg-gradient-to-br from-teal-50 to-teal-100 border-teal-200",
    blue: "bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200",
    green: "bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200",
    purple: "bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200",
    red: "bg-gradient-to-br from-red-50 to-red-100 border-red-200",
    indigo: "bg-gradient-to-br from-indigo-50 to-indigo-100 border-indigo-200"
  };
  
  return (
    <Card className={`rounded-2xl shadow-lg border-2 ${colorClasses[color as keyof typeof colorClasses] || colorClasses.cyan} hover:shadow-xl transition-all duration-300`}>
      <CardHeader className="pb-2">
        <CardDescription className="text-gray-600 font-medium">{label}</CardDescription>
        <CardTitle className="text-3xl font-bold text-gray-800">{value}</CardTitle>
        {sub && <div className="text-xs text-gray-500 mt-1 font-medium">{sub}</div>}
    </CardHeader>
  </Card>
);
};

const SectionHeader = ({ icon: Icon, title, desc, color = "blue" }: { icon: any; title: string; desc?: string; color?: string }) => {
  const colorClasses = {
    cyan: "bg-gradient-to-br from-cyan-500 to-cyan-600 text-white",
    orange: "bg-gradient-to-br from-orange-500 to-orange-600 text-white",
    teal: "bg-gradient-to-br from-teal-500 to-teal-600 text-white",
    blue: "bg-gradient-to-br from-blue-500 to-blue-600 text-white",
    green: "bg-gradient-to-br from-emerald-500 to-emerald-600 text-white",
    purple: "bg-gradient-to-br from-purple-500 to-purple-600 text-white",
    red: "bg-gradient-to-br from-red-500 to-red-600 text-white",
    indigo: "bg-gradient-to-br from-indigo-500 to-indigo-600 text-white",
    rose: "bg-gradient-to-br from-rose-500 to-rose-600 text-white"
  };
  
  return (
    <div className="flex items-start gap-4 mb-6">
      <div className={`p-3 rounded-2xl shadow-lg ${colorClasses[color as keyof typeof colorClasses] || colorClasses.cyan}`}>
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <h3 className="text-2xl font-bold text-gray-800">{title}</h3>
        {desc && <p className="text-sm text-gray-600 mt-1 font-medium">{desc}</p>}
    </div>
  </div>
);
};

// --- Main Preview Component ---
export default function InsuranceSLMPlatformPreview() {
  const [showDashboard, setShowDashboard] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [chat, setChat] = useState<string>("");
  const [messages, setMessages] = useState<Array<{ role: "user" | "assistant"; content: string }>>([
    { role: "assistant", content: "Hi! I'm your Insurance Knowledge Engine. Ask about policies, pricing bands, IFRS17, or run a scenario." },
  ]);

  const handleSend = () => {
    if (!chat.trim()) return;
    const next: Array<{ role: "user" | "assistant"; content: string }> = [...messages, { role: "user", content: chat }];
    // Mock assistant echo
    next.push({ role: "assistant", content: `Working on: ${chat}. (This is a mock response with citations and links to internal docs.)` });
    setMessages(next);
    setChat("");
  };

  const handleEnterDashboard = () => {
    setShowDashboard(true);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    if (showDashboard) {
      window.addEventListener('scroll', handleScroll);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [showDashboard]);

  if (!showDashboard) {
    return <LandingPage onEnterDashboard={handleEnterDashboard} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-teal-50 to-orange-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.1),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(249,115,22,0.1),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(20,184,166,0.1),transparent_50%)]"></div>
        {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -8 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.4 }} 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200' 
            : 'bg-gradient-to-r from-cyan-400/20 via-teal-300/15 to-cyan-200/10 backdrop-blur-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-cyan-500 to-teal-600 shadow-xl">
                <Brain className="w-9 h-9 text-white" />
              </div>
              <div>
                <h1 className={`text-3xl font-bold transition-colors duration-300 ${
                  isScrolled
                    ? 'bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent' 
                    : 'text-gray-900'
                }`}>
                  Insurance SLM Platform
                </h1>
                <p className={`font-medium transition-colors duration-300 ${
                  isScrolled ? 'text-gray-600' : 'text-gray-700'
                }`}>
                  AI-Powered Insurance Intelligence
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 text-sm font-semibold shadow-xl rounded-xl">
                Live Analysis
              </Badge>
              <Button 
                onClick={() => setShowDashboard(false)}
                className={`px-6 py-3 transition-all duration-300 rounded-xl font-medium ${
                  isScrolled 
                    ? 'bg-cyan-600 hover:bg-cyan-700 text-white' 
                    : 'bg-cyan-600 hover:bg-cyan-700 text-white shadow-xl'
                }`}
              >
                Back to Home
              </Button>
            </div>
          </div>
        </div>
      </motion.header>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-32">
          <Tabs defaultValue="dashboard" className="">
            <TabsList className="grid grid-cols-8 w-full mb-10 bg-white shadow-xl border border-gray-200/30 rounded-2xl p-1">
              <TabsTrigger value="dashboard" className="rounded-xl text-gray-700 hover:text-gray-900 hover:bg-gray-50 data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-teal-600 data-[state=active]:text-white data-[state=active]:shadow-lg font-medium transition-all duration-200">Dashboard</TabsTrigger>
              <TabsTrigger value="knowledge" className="rounded-xl text-gray-700 hover:text-gray-900 hover:bg-gray-50 data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-orange-600 data-[state=active]:text-white data-[state=active]:shadow-lg font-medium transition-all duration-200">Knowledge Engine</TabsTrigger>
              <TabsTrigger value="simulator" className="rounded-xl text-gray-700 hover:text-gray-900 hover:bg-gray-50 data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-500 data-[state=active]:to-cyan-600 data-[state=active]:text-white data-[state=active]:shadow-lg font-medium transition-all duration-200">Customer Simulator</TabsTrigger>
              <TabsTrigger value="whatif" className="rounded-xl text-gray-700 hover:text-gray-900 hover:bg-gray-50 data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-orange-600 data-[state=active]:text-white data-[state=active]:shadow-lg font-medium transition-all duration-200">What‑If Room</TabsTrigger>
              <TabsTrigger value="pricing" className="rounded-xl text-gray-700 hover:text-gray-900 hover:bg-gray-50 data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-teal-600 data-[state=active]:text-white data-[state=active]:shadow-lg font-medium transition-all duration-200">Pricing & Actuarial</TabsTrigger>
              <TabsTrigger value="canvas" className="rounded-xl text-gray-700 hover:text-gray-900 hover:bg-gray-50 data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-500 data-[state=active]:to-cyan-600 data-[state=active]:text-white data-[state=active]:shadow-lg font-medium transition-all duration-200">Product Canvas</TabsTrigger>
              <TabsTrigger value="data" className="rounded-xl text-gray-700 hover:text-gray-900 hover:bg-gray-50 data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-orange-600 data-[state=active]:text-white data-[state=active]:shadow-lg font-medium transition-all duration-200">Data & Signals</TabsTrigger>
              <TabsTrigger value="governance" className="rounded-xl text-gray-700 hover:text-gray-900 hover:bg-gray-50 data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-teal-600 data-[state=active]:text-white data-[state=active]:shadow-lg font-medium transition-all duration-200">Governance</TabsTrigger>
            </TabsList>

            {/* --- DASHBOARD --- */}
            <TabsContent value="dashboard">
              <div className="grid xl:grid-cols-4 md:grid-cols-2 gap-6 mb-8">
            <Kpi label="Loss Ratio (base)" value="58%" sub="Trailing 6‑mo weighted" color="cyan" />
            <Kpi label="Loss Ratio (stressed)" value="70%" sub="Flood + FX shock" color="orange" />
            <Kpi label="Fraud Flags (30d)" value="+14.8%" sub="Anomaly model v0.9" color="teal" />
            <Kpi label="Time to Quote" value="< 90s" sub="Dynamic pricing API" color="orange" />
            </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <Card className="rounded-3xl shadow-xl border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                    <LineChartIcon className="w-6 h-6"/>
                  </div>
                  <div>
                    <CardTitle className="text-xl font-bold text-slate-800">Portfolio Loss Ratios</CardTitle>
                    <CardDescription className="text-slate-600 font-medium">Base vs. stressed (Monte Carlo 10k paths)</CardDescription>
                  </div>
                </div>
                </CardHeader>
                <CardContent>
                <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={lossRatioData}>
                        <defs>
                          <linearGradient id="base" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="stressed" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="month" stroke="#64748b" />
                      <YAxis tickFormatter={(v)=>`${Math.round(v*100)}%`} stroke="#64748b" />
                      <ReTooltip 
                        formatter={(v)=>typeof v==="number"?`${Math.round(v*100)}%`:v}
                        contentStyle={{
                          backgroundColor: 'white',
                          border: '1px solid #e2e8f0',
                          borderRadius: '12px',
                          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
                        }}
                      />
                      <Area type="monotone" dataKey="base" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#base)" />
                      <Line type="monotone" dataKey="stressed" stroke="#ef4444" strokeWidth={3} strokeDasharray="5 5" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

            <Card className="rounded-3xl shadow-xl border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white">
                    <TrendingUp className="w-6 h-6"/>
                        </div>
                  <div>
                    <CardTitle className="text-xl font-bold text-slate-800">Africa Risk Map</CardTitle>
                    <CardDescription className="text-slate-600 font-medium">Interactive country risk visualization</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-72 bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl border-2 border-slate-200 p-4">
                  <AfricaMap />
                      </div>
                <div className="mt-4 text-center">
                  <p className="text-xs text-slate-600 font-medium">
                    Click on markers to view detailed risk metrics and climate indicators
                  </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* --- KNOWLEDGE ENGINE --- */}
          <TabsContent value="knowledge">
          <div className="grid lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2 rounded-3xl shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                <SectionHeader icon={BookOpen} title="Chat – Insurance Knowledge Engine" desc="Cited Q&A across policies, regulation, actuarial notes & market research" color="green" />
                </CardHeader>
                <CardContent>
                <div className="h-80 overflow-auto rounded-2xl border-2 border-slate-200 p-4 bg-gradient-to-br from-slate-50 to-blue-50 space-y-4">
                    {messages.map((m, i)=> (
                    <div key={i} className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                      m.role==='user' 
                        ? 'ml-auto bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg' 
                        : 'bg-white border-2 border-slate-200 shadow-md'
                    }`}>
                      <p className="text-sm leading-relaxed font-medium">{m.content}</p>
                      </div>
                    ))}
                  </div>
                <div className="flex items-center gap-3 mt-4">
                    <Input 
                    placeholder="Ask about IFRS17 reserve risk, or 'Compare motor vs health LR in KE'" 
                      value={chat} 
                      onChange={(e)=>setChat(e.target.value)} 
                    className="rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  />
                  <Button 
                    onClick={handleSend}
                    className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white border-0 rounded-xl px-6 shadow-lg"
                  >
                    <Send className="w-4 h-4 mr-2"/>Ask
                  </Button>
                </div>
                <div className="text-xs text-slate-600 mt-3 font-medium bg-slate-100 rounded-lg p-3">
                  Sources: IRA circulars • IPEC bulletins • PIA Zambia • IRA Uganda • Actuarial journals • Internal policy docs
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-3xl shadow-xl border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <SectionHeader icon={Globe} title="Crawler & Feeds" desc="Schedule regulatory & market crawls" color="indigo" />
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { name: "IRA Kenya – Circulars", desc: "Weekly • Diff-based ingestion • Auto-citation", active: true, color: "blue" },
                  { name: "IPEC Zimbabwe – Bulletins", desc: "Weekly", active: true, color: "green" },
                  { name: "PIA Zambia – Notices", desc: "Bi‑weekly", active: false, color: "orange" },
                  { name: "IRA Uganda – Guidelines", desc: "Weekly", active: true, color: "purple" }
                ].map((feed, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-slate-50 to-slate-100 border-2 border-slate-200 hover:shadow-md transition-all duration-300">
                    <div>
                      <div className="font-bold text-slate-800">{feed.name}</div>
                      <div className="text-xs text-slate-600 font-medium">{feed.desc}</div>
                    </div>
                    <Switch 
                      defaultChecked={feed.active}
                      className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-emerald-500 data-[state=checked]:to-teal-500"
                    />
                  </div>
                ))}
                </CardContent>
              </Card>
          </div>
        </TabsContent>

        {/* --- CUSTOMER SIMULATOR --- */}
        <TabsContent value="simulator">
          <Card className="rounded-3xl shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader>
              <SectionHeader icon={MessageSquare} title="Customer Insurance Simulator" desc="White‑label widget for quotes, education & lead capture — insurers can customize products, rules & branding" color="orange" />
                </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label className="text-sm font-bold text-slate-700">Coverage Type</Label>
                    <Select defaultValue="motor">
                      <SelectTrigger className="rounded-xl border-2 border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200">
                        <SelectValue placeholder="Choose coverage"/>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="motor">Motor</SelectItem>
                        <SelectItem value="health">Health</SelectItem>
                        <SelectItem value="property">Property</SelectItem>
                        <SelectItem value="crop">Parametric Crop</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-bold text-slate-700">Location</Label>
                    <Select defaultValue="KE">
                      <SelectTrigger className="rounded-xl border-2 border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200">
                        <SelectValue placeholder="Country"/>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="KE">Kenya</SelectItem>
                        <SelectItem value="UG">Uganda</SelectItem>
                        <SelectItem value="ZM">Zambia</SelectItem>
                        <SelectItem value="ZW">Zimbabwe</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-bold text-slate-700">Household Size</Label>
                    <Input 
                      defaultValue={3} 
                      type="number" 
                      className="rounded-xl border-2 border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                    />
                    </div>

                  <div className="space-y-3">
                    <Label className="text-sm font-bold text-slate-700">Deductible</Label>
                    <Slider 
                      defaultValue={[200]} 
                      max={2000} 
                      step={50}
                      className="w-full"
                    />
                    <div className="text-xs text-slate-600 font-medium">KES 200 - 2,000</div>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-sm font-bold text-slate-700">Coverage Limit (KES '000)</Label>
                    <Slider 
                      defaultValue={[800]} 
                      max={5000} 
                      step={100}
                      className="w-full"
                    />
                    <div className="text-xs text-slate-600 font-medium">KES 800K - 5M</div>
                    </div>

                  <div className="text-xs text-slate-600 bg-orange-50 rounded-lg p-3 border border-orange-200">
                    By continuing you agree to data & privacy terms. Your info may be shared with the selected insurer for quoting.
                  </div>
                    </div>

                <div className="md:col-span-2">
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <Kpi label="Estimated Monthly Premium" value="KES 7,900" sub="Based on inputs & markers" color="green" />
                    <Kpi label="Risk Score" value="Low‑Moderate" sub="Transparent factors shown below" color="blue" />
                  </div>
                  <div className="h-72 bg-white rounded-2xl border-2 border-slate-200 p-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={pricingBands}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="tier" stroke="#64748b" />
                        <YAxis stroke="#64748b" />
                        <ReTooltip 
                          contentStyle={{
                            backgroundColor: 'white',
                            border: '1px solid #e2e8f0',
                            borderRadius: '12px',
                            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
                          }}
                        />
                        <Line type="monotone" dataKey="premium" stroke="#f97316" strokeWidth={4} />
                      </LineChart>
                    </ResponsiveContainer>
                    </div>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Button className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white border-0 rounded-xl px-6 shadow-lg">
                      <Send className="w-4 h-4 mr-2"/> Get Quote
                    </Button>
                    <Button variant="outline" className="border-2 border-slate-300 hover:border-orange-500 hover:bg-orange-50 rounded-xl px-6">
                      <MessageSquare className="w-4 h-4 mr-2"/> Chat with Advisor
                    </Button>
                    <Button variant="outline" className="border-2 border-slate-300 hover:border-green-500 hover:bg-green-50 rounded-xl px-6">
                      <Phone className="w-4 h-4 mr-2"/> Continue in WhatsApp
                    </Button>
                    <Button variant="ghost" className="text-slate-600 hover:text-orange-600 rounded-xl px-6">
                      Share Scenario Link
                    </Button>
                  </div>
                  <div className="text-xs text-slate-600 mt-4 bg-slate-100 rounded-lg p-3">
                    White‑label: theming, product rules, rating factors, and CTAs (quote/bind) are fully configurable per insurer/partner.
            </div>
            </div>
            </div>
            </CardContent>
          </Card>
          </TabsContent>

          {/* --- WHAT-IF ROOM --- */}
          <TabsContent value="whatif">
          <Card className="rounded-3xl shadow-xl border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
              <SectionHeader icon={FlaskConical} title="What‑If Simulation Room" desc="Run interactive shocks & visualize solvency, reserves, and premiums" color="purple" />
              </CardHeader>
              <CardContent>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label className="text-sm font-bold text-slate-700">Market Shock</Label>
                    <Select defaultValue="fx15">
                      <SelectTrigger className="rounded-xl border-2 border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200">
                        <SelectValue placeholder="Select shock"/>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fx15">FX deval −15% (USDKES)</SelectItem>
                        <SelectItem value="infl10">Inflation +10% (YoY)</SelectItem>
                        <SelectItem value="flood2x">Flood frequency ×2</SelectItem>
                        <SelectItem value="drought1in50">Drought 1‑in‑50 event</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-bold text-slate-700">Portfolio</Label>
                    <Select defaultValue="motor">
                      <SelectTrigger className="rounded-xl border-2 border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200">
                        <SelectValue placeholder="Select portfolio"/>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="motor">Motor (KE)</SelectItem>
                        <SelectItem value="health">Health (UG)</SelectItem>
                        <SelectItem value="crop">Crop (ZM)</SelectItem>
                        <SelectItem value="property">Property (ZW)</SelectItem>
                      </SelectContent>
                    </Select>
                    </div>

                  <div className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200">
                    <Label className="text-sm font-bold text-slate-700">Monte Carlo Paths</Label>
                    <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 px-3 py-1 rounded-full font-bold">10,000</Badge>
                  </div>

                  <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white border-0 rounded-xl py-3 shadow-lg">
                    <Play className="w-5 h-5 mr-2"/>Run Scenario
                  </Button>
                </div>

                <div className="md:col-span-2">
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <Kpi label="Solvency Ratio (post‑shock)" value="142%" sub=": −18% vs base" color="red" />
                    <Kpi label="Reserve Uplift" value="+$2.7M" sub="95% VaR" color="indigo" />
                    </div>
                  <div className="h-72 bg-white rounded-2xl border-2 border-slate-200 p-4">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={pricingBands}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="tier" stroke="#64748b" />
                        <YAxis stroke="#64748b" />
                        <ReTooltip 
                          contentStyle={{
                            backgroundColor: 'white',
                            border: '1px solid #e2e8f0',
                            borderRadius: '12px',
                            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
                          }}
                        />
                        <Bar dataKey="premium" fill="#a855f7" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  <div className="text-sm text-slate-700 mt-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-200 font-medium">
                    💡 Recommendation: uplift high‑risk tier by 8–12%; negotiate +5% reinsurance rate cap.
                  </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* --- PRICING & ACTUARIAL --- */}
          <TabsContent value="pricing">
          <div className="grid lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2 rounded-3xl shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                <SectionHeader icon={Calculator} title="Dynamic Pricing Sandbox" desc="Calibrate pricing corridors with external markers" color="indigo" />
                </CardHeader>
                <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-bold text-slate-700">Inflation (YoY)</Label>
                    <Input defaultValue={8.5} type="number" step="0.1" className="rounded-xl border-2 border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200" />
                    </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-bold text-slate-700">FX Stress (%)</Label>
                    <Input defaultValue={12} type="number" step="0.5" className="rounded-xl border-2 border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200" />
                    </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-bold text-slate-700">Reinsurance Rate (+bps)</Label>
                    <Input defaultValue={75} type="number" step="5" className="rounded-xl border-2 border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200" />
                  </div>
                </div>
                <Separator className="my-6" />
                <div className="h-72 bg-white rounded-2xl border-2 border-slate-200 p-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={pricingBands}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="tier" stroke="#64748b" />
                      <YAxis stroke="#64748b" />
                      <ReTooltip 
                        contentStyle={{
                          backgroundColor: 'white',
                          border: '1px solid #e2e8f0',
                          borderRadius: '12px',
                          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
                        }}
                      />
                      <Line type="monotone" dataKey="premium" stroke="#6366f1" strokeWidth={4} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                <div className="text-sm text-slate-700 mt-4 bg-indigo-50 rounded-lg p-4 border border-indigo-200 font-medium">
                  💡 Note: Corridors update with macro deltas; export to Product Canvas for rollout.
                </div>
                </CardContent>
              </Card>

            <Card className="rounded-3xl shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                <SectionHeader icon={Scale} title="Actuarial Models" desc="Configure mortality/morbidity & loss development" color="cyan" />
                </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-50 to-slate-100 border-2 border-slate-200">
                  <div className="font-bold text-slate-800 mb-2">Mortality Table</div>
                    <Select defaultValue="ifoa2020">
                    <SelectTrigger className="rounded-xl border-2 border-slate-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200">
                      <SelectValue placeholder="Select table"/>
                    </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ifoa2020">IFoA 2020 Adj (KE)</SelectItem>
                        <SelectItem value="soa2015">SOA 2015 (US base)</SelectItem>
                        <SelectItem value="custom">Custom (upload)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-50 to-slate-100 border-2 border-slate-200">
                  <div className="font-bold text-slate-800 mb-2">Loss Development</div>
                    <Select defaultValue="chainladder">
                    <SelectTrigger className="rounded-xl border-2 border-slate-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200">
                      <SelectValue placeholder="Method"/>
                    </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="chainladder">Chain Ladder</SelectItem>
                        <SelectItem value="macks">Mack's Method</SelectItem>
                        <SelectItem value="bootstrap">Bootstrap ODP</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                <Button className="w-full bg-gradient-to-r from-cyan-500 to-emerald-600 hover:from-cyan-600 hover:to-emerald-700 text-white border-0 rounded-xl py-3 shadow-lg">
                  <Wand2 className="w-4 h-4 mr-2"/> Recompute Reserves
                </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* --- PRODUCT CANVAS --- */}
          <TabsContent value="canvas">
          <Card className="rounded-3xl shadow-xl border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
              <SectionHeader icon={LayoutTemplate} title="Product Development Canvas" desc="Design, simulate, and package new products" color="cyan" />
              </CardHeader>
              <CardContent>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label className="text-sm font-bold text-slate-700">Product Template</Label>
                    <Select defaultValue="microhealth">
                      <SelectTrigger className="rounded-xl border-2 border-slate-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200">
                        <SelectValue placeholder="Choose template"/>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="microhealth">Micro‑Health (KE Low‑Income)</SelectItem>
                        <SelectItem value="motor">Motor Tiered (UG)</SelectItem>
                        <SelectItem value="crop">Parametric Crop (ZM drought)</SelectItem>
                        <SelectItem value="property">Property Flood (ZW urban)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-bold text-slate-700">Target Segment</Label>
                    <Input defaultValue="Urban low‑income families" className="rounded-xl border-2 border-slate-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200" />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-bold text-slate-700">Premium Corridor (KES)</Label>
                    <div className="flex gap-3">
                      <Input defaultValue={6000} type="number" className="rounded-xl border-2 border-slate-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200" />
                      <Input defaultValue={9000} type="number" className="rounded-xl border-2 border-slate-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200" />
                    </div>
                    </div>

                  <Button className="w-full bg-gradient-to-r from-cyan-500 to-emerald-600 hover:from-cyan-600 hover:to-emerald-700 text-white border-0 rounded-xl py-3 shadow-lg">
                    <Wand2 className="w-5 h-5 mr-2"/> Generate Pack
                  </Button>
                  </div>

                  <div className="md:col-span-2">
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <Kpi label="Projected LR" value="54%" sub="Base scenario" color="green" />
                    <Kpi label="Uptake (12m)" value="38%" sub="Marketing index mid" color="blue" />
                    </div>
                  <div className="h-72 bg-white rounded-2xl border-2 border-slate-200 p-4">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={lossRatioData}>
                        <defs>
                          <linearGradient id="canvasBase" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="month" stroke="#64748b" />
                        <YAxis tickFormatter={(v)=>`${Math.round(v*100)}%`} stroke="#64748b" />
                        <ReTooltip 
                          contentStyle={{
                            backgroundColor: 'white',
                            border: '1px solid #e2e8f0',
                            borderRadius: '12px',
                            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
                          }}
                        />
                        <Area type="monotone" dataKey="base" stroke="#06b6d4" strokeWidth={3} fill="url(#canvasBase)" />
                        <Line type="monotone" dataKey="stressed" stroke="#10b981" strokeWidth={3} strokeDasharray="5 5" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  <div className="flex items-center justify-between mt-6">
                    <Button variant="outline" className="border-2 border-slate-300 hover:border-cyan-500 hover:bg-cyan-50 rounded-xl px-6">
                      <Layers className="w-4 h-4 mr-2"/> Compare Scenarios
                    </Button>
                    <Button className="bg-gradient-to-r from-cyan-500 to-emerald-600 hover:from-cyan-600 hover:to-emerald-700 text-white border-0 rounded-xl px-6 shadow-lg">
                      <LayoutTemplate className="w-4 h-4 mr-2"/> Export Reg Pack (PDF)
                    </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* --- DATA & SIGNALS --- */}
          <TabsContent value="data">
          <div className="grid lg:grid-cols-3 gap-6">
            <Card className="rounded-3xl shadow-xl border-0 bg-white/80 backdrop-blur-sm lg:col-span-2">
                <CardHeader>
                <SectionHeader icon={Database} title="Data Ingestion" desc="Pipelines for policies, claims, journals, climate & market feeds" color="slate" />
                </CardHeader>
                <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    { name: "Claims Intake (CSV/API)", desc: "PII scrub, de‑dup, vectorize notes", progress: 78, color: "blue" },
                    { name: "Policy Docs (PDF)", desc: "Chunk, classify, embed, cross‑link endorsements", progress: 62, color: "green" },
                    { name: "Regulatory Feeds", desc: "Diff ingest & auto‑citation", progress: 90, color: "purple" },
                    { name: "Climate & Market", desc: "Rainfall, FX, inflation, reins. rates", progress: 52, color: "orange" }
                  ].map((item, index) => (
                    <div key={index} className="p-4 rounded-2xl bg-gradient-to-r from-slate-50 to-slate-100 border-2 border-slate-200 hover:shadow-md transition-all duration-300">
                      <div className="font-bold text-slate-800 mb-2">{item.name}</div>
                      <Progress value={item.progress} className="mt-2 h-3 rounded-full" />
                      <div className="text-xs text-slate-600 mt-2 font-medium">{item.desc}</div>
                    </div>
                  ))}
                  </div>
                </CardContent>
              </Card>

            <Card className="rounded-3xl shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                <SectionHeader icon={Activity} title="Model Status" desc="Deployments & evaluations" color="rose" />
                </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { name: "SLM‑Claims‑v0.9", desc: "F1 0.78 • Halluc. 1.2% • Refusal 0.6%", status: "Active", color: "green" },
                  { name: "Pricing‑LoRA‑v0.4", desc: "MAPE 6.8% • Drift ↑", status: "Canary", color: "red" },
                  { name: "IFRS17‑Compliance‑v0.3", desc: "Precision 0.91 • Coverage 87%", status: "Staging", color: "blue" }
                ].map((model, index) => (
                  <div key={index} className="p-4 rounded-2xl bg-gradient-to-r from-slate-50 to-slate-100 border-2 border-slate-200 flex items-center justify-between hover:shadow-md transition-all duration-300">
                    <div>
                      <div className="font-bold text-slate-800">{model.name}</div>
                      <div className="text-xs text-slate-600 font-medium">{model.desc}</div>
                    </div>
                    <Badge className={`${
                      model.color === 'green' ? 'bg-gradient-to-r from-emerald-500 to-teal-500' :
                      model.color === 'red' ? 'bg-gradient-to-r from-red-500 to-pink-500' :
                      'bg-gradient-to-r from-blue-500 to-indigo-500'
                    } text-white border-0 px-3 py-1 rounded-full font-bold`}>
                      {model.status}
                    </Badge>
                  </div>
                ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* --- GOVERNANCE --- */}
          <TabsContent value="governance">
          <Card className="rounded-3xl shadow-xl border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
              <SectionHeader icon={ShieldCheck} title="Governance & Compliance" desc="RBAC, audit trails, safety policies, data residency" color="rose" />
              </CardHeader>
              <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { 
                    title: "Roles & Access", 
                    desc: "Claims, Actuary, Exec, Regulator", 
                    icon: Lock, 
                    color: "blue",
                    buttonText: "Manage"
                  },
                  { 
                    title: "Data Residency", 
                    desc: "KE | UG | ZM | ZW", 
                    icon: Database, 
                    color: "green",
                    buttonText: "Configure"
                  },
                  { 
                    title: "Safety Policies", 
                    desc: "Prompt filters • PII redaction • Audit logs", 
                    icon: ShieldCheck, 
                    color: "purple",
                    buttonText: "Review"
                  }
                ].map((item, index) => (
                  <div key={index} className="p-6 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 border-2 border-slate-200 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${
                        item.color === 'blue' ? 'from-blue-500 to-blue-600' :
                        item.color === 'green' ? 'from-emerald-500 to-emerald-600' :
                        'from-purple-500 to-purple-600'
                      } text-white`}>
                        <item.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-800 text-lg">{item.title}</div>
                        <div className="text-sm text-slate-600 font-medium">{item.desc}</div>
                  </div>
                  </div>
                    <Button className={`w-full bg-gradient-to-r ${
                      item.color === 'blue' ? 'from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700' :
                      item.color === 'green' ? 'from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700' :
                      'from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700'
                    } text-white border-0 rounded-xl py-3 shadow-lg`}>
                      <item.icon className="w-4 h-4 mr-2"/> {item.buttonText}
                    </Button>
                  </div>
                ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          </Tabs>
        </div>

        <footer className="mt-12 text-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-gray-200/50 p-6 shadow-lg">
              <p className="text-sm text-gray-600 font-medium">
                © {new Date().getFullYear()} Insurance SLM Platform • Demo UI for design & stakeholder alignment
              </p>
            </div>
          </div>
        </footer>
    </div>
  );
}
