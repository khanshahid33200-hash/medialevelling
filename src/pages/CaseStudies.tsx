import React, { useState, useEffect, useRef } from 'react';
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
  Target,
  Search,
  Video,
  Globe,
  Users,
  CheckCircle,
  ArrowRight,
  Star,
  BarChart3,
  Zap,
  Eye,
  MessageSquare,
  Award,
  Clock,
  Shield,
  Briefcase,
  Lightbulb,
  Rocket,
  LineChart,
  DollarSign,
  UserCheck,
  Filter,
  Layers,
  Settings,
  LightbulbOff,
  ShoppingCart,
  Cloud,
  MapPin,
  Heart,
  HeartPulse,
  Home,
  BookOpen
} from 'lucide-react';

const CaseStudies = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [parallax, setParallax] = useState(0);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const navigate = useNavigate();

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

  const { ref: featuredRef, className: featuredClassName } = useInViewAnimation<HTMLDivElement>('animate-fade-in-up');
  const { ref: categoriesRef, className: categoriesClassName } = useInViewAnimation<HTMLDivElement>('animate-fade-in-up');
  const { ref: processRef, className: processClassName } = useInViewAnimation<HTMLDivElement>('animate-fade-in-up');
  const { ref: resultsRef, className: resultsClassName } = useInViewAnimation<HTMLDivElement>('animate-fade-in-up');
  const { ref: ctaRef, className: ctaClassName } = useInViewAnimation<HTMLDivElement>('animate-fade-in-up');

  const DEFAULT_CASE_STUDIES = [
    {
      id: 'home-decor',
      image: 'kasbha.jpg',aspectRatio: '1/1',
      client: 'Kasbha',
      industry: 'Furniture',
      challenge: 'CPC higher than desired (₹48), Quality Score 4.5/10; ongoing ad relevance improvements.',
      solution: 'Expanded landing pages, added more negatives, improved ad text variation.',
      results: [
        'CPC -22% (₹48 → ₹37.5)',
        'Quality Score 4.5 → 6.5/10',
        'Leads +58%',
        'Ad CTR +32%',
        'Monthly Leads: 125 → 202'
      ],
      link: '/portfolio',
    },    
    {
      id: 'pet-nutrition',
      image: 'hagrid.jpg',aspectRatio: '1/1',
      client: 'Hagrid Pet Food',
      industry: 'Pet Nutrition',
      challenge: 'New site, slow conversions at 0.9%, bounce high, content hub early in development.',
      solution: 'More SEO articles (now 8), continued CRO, further site speed improvements.',
      results: [
        'Conversion Rate +13% (0.9% → 1.02%)',
        'Bounce Rate -21%',
        'Organic Sessions +21%',
        'ROAS 1.06× → 1.25×',
        'Blog Rankings: 0 → 4 page-1 keywords'
      ],
      link: '/portfolio',
    },
    {
      id: 'apparel',
      image: 'tithi.jpg',aspectRatio: '16/9',
      client: 'Tithi',
      industry: 'Apparel',
      challenge: 'Still modest organic reach, limited audience list.',
      solution: '2x content frequency on Instagram, first collab with a micro-influencer, more remarketing.',
      results: [
        'Organic Sessions +28%',
        'ROAS 1.22×',
        '150 emails captured',
        'Keyword Count: 3 → 18',
        'Email CTR: 3.4%'
      ],
      link: '/portfolio',
    },
    {
      id: 'furniture',
      image: 'homesty.jpg',aspectRatio: '16/9',
      client: 'Homesty',
      industry: 'Home Decor',
      challenge: 'CAC stubborn, attribution now standardized.',
      solution: 'More CRO experiments, attribution reviews each month.',
      results: [
        'Blended CAC -16%',
        'Funnel CVR +13%',
        'Revenue +15% MoM',
        'Avg Session Duration +22s',
        'New Customers: 260 → 310/month'
      ],
      link: '/portfolio',
    },
    {
      id: 'health-wellness',
      image: 'rkh.jpg', aspectRatio: '16/9',
      client: 'RKH Herbal Organic',
      industry: 'Health & Wellness',
      challenge: 'Still gaining ground in competitive niche, bounce gradually declining.',
      solution: '2 more blogs (6 total), held first webinar, further on-page SEO.',
      results: [
        'Organic Traffic +29%',
        '5 new page-1 keywords',
        'Lead Form CVR +13%',
        'Sales +12%',
        'Bounce Rate: 60% → 51%'
      ],
      link: '/portfolio',
    },
    {
      id: 'beauty-skincare',
      image: '/belleza.jpg',aspectRatio: '1/1',
      client: 'BELLEZA',
      industry: 'Beauty & Skincare',
      challenge: 'Still building brand awareness, CTR at 0.58% at start, limited retargeting, basic CRM in place.',
      solution: 'Ongoing creative refreshes, enhanced CRM workflows, modest increase in retargeting spend.',
      results: [
        'ROAS +38% (1.12× → 1.55×)',
        'CPA -24% (₹410 → ₹312)',
        'CTR +49% (0.58% → 0.86%)',
        '25% of purchases from retargeting',
        'Revenue: ₹5.3L → ₹8.1L/month'
      ],
      link: '/portfolio',
    }
  ];

  const [caseStudies, setCaseStudies] = useState<any[]>(DEFAULT_CASE_STUDIES);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const res = await fetch('/api/portfolio');
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            const mapped = data.map((item: any) => ({
              id: item._id || item.id || item.title,
              image: item.image,
              client: item.details?.client || item.title,
              industry: item.category,
              challenge: item.details?.objective || item.description,
              solution: item.details?.approach?.join(' ') || 'Standard campaign restructuring.',
              results: item.details?.results && item.details.results.length > 0 ? item.details.results : [item.stats || 'Performance improvements'],
              link: '/portfolio'
            }));
            setCaseStudies(mapped);
          }
        }
      } catch (err) {
        console.error('Error fetching case studies:', err);
      }
    };
    fetchPortfolio();
  }, []);

  const categories = [
    { name: 'E-commerce', icon: ShoppingCart, description: 'Driving sales and customer growth for online stores.' },
    { name: 'SaaS', icon: Cloud, description: 'Generating qualified leads and increasing user acquisition.' },
    { name: 'Local Business', icon: MapPin, description: 'Boosting foot traffic and local online visibility.' },
    { name: 'Healthcare', icon: HeartPulse, description: 'Connecting healthcare providers with patients online.' },
    { name: 'Real Estate', icon: Home, description: 'Showcasing properties and attracting potential buyers.' },
    { name: 'Education', icon: BookOpen, description: 'Reaching students and promoting educational programs.' },
  ];

  const processSteps = [
    { icon: LightbulbOff, title: 'Discovery & Strategy', description: 'Deep dive into your business, goals, and target audience to craft a tailored strategy.' },
    { icon: Settings, title: 'Execution & Optimization', description: 'Implementing campaigns with continuous monitoring and optimization for peak performance.' },
    { icon: BarChart3, title: 'Reporting & Analysis', description: 'Transparent reporting with actionable insights and regular performance reviews.' },
    { icon: Rocket, title: 'Continuous Growth', description: 'Evolving strategies based on market trends and performance data for sustained success.' },
  ];


  return (
    <>
      <header>
        <Navigation />
      </header>
      <main className="min-h-screen bg-white">

        <section
          aria-label="Hero section"
          className="w-full flex items-center justify-center min-h-[80vh] py-6 px-4 md:px-8 mt-24 md:mt-32 overflow-hidden"
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.8s ease-out, transform 0.8s ease-out'
          }}
        >
          <div
            ref={ref}
            className="relative w-full max-w-[90rem] mx-auto rounded-[48px] md:rounded-[48px] bg-white flex flex-col items-center justify-center px-6 md:px-16 py-12 md:py-20 overflow-hidden"
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
                className="text-4xl md:text-6xl font-extrabold mb-8 leading-tight"
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  color: '#18181b',
                  letterSpacing: '-0.03em',
                  fontWeight: 400,
                  transform: isInView ? 'translateY(0)' : 'translateY(20px)',
                  opacity: isInView ? 1 : 0,
                  transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s'
                }}
              >
                Real Results, Real Growth<br />Your Success Stories Start Here
              </h1>
              <p
                className="text-xl md:text-2xl font-normal mb-12 max-w-3xl mx-auto leading-relaxed"
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  color: '#23272f',
                  transform: isInView ? 'translateY(0)' : 'translateY(20px)',
                  opacity: isInView ? 1 : 0,
                  transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s'
                }}
              >
                Empowering businesses with tailored strategies for exceptional growth.
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
                  Get a Free Audit
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </section>


        <section ref={featuredRef} className={`pt-24 pb-16 px-4 md:px-8 bg-gradient-to-br from-white to-gray-50/50 ${featuredClassName}`}>
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-3xl md:text-5xl font-normal mb-8" style={{ fontFamily: 'Montserrat, sans-serif', color: '#18181b', fontWeight: 400, letterSpacing: '-0.03em' }}>
                Our Success Stories
              </h2>
              <p className="text-lg md:text-xl text-black max-w-3xl mx-auto" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 300 }}>
                Dive into detailed examples of how we've helped our clients overcome challenges and achieve significant results.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {caseStudies.map((study, index) => (
                <Card
                  key={study.id}
                  className="border-0 shadow-sm bg-white overflow-hidden transform transition-all duration-500 hover:scale-[1.02] hover:shadow-lg"
                  style={{
                    transform: isInView ? 'translateY(0)' : 'translateY(20px)',
                    opacity: isInView ? 1 : 0,
                    transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${0.1 + index * 0.1}s`
                  }}
                >
                  {study.image && (
                    <img src={study.image} alt={study.client} className="w-full h-48 object-cover object-center" />
                  )}
                  <CardContent className="p-6">
                    <Badge variant="secondary" className="mb-3 text-sm py-1 px-3 rounded-full bg-gray-100 text-gray-700" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      {study.industry}
                    </Badge>
                    <CardTitle className="text-2xl font-semibold mb-3" style={{ fontFamily: 'Montserrat, sans-serif', color: '#18181b' }}>
                      {study.client}
                    </CardTitle>
                    <div className="text-[#23272f] leading-relaxed mb-4 space-y-2" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 300 }}>
                      <div><span className="font-semibold">Challenge:</span> {study.challenge}</div>
                      <div><span className="font-semibold">Solution:</span> {study.solution}</div>
                    </div>
                    <div className="mt-4">
                      <h4 className="font-semibold text-lg mb-2" style={{ fontFamily: 'Montserrat, sans-serif', color: '#18181b' }}>Key Results:</h4>
                      <ul className="list-disc list-inside text-[#23272f] space-y-1" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 300 }}>
                        {study.results.map((result, i) => (
                          <li key={i} className="flex items-start">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-1" />
                            <span>{result}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="mt-6 text-[#18181b] hover:text-[#23272f] group-hover:translate-x-1 transition-all duration-300"
                      onClick={() => navigate(study.link)}
                    >
                      Read Full Case Study
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>


        {/* <section ref={categoriesRef} className={`py-24 px-4 md:px-8 bg-white ${categoriesClassName}`}>
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-3xl md:text-5xl font-normal mb-8" style={{ fontFamily: 'Montserrat, sans-serif', color: '#18181b', fontWeight: 400, letterSpacing: '-0.03em' }}>
                Case Studies by Industry
              </h2>
              <p className="text-lg md:text-xl text-black max-w-3xl mx-auto" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 300 }}>
                Find case studies relevant to your sector and discover how our strategies apply to diverse business needs.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {categories.map((category, index) => (
                <div
                  key={category.name}
                  className="group flex items-start p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl shadow-sm transition-all duration-300 hover:shadow-md hover:scale-[1.01]"
                  style={{
                    transform: isInView ? 'translateY(0)' : 'translateY(20px)',
                    opacity: isInView ? 1 : 0,
                    transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${0.1 + index * 0.08}s`
                  }}
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#18181b] flex items-center justify-center mr-5 transition-transform duration-300 group-hover:scale-110 shadow-md">
                    <category.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2" style={{ fontFamily: 'Montserrat, sans-serif', color: '#18181b' }}>
                      {category.name}
                    </h3>
                    <p className="text-black leading-relaxed" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 300 }}>
                      {category.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section> */}

        <section ref={processRef} className={`pt-8 pb-24 px-4 md:px-8 bg-gradient-to-br from-gray-50/50 to-white ${processClassName}`}>
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-3xl md:text-5xl font-normal mb-8" style={{ fontFamily: 'Montserrat, sans-serif', color: '#18181b', fontWeight: 400, letterSpacing: '-0.03em' }}>
                Our Strategic Approach
              </h2>
              <p className="text-lg md:text-xl text-black max-w-3xl mx-auto" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 300 }}>
                We follow a proven methodology to ensure every client's success, from initial strategy to continuous optimization.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {processSteps.map((step, index) => (
                <Card
                  key={step.title}
                  className="border-0 shadow-sm bg-white h-full transition-all duration-300 hover:shadow-md hover:scale-[1.01]"
                  style={{
                    transform: isInView ? 'translateY(0)' : 'translateY(20px)',
                    opacity: isInView ? 1 : 0,
                    transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${0.1 + index * 0.1}s`
                  }}
                >
                  <CardContent className="p-6 text-center">
                    <div className="w-14 h-14 mx-auto mb-5 rounded-xl bg-[#18181b] flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-md">
                      <step.icon className="w-7 h-7 text-white" />
                    </div>
                    <CardTitle className="text-xl font-semibold mb-3" style={{ fontFamily: 'Montserrat, sans-serif', color: '#18181b' }}>
                      {step.title}
                    </CardTitle>
                    <CardDescription className="text-[#23272f] leading-relaxed" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 300 }}>
                      {step.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>


        <section ref={resultsRef} className={`pt-12 pb-24 px-4 md:px-8 bg-white ${resultsClassName}`}>
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-3xl md:text-5xl font-normal mb-8" style={{ fontFamily: 'Montserrat, sans-serif', color: '#18181b', fontWeight: 400, letterSpacing: '-0.03em' }}>
                Impactful Metrics, Tangible Growth
              </h2>
              <p className="text-lg md:text-xl text-black max-w-3xl mx-auto" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 300 }}>
                A snapshot of the impressive results we've achieved across various campaigns and industries.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-10">
              <div
                className="flex flex-col justify-center bg-gradient-to-br from-blue-50/50 to-purple-50/50 rounded-3xl p-8 shadow-sm transition-all duration-500 hover:shadow-lg hover:scale-[1.01]"
                style={{
                  transform: isInView ? 'translateY(0)' : 'translateY(20px)',
                  opacity: isInView ? 1 : 0,
                  transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s'
                }}
              >
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-6 mx-auto">
                  <LineChart className="w-8 h-8 text-blue-700" />
                </div>
                <h3 className="text-4xl md:text-5xl font-extrabold text-center mb-4 text-[#18181b]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  +40%
                </h3>
                <p className="text-xl text-black text-center" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 300 }}>
                  Average Revenue Growth for E-commerce Clients
                </p>
              </div>

              <div
                className="flex flex-col justify-center bg-gradient-to-br from-green-50/50 to-emerald-50/50 rounded-3xl p-8 shadow-sm transition-all duration-500 hover:shadow-lg hover:scale-[1.01]"
                style={{
                  transform: isInView ? 'translateY(0)' : 'translateY(20px)',
                  opacity: isInView ? 1 : 0,
                  transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s'
                }}
              >
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-6 mx-auto">
                  <Users className="w-8 h-8 text-green-700" />
                </div>
                <h3 className="text-4xl md:text-5xl font-extrabold text-center mb-4 text-[#18181b]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  +65%
                </h3>
                <p className="text-xl text-black text-center" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 300 }}>
                  Increase in Qualified Leads for SaaS Businesses
                </p>
              </div>

              <div
                className="md:col-span-2 flex flex-col justify-center bg-gradient-to-br from-orange-50/50 to-red-50/50 rounded-3xl p-8 shadow-sm transition-all duration-500 hover:shadow-lg hover:scale-[1.01]"
                style={{
                  transform: isInView ? 'translateY(0)' : 'translateY(20px)',
                  opacity: isInView ? 1 : 0,
                  transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s'
                }}
              >
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-orange-100 mb-6 mx-auto">
                  <Eye className="w-8 h-8 text-orange-700" />
                </div>
                <h3 className="text-4xl md:text-5xl font-extrabold text-center mb-4 text-[#18181b]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  <span className="text-5xl md:text-6xl">250,000+</span>
                </h3>
                <p className="text-xl text-black text-center" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 300 }}>
                  Total Impressions Generated Across All Campaigns
                </p>
              </div>
            </div>
          </div>
        </section>


        <section className="pt-12 px-4 md:px-8 bg-gradient-to-br from-white to-gray-50/50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-normal mb-6" style={{ fontFamily: 'Montserrat, sans-serif', color: '#18181b', fontWeight: 400, letterSpacing: '-0.03em' }}>
                Industry Impact
              </h2>
              <p className="text-lg md:text-xl text-black max-w-3xl mx-auto" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 300 }}>
                Discover how we've transformed businesses across various sectors with our data-driven strategies.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: <ShoppingCart className="w-8 h-8 text-blue-600" />,
                  title: 'E-commerce Growth',
                  stats: '40% avg. revenue increase',
                  description: 'Scaled online stores with targeted campaigns and conversion optimization.'
                },
                {
                  icon: <Cloud className="w-8 h-8 text-purple-600" />,
                  title: 'SaaS Expansion',
                  stats: '65% lead generation boost',
                  description: 'Accelerated user acquisition and reduced customer acquisition costs.'
                },
                {
                  icon: <MapPin className="w-8 h-8 text-green-600" />,
                  title: 'Local Business',
                  stats: '18% more foot traffic',
                  description: 'Enhanced local visibility and customer engagement.'
                },
                {
                  icon: <HeartPulse className="w-8 h-8 text-red-600" />,
                  title: 'Healthcare',
                  stats: '20% more appointments',
                  description: 'Connected providers with patients through digital channels.'
                },
                {
                  icon: <BookOpen className="w-8 h-8 text-indigo-600" />,
                  title: 'Education',
                  stats: '1.3x enrollment growth',
                  description: 'Reached and engaged prospective students effectively.'
                },
                {
                  icon: <Briefcase className="w-8 h-8 text-amber-600" />,
                  title: 'Professional Services',
                  stats: '35% more qualified leads',
                  description: 'Established thought leadership and attracted high-value clients through targeted content.'
                }
              ].map((item, index) => (
                <div 
                  key={index}
                  className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300"
                  style={{
                    transform: isInView ? 'translateY(0)' : 'translateY(20px)',
                    opacity: isInView ? 1 : 0,
                    transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${0.1 + index * 0.1}s`
                  }}
                >
                  <div className="w-14 h-14 rounded-xl bg-[#18181b] flex items-center justify-center mb-6 shadow-md">
                    {React.cloneElement(item.icon, { className: 'w-7 h-7 text-white' })}
                  </div>
                  <h3 className="text-xl font-semibold mb-2" style={{ fontFamily: 'Montserrat, sans-serif', color: '#18181b' }}>
                    {item.title}
                  </h3>
                  <p className="text-2xl font-bold mb-3" style={{ fontFamily: 'Montserrat, sans-serif', color: 'black' }}>
                    {item.stats}
                  </p>
                  <p className="text-black" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 300 }}>
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

