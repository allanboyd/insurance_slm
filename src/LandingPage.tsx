import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Brain, 
  ShieldCheck, 
  TrendingUp, 
  Calculator, 
  FlaskConical, 
  LayoutTemplate,
  Database,
  Globe,
  ArrowRight,
  Star,
  CheckCircle,
  Users,
  Target,
  Zap,
  BarChart3,
  MessageSquare,
  Phone,
  Play,
  Clock,
  PieChart,
  FileText,
  AlertTriangle,
  DollarSign,
  Building2,
  Smartphone,
  Cloud,
  Lock,
  Activity,
  TrendingDown,
  Award,
  Lightbulb,
  MapPin,
  BarChart2,
  LineChart,
  CreditCard,
  Shield,
  Eye,
  Settings,
  RefreshCw
} from "lucide-react";

const LandingPage = ({ onEnterDashboard }: { onEnterDashboard: () => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    // Add smooth scrolling behavior
    const handleSmoothScroll = (e: Event) => {
      const target = e.target as HTMLAnchorElement;
      if (target.hash) {
        e.preventDefault();
        const element = document.querySelector(target.hash);
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }
      }
    };

    // Add scroll listener for navigation background
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    // Add event listeners to all anchor links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
      link.addEventListener('click', handleSmoothScroll);
    });

    // Add scroll listener
    window.addEventListener('scroll', handleScroll);

    // Cleanup
    return () => {
      links.forEach(link => {
        link.removeEventListener('click', handleSmoothScroll);
      });
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white scroll-smooth">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <div className={`p-2 rounded-xl transition-colors duration-300 ${
                  isScrolled 
                    ? 'bg-gradient-to-br from-cyan-500 to-teal-600' 
                    : 'bg-gradient-to-br from-cyan-500 to-teal-600'
                }`}>
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <span className={`ml-3 text-2xl font-bold transition-colors duration-300 ${
                  isScrolled 
                    ? 'bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent' 
                    : 'text-gray-800 drop-shadow-sm'
                }`}>
                  Insurance AI SLM
                </span>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-2">
                <a 
                  href="#features" 
                  className={`px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg ${
                    isScrolled 
                      ? 'text-gray-700 hover:text-cyan-600 hover:bg-gray-100' 
                      : 'text-gray-800 hover:text-cyan-600 bg-white/20 backdrop-blur-sm hover:bg-white/30 shadow-sm'
                  }`}
                >
                  Features
                </a>
                <a 
                  href="#solutions" 
                  className={`px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg ${
                    isScrolled 
                      ? 'text-gray-700 hover:text-cyan-600 hover:bg-gray-100' 
                      : 'text-gray-800 hover:text-cyan-600 bg-white/20 backdrop-blur-sm hover:bg-white/30 shadow-sm'
                  }`}
                >
                  Solutions
                </a>
                <a 
                  href="#pricing" 
                  className={`px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg ${
                    isScrolled 
                      ? 'text-gray-700 hover:text-cyan-600 hover:bg-gray-100' 
                      : 'text-gray-800 hover:text-cyan-600 bg-white/20 backdrop-blur-sm hover:bg-white/30 shadow-sm'
                  }`}
                >
                  Pricing
                </a>
                <a 
                  href="#contact" 
                  className={`px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg ${
                    isScrolled 
                      ? 'text-gray-700 hover:text-cyan-600 hover:bg-gray-100' 
                      : 'text-gray-800 hover:text-cyan-600 bg-white/20 backdrop-blur-sm hover:bg-white/30 shadow-sm'
                  }`}
                >
                  Contact
                </a>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button 
                onClick={onEnterDashboard}
                className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 ${
                  isScrolled 
                    ? 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white' 
                    : 'bg-orange-500 hover:bg-orange-600 text-white shadow-lg hover:shadow-xl'
                }`}
              >
                View Analysis
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-cyan-50 via-teal-50 to-orange-50 pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-orange-500/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >

              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Because Insurance Is 
                <span className="bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent"> Complicated Enough</span>
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed">
                The Bloomberg Terminal of Insurance in Africa. A specialized AI brain with continuous learning, 
                regulatory awareness, and actuarial intelligence to help insurers cut costs, reduce fraud, 
                and accelerate product innovation.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={onEnterDashboard}
                  size="lg"
                  className="bg-gradient-to-r from-cyan-500 to-teal-600 hover:from-cyan-600 hover:to-teal-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg"
                >
                  <BarChart3 className="w-6 h-6 mr-2" />
                  View Live Analysis
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  className="border-2 border-orange-500 text-orange-600 hover:bg-orange-50 px-8 py-4 text-lg font-semibold rounded-xl"
                >
                  <Play className="w-6 h-6 mr-2" />
                  Watch Demo
                </Button>
              </div>

              <div className="flex items-center space-x-8 pt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">135+</div>
                  <div className="text-sm text-gray-600">Insurers</div>
                </div>
                <div className="w-px h-12 bg-gray-300"></div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">4</div>
                  <div className="text-sm text-gray-600">Countries</div>
                </div>
                <div className="w-px h-12 bg-gray-300"></div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">$8-9M</div>
                  <div className="text-sm text-gray-600">ARR Target</div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              {/* Main Dashboard Preview */}
              <div className="relative bg-white rounded-3xl shadow-2xl p-8 border border-gray-200">
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full opacity-20"></div>
                <div className="space-y-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Live Insurance Analytics</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gradient-to-br from-cyan-50 to-teal-50 p-4 rounded-xl">
                        <div className="flex items-center justify-center mb-2">
                          <TrendingDown className="w-6 h-6 text-cyan-600" />
                        </div>
                        <div className="text-2xl font-bold text-cyan-600">15-25%</div>
                        <div className="text-sm text-gray-600">Claims Leakage Reduction</div>
                      </div>
                      <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-xl">
                        <div className="flex items-center justify-center mb-2">
                          <Zap className="w-6 h-6 text-orange-600" />
                        </div>
                        <div className="text-2xl font-bold text-orange-600">30-40%</div>
                        <div className="text-sm text-gray-600">Faster Processing</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Feature Cards */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="absolute -left-4 -top-4 bg-white rounded-2xl shadow-lg p-4 border border-gray-200"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-teal-600 rounded-lg flex items-center justify-center">
                    <Brain className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900">AI Assistant</div>
                    <div className="text-xs text-gray-600">24/7 Support</div>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="absolute -right-4 -bottom-4 bg-white rounded-2xl shadow-lg p-4 border border-gray-200"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                    <BarChart3 className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900">Real-time Analytics</div>
                    <div className="text-xs text-gray-600">Live Dashboard</div>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.0 }}
                className="absolute -left-8 top-1/2 bg-white rounded-2xl shadow-lg p-4 border border-gray-200"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-lg flex items-center justify-center">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900">Secure Platform</div>
                    <div className="text-xs text-gray-600">Enterprise Grade</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section id="solutions" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">The Insurance Challenge</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Insurance penetration in Africa remains below 5% of GDP. Insurers face rising fraud, 
              thin margins, slow product launches, and regulatory scrutiny.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                icon: TrendingDown, 
                title: "Low Penetration", 
                desc: "Below 5% of GDP in Africa", 
                color: "cyan",
                visual: "📊",
                stat: "5%"
              },
              { 
                icon: AlertTriangle, 
                title: "Rising Fraud", 
                desc: "Compressing margins", 
                color: "orange",
                visual: "⚠️",
                stat: "25%"
              },
              { 
                icon: Clock, 
                title: "Slow Launches", 
                desc: "12+ month product cycles", 
                color: "teal",
                visual: "⏰",
                stat: "12+"
              },
              { 
                icon: FileText, 
                title: "Regulatory Pressure", 
                desc: "IFRS-17 compliance", 
                color: "orange",
                visual: "📋",
                stat: "IFRS-17"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="text-center group hover:scale-105 transition-transform duration-300"
              >
                <div className={`w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${
                  item.color === 'cyan' ? 'from-cyan-500 to-teal-600' :
                  item.color === 'orange' ? 'from-orange-500 to-orange-600' :
                  'from-teal-500 to-cyan-600'
                } flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow`}>
                  <item.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 mb-2">{item.desc}</p>
                <div className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                  item.color === 'cyan' ? 'bg-cyan-100 text-cyan-700' :
                  item.color === 'orange' ? 'bg-orange-100 text-orange-700' :
                  'bg-teal-100 text-teal-700'
                }`}>
                  {item.stat}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Products Section */}
      <section id="features" className="py-20 bg-gradient-to-br from-gray-50 to-cyan-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Core Products</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A comprehensive suite of AI-powered tools designed specifically for the insurance industry
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Brain,
                title: "Insurance SLM",
                desc: "Domain-tuned assistant for claims, underwriting, compliance, fraud, IFRS-17",
                color: "cyan",
                features: ["Claims Processing", "Underwriting Support", "Fraud Detection", "IFRS-17 Compliance"],
                visual: "🤖"
              },
              {
                icon: Calculator,
                title: "Simulation & Actuarial Engine",
                desc: "Monte-Carlo stress tests, solvency/reserve impact, VaR/TVaR analysis",
                color: "orange",
                features: ["Monte-Carlo Tests", "Solvency Analysis", "VaR/TVaR", "Reserve Impact"],
                visual: "📊"
              },
              {
                icon: TrendingUp,
                title: "Dynamic Pricing",
                desc: "Premium corridors that react to FX, inflation, climate & reinsurer rates",
                color: "teal",
                features: ["FX Integration", "Climate Factors", "Inflation Tracking", "Real-time Updates"],
                visual: "💰"
              },
              {
                icon: LayoutTemplate,
                title: "Product Canvas",
                desc: "Drag-and-drop product design with auto compliance pack for filing",
                color: "orange",
                features: ["Drag & Drop", "Auto Compliance", "Filing Packs", "Product Design"],
                visual: "🎨"
              },
              {
                icon: Database,
                title: "Knowledge Engine",
                desc: "Insurance-only 'ChatGPT + Bloomberg' with regulator/market feeds",
                color: "cyan",
                features: ["Market Feeds", "Regulatory Updates", "AI Chat", "Data Integration"],
                visual: "🧠"
              },
              {
                icon: MessageSquare,
                title: "Customer Simulator",
                desc: "White-label simulator for customer acquisition and data collection",
                color: "teal",
                features: ["White-label", "Customer Acquisition", "Data Collection", "Premium Estimates"],
                visual: "👥"
              }
            ].map((product, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="group"
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm group-hover:scale-105">
                  <CardHeader>
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${
                      product.color === 'cyan' ? 'from-cyan-500 to-teal-600' :
                      product.color === 'orange' ? 'from-orange-500 to-orange-600' :
                      'from-teal-500 to-cyan-600'
                    } flex items-center justify-center shadow-lg mb-4`}>
                      <product.icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-xl font-bold text-gray-900 mb-2">{product.title}</CardTitle>
                    <CardDescription className="text-gray-600 leading-relaxed mb-4">
                      {product.desc}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold text-gray-700 mb-2">Key Features:</h4>
                      <div className="flex flex-wrap gap-2">
                        {product.features.map((feature, featureIndex) => (
                          <span
                            key={featureIndex}
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              product.color === 'cyan' ? 'bg-cyan-100 text-cyan-700' :
                              product.color === 'orange' ? 'bg-orange-100 text-orange-700' :
                              'bg-teal-100 text-teal-700'
                            }`}
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-cyan-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="grid lg:grid-cols-2 gap-16 items-start"
          >
            {/* Left Section - Content */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div>
                <div className="text-cyan-600 text-sm font-bold uppercase tracking-wider mb-4">
                  Insurance AI SLM Platform
                </div>
                <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
                  How It Works
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-8">
                  Our AI-powered platform processes insurance data through advanced machine learning 
                  to deliver real-time insights, dynamic pricing, and intelligent decision support.
                </p>
                <Button 
                  onClick={onEnterDashboard}
                  className="bg-gradient-to-r from-cyan-500 to-teal-600 hover:from-cyan-600 hover:to-teal-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg"
                >
                  View Live Demo
                </Button>
              </div>
            </motion.div>

            {/* Right Section - Process Flow */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              {/* Process Steps Container */}
              <div className="bg-white rounded-3xl shadow-2xl p-8 relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan-100 to-teal-100 rounded-full -translate-y-16 translate-x-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full translate-y-12 -translate-x-12"></div>
                
                <div className="relative space-y-8">
                  {/* Animated Dotted Line */}
                  <div className="absolute left-6 top-6 bottom-0 w-0.5">
                    <motion.div
                      className="w-full h-full bg-gradient-to-b from-cyan-500 via-orange-500 to-teal-500"
                      style={{
                        background: 'linear-gradient(to bottom, #06b6d4, #f97316, #14b8a6)',
                        backgroundSize: '100% 200%',
                        backgroundPosition: '0% 0%',
                      }}
                      animate={{
                        backgroundPosition: ['0% 0%', '0% 100%', '0% 0%'],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    />
                    {/* Dotted overlay */}
                    <div 
                      className="absolute inset-0 opacity-30"
                      style={{
                        backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
                        backgroundSize: '4px 8px',
                        backgroundRepeat: 'repeat-y',
                      }}
                    />
                  </div>

                  {/* Step 1 - Data Input */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="flex items-start space-x-6 group relative z-10"
                  >
                    <div className="flex-shrink-0">
                      <motion.div 
                        className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span className="text-white font-bold text-lg">1</span>
                      </motion.div>
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-xl font-bold text-gray-900">Data Input</h3>
                      <p className="text-gray-600 leading-relaxed">
                        Policy/claims data + regulator circulars + climate/FX data normalized + PII-safe processing
                      </p>
                    </div>
                  </motion.div>

                  {/* Step 2 - AI Processing */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="flex items-start space-x-6 group relative z-10"
                  >
                    <div className="flex-shrink-0">
                      <motion.div 
                        className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span className="text-white font-bold text-lg">2</span>
                      </motion.div>
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-xl font-bold text-gray-900">AI Processing</h3>
                      <p className="text-gray-600 leading-relaxed">
                        SLM + RAG for day-to-day work; LoRA refresh weekly for domain changes
                      </p>
                    </div>
                  </motion.div>

                  {/* Step 3 - Output Generation */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="flex items-start space-x-6 group relative z-10"
                  >
                    <div className="flex-shrink-0">
                      <motion.div 
                        className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span className="text-white font-bold text-lg">3</span>
                      </motion.div>
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-xl font-bold text-gray-900">Output Generation</h3>
                      <p className="text-gray-600 leading-relaxed">
                        Decisions with citations, filing packs, pricing corridors, treaty memos, dashboards
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
         
          {/* Customer Simulator Section */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mt-20"
          >
            <div className="bg-gradient-to-br from-cyan-50 to-orange-50 rounded-3xl p-8 lg:p-12">
              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold text-gray-900 mb-4">Customer Facing Simulator</h3>
                <p className="text-lg text-gray-600 max-w-4xl mx-auto">
                  This feature allows customers to simulate their insurance premiums, understanding where they stand. 
                  It's also a strong acquisition and distribution tool for insurance companies as well as a data 
                  collection and continued intelligence tool for product development.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {/* Inputs */}
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Database className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">Inputs</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>Coverage type</li>
                    <li>Country</li>
                    <li>Household size</li>
                    <li>Deductible</li>
                    <li>Coverage limits</li>
                  </ul>
                </div>

                {/* Real-time Processing */}
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">Real-time Processing</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>Premium estimate</li>
                    <li>Risk score calculation</li>
                    <li>Instant results</li>
                  </ul>
                </div>

                {/* Conversion CTAs */}
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Target className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">Conversion CTAs</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>Get Quote</li>
                    <li>Chat with Advisor</li>
                    <li>Continue in WhatsApp</li>
                    <li>Share Scenario Link</li>
                  </ul>
                </div>

                {/* White-label Features */}
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Settings className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">White-label Features</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>Fully configurable</li>
                    <li>Custom branding</li>
                    <li>Insurer-specific rules</li>
                    <li>Custom integrations</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Market Opportunity Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Market Opportunity</h2>
              <p className="text-xl text-gray-600 mb-8">
                Targeting 135 insurers across 4 countries with a clear path to $8-9M ARR 
                and potential $160-480M enterprise value.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <CheckCircle className="w-6 h-6 text-cyan-600 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">4-Country Beachhead</h3>
                    <p className="text-gray-600">Kenya, Uganda, Zambia, Zimbabwe with 135 insurers</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <CheckCircle className="w-6 h-6 text-orange-600 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Pan-Africa Expansion</h3>
                    <p className="text-gray-600">600 insurers across 5 years with 10-12% adoption</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <CheckCircle className="w-6 h-6 text-teal-600 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Revenue Potential</h3>
                    <p className="text-gray-600">$10-20M ARR with banks/telcos doubling that</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-cyan-50 to-orange-50 rounded-3xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Proof of Value</h3>
                
                {/* Visual Chart Representation */}
                <div className="mb-8">
                  <div className="flex items-center justify-center space-x-4 mb-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-cyan-500 rounded"></div>
                      <span className="text-sm font-medium text-gray-700">Before AI</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-orange-500 rounded"></div>
                      <span className="text-sm font-medium text-gray-700">After AI</span>
                    </div>
                  </div>
                  
                  {/* Bar Chart Visualization */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-24 text-sm text-gray-600">Claims Leakage</div>
                      <div className="flex-1 bg-gray-200 rounded-full h-4 relative">
                        <div className="bg-cyan-500 h-4 rounded-full w-3/4"></div>
                        <div className="bg-orange-500 h-4 rounded-full w-1/2 absolute top-0"></div>
                      </div>
                      <div className="text-sm font-bold text-orange-600">-15-25%</div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="w-24 text-sm text-gray-600">Processing Time</div>
                      <div className="flex-1 bg-gray-200 rounded-full h-4 relative">
                        <div className="bg-cyan-500 h-4 rounded-full w-4/5"></div>
                        <div className="bg-orange-500 h-4 rounded-full w-1/2 absolute top-0"></div>
                      </div>
                      <div className="text-sm font-bold text-orange-600">-30-40%</div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="w-24 text-sm text-gray-600">Pricing Accuracy</div>
                      <div className="flex-1 bg-gray-200 rounded-full h-4 relative">
                        <div className="bg-cyan-500 h-4 rounded-full w-1/3"></div>
                        <div className="bg-orange-500 h-4 rounded-full w-1/4 absolute top-0"></div>
                      </div>
                      <div className="text-sm font-bold text-orange-600">8% MAPE</div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <TrendingDown className="w-6 h-6 text-cyan-600 mr-2" />
                      <div className="text-4xl font-bold text-cyan-600">15-25%</div>
                    </div>
                    <div className="text-sm text-gray-600">Claims Leakage Reduction</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <Zap className="w-6 h-6 text-orange-600 mr-2" />
                      <div className="text-4xl font-bold text-orange-600">30-40%</div>
                    </div>
                    <div className="text-sm text-gray-600">Faster Handling Time</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <Target className="w-6 h-6 text-teal-600 mr-2" />
                      <div className="text-4xl font-bold text-teal-600">8%</div>
                    </div>
                    <div className="text-sm text-gray-600">Pricing MAPE</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <Clock className="w-6 h-6 text-orange-600 mr-2" />
                      <div className="text-4xl font-bold text-orange-600">≤3</div>
                    </div>
                    <div className="text-sm text-gray-600">Months Launch Cycle</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gradient-to-br from-gray-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Pricing Plans</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the plan that fits your insurance needs
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Basic",
                price: "$2,500",
                period: "/month",
                features: ["Insurance SLM", "Basic Analytics", "Email Support", "Standard Compliance"],
                color: "cyan",
                icon: Building2,
                visual: "🏢"
              },
              {
                name: "Advanced",
                price: "$7,500",
                period: "/month",
                features: ["All Basic Features", "Simulation Engine", "Dynamic Pricing", "Priority Support", "Custom Integrations"],
                color: "orange",
                popular: true,
                icon: TrendingUp,
                visual: "🚀"
              },
              {
                name: "Enterprise",
                price: "Custom",
                period: "",
                features: ["All Advanced Features", "White-label Solutions", "Dedicated Support", "Custom Development", "SLA Guarantee"],
                color: "teal",
                icon: Award,
                visual: "👑"
              }
            ].map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <Card className={`h-full relative ${plan.popular ? 'ring-2 ring-orange-500 shadow-xl' : ''}`}>
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-1">
                        Most Popular
                      </Badge>
                    </div>
                  )}
                  <CardHeader className="text-center pb-8">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${
                      plan.color === 'cyan' ? 'from-cyan-500 to-teal-600' :
                      plan.color === 'orange' ? 'from-orange-500 to-orange-600' :
                      'from-teal-500 to-cyan-600'
                    } flex items-center justify-center shadow-lg`}>
                      <plan.icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-gray-900">{plan.name}</CardTitle>
                    <div className="mt-4">
                      <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                      <span className="text-gray-600">{plan.period}</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4 mb-8">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center">
                          <CheckCircle className="w-5 h-5 text-cyan-600 mr-3" />
                          <span className="text-gray-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button 
                      className={`w-full ${
                        plan.popular 
                          ? 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700' 
                          : 'bg-gradient-to-r from-cyan-500 to-teal-600 hover:from-cyan-600 hover:to-teal-700'
                      } text-white`}
                    >
                      {plan.name === 'Enterprise' ? 'Contact Sales' : 'Get Started'}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-cyan-600 to-teal-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Transform Your Insurance Operations?
            </h2>
            <p className="text-xl text-cyan-100 mb-8">
              Join the future of insurance with AI-powered intelligence, 
              regulatory compliance, and dynamic pricing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={onEnterDashboard}
                size="lg"
                className="bg-white text-cyan-600 hover:bg-gray-50 px-8 py-4 text-lg font-semibold rounded-xl shadow-lg"
              >
                <BarChart3 className="w-6 h-6 mr-2" />
                View Live Analysis
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-cyan-600 px-8 py-4 text-lg font-semibold rounded-xl"
              >
                <MessageSquare className="w-6 h-6 mr-2" />
                Contact Sales
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Get In Touch</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ready to transform your insurance operations? Let's discuss how we can help.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-teal-600 flex items-center justify-center">
                    <MessageSquare className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Email</h4>
                    <p className="text-gray-600">hello@insurance-ai.com</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Phone</h4>
                    <p className="text-gray-600">+254 700 000 000</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center">
                    <Globe className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Location</h4>
                    <p className="text-gray-600">Nairobi, Kenya</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-gradient-to-br from-cyan-50 to-orange-50 rounded-3xl p-8"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Send us a message</h3>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      placeholder="Doe"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input 
                    type="email" 
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    placeholder="john@company.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea 
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    placeholder="Tell us about your insurance needs..."
                  ></textarea>
                </div>
                <Button className="w-full bg-gradient-to-r from-cyan-500 to-teal-600 hover:from-cyan-600 hover:to-teal-700 text-white py-3 rounded-xl font-semibold">
                  Send Message
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="p-2 rounded-xl bg-gradient-to-br from-cyan-500 to-teal-600">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <span className="ml-3 text-xl font-bold">Insurance AI SLM</span>
              </div>
              <p className="text-gray-400">
                The Bloomberg Terminal of Insurance in Africa and emerging markets.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Products</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Insurance SLM</li>
                <li>Simulation Engine</li>
                <li>Dynamic Pricing</li>
                <li>Product Canvas</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Solutions</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Primary Insurers</li>
                <li>Reinsurers</li>
                <li>Brokers</li>
                <li>Regulators</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-gray-400">
                <li>hello@insurance-ai.com</li>
                <li>+254 700 000 000</li>
                <li>Nairobi, Kenya</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Insurance AI SLM Platform. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
