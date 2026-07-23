import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import { useInViewAnimation } from '@/hooks/use-in-view-animation';
import { 
  TrendingUp, 
  Target, 
  Search, 
  Video, 
  BarChart3,
  Layout,
  Globe, 
  Users, 
  CheckCircle, 
  ArrowRight, 
  Award,
  Clock,
  Shield
} from 'lucide-react';
import { caseStudiesData } from '@/components/CaseStudy';


const Index = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [parallax, setParallax] = useState(0);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const navigate = useNavigate();
  
  // State for interactive stats
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const offset = Math.max(0, Math.min(1, 1 - rect.top / windowHeight));
      setParallax(offset);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const { ref: servicesRef, className: servicesClassName } = useInViewAnimation<HTMLDivElement>('animate-fade-in-up');
  const { ref: benefitsRef, className: benefitsClassName } = useInViewAnimation<HTMLDivElement>('animate-fade-in-up');
  const { ref: auditRef, className: auditClassName } = useInViewAnimation<HTMLDivElement>('animate-fade-in-up');
  const { ref: caseStudiesRef, className: caseStudiesClassName } = useInViewAnimation<HTMLDivElement>('animate-fade-in-up');
  const { ref: strategiesRef, className: strategiesClassName } = useInViewAnimation<HTMLDivElement>('animate-fade-in-up');
  const { ref: portfolioRef, className: portfolioClassName } = useInViewAnimation<HTMLDivElement>('animate-fade-in-up');

  // Portfolio filter state
  const [activeFilter, setActiveFilter] = useState('All');

  // Portfolio items data
  const portfolioItems = [
    {
      title: "Belleza Instagram Campaign",
      category: "Ad Creatives",
      image: "/belleza.jpg",
      description: "High-converting Instagram carousel ad campaign showcasing organic skincare products.",
      stats: "ROAS: 1.55x | CTR: 0.86%"
    },
    {
      title: "Kasbha Modern E-Shop",
      category: "Web Design",
      image: "/kasbha.jpg",
      description: "A fast, SEO-optimized e-commerce landing page for boutique furniture and decor.",
      stats: "Quality Score: 6.5/10 | Leads +58%"
    },
    {
      title: "Tithi Brand Aesthetic",
      category: "Social Media",
      image: "/tithi.jpg",
      description: "A curated aesthetic feed and micro-influencer collaboration series on Instagram.",
      stats: "Organic Traffic +28%"
    },
    {
      title: "Hagrid Pet Nutrition Portal",
      category: "Web Design",
      image: "/hagrid.jpg",
      description: "Responsive content hub and conversion-optimized checkout experience for pet food.",
      stats: "Conv. Rate +13%"
    },
    {
      title: "Homesty Visual Identity",
      category: "Social Media",
      image: "/homesty.jpg",
      description: "Engaging social media graphics and copywriting to build organic community presence.",
      stats: "Blended CAC -16%"
    },
    {
      title: "RKH Herbal Reels Series",
      category: "Video Content",
      image: "/rkh.jpg",
      description: "Short-form video series and educational webinars highlighting herbal supplements.",
      stats: "Organic Traffic +29%"
    }
  ];

  const filteredPortfolioItems = activeFilter === 'All' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeFilter);

  // Interactive stats data
  const strategyStats = {
    performance: { base: 32, hover: 47, label: 'performance' },
    campaigns: { base: 7, hover: 12, label: 'Campaigns' },
    clicks: { base: 14, hover: 28, label: 'Clicks' },
    conversions: { base: 21, hover: 35, label: 'Conversions' }
  };

  const services = [
    {
      icon: Target,
      image: '/meta.jpg',
      title: 'Meta Ads',
      description: 'Strategic social media advertising on Facebook and Instagram to reach your ideal audience and drive conversions.',
      color: 'from-blue-50 to-indigo-50'
    },
    {
      icon: Search,
      image: '/google.jpg',
      title: 'Google Ads',
      description: 'Search and display advertising that puts your business in front of customers actively looking for your services.',
      color: 'from-blue-50 to-cyan-50'
    },
    {
      icon: BarChart3,
      image: '/seo.jpg',
      title: 'SEO',
      description: 'Improve your website\'s visibility in search results and drive organic traffic with our comprehensive SEO strategies.',
      color: 'from-purple-50 to-blue-50'
    },
    {
      icon: Video,
      image: '/short.png',
      title: 'Short-form Content',
      description: 'Engaging video content for TikTok, Instagram Reels, and YouTube Shorts that captivates your audience.',
      color: 'from-orange-50 to-red-50'
    },
    {
      icon: Layout,
      image: '/www.jpg',
      title: 'Website Creation',
      description: 'Professional, conversion-focused websites that represent your brand and drive business growth.',
      color: 'from-indigo-50 to-purple-50'
    }
  ];

  const benefits = [
    {
      icon: Award,
      title: 'Proven Results',
      description: 'Track record of delivering measurable growth and ROI for businesses across industries.',
      image: '/pr.jpg'
    },
    {
      icon: Users,
      title: 'Expert Team',
      description: 'Experienced professionals with deep knowledge of digital marketing trends and strategies.',
      image: '/et.jpg'
    },
    {
      icon: Clock,
      title: 'Fast Execution',
      description: 'Quick turnaround times without compromising on quality or strategic depth.',
      image: '/fe.jpg'
    },
    {
      icon: Shield,
      title: 'Transparent Process',
      description: 'Clear communication and regular updates throughout every project phase.',
      image: '/tp.jpg'
    }
  ];


  return (
    <>
      <header>
        <Navigation />
      </header>
      <main className="min-h-screen bg-white">
        {/* Enhanced Hero Section */}
        <section 
          aria-label="Hero section" 
          className="w-full flex items-center justify-center min-h-[80vh] py-6 px-2 md:px-4 mt-24 md:mt-32 overflow-hidden"
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.8s ease-out, transform 0.8s ease-out'
          }}
        >
          <div
            ref={ref}
            className="relative w-full max-w-[90rem] mx-auto rounded-[48px] md:rounded-[48px] bg-white flex flex-col items-center justify-center px-6 md:px-16 py-16 md:py-24 overflow-hidden"
            style={{
              minHeight: 520,
              background: `
                radial-gradient(ellipse at 10% 20%, #e0f7fa 0%, transparent 50%),
                radial-gradient(ellipse at 90% 80%, #f3e8ff 0%, transparent 55%),
                radial-gradient(ellipse at 30% 70%, #d1f5e0 0%, transparent 65%),
                radial-gradient(ellipse at 70% 40%, #ffe4fa 0%, transparent 60%),
                linear-gradient(135deg, #f7fafc 0%, #f8fafc 100%)
              `,
              backgroundPosition: `center ${parallax * 40}px`,
              transform: isInView ? 'scale(1)' : 'scale(0.98)',
              opacity: isInView ? 1 : 0,
              transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s',
            }}
          >
            <div className="absolute inset-0 rounded-[48px] z-0 overflow-hidden pointer-events-none">
              <div
                className="animate-gradient-move"
                style={{
                  width: '100%',
                  height: '100%',
                  background: `
                    radial-gradient(ellipse at 15% 25%, #e0f7fa 0%, transparent 55%),
                    radial-gradient(ellipse at 85% 75%, #f3e8ff 0%, transparent 50%),
                    radial-gradient(ellipse at 25% 65%, #d1f5e0 0%, transparent 60%),
                    radial-gradient(ellipse at 75% 35%, #ffe4fa 0%, transparent 65%)
                  `,
                  opacity: 0.7,
                  position: 'absolute',
                  inset: 0,
                  backgroundSize: '200% 200%',
                }}
              />
            </div>
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center w-full">
              <h1
                className="text-4xl md:text-6xl font-extrabold mb-8 leading-tight text-black"
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  color: '#000000',
                  letterSpacing: '-0.03em',
                  fontWeight: 400,
                  transform: isInView ? 'translateY(0)' : 'translateY(20px)',
                  opacity: isInView ? 1 : 0,
                  transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s'
                }}
              >
                Transform Your Business<br />with Strategic Digital Marketing
              </h1>
              <p
                className="text-xl md:text-2xl font-normal mb-12 max-w-3xl mx-auto leading-relaxed text-black"
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  color: '#000000',
                  transform: isInView ? 'translateY(0)' : 'translateY(20px)',
                  opacity: isInView ? 1 : 0,
                  transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s'
                }}
              >
                Data-driven digital marketing that boosts your presence and drives growth.
              </p>
              <div 
                className="flex flex-col md:flex-row gap-4 justify-center"
                style={{
                  transform: isInView ? 'translateY(0)' : 'translateY(20px)',
                  opacity: isInView ? 1 : 0,
                  transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.4s'
                }}
              >
                <Button
                  size="lg"
                  className="bg-[#18181b] hover:bg-[#23272f] text-white px-10 py-4 rounded-xl font-semibold text-lg transform transition-all duration-300 hover:scale-105"
                  onClick={() => navigate('/audit')}
                  style={{ 
                    fontFamily: 'Montserrat, sans-serif'
                  }}
                >
                  Get Free Audit
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-[#18181b] text-[#18181b] hover:bg-[#f3f4f6] px-10 py-4 rounded-xl font-semibold text-lg transform transition-all duration-300 hover:scale-105"
                  onClick={() => navigate('/services')}
                  style={{ 
                    fontFamily: 'Montserrat, sans-serif', 
                    borderColor: '#18181b'
                  }}
                >
                  View Services
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Strategies Section */}
        <section ref={strategiesRef} className={`py-24 px-2 md:px-4 bg-white w-full ${strategiesClassName}`}>
          <div className="max-w-[90rem] mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-3xl md:text-5xl font-normal mb-8" style={{ fontFamily: 'Montserrat, sans-serif', color: '#18181b', fontWeight: 400, letterSpacing: '-0.03em' }}>
                Solving Challenges in Creative Processes
              </h2>
              <p className="text-lg md:text-xl text-[#23272f] max-w-3xl mx-auto" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 300 }}>
                By breaking down complex problems into manageable tasks, leveraging diverse perspectives, and fostering an environment.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* Business Leveling Strategies Card */}
              <div 
                className="group cursor-pointer h-full"
                onMouseEnter={() => setHoveredCard('business')}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className={`rounded-2xl p-6 transition-all duration-500 group-hover:scale-105 group-hover:shadow-xl h-full flex flex-col border border-gray-200/50 ${
                  hoveredCard === 'business' 
                    ? 'bg-gradient-to-br from-gray-50 via-gray-100 to-gray-150' 
                    : 'bg-gradient-to-br from-gray-50 to-gray-100'
                }`}>
                  <div className="bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-xl p-6 mb-6 shadow-lg h-48 flex flex-col justify-between">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 via-pink-400 to-purple-500 flex items-center justify-center shadow-lg">
                          <TrendingUp className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-white font-bold text-3xl transition-all duration-500">
                          {hoveredCard === 'business' ? strategyStats.performance.hover : strategyStats.performance.base}%
                        </span>
                      </div>
                      <div className="flex-1 ml-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-white text-sm opacity-80 font-medium">performance</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-3 shadow-inner">
                          <div 
                            className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 h-3 rounded-full transition-all duration-700 ease-out shadow-lg"
                            style={{ 
                              width: `${hoveredCard === 'business' ? strategyStats.performance.hover : strategyStats.performance.base}%` 
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="text-white font-semibold text-lg">Business Growth</div>
                  </div>
                  <div className="flex-1 flex flex-col">
                    <h3 className="text-xl font-semibold mb-3" style={{ fontFamily: 'Montserrat, sans-serif', color: '#18181b' }}>
                      Business Leveling Strategies
                    </h3>
                    <p className="text-[#23272f] leading-relaxed flex-1" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 300 }}>
                      Strategic planning for business growth and performance optimization through data-driven insights.
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Media Management Card */}
              <div 
                className="group cursor-pointer h-full"
                onMouseEnter={() => setHoveredCard('social')}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className={`rounded-2xl p-6 transition-all duration-500 group-hover:scale-105 group-hover:shadow-xl h-full flex flex-col border border-gray-200/50 ${
                  hoveredCard === 'social' 
                    ? 'bg-gradient-to-br from-gray-50 via-gray-100 to-gray-150' 
                    : 'bg-gradient-to-br from-gray-50 to-gray-100'
                }`}>
                  <div className="bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-xl p-6 mb-6 shadow-lg h-48 flex flex-col justify-between">
                    <div className="text-white font-bold text-xl mb-4">Media</div>
                    <div className="space-y-4 flex-1 flex flex-col justify-center">
                      <div className="flex gap-2 flex-wrap">
                        <span className={`px-4 py-2 rounded-full text-sm border border-white/30 transition-all duration-300 font-medium ${
                          hoveredCard === 'social' ? 'bg-gray-200 text-gray-800 shadow-lg' : 'text-white hover:bg-white/10'
                        }`}>
                          Research
                        </span>
                        <span className={`px-4 py-2 rounded-full text-sm border border-white/30 transition-all duration-300 font-medium ${
                          hoveredCard === 'social' ? 'bg-gray-200 text-gray-800 shadow-lg' : 'text-white hover:bg-white/10'
                        }`}>
                          create
                        </span>
                        <span className={`px-4 py-2 rounded-full text-sm border border-white/30 transition-all duration-300 font-medium ${
                          hoveredCard === 'social' ? 'bg-gray-200 text-gray-800 shadow-lg' : 'text-white hover:bg-white/10'
                        }`}>
                          Refine
                        </span>
                      </div>
                      <div className="flex gap-2 flex-wrap">
                        <span className={`px-4 py-2 rounded-full text-sm border border-white/30 transition-all duration-300 font-medium ${
                          hoveredCard === 'social' ? 'bg-gray-200 text-gray-800 shadow-lg' : 'text-white hover:bg-white/10'
                        }`}>
                          ad campaign
                        </span>
                        <span className={`px-4 py-2 rounded-full text-sm border border-white/30 transition-all duration-300 font-medium ${
                          hoveredCard === 'social' ? 'bg-gray-200 text-gray-800 shadow-lg' : 'text-white hover:bg-white/10'
                        }`}>
                          boost
                        </span>
                        <span className={`px-4 py-2 rounded-full text-sm border border-white/30 transition-all duration-300 font-medium ${
                          hoveredCard === 'social' ? 'bg-gray-200 text-gray-800 shadow-lg' : 'text-white hover:bg-white/10'
                        }`}>
                          Analysis
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col">
                    <h3 className="text-xl font-semibold mb-3" style={{ fontFamily: 'Montserrat, sans-serif', color: '#18181b' }}>
                      Social Media Management
                    </h3>
                    <p className="text-[#23272f] leading-relaxed flex-1" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 300 }}>
                      Efficient management across multiple platforms: Engagement, Content, and Strategy optimization.
                    </p>
                  </div>
                </div>
              </div>

              {/* Pay-Per-Ad Campaigns Card */}
              <div 
                className="group cursor-pointer h-full"
                onMouseEnter={() => setHoveredCard('ads')}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className={`rounded-2xl p-6 transition-all duration-500 group-hover:scale-105 group-hover:shadow-xl h-full flex flex-col border border-gray-200/50 ${
                  hoveredCard === 'ads' 
                    ? 'bg-gradient-to-br from-gray-50 via-gray-100 to-gray-150' 
                    : 'bg-gradient-to-br from-gray-50 to-gray-100'
                }`}>
                  <div className="bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-xl p-6 mb-6 shadow-lg h-48 flex flex-col justify-between">
                    <div className="text-white font-bold text-xl mb-4">Results</div>
                    <div className="space-y-4 flex-1 flex flex-col justify-center">
                      <div className="flex items-center justify-between">
                        <span className="text-white text-sm font-medium">Campaigns</span>
                        <span className="px-3 py-1 bg-gray-700 rounded-lg text-white text-sm font-bold transition-all duration-500 shadow-md">
                          {hoveredCard === 'ads' ? strategyStats.campaigns.hover : strategyStats.campaigns.base}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-white text-sm font-medium">Clicks</span>
                        <span className={`px-3 py-1 rounded-lg text-sm font-bold transition-all duration-500 shadow-md ${
                          hoveredCard === 'ads' 
                            ? 'bg-gray-300 text-gray-800' 
                            : 'bg-gray-700 text-white'
                        }`}>
                          {hoveredCard === 'ads' ? strategyStats.clicks.hover : strategyStats.clicks.base}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-white text-sm font-medium">Conversions</span>
                        <span className="px-3 py-1 bg-gray-700 rounded-lg text-white text-sm font-bold transition-all duration-500 shadow-md">
                          {hoveredCard === 'ads' ? strategyStats.conversions.hover : strategyStats.conversions.base}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col">
                    <h3 className="text-xl font-semibold mb-3" style={{ fontFamily: 'Montserrat, sans-serif', color: '#18181b' }}>
                      Pay-Per-Ad Campaigns
                    </h3>
                    <p className="text-[#23272f] leading-relaxed flex-1" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 300 }}>
                      Targeted campaigns to maximize your advertising results and drive measurable ROI.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* Services Overview Section */}
        <section ref={servicesRef} className={`py-24 px-2 md:px-4 bg-white w-full ${servicesClassName}`}>
          <div className="max-w-[90rem] mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-3xl md:text-5xl font-normal mb-8" style={{ fontFamily: 'Montserrat, sans-serif', color: '#18181b', fontWeight: 400, letterSpacing: '-0.03em' }}>
                Comprehensive Digital<br />Marketing Solutions
              </h2>
              <p className="text-lg md:text-xl text-[#23272f] max-w-3xl mx-auto" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 300 }}>
                From strategy to execution, we provide end-to-end digital marketing services designed to drive real business results.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
              {services.slice(0, 3).map((service, index) => (
                <div
                  key={service.title}
                  className="group"
                  style={{
                    transform: isInView ? 'translateY(0)' : 'translateY(20px)',
                    opacity: isInView ? 1 : 0,
                    transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${0.1 + index * 0.1}s`
                  }}
                >
                  <div className="text-center h-full flex flex-col justify-between">
                    <div>
                      <div className="w-28 h-28 mx-auto mb-6 rounded-full bg-white border-4 border-white overflow-hidden">
                        <img 
                          src={service.image} 
                          alt={service.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="text-xl font-semibold mb-4" style={{ fontFamily: 'Montserrat, sans-serif', color: '#18181b' }}>
                        {service.title}
                      </h3>
                      <p className="text-[#23272f] leading-relaxed mb-6" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 300 }}>
                        {service.description}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-[#18181b] hover:text-[#23272f] group-hover:translate-x-1 transition-all duration-300"
                      onClick={() => navigate('/services')}
                    >
                      Learn More
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </div>
              ))}
              <div className="lg:col-span-3 flex justify-center gap-12">
                {services.slice(3).map((service, index) => (
                  <div
                    key={service.title}
                    className="group w-full max-w-xs"
                    style={{
                      transform: isInView ? 'translateY(0)' : 'translateY(20px)',
                      opacity: isInView ? 1 : 0,
                      transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${0.4 + index * 0.1}s`
                    }}
                  >
                    <div className="text-center h-full flex flex-col justify-between">
                      <div>
                        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-white border-4 border-white overflow-hidden">
                          <img 
                            src={service.image} 
                            alt={service.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <h3 className="text-xl font-semibold mb-4" style={{ fontFamily: 'Montserrat, sans-serif', color: '#18181b' }}>
                          {service.title}
                        </h3>
                        <p className="text-[#23272f] leading-relaxed mb-6" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 300 }}>
                          {service.description}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-[#18181b] hover:text-[#23272f] group-hover:translate-x-1 transition-all duration-300"
                        onClick={() => navigate('/services')}
                      >
                        Learn More
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        {/* Featured Case Studies Section */}
        <section ref={caseStudiesRef} className={`py-24 px-2 md:px-4 bg-white w-full ${caseStudiesClassName}`}>
          <div className="max-w-[90rem] mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-3xl md:text-5xl font-normal mb-8" style={{ fontFamily: 'Montserrat, sans-serif', color: '#18181b', fontWeight: 400, letterSpacing: '-0.03em' }}>
                Featured Case Studies
              </h2>
              <p className="text-lg md:text-xl text-[#23272f] max-w-3xl mx-auto" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 300 }}>
                See how we've helped businesses like yours achieve remarkable results through strategic digital marketing.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                caseStudiesData.find(study => study.id === 'pet-nutrition'),
                caseStudiesData.find(study => study.id === 'apparel'),
                caseStudiesData.find(study => study.id === 'health-wellness')
              ].map((caseStudy, index) => (
                <div
                  key={caseStudy.id}
                  className="group"
                  style={{
                    transform: isInView ? 'translateY(0)' : 'translateY(20px)',
                    opacity: isInView ? 1 : 0,
                    transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${0.1 + index * 0.1}s`
                  }}
                >
                  <Card className="border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden h-full flex flex-col">
                    <div className="aspect-video w-full bg-gray-100 relative overflow-hidden">
                      {caseStudy.image && (
                        <img 
                          src={caseStudy.image} 
                          alt={caseStudy.client}
                          className="w-full h-full object-cover"
                        />
                      )}
                      {/* Gradient overlay removed to show original image colors */}
                      <div className="absolute top-4 left-4">
                        <Badge variant="secondary" className="bg-white/90 text-gray-800">
                          {caseStudy.industry}
                        </Badge>
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle className="text-xl" style={{ fontFamily: 'Montserrat, sans-serif', color: '#18181b' }}>
                        {caseStudy.client}
                      </CardTitle>
                      <CardDescription style={{ fontFamily: 'Montserrat, sans-serif' }}>
                        {caseStudy.challenge}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-[#23272f] mb-6" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 300 }}>
                        {caseStudy.solution}
                      </p>
                      <div className="space-y-2">
                        {caseStudy.results.map((result, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span className="text-sm font-medium" style={{ fontFamily: 'Montserrat, sans-serif' }}>{result}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    <div className="p-6 pt-0 mt-auto">
                      <Button
                        variant="ghost"
                        className="text-[#18181b] hover:text-[#23272f] group-hover:translate-x-1 transition-all duration-300 w-full justify-start p-0"
                        onClick={() => navigate(caseStudy.link)}
                      >
                        View Case Study
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
            
            <div className="mt-16 text-center">
              <Button
                size="lg"
                className="bg-[#18181b] hover:bg-[#23272f] text-white px-10 py-4 rounded-xl font-semibold text-lg transform transition-all duration-300 hover:scale-105"
                onClick={() => navigate('/case-studies')}
                style={{ 
                  fontFamily: 'Montserrat, sans-serif'
                }}
              >
                View All Case Studies
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>

        {/* Portfolio Section */}
        <section ref={portfolioRef} id="portfolio" className={`py-24 px-2 md:px-4 bg-gradient-to-b from-white via-[#fcfdff] to-white w-full ${portfolioClassName}`}>
          <div className="max-w-[90rem] mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-normal mb-8" style={{ fontFamily: 'Montserrat, sans-serif', color: '#18181b', fontWeight: 400, letterSpacing: '-0.03em' }}>
                Our Creative Portfolio
              </h2>
              <p className="text-lg md:text-xl text-[#23272f] max-w-3xl mx-auto mb-12" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 300 }}>
                Explore a showcase of our recent marketing designs, campaign copy, web architectures, and engaging video edits.
              </p>

              {/* Filter Buttons */}
              <div className="flex flex-wrap justify-center gap-3 mb-16">
                {['All', 'Social Media', 'Web Design', 'Ad Creatives', 'Video Content'].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 transform active:scale-95 ${
                      activeFilter === filter
                        ? 'bg-[#18181b] text-white shadow-lg'
                        : 'bg-gray-100/80 text-gray-600 hover:bg-gray-200/80 hover:text-gray-900'
                    }`}
                    style={{ fontFamily: 'Montserrat, sans-serif' }}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            {/* Portfolio Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPortfolioItems.map((item, index) => (
                <div
                  key={item.title}
                  className="group relative overflow-hidden rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1 flex flex-col h-full"
                >
                  {/* Image Container with Hover zoom */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                    {/* Glassmorphic Category Badge */}
                    <div className="absolute top-4 left-4 z-10">
                      <span className="backdrop-blur-md bg-white/80 text-gray-800 text-xs font-semibold px-3 py-1.5 rounded-full border border-white/20 shadow-sm">
                        {item.category}
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 flex-grow flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-bold mb-3 text-[#18181b] transition-colors duration-300" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                        {item.title}
                      </h3>
                      <p className="text-[#23272f] text-sm leading-relaxed mb-6 font-light" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                        {item.description}
                      </p>
                    </div>

                    {/* Stats & Hover Interaction */}
                    <div className="border-t border-gray-100 pt-4 mt-auto flex items-center justify-between">
                      <span className="text-xs font-medium text-[#18181b] bg-gray-100 px-3 py-1 rounded-md" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                        {item.stats}
                      </span>
                      <span className="text-xs font-semibold text-gray-400 group-hover:text-[#18181b] transition-colors duration-300 flex items-center gap-1">
                        View Details
                        <ArrowRight className="w-3.5 h-3.5 transform transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* View Full Portfolio Button */}
            <div className="mt-16 text-center">
              <Button
                size="lg"
                className="bg-[#18181b] hover:bg-[#23272f] text-white px-10 py-4 rounded-xl font-semibold text-lg transform transition-all duration-300 hover:scale-105"
                onClick={() => navigate('/portfolio')}
                style={{ 
                  fontFamily: 'Montserrat, sans-serif'
                }}
              >
                View Full Portfolio
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>


        {/* Why Choose Us Section */}
        <section ref={benefitsRef} className={`py-24 px-2 md:px-4 bg-white w-full ${benefitsClassName}`}>
          <div className="max-w-[90rem] mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-3xl md:text-5xl font-normal mb-8" style={{ fontFamily: 'Montserrat, sans-serif', color: '#18181b', fontWeight: 400, letterSpacing: '-0.03em' }}>
                Why Choose Us
              </h2>
              <p className="text-lg md:text-xl text-[#23272f] max-w-3xl mx-auto" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 300 }}>
                We combine strategic thinking with creative execution to deliver results that matter for your business.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => (
                <div
                  key={benefit.title}
                  className="group"
                  style={{
                    transform: isInView ? 'translateY(0)' : 'translateY(20px)',
                    opacity: isInView ? 1 : 0,
                    transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${0.1 + index * 0.1}s`
                  }}
                >
                  <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-500 group-hover:scale-105 h-full flex flex-col overflow-hidden border border-gray-100">
                    {/* Image Placeholder */}
                    <div className="h-64 relative overflow-hidden">
                      {benefit.image ? (
                        <>
                          <img 
                            src={benefit.image} 
                            alt={benefit.title}
                            className="w-full h-full group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-gray-100/20" />
                        </>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                            <benefit.icon className="w-8 h-8 text-gray-600" />
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {/* Content Section */}
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-3" style={{ fontFamily: 'Montserrat, sans-serif', color: '#18181b' }}>
                          {benefit.title}
                        </h3>
                        <p className="text-sm text-[#23272f] leading-relaxed" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 300 }}>
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        
        
        {/* CTA Banner Section */}
        <section ref={auditRef} className={`py-24 px-2 md:px-4 bg-white w-full ${auditClassName}`}>
          <div className="max-w-[90rem] mx-auto">
            <div className="relative rounded-[32px] overflow-hidden">
              <div
                className="absolute inset-0"
                style={{
                  background: `
                    radial-gradient(ellipse at 10% 20%, #e0f7fa 0%, transparent 50%),
                    radial-gradient(ellipse at 90% 80%, #f3e8ff 0%, transparent 55%),
                    radial-gradient(ellipse at 30% 70%, #d1f5e0 0%, transparent 65%),
                    linear-gradient(135deg, #f7fafc 0%, #f8fafc 100%)
                  `
                }}
              />
              <div className="relative z-10 p-12 md:p-16">
                <div className="max-w-5xl mx-auto text-center">
                  <h2 className="text-3xl md:text-5xl font-normal mb-8" style={{ fontFamily: 'Montserrat, sans-serif', color: '#18181b', fontWeight: 400, letterSpacing: '-0.03em' }}>
                    Ready to Level Up<br />Your Business?
                  </h2>
                  <p className="text-lg md:text-xl text-[#23272f] mb-12 max-w-2xl mx-auto" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 300 }}>
                    Let's discuss how we can help you achieve your digital marketing goals and drive sustainable business growth.
                  </p>
                  <div className="flex flex-col md:flex-row gap-4 justify-center">
                                         <Button
                       size="lg"
                       className="bg-[#18181b] hover:bg-[#23272f] text-white px-10 py-4 rounded-xl font-semibold text-lg transform transition-all duration-300 hover:scale-105"
                       onClick={() => navigate('/audit')}
                       style={{ 
                         fontFamily: 'Montserrat, sans-serif'
                       }}
                     >
                       Get Free Audit
                       <ArrowRight className="ml-2 h-5 w-5" />
                     </Button>
                     <Button
                       size="lg"
                       variant="outline"
                       className="border-[#18181b] text-[#18181b] hover:bg-[#f3f4f6] px-10 py-4 rounded-xl font-semibold text-lg transform transition-all duration-300 hover:scale-105"
                       onClick={() => navigate('/services')}
                       style={{ 
                         fontFamily: 'Montserrat, sans-serif', 
                         borderColor: '#18181b'
                       }}
                     >
                       View Services
                     </Button>
                     <Button
                       size="lg"
                       variant="outline"
                       className="border-[#18181b] text-[#18181b] hover:bg-[#f3f4f6] px-10 py-4 rounded-xl font-semibold text-lg transform transition-all duration-300 hover:scale-105"
                       onClick={() => navigate('/contact')}
                       style={{ 
                         fontFamily: 'Montserrat, sans-serif', 
                         borderColor: '#18181b'
                       }}
                     >
                       Book Call
                     </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <BackToTop />
      </main>
      <Footer />
    </>
  );
};

export default Index;
