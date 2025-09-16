import React, { useMemo, useState, useRef } from "react";
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
import { PDFExport } from "@/components/PDFExport";
import { SimplePDFTest } from "@/components/SimplePDFTest";
import { SimpleCompletePDFExport } from "@/components/SimpleCompletePDFExport";

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

// --- Main Preview Component ---
export default function InsuranceSLMPlatformPreview() {
  const [chat, setChat] = useState<string>("");
  const [showTestPage, setShowTestPage] = useState<boolean>(false);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [messages, setMessages] = useState<Array<{ role: "user" | "assistant"; content: string }>>([
    { role: "assistant", content: "Hi! I'm your Insurance Knowledge Engine. Ask about policies, pricing bands, IFRS17, or run a scenario." },
  ]);

  // Refs for PDF export
  const dashboardRef = useRef<HTMLDivElement>(null);
  const knowledgeRef = useRef<HTMLDivElement>(null);
  const whatifRef = useRef<HTMLDivElement>(null);
  const pricingRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const dataRef = useRef<HTMLDivElement>(null);
  const governanceRef = useRef<HTMLDivElement>(null);

  const sectionRefs = [
    { name: "Dashboard", ref: dashboardRef },
    { name: "Knowledge Engine", ref: knowledgeRef },
    { name: "What-If Room", ref: whatifRef },
    { name: "Pricing & Actuarial", ref: pricingRef },
    { name: "Product Canvas", ref: canvasRef },
    { name: "Data & Signals", ref: dataRef },
    { name: "Governance", ref: governanceRef },
  ];

  const handleSend = () => {
    if (!chat.trim()) return;
    const next = [...messages, { role: "user", content: chat }];
    // Mock assistant echo
    next.push({ role: "assistant", content: `Working on: ${chat}. (This is a mock response with citations and links to internal docs.)` });
    setMessages(next);
    setChat("");
  };

  if (showTestPage) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold">PDF Export Test Page</h1>
            <Button onClick={() => setShowTestPage(false)} variant="outline">
              Back to App
            </Button>
          </div>
          <p className="text-center text-muted-foreground mb-8">
            This page tests the PDF export functionality. Try the test button below.
          </p>
          <SimplePDFTest />
        </div>
      </div>
    );
  }

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 p-6">
        {/* Header */}
        <motion.header initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-2xl bg-primary/10"><Brain className="w-6 h-6" /></div>
              <div>
                <h1 className="text-2xl font-bold">Insurance SLM Platform</h1>
                <p className="text-sm text-muted-foreground">Knowledge Engine • Simulation • Dynamic Pricing • Product Canvas • Governance</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="rounded-full">Pilot: KE • UG • ZM • ZW</Badge>
              <Button size="sm" variant="outline" onClick={() => setShowTestPage(!showTestPage)}>
                {showTestPage ? 'Back to App' : 'Test PDF'}
              </Button>
              <SimpleCompletePDFExport />
              <Button size="sm" variant="outline"><Settings className="w-4 h-4 mr-2"/> Admin</Button>
            </div>
          </div>
        </motion.header>

        <Tabs defaultValue="dashboard" className="">
          <TabsList className="grid grid-cols-7 w-full mb-4">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="knowledge">Knowledge Engine</TabsTrigger>
            <TabsTrigger value="whatif">What‑If Room</TabsTrigger>
            <TabsTrigger value="pricing">Pricing & Actuarial</TabsTrigger>
            <TabsTrigger value="canvas">Product Canvas</TabsTrigger>
            <TabsTrigger value="data">Data & Signals</TabsTrigger>
            <TabsTrigger value="governance">Governance</TabsTrigger>
          </TabsList>

          {/* --- DASHBOARD --- */}
          <TabsContent value="dashboard">
            <div ref={dashboardRef}>
            <div className="grid xl:grid-cols-4 md:grid-cols-2 gap-4 mb-4">
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
            <div className="mt-4 flex justify-end">
              <PDFExport sectionName="Dashboard" contentRef={dashboardRef} />
            </div>
            </div>
          </TabsContent>

          {/* --- KNOWLEDGE ENGINE --- */}
          <TabsContent value="knowledge">
            <div ref={knowledgeRef}>
            <div className="grid lg:grid-cols-3 gap-4">
              <Card className="lg:col-span-2 rounded-2xl shadow-sm">
                <CardHeader>
                  <SectionHeader icon={BookOpen} title="Chat – Insurance Knowledge Engine" desc="Cited Q&A across policies, regulation, actuarial notes & market research" />
                </CardHeader>
                <CardContent>
                  <div className="h-72 overflow-auto rounded-xl border p-3 bg-muted/30 space-y-3">
                    {messages.map((m, i)=> (
                      <div key={i} className={`max-w-[85%] rounded-2xl px-3 py-2 ${m.role==='user' ? 'ml-auto bg-primary text-primary-foreground' : 'bg-background border'}`}>
                        <p className="text-sm leading-relaxed">{m.content}</p>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 mt-3">
                    <Input placeholder="Ask about IFRS17 reserve risk, or 'Compare motor vs health LR in KE'" value={chat} onChange={(e)=>setChat(e.target.value)} />
                    <Button onClick={handleSend}><Send className="w-4 h-4 mr-2"/>Ask</Button>
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
                  <div className="flex items-center justify-between p-3 rounded-xl border">
                    <div>
                      <div className="font-medium">PIA Zambia – Notices</div>
                      <div className="text-xs text-muted-foreground">Bi‑weekly</div>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-xl border">
                    <div>
                      <div className="font-medium">IRA Uganda – Guidelines</div>
                      <div className="text-xs text-muted-foreground">Weekly</div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="mt-4 flex justify-end">
              <PDFExport sectionName="Knowledge Engine" contentRef={knowledgeRef} />
            </div>
            </div>
          </TabsContent>

          {/* --- WHAT-IF ROOM --- */}
          <TabsContent value="whatif">
            <div ref={whatifRef}>
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
            <div className="mt-4 flex justify-end">
              <PDFExport sectionName="What-If Room" contentRef={whatifRef} />
            </div>
            </div>
          </TabsContent>

          {/* --- PRICING & ACTUARIAL --- */}
          <TabsContent value="pricing">
            <div ref={pricingRef}>
            <div className="grid lg:grid-cols-3 gap-4">
              <Card className="lg:col-span-2 rounded-2xl shadow-sm">
                <CardHeader>
                  <SectionHeader icon={Calculator} title="Dynamic Pricing Sandbox" desc="Calibrate pricing corridors with external markers" />
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-3">
                    <div>
                      <Label>Inflation (YoY)</Label>
                      <Input defaultValue={8.5} type="number" step="0.1" />
                    </div>
                    <div>
                      <Label>FX Stress (%)</Label>
                      <Input defaultValue={12} type="number" step="0.5" />
                    </div>
                    <div>
                      <Label>Reinsurance Rate (+bps)</Label>
                      <Input defaultValue={75} type="number" step="5" />
                    </div>
                  </div>
                  <Separator className="my-3" />
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={pricingBands}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="tier" />
                        <YAxis />
                        <ReTooltip />
                        <Line type="monotone" dataKey="premium" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="text-xs text-muted-foreground mt-2">Note: Corridors update with macro deltas; export to Product Canvas for rollout.</div>
                </CardContent>
              </Card>

              <Card className="rounded-2xl shadow-sm">
                <CardHeader>
                  <SectionHeader icon={Scale} title="Actuarial Models" desc="Configure mortality/morbidity & loss development" />
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-3 rounded-xl border">
                    <div className="font-medium mb-1">Mortality Table</div>
                    <Select defaultValue="ifoa2020">
                      <SelectTrigger><SelectValue placeholder="Select table"/></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ifoa2020">IFoA 2020 Adj (KE)</SelectItem>
                        <SelectItem value="soa2015">SOA 2015 (US base)</SelectItem>
                        <SelectItem value="custom">Custom (upload)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="p-3 rounded-xl border">
                    <div className="font-medium mb-1">Loss Development</div>
                    <Select defaultValue="chainladder">
                      <SelectTrigger><SelectValue placeholder="Method"/></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="chainladder">Chain Ladder</SelectItem>
                        <SelectItem value="macks">Mack's Method</SelectItem>
                        <SelectItem value="bootstrap">Bootstrap ODP</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button variant="outline" className="w-full"><Wand2 className="w-4 h-4 mr-2"/> Recompute Reserves</Button>
                </CardContent>
              </Card>
            </div>
            <div className="mt-4 flex justify-end">
              <PDFExport sectionName="Pricing & Actuarial" contentRef={pricingRef} />
            </div>
            </div>
          </TabsContent>

          {/* --- PRODUCT CANVAS --- */}
          <TabsContent value="canvas">
            <div ref={canvasRef}>
            <Card className="rounded-2xl shadow-sm">
              <CardHeader>
                <SectionHeader icon={LayoutTemplate} title="Product Development Canvas" desc="Design, simulate, and package new products" />
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-3">
                    <Label>Product Template</Label>
                    <Select defaultValue="microhealth">
                      <SelectTrigger><SelectValue placeholder="Choose template"/></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="microhealth">Micro‑Health (KE Low‑Income)</SelectItem>
                        <SelectItem value="motor">Motor Tiered (UG)</SelectItem>
                        <SelectItem value="crop">Parametric Crop (ZM drought)</SelectItem>
                        <SelectItem value="property">Property Flood (ZW urban)</SelectItem>
                      </SelectContent>
                    </Select>

                    <Label>Target Segment</Label>
                    <Input defaultValue="Urban low‑income families" />

                    <Label>Premium Corridor (KES)</Label>
                    <div className="flex gap-2">
                      <Input defaultValue={6000} type="number" />
                      <Input defaultValue={9000} type="number" />
                    </div>

                    <Button className="w-full"><Wand2 className="w-4 h-4 mr-2"/> Generate Pack</Button>
                  </div>

                  <div className="md:col-span-2">
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <Kpi label="Projected LR" value="54%" sub="Base scenario" />
                      <Kpi label="Uptake (12m)" value="38%" sub="Marketing index mid" />
                    </div>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={lossRatioData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis tickFormatter={(v)=>`${Math.round(v*100)}%`} />
                          <ReTooltip />
                          <Area type="monotone" dataKey="base" />
                          <Line type="monotone" dataKey="stressed" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <Button variant="outline"><Layers className="w-4 h-4 mr-2"/> Compare Scenarios</Button>
                      <Button><LayoutTemplate className="w-4 h-4 mr-2"/> Export Reg Pack (PDF)</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <div className="mt-4 flex justify-end">
              <PDFExport sectionName="Product Canvas" contentRef={canvasRef} />
            </div>
            </div>
          </TabsContent>

          {/* --- DATA & SIGNALS --- */}
          <TabsContent value="data">
            <div ref={dataRef}>
            <div className="grid lg:grid-cols-3 gap-4">
              <Card className="rounded-2xl shadow-sm lg:col-span-2">
                <CardHeader>
                  <SectionHeader icon={Database} title="Data Ingestion" desc="Pipelines for policies, claims, journals, climate & market feeds" />
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-3">
                    <div className="p-3 rounded-xl border">
                      <div className="font-medium">Claims Intake (CSV/API)</div>
                      <Progress value={78} className="mt-2"/>
                      <div className="text-xs text-muted-foreground mt-1">PII scrub, de‑dup, vectorize notes</div>
                    </div>
                    <div className="p-3 rounded-xl border">
                      <div className="font-medium">Policy Docs (PDF)</div>
                      <Progress value={62} className="mt-2"/>
                      <div className="text-xs text-muted-foreground mt-1">Chunk, classify, embed, cross‑link endorsements</div>
                    </div>
                    <div className="p-3 rounded-xl border">
                      <div className="font-medium">Regulatory Feeds</div>
                      <Progress value={90} className="mt-2"/>
                      <div className="text-xs text-muted-foreground mt-1">Diff ingest & auto‑citation</div>
                    </div>
                    <div className="p-3 rounded-xl border">
                      <div className="font-medium">Climate & Market</div>
                      <Progress value={52} className="mt-2"/>
                      <div className="text-xs text-muted-foreground mt-1">Rainfall, FX, inflation, reins. rates</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-2xl shadow-sm">
                <CardHeader>
                  <SectionHeader icon={Activity} title="Model Status" desc="Deployments & evaluations" />
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-3 rounded-xl border flex items-center justify-between">
                    <div>
                      <div className="font-medium">SLM‑Claims‑v0.9</div>
                      <div className="text-xs text-muted-foreground">F1 0.78 • Halluc. 1.2% • Refusal 0.6%</div>
                    </div>
                    <Badge>Active</Badge>
                  </div>
                  <div className="p-3 rounded-xl border flex items-center justify-between">
                    <div>
                      <div className="font-medium">Pricing‑LoRA‑v0.4</div>
                      <div className="text-xs text-muted-foreground">MAPE 6.8% • Drift ↑</div>
                    </div>
                    <Badge variant="destructive">Canary</Badge>
                  </div>
                  <div className="p-3 rounded-xl border flex items-center justify-between">
                    <div>
                      <div className="font-medium">IFRS17‑Compliance‑v0.3</div>
                      <div className="text-xs text-muted-foreground">Precision 0.91 • Coverage 87%</div>
                    </div>
                    <Badge variant="outline">Staging</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="mt-4 flex justify-end">
              <PDFExport sectionName="Data & Signals" contentRef={dataRef} />
            </div>
            </div>
          </TabsContent>

          {/* --- GOVERNANCE --- */}
          <TabsContent value="governance">
            <div ref={governanceRef}>
            <Card className="rounded-2xl shadow-sm">
              <CardHeader>
                <SectionHeader icon={ShieldCheck} title="Governance & Compliance" desc="RBAC, audit trails, safety policies, data residency" />
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-3 rounded-xl border">
                    <div className="font-medium">Roles & Access</div>
                    <div className="text-xs text-muted-foreground">Claims, Actuary, Exec, Regulator</div>
                    <Button size="sm" variant="outline" className="mt-2"><Lock className="w-4 h-4 mr-2"/> Manage</Button>
                  </div>
                  <div className="p-3 rounded-xl border">
                    <div className="font-medium">Data Residency</div>
                    <div className="text-xs text-muted-foreground">KE | UG | ZM | ZW</div>
                    <Button size="sm" variant="outline" className="mt-2"><Database className="w-4 h-4 mr-2"/> Configure</Button>
                  </div>
                  <div className="p-3 rounded-xl border">
                    <div className="font-medium">Safety Policies</div>
                    <div className="text-xs text-muted-foreground">Prompt filters • PII redaction • Audit logs</div>
                    <Button size="sm" variant="outline" className="mt-2"><ShieldCheck className="w-4 h-4 mr-2"/> Review</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            <div className="mt-4 flex justify-end">
              <PDFExport sectionName="Governance" contentRef={governanceRef} />
            </div>
            </div>
          </TabsContent>
        </Tabs>

        <footer className="mt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Insurance SLM Platform • Demo UI for design & stakeholder alignment
        </footer>
      </div>
    </TooltipProvider>
  );
}
