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
  ArrowRight,
  CheckCircle,
  ExternalLink,
  Target,
  BarChart3,
  LineChart,
  Globe,
  Video,
  Users,
  Sparkles,
  Search,
  X
} from 'lucide-react';

const Portfolio = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [parallax, setParallax] = useState(0);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const navigate = useNavigate();
  
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedItem, setSelectedItem] = useState<any | null>(null);

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

  const { ref: heroRef, className: heroClassName } = useInViewAnimation<HTMLDivElement>('animate-fade-in-up');
  const { ref: gridRef, className: gridClassName } = useInViewAnimation<HTMLDivElement>('animate-fade-in-up');
  const { ref: ctaRef, className: ctaClassName } = useInViewAnimation<HTMLDivElement>('animate-fade-in-up');

  // Portfolio items database with detailed case information for modals
  const DEFAULT_PORTFOLIO = [
    {
      id: "belleza-skincare",
      title: "Belleza Instagram Campaign",
      category: "Ad Creatives",
      image: "/belleza.jpg",
      description: "High-converting Instagram carousel ad campaign showcasing organic skincare products.",
      stats: "ROAS: 1.55x | CTR: 0.86%",
      details: {
        client: "BELLEZA Skincare",
        objective: "Boost brand awareness and lower CPA using engaging organic-themed creatives.",
        approach: [
          "Developed high-quality user-generated content (UGC) styled video ads.",
          "Restructured Instagram retargeting funnel with dynamic product ads.",
          "Implemented carousel formats highlighting key skincare benefits."
        ],
        results: [
          "38% increase in Return on Ad Spend (ROAS)",
          "24% drop in Cost Per Acquisition (CPA)",
          "49% increase in click-through rates (CTR)"
        ]
      }
    },
    {
      id: "kasbha-furniture",
      title: "Kasbha Modern E-Shop",
      category: "Web Design",
      image: "/kasbha.jpg",
      description: "A fast, SEO-optimized e-commerce landing page for boutique furniture and decor.",
      stats: "Quality Score: 6.5/10 | Leads +58%",
      details: {
        client: "Kasbha Furniture",
        objective: "Lower high Google Ads CPC and improve landing page experience to boost conversions.",
        approach: [
          "Optimized page load speed (98/100 desktop performance score).",
          "Simplified the checkout process with a conversion-focused single page design.",
          "A/B tested copywriting variations highlighting customization options."
        ],
        results: [
          "22% reduction in Google Ads Cost Per Click (CPC)",
          "Quality Score increased from 4.5 to 6.5 out of 10",
          "58% increase in monthly leads"
        ]
      }
    },
    {
      id: "tithi-apparel",
      title: "Tithi Brand Aesthetic",
      category: "Social Media",
      image: "/tithi.jpg",
      description: "A curated aesthetic feed and micro-influencer collaboration series on Instagram.",
      stats: "Organic Traffic +28%",
      details: {
        client: "Tithi Apparel",
        objective: "Expand Gen-Z organic reach and grow community engagement on Instagram.",
        approach: [
          "Doubled daily post frequency using highly aesthetic, lifestyle-oriented photography.",
          "Partnered with local fashion micro-influencers for content co-creation.",
          "Optimized hashtag strategy and Reels algorithms targeting style niches."
        ],
        results: [
          "28% growth in organic website sessions",
          "150+ high-intent emails captured within 6 weeks",
          "Increased brand keyword rankings from 3 to 18"
        ]
      }
    },
    {
      id: "hagrid-nutrition",
      title: "Hagrid Pet Nutrition Portal",
      category: "Web Design",
      image: "/hagrid.jpg",
      description: "Responsive content hub and conversion-optimized checkout experience for pet food.",
      stats: "Conv. Rate +13%",
      details: {
        client: "Hagrid Pet Food",
        objective: "Increase low conversion rate (0.9%) and bounce rate on a newly launched website.",
        approach: [
          "Launched an educational content hub with 8 SEO-optimized articles.",
          "Conducted UX audit and implemented continuous CRO (Conversion Rate Optimization).",
          "Added quick add-to-cart buttons and transparent ingredients breakdown."
        ],
        results: [
          "Conversion Rate rose from 0.9% to 1.02% (+13%)",
          "Bounce rate reduced by 21%",
          "Organic search sessions increased by 21%"
        ]
      }
    },
    {
      id: "homesty-branding",
      title: "Homesty Visual Identity",
      category: "Social Media",
      image: "/homesty.jpg",
      description: "Engaging social media graphics and copywriting to build organic community presence.",
      stats: "Blended CAC -16%",
      details: {
        client: "Homesty Decor",
        objective: "Establish standard attribution channels and lower high customer acquisition costs.",
        approach: [
          "Created consistent, premium social templates aligned with modern design aesthetics.",
          "Structured monthly CRO experiments based on user scroll and click maps.",
          "Unified branding across newsletters, Pinterest, and Instagram."
        ],
        results: [
          "16% reduction in blended customer acquisition cost (CAC)",
          "15% Month-over-Month revenue increase",
          "New customer count grew from 260 to 310 monthly"
        ]
      }
    },
    {
      id: "rkh-herbal",
      title: "RKH Herbal Reels Series",
      category: "Video Content",
      image: "/rkh.jpg",
      description: "Short-form video series and educational webinars highlighting herbal supplements.",
      stats: "Organic Traffic +29%",
      details: {
        client: "RKH Herbal",
        objective: "Build consumer trust and authority in a highly competitive health supplement space.",
        approach: [
          "Produced educational short-form Reels and TikToks clarifying herbal benefits.",
          "Hosted interactive Q&A webinars with health experts.",
          "Optimized on-page SEO schema for natural supplement search queries."
        ],
        results: [
          "29% increase in organic traffic within 2 months",
          "5 new page-1 keyword rankings",
          "Lead form conversion rate grew by 13%"
        ]
      }
    },
    {
      id: "shikvaa-foundation",
      title: "Shikvaa Foundation NGO Portal",
      category: "Web Design",
      image: "/shikvaa.jpg",
      description: "Complete NGO website creation, search optimization, and multi-channel digital marketing reach boosting.",
      stats: "Organic Reach +140% | Inquiries +85%",
      details: {
        client: "Shikvaa Foundation (shikvaafoundation.org)",
        objective: "Build a modern non-profit website to elevate brand credibility, expand digital reach, and drive volunteer & donor engagement.",
        approach: [
          "Designed & developed a modern, accessible non-profit website platform.",
          "Implemented comprehensive digital marketing strategies across social channels.",
          "Optimized donation flow, project highlights, and organic SEO reach."
        ],
        results: [
          "140% surge in organic social reach & brand awareness",
          "85% increase in online volunteer & donor inquiries",
          "Top-ranking digital search presence for core initiatives"
        ]
      }
    },
    {
      id: "day-foundation",
      title: "Day Foundation NGO Platform",
      category: "Web Design",
      image: "/dayfoundation.jpg",
      description: "Non-profit website creation, digital marketing campaigns, and community reach boosting.",
      stats: "Digital Reach +110% | Traffic +65%",
      details: {
        client: "Day Foundation (dayfoundation.in)",
        objective: "Establish an impactful digital presence and scale online community outreach for social welfare programs.",
        approach: [
          "Built a conversion-focused non-profit web platform with responsive layout.",
          "Executed targeted digital marketing campaigns and content strategy.",
          "Streamlined cause presentation and mobile user experience."
        ],
        results: [
          "110% growth in overall digital campaign reach",
          "65% increase in monthly website traffic & engagement",
          "Significantly expanded community support & online outreach"
        ]
      }
    }
  ];

  const [portfolioItems, setPortfolioItems] = useState<any[]>(DEFAULT_PORTFOLIO);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const res = await fetch('/api/portfolio');
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            setPortfolioItems(data);
          }
        }
      } catch (err) {
        console.error('Error fetching portfolio:', err);
      }
    };
    fetchPortfolio();
  }, []);

  const filteredItems = activeFilter === 'All'
    ? portfolioItems
    : portfolioItems.filter(item => item.category === activeFilter);

  // Helper to count items in each category
  const getCategoryCount = (category: string) => {
    if (category === 'All') return portfolioItems.length;
    return portfolioItems.filter(item => item.category === category).length;
  };

  return (
    <>
      <header>
        <Navigation />
      </header>
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section
          aria-label="Hero section"
          className="w-full flex items-center justify-center min-h-[50vh] py-6 px-4 md:px-8 mt-24 md:mt-32 overflow-hidden"
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
              minHeight: 400,
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
              <Badge variant="secondary" className="mb-6 text-sm py-1 px-4 rounded-full bg-black/5 text-gray-700 border border-black/10 flex items-center gap-1.5" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                Work Showcase
              </Badge>
              <h1
                className="text-4xl md:text-6xl font-extrabold mb-8 leading-tight text-[#18181b]"
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  letterSpacing: '-0.03em',
                  fontWeight: 400,
                  transform: isInView ? 'translateY(0)' : 'translateY(20px)',
                  opacity: isInView ? 1 : 0,
                  transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s'
                }}
              >
                Our Creative Portfolio
              </h1>
              <p
                className="text-xl md:text-2xl font-normal mb-8 max-w-3xl mx-auto leading-relaxed text-[#23272f]"
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  transform: isInView ? 'translateY(0)' : 'translateY(20px)',
                  opacity: isInView ? 1 : 0,
                  transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s'
                }}
              >
                Discover how we bring brand stories to life through designs, copy, websites, and high-impact ad campaigns.
              </p>
            </div>
          </div>
        </section>

        {/* Portfolio Content Section */}
        <section ref={gridRef} className={`py-16 px-4 md:px-8 bg-white ${gridClassName}`}>
          <div className="max-w-7xl mx-auto">
            {/* Interactive Filters with counts */}
            <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-16">
              {['All', 'Social Media', 'Web Design', 'Ad Creatives', 'Video Content'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 transform active:scale-95 flex items-center gap-2 ${
                    activeFilter === filter
                      ? 'bg-[#18181b] text-white shadow-xl scale-105'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-900'
                  }`}
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                >
                  {filter}
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    activeFilter === filter 
                      ? 'bg-white text-gray-900 font-bold' 
                      : 'bg-gray-200 text-gray-700'
                  }`}>
                    {getCategoryCount(filter)}
                  </span>
                </button>
              ))}
            </div>

            {/* Portfolio Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredItems.map((item, index) => (
                <div
                  key={item.title}
                  onClick={() => setSelectedItem(item)}
                  className="group cursor-pointer relative overflow-hidden rounded-3xl bg-white border border-gray-150 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col h-full"
                >
                  {/* Image with zoom and category overlay */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4 z-10">
                      <span className="backdrop-blur-md bg-white/90 text-gray-800 text-xs font-semibold px-3 py-1.5 rounded-full border border-white/20 shadow-sm">
                        {item.category}
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 flex-grow flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-bold mb-3 text-[#18181b] group-hover:text-indigo-600 transition-colors duration-300" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                        {item.title}
                      </h3>
                      <p className="text-[#23272f] text-sm leading-relaxed mb-6 font-light" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                        {item.description}
                      </p>
                    </div>

                    {/* Stats & Click Invitation */}
                    <div className="border-t border-gray-100 pt-4 mt-auto flex items-center justify-between">
                      <span className="text-xs font-semibold text-indigo-600 bg-indigo-55/10 px-3 py-1 rounded-md" style={{ fontFamily: 'Montserrat, sans-serif' }}>
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
          </div>
        </section>

        {/* Detailed Modal/Dialog for Portfolio Items */}
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
            <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl p-6 md:p-8 animate-scale-in">
              {/* Close Button */}
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Close modal"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="grid md:grid-cols-2 gap-8 mt-4">
                {/* Visual Area */}
                <div>
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-150 shadow-inner">
                    <img
                      src={selectedItem.image}
                      alt={selectedItem.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="mt-6 bg-indigo-50/50 border border-indigo-100/50 rounded-2xl p-5">
                    <div className="flex items-center gap-2 text-indigo-600 font-semibold mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      <BarChart3 className="w-5 h-5" />
                      Campaign Achievement
                    </div>
                    <p className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      {selectedItem.stats}
                    </p>
                  </div>
                </div>

                {/* Details Area */}
                <div className="flex flex-col justify-between">
                  <div>
                    <Badge variant="secondary" className="mb-3 bg-gray-100 text-gray-700">
                      {selectedItem.category}
                    </Badge>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      {selectedItem.title}
                    </h2>
                    <p className="text-sm font-medium text-gray-500 mb-6" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      Client: {selectedItem.details?.client || 'N/A'}
                    </p>

                    <div className="space-y-6">
                      {selectedItem.details?.objective && (
                        <div>
                          <h4 className="text-sm font-semibold text-gray-900 mb-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                            Objective
                          </h4>
                          <p className="text-sm text-gray-600 font-light leading-relaxed">
                            {selectedItem.details.objective}
                          </p>
                        </div>
                      )}

                      {selectedItem.details?.approach && selectedItem.details.approach.length > 0 && (
                        <div>
                          <h4 className="text-sm font-semibold text-gray-900 mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                            Strategic Approach
                          </h4>
                          <ul className="space-y-1.5">
                            {selectedItem.details.approach.map((step: string, idx: number) => (
                              <li key={idx} className="flex items-start text-xs text-gray-600 font-light leading-relaxed">
                                <span className="text-indigo-600 font-bold mr-2">•</span>
                                {step}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {selectedItem.details?.results && selectedItem.details.results.length > 0 && (
                        <div>
                          <h4 className="text-sm font-semibold text-gray-900 mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                            Key Results
                          </h4>
                          <ul className="space-y-1.5">
                            {selectedItem.details.results.map((res: string, idx: number) => (
                              <li key={idx} className="flex items-center text-xs text-gray-700 font-semibold">
                                <CheckCircle className="w-3.5 h-3.5 text-green-500 mr-2 flex-shrink-0" />
                                {res}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-gray-100 flex justify-end">
                    <Button
                      onClick={() => setSelectedItem(null)}
                      className="bg-gray-900 hover:bg-gray-800 text-white rounded-xl"
                    >
                      Close Details
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CTA section */}
        <section ref={ctaRef} className={`py-20 px-4 md:px-8 bg-white ${ctaClassName}`}>
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
              <div className="relative z-10 p-12 md:p-16 text-center">
                <h2 className="text-3xl md:text-5xl font-normal mb-8" style={{ fontFamily: 'Montserrat, sans-serif', color: 'black', fontWeight: 400, letterSpacing: '-0.03em' }}>
                  Want Similar Growth for Your Business?
                </h2>
                <p className="text-lg md:text-xl text-[#23272f] max-w-2xl mx-auto mb-12" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 300 }}>
                  We design custom digital frameworks and visual materials engineered to scale leads, visibility, and direct revenue.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    className="bg-black hover:bg-gray-800 text-white px-8 py-4 rounded-xl"
                    onClick={() => navigate('/audit')}
                  >
                    Get Free Audit
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-black text-black hover:bg-gray-50 px-8 py-4 rounded-xl"
                    onClick={() => navigate('/contact')}
                  >
                    Discuss Project
                  </Button>
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

export default Portfolio;
