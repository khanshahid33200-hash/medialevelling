import { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useInView } from 'framer-motion';
import { useInViewAnimation } from '@/hooks/use-in-view-animation';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Quote,
  BarChart3,
  Target,
  LineChart,
  Users,
  Clock,
  Lightbulb,
  Rocket
} from 'lucide-react';

// Define the case study data structure
export interface CaseStudyData {
  id: string;
  image: string;
  client: string;
  industry: string;
  challenge: string;
  solution: string;
  results: string[];
  link: string;
  // Additional fields for the detailed view
  fullDescription?: string;
  approach?: string[];
  testimonial?: {
    quote: string;
    author: string;
    position: string;
  };
  timeline?: string;
  detailedResults?: {
    title: string;
    value: string;
    description: string;
  }[];
  nextSteps?: string;
}

// This would typically come from an API or data store
export const caseStudiesData: CaseStudyData[] = [
  {
    id: 'beauty-skincare',
    image: '/belleza-cs.jpg',
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
    link: '/case-studies/beauty-skincare',
    fullDescription: 'A direct-to-consumer beauty brand looking to improve digital marketing performance and customer retention.',
    approach: [
      'Implemented creative refreshes for better engagement',
      'Enhanced CRM workflows for better customer journeys',
      'Optimized retargeting strategies',
      'Improved ad targeting and segmentation'
    ],
    testimonial: {
      quote: 'Working with Media Levelling transformed our digital presence. We saw a 38% increase in ROAS within just 8 months, and our customer acquisition costs dropped by 24%. The team\'s data-driven approach and creative strategies delivered results that exceeded our expectations.',
      author: 'Priya Sharma',
      position: 'Marketing Director, BELLEZA'
    },
    timeline: '8 months',
    detailedResults: [
      { title: 'ROAS Increase', value: '+38%', description: '1.12× to 1.55×' },
      { title: 'Cost Per Acquisition', value: '₹312', description: 'Down from ₹410' },
      { title: 'CTR Growth', value: '+49%', description: '0.58% → 0.86%' },
      { title: 'Monthly Revenue', value: '₹8.1L', description: 'Up from ₹5.3L' }
    ],
    nextSteps: 'Further optimize retargeting and expand to new customer segments.'
  },
  {
    id: 'home-decor',
    image: '/kasbha-cs.jpg',
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
    link: '/case-studies/home-decor',
    fullDescription: 'A niche furniture & décor brand needed to lower CPC and improve ad relevance while increasing lead volume without increasing ad spend.',
    approach: [
      'SKAG Restructure: 1:1 ad-to-keyword mapping',
      'Landing-Page Optimization: Speed 92 mobile, 98 desktop',
      'Negative Keyword Mining: 300+ irrelevant terms removed',
      'Responsive Search Ads with pinning for control'
    ],
    testimonial: {
      quote: 'The team at Media Levelling completely revamped our digital strategy. Our lead generation increased by 58% while reducing our cost per click by 22%. Their attention to detail in keyword targeting and landing page optimization made all the difference for our home decor business.',
      author: 'Rahul Mehta',
      position: 'E-commerce Director, KASBHA'
    },
    timeline: '6 weeks',
    detailedResults: [
      { title: 'CPC Reduction', value: '-22%', description: '₹48 → ₹37.5' },
      { title: 'Quality Score', value: '6.5/10', description: 'Improved from 4.5/10' },
      { title: 'Lead Growth', value: '+58%', description: '125 → 202 leads' },
      { title: 'CTR Increase', value: '+32%', description: 'Ad click-through rate growth' }
    ],
    nextSteps: 'Add advanced remarketing and expand to display network.'
  },
  {
    id: 'pet-nutrition',
    image: '/hagrid-cs.jpg',
    client: 'Hagrid Pet food',
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
    link: '/case-studies/pet-nutrition',
    fullDescription: 'A vegan pet food startup with a new website facing conversion and engagement challenges.',
    approach: [
      'Published 8 SEO-optimized articles',
      'Implemented continuous CRO testing',
      'Improved site speed and user experience',
      'Developed content marketing strategy'
    ],
    testimonial: {
      quote: 'As a new player in the pet nutrition space, we needed to establish credibility fast. Media Levelling helped us achieve a 13% increase in conversion rates and reduced our bounce rate by 21%. Their content strategy and technical optimizations were game-changers for our business.',
      author: 'Ananya Patel',
      position: 'Co-Founder, HAGRID Pet Food'
    },
    timeline: '6 months',
    detailedResults: [
      { title: 'Conversion Rate', value: '+13%', description: '0.9% to 1.02%' },
      { title: 'Bounce Rate', value: '-21%', description: 'Significant reduction' },
      { title: 'Organic Traffic', value: '+21%', description: 'Increase in sessions' },
      { title: 'ROAS', value: '1.25×', description: 'Up from 1.06×' },
      { title: 'SEO Wins', value: '4', description: 'New page-1 keywords' }
    ],
    nextSteps: 'Scale content and add email nurture flows.'
  },
  {
    id: 'apparel',
    image: '/tithi-cs.jpg',
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
    link: '/case-studies/apparel',
    fullDescription: 'A Gen-Z fashion label looking to increase organic reach and build a stronger audience base.',
    approach: [
      'Doubled Instagram content frequency',
      'Partnered with micro-influencers',
      'Enhanced remarketing campaigns',
      'Improved email marketing strategy'
    ],
    testimonial: {
      quote: 'Media Levelling helped us crack the code to reaching Gen-Z. Our organic sessions grew by 28% and we now rank for 18 keywords, up from just 3. Their understanding of social media algorithms and content strategy helped us build a loyal community around our brand.',
      author: 'Neha Kapoor',
      position: 'Brand Director, TITHI'
    },
    timeline: '6 weeks',
    detailedResults: [
      { title: 'Organic Growth', value: '+28%', description: 'Organic sessions increase' },
      { title: 'Meta ROAS', value: '1.22×', description: 'Return on ad spend' },
      { title: 'Keyword Expansion', value: '3 → 18', description: 'Non-branded keywords' },
      { title: 'Email CTR', value: '3.4%', description: 'Email marketing click rate' }
    ],
    nextSteps: 'Expand influencer collaborations and build referral program.'
  },
  {
    id: 'furniture',
    image: '/homesty-cs.jpg',
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
    link: '/case-studies/furniture',
    fullDescription: 'A furniture brand focusing on reducing customer acquisition costs and improving conversion rates.',
    approach: [
      'Monthly CRO experiments and testing',
      'Regular attribution model reviews',
      'Enhanced funnel optimization',
      'Customer journey analysis'
    ],
    testimonial: {
      quote: 'The team at Media Levelling transformed our approach to digital marketing. Their data-driven CRO strategies helped us reduce our customer acquisition costs by 16% while increasing monthly revenue by 15%. Their attention to detail in attribution modeling ensured every marketing dollar was well-spent.',
      author: 'Vikram Singh',
      position: 'Head of E-commerce, HOMESTY'
    },
    timeline: '2 months',
    detailedResults: [
      { title: 'CAC Reduction', value: '-16%', description: 'Lower blended CAC' },
      { title: 'Conversion Lift', value: '+13%', description: 'Funnel conversion rate' },
      { title: 'Revenue Growth', value: '+15% MoM', description: 'Without more spend' },
      { title: 'Session Duration', value: '+22s', description: 'Average session increase' }
    ],
    nextSteps: 'Test higher-LTV audience targeting.'
  },
  {
    id: 'health-wellness',
    image: '/rkh-cs.jpg',
    client: 'RKH Herbal',
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
    link: '/case-studies/health-wellness',
    fullDescription: 'A health and wellness brand specializing in moringa supplements, working to establish authority in a competitive market.',
    approach: [
      'Published 6 SEO-optimized blog posts',
      'Conducted educational webinars',
      'Enhanced on-page SEO elements',
      'Optimized lead capture forms'
    ],
    testimonial: {
      quote: 'Media Levelling\'s content strategy and webinar series helped us establish authority in the health supplements space. We saw a 29% increase in organic traffic and our lead conversion rate improved by 13%. Their ability to create educational yet engaging content has been instrumental in building trust with our audience.',
      author: 'Dr. Arjun Reddy',
      position: 'Founder, RKH Herbal'
    },
    timeline: '2 months',
    detailedResults: [
      { title: 'Organic Growth', value: '+29%', description: '2 months' },
      { title: 'Keyword Gains', value: '5', description: 'New page-1 rankings' },
      { title: 'Lead Conversion', value: '+13%', description: 'Improved form fills' },
      { title: 'Bounce Rate Drop', value: '60% → 51%', description: 'Improved page engagement' }
    ],
    nextSteps: 'Add influencer partnerships and expand product line.'
  }
];