{/* }
        <section className="py-24 px-4 md:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-normal mb-6" style={{ fontFamily: 'Montserrat, sans-serif', color: 'black', fontWeight: 400, letterSpacing: '-0.03em' }}>
                Trusted by New Startups
              </h2>
              <p className="text-lg md:text-xl text-black max-w-3xl mx-auto" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 300 }}>
                We've partnered with innovative startups to drive their digital transformation.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center">
              {[
                { name: 'TechStart', logo: '/logos/techstart.svg' },
                { name: 'CloudNine', logo: '/logos/cloudnine.svg' },
                { name: 'UrbanBloom', logo: '/logos/urbanbloom.svg' },
                { name: 'NovaHealth', logo: '/logos/novahealth.svg' },
                { name: 'EstatePro', logo: '/logos/estatepro.svg' },
                { name: 'EduStream', logo: '/logos/edustream.svg' }
              ].map((client, index) => (
                <div 
                  key={index}
                  className="w-full h-24 flex items-center justify-center p-4 grayscale hover:grayscale-0 transition-all duration-300"
                  style={{
                    transform: isInView ? 'scale(1)' : 'scale(0.95)',
                    opacity: isInView ? 1 : 0,
                    transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${0.1 + index * 0.05}s`
                  }}
                >
                  <img 
                    src={client.logo} 
                    alt={client.name} 
                    className="max-h-12 max-w-full object-contain"
                    onError={(e) => {
                  
                      const target = e.target as HTMLImageElement;
                      target.src = '';
                      target.outerHTML = `
                        <div class="w-full h-full flex items-center justify-center">
                          <span class="text-lg font-medium text-black">${client.name}</span>
                        </div>
                      `;
                    }}
                  />
                </div>
              ))}
            </div>
            
            <div className="mt-16 text-center">
              <Button
                variant="outline"
                className="border-black text-black hover:bg-[#f3f4f6] px-8 py-3 rounded-xl font-medium text-base transform transition-all duration-300 hover:scale-105"
                onClick={() => navigate('/contact')}
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                Become Our Next Success Story
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section> */}


        <section ref={ctaRef} className={`pt-12 pb-24 px-4 md:px-8 bg-white ${ctaClassName}`}>
          <div className="max-w-7xl mx-auto">
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
                <div className="max-w-4xl mx-auto text-center">
                  <h2 className="text-3xl md:text-5xl font-normal mb-8" style={{ fontFamily: 'Montserrat, sans-serif', color: 'black', fontWeight: 400, letterSpacing: '-0.03em' }}>
                    Ready to See Similar Results<br />for Your Business?
                  </h2>
                  <p className="text-lg md:text-xl text-black max-w-3xl mx-auto" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 300 }}>
                    Let's discuss how we can help you achieve your digital marketing goals and drive sustainable business growth.
                  </p>
                  <div className="flex flex-col md:flex-row gap-4 justify-center">
                    <Button
                      size="lg"
                      className="bg-black hover:bg-[#23272f] text-white px-10 py-4 rounded-xl font-semibold text-lg transform transition-all duration-300 hover:scale-105"
                      onClick={() => navigate('/audit')}
                      style={{
                        fontFamily: 'Montserrat, sans-serif'
                      }}
                    >
                      Get a Free Audit
                      <ArrowRight className="ml-2 h-5 w-5" />
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
                      Book a Consultation
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

export default CaseStudies;