const CaseStudy = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [parallax, setParallax] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  // Find the case study data based on the ID from URL params
  const caseStudy = caseStudiesData.find(study => study.id === id);

  // If case study is not found, show a 404-like message
  if (!caseStudy) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Case Study Not Found</h1>
          <p className="mb-8">The case study you're looking for doesn't exist or has been moved.</p>
          <Button onClick={() => navigate('/case-studies')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Case Studies
          </Button>
        </div>
      </div>
    );
  }

  // Animation hooks
  const { ref: overviewRef, className: overviewClassName } = useInViewAnimation<HTMLDivElement>('animate-fade-in-up');
  const { ref: approachRef, className: approachClassName } = useInViewAnimation<HTMLDivElement>('animate-fade-in-up');
  const { ref: resultsRef, className: resultsClassName } = useInViewAnimation<HTMLDivElement>('animate-fade-in-up');
  const { ref: testimonialRef, className: testimonialClassName } = useInViewAnimation<HTMLDivElement>('animate-fade-in-up');
  const { ref: nextStepsRef, className: nextStepsClassName } = useInViewAnimation<HTMLDivElement>('animate-fade-in-up');
  const { ref: ctaRef, className: ctaClassName } = useInViewAnimation<HTMLDivElement>('animate-fade-in-up');

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

  // If case study not found, show error or redirect
  if (!caseStudy) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Case Study Not Found</h1>
            <p className="mb-8">The case study you're looking for doesn't exist or has been moved.</p>
            <Button onClick={() => navigate('/case-studies')}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Case Studies
            </Button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <header>
        <Navigation />
      </header>
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section
          aria-label="Hero section"
          className="w-full flex items-center justify-center min-h-[60vh] py-6 px-4 md:px-8 mt-24 md:mt-32 overflow-hidden"
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
              <Badge variant="secondary" className="mb-6 text-sm py-1 px-4 rounded-full bg-gray-100 text-gray-700" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                {caseStudy.industry}
              </Badge>
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
                {caseStudy.client}
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
                How we helped {caseStudy.client} achieve exceptional growth through strategic digital marketing.
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
                  Get Similar Results
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Overview Section */}
        <section ref={overviewRef} className={`py-24 px-4 md:px-8 bg-white ${overviewClassName}`}>
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-normal mb-8" style={{ fontFamily: 'Montserrat, sans-serif', color: '#18181b', fontWeight: 400, letterSpacing: '-0.03em' }}>
                  Overview
                </h2>
                <p className="text-lg text-[#23272f] mb-6 leading-relaxed" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 300 }}>
                  {caseStudy.fullDescription}
                </p>
                <div className="mt-8 space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mr-4">
                      <Target className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2" style={{ fontFamily: 'Montserrat, sans-serif', color: '#18181b' }}>
                        The Challenge
                      </h3>
                      <p className="text-[#23272f] leading-relaxed" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 300 }}>
                        {caseStudy.challenge}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mr-4">
                      <Lightbulb className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2" style={{ fontFamily: 'Montserrat, sans-serif', color: '#18181b' }}>
                        The Solution
                      </h3>
                      <p className="text-[#23272f] leading-relaxed" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 300 }}>
                        {caseStudy.solution}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                      <Clock className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2" style={{ fontFamily: 'Montserrat, sans-serif', color: '#18181b' }}>
                        Timeline
                      </h3>
                      <p className="text-[#23272f] leading-relaxed" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 300 }}>
                        {caseStudy.timeline}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative">
                {caseStudy.image && (
                  <img 
                    src={caseStudy.image} 
                    alt={caseStudy.client} 
                    className="w-full h-auto rounded-3xl shadow-lg object-cover"
                    style={{ aspectRatio: '4/3' }}
                  />
                )}
                <div className="absolute -bottom-8 -right-8 bg-white p-6 rounded-2xl shadow-lg max-w-xs">
                  <div className="flex items-center space-x-2 mb-2">
                    <BarChart3 className="w-5 h-5 text-blue-600" />
                    <span className="text-sm font-medium text-blue-600">Key Achievement</span>
                  </div>
                  <p className="text-2xl font-bold text-[#18181b]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    {caseStudy.results[0]}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Approach Section */}
        <section ref={approachRef} className={`py-24 px-4 md:px-8 bg-gradient-to-br from-gray-50/50 to-white ${approachClassName}`}>
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-normal mb-8" style={{ fontFamily: 'Montserrat, sans-serif', color: '#18181b', fontWeight: 400, letterSpacing: '-0.03em' }}>
                Our Approach
              </h2>
              <p className="text-lg text-[#23272f] max-w-3xl mx-auto" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 300 }}>
                A strategic, data-driven methodology tailored specifically for {caseStudy.client}'s unique challenges and goals.
              </p>
            </div>

            <div className="space-y-12">
              {caseStudy.approach?.map((step, index) => (
                <div 
                  key={index}
                  className="flex flex-col md:flex-row items-start md:items-center gap-6 p-6 bg-white rounded-xl shadow-sm transition-all duration-300 hover:shadow-md"
                  style={{
                    transform: isInView ? 'translateY(0)' : 'translateY(20px)',
                    opacity: isInView ? 1 : 0,
                    transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${0.1 + index * 0.1}s`
                  }}
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                    <span className="text-xl font-bold text-gray-700">{index + 1}</span>
                  </div>
                  <div>
                    <p className="text-lg text-[#23272f] leading-relaxed" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 300 }}>
                      {step}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Results Section */}
        <section ref={resultsRef} className={`py-24 px-4 md:px-8 bg-white ${resultsClassName}`}>
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-normal mb-8" style={{ fontFamily: 'Montserrat, sans-serif', color: '#18181b', fontWeight: 400, letterSpacing: '-0.03em' }}>
                The Results
              </h2>
              <p className="text-lg text-[#23272f] max-w-3xl mx-auto" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 300 }}>
                Measurable outcomes that transformed {caseStudy.client}'s digital presence and business growth.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {caseStudy.detailedResults?.map((result, index) => (
                <div
                  key={index}
                  className="flex flex-col justify-center bg-gradient-to-br from-blue-50/50 to-purple-50/50 rounded-3xl p-8 shadow-sm transition-all duration-500 hover:shadow-lg hover:scale-[1.01]"
                  style={{
                    transform: isInView ? 'translateY(0)' : 'translateY(20px)',
                    opacity: isInView ? 1 : 0,
                    transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${0.1 + index * 0.1}s`
                  }}
                >
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-6 mx-auto">
                    {index === 0 ? <LineChart className="w-8 h-8 text-blue-700" /> :
                     index === 1 ? <Users className="w-8 h-8 text-blue-700" /> :
                     index === 2 ? <Target className="w-8 h-8 text-blue-700" /> :
                     <Rocket className="w-8 h-8 text-blue-700" />}
                  </div>
                  <h3 className="text-4xl md:text-5xl font-extrabold text-center mb-4 text-[#18181b]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    {result.value}
                  </h3>
                  <p className="text-xl font-medium text-[#18181b] text-center mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    {result.title}
                  </p>
                  <p className="text-[#23272f] text-center" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 300 }}>
                    {result.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonial Section */}
        {caseStudy.testimonial && (
          <section ref={testimonialRef} className={`py-24 px-4 md:px-8 bg-gradient-to-br from-gray-50/50 to-white ${testimonialClassName}`}>
            <div className="max-w-5xl mx-auto">
              <div className="relative bg-white rounded-3xl p-8 md:p-12 shadow-lg">
                <div className="absolute top-8 left-8 text-gray-200">
                  <Quote className="w-24 h-24 opacity-20" />
                </div>
                <div className="relative z-10">
                  <p className="text-xl md:text-2xl text-[#23272f] mb-8 leading-relaxed" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 300 }}>
                    "{caseStudy.testimonial.quote}"
                  </p>
                  <div>
                    <p className="text-lg font-semibold text-[#18181b]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      {caseStudy.testimonial.author}
                    </p>
                    <p className="text-[#23272f]" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 300 }}>
                      {caseStudy.testimonial.position}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Next Steps Section */}
        {caseStudy.nextSteps && (
          <section ref={nextStepsRef} className={`py-24 px-4 md:px-8 bg-white ${nextStepsClassName}`}>
            <div className="max-w-7xl mx-auto">
              <div className="grid md:grid-cols-2 gap-16 items-center">
                <div>
                  <h2 className="text-3xl md:text-4xl font-normal mb-8" style={{ fontFamily: 'Montserrat, sans-serif', color: '#18181b', fontWeight: 400, letterSpacing: '-0.03em' }}>
                    Continuing the Success Story
                  </h2>
                  <p className="text-lg text-[#23272f] leading-relaxed" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 300 }}>
                    {caseStudy.nextSteps}
                  </p>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8 shadow-sm">
                  <h3 className="text-2xl font-semibold mb-6" style={{ fontFamily: 'Montserrat, sans-serif', color: '#18181b' }}>
                    Want to achieve similar results?
                  </h3>
                  <p className="text-[#23272f] mb-8 leading-relaxed" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 300 }}>
                    Let's discuss how our proven strategies can be tailored to your business goals and challenges.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      className="bg-[#18181b] hover:bg-[#23272f] text-white px-6 py-3 rounded-xl font-semibold transform transition-all duration-300 hover:scale-105"
                      onClick={() => navigate('/audit')}
                      style={{
                        fontFamily: 'Montserrat, sans-serif'
                      }}
                    >
                      Get a Free Audit
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      className="border-[#18181b] text-[#18181b] hover:bg-[#f3f4f6] px-6 py-3 rounded-xl font-semibold transform transition-all duration-300 hover:scale-105"
                      onClick={() => navigate('/contact')}
                      style={{
                        fontFamily: 'Montserrat, sans-serif',
                        borderColor: '#18181b'
                      }}
                    >
                      Contact Us
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Final CTA Section */}
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
                  <h2 className="text-3xl md:text-5xl font-normal mb-8" style={{ fontFamily: 'Montserrat, sans-serif', color: '#18181b', fontWeight: 400, letterSpacing: '-0.03em' }}>
                    Ready to Transform Your Digital Presence?
                  </h2>
                  <p className="text-lg md:text-xl text-[#23272f] mb-12 max-w-2xl mx-auto" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 300 }}>
                    Let's create your success story together. Our team is ready to develop a tailored strategy for your unique business needs.
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

        {/* Related Case Studies */}
        <section className="py-24 px-4 md:px-8 bg-gradient-to-br from-white to-gray-50/50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-normal mb-8" style={{ fontFamily: 'Montserrat, sans-serif', color: '#18181b', fontWeight: 400, letterSpacing: '-0.03em' }}>
                Explore More Success Stories
              </h2>
              <p className="text-lg text-[#23272f] max-w-3xl mx-auto" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 300 }}>
                Discover how we've helped other businesses achieve their digital marketing goals.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {caseStudiesData
                .filter(study => study.id !== id)
                .slice(0, 3)
                .map((study, index) => (
                  <div
                    key={study.id}
                    className="border-0 shadow-sm bg-white overflow-hidden rounded-xl transform transition-all duration-500 hover:scale-[1.02] hover:shadow-lg"
                    style={{
                      transform: isInView ? 'translateY(0)' : 'translateY(20px)',
                      opacity: isInView ? 1 : 0,
                      transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${0.1 + index * 0.1}s`
                    }}
                  >
                    {study.image && (
                      <img src={study.image} alt={study.client} className="w-full h-48 object-cover object-center" />
                    )}
                    <div className="p-6">
                      <Badge variant="secondary" className="mb-3 text-sm py-1 px-3 rounded-full bg-gray-100 text-gray-700" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                        {study.industry}
                      </Badge>
                      <h3 className="text-xl font-semibold mb-3" style={{ fontFamily: 'Montserrat, sans-serif', color: '#18181b' }}>
                        {study.client}
                      </h3>
                      <p className="text-[#23272f] leading-relaxed mb-4" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 300 }}>
                        {study.challenge}
                      </p>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="mt-4 text-[#18181b] hover:text-[#23272f] group-hover:translate-x-1 transition-all duration-300"
                        onClick={() => navigate(study.link)}
                      >
                        Read Case Study
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section>

        <BackToTop />
      </main>
      <Footer />
    </>
  );
};

export default CaseStudy;