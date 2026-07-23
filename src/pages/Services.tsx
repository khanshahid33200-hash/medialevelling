import { useState, useRef } from 'react';
import { useInView } from 'framer-motion';
// Assuming useInViewAnimation is a custom hook that applies a class based on in-view status
// For this example, I'll define a simple version of it or directly apply classes.
// If '@/hooks/use-in-view-animation' is a complex hook, you might need to provide its implementation.

// Dummy useInViewAnimation for demonstration if the original is not provided
const useInViewAnimation = (animationClass) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 }); // Trigger when 20% of element is in view
  return { ref, className: isInView ? animationClass : 'opacity-0' }; // Start hidden, fade in
};

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  BarChart3,
  Users,
  TrendingUp,
  Search,
  Video,
  Globe,
  Target,
  ArrowRight,
  CheckCircle,
  Zap,
  Eye,
  MessageSquare,
  Lightbulb, // New icon for 'Our Process'
  Handshake, // New icon for 'Our Process'
  Rocket, // New icon for 'Our Process'
  HelpCircle // New icon for FAQ
} from 'lucide-react';
import Navigation from '@/components/Navigation'; // Assuming this component exists
import Footer from '@/components/Footer'; // Assuming this component exists
import BackToTop from '@/components/BackToTop'; // Assuming react-router-dom is set up
import { useNavigate } from 'react-router-dom'; // Assuming react-router-dom is set up

const services = [
  {
    id: 'meta-ads',
    title: 'Meta Ads',
    description: 'Strategic Facebook and Instagram advertising campaigns that drive conversions and brand awareness.',
    icon: Target,
    features: [
      'Custom audience targeting',
      'A/B testing campaigns',
      'Conversion tracking',
      'Creative ad design',
      'Performance optimization',
      'ROI reporting'
    ]
  },
  {
    id: 'google-ads',
    title: 'Google Ads',
    description: 'Search and display advertising that puts your business in front of customers actively looking for your services.',
    icon: Search,
    features: [
      'Keyword research & optimization',
      'Search & display campaigns',
      'Remarketing strategies',
      'Quality score optimization',
      'Budget management',
      'Performance analytics'
    ]
  },
  {
    id: 'seo',
    title: 'SEO',
    description: 'Search engine optimization to improve your website\'s visibility and drive organic traffic.',
    icon: TrendingUp,
    features: [
      'Technical SEO audit',
      'On-page optimization',
      'Content strategy',
      'Link building',
      'Local SEO',
      'Performance monitoring'
    ]
  },
  {
    id: 'short-form-content',
    title: 'Short-form Content',
    description: 'Engaging video content for TikTok, Instagram Reels, and YouTube Shorts that captivates your audience.',
    icon: Video,
    features: [
      'Creative concept development',
      'Video production & editing',
      'Trend analysis',
      'Platform optimization',
      'Engagement strategies',
      'Performance tracking'
    ]
  },
  {
    id: 'website-creation',
    title: 'Website Creation',
    description: 'Professional, conversion-focused websites that represent your brand and drive business growth.',
    icon: Globe,
    features: [
      'Custom design & development',
      'Mobile-responsive design',
      'SEO-optimized structure',
      'Fast loading speeds',
      'Conversion optimization',
      'Ongoing maintenance'
    ]
  }
];



const faqs = [
  {
    question: "How long does it take to see results?",
    answer: "Results vary depending on the service and your industry. For paid ads, you can often see initial results within weeks. SEO and content marketing build over months for sustainable long-term growth. We provide transparent reporting to track progress."
  },
  {
    question: "Do you offer custom packages?",
    answer: "Yes, absolutely! We understand that every business is unique. We'll work closely with you to create a customized digital marketing strategy tailored to your specific goals, budget, and needs."
  },
  {
    question: "What makes your agency different?",
    answer: "Our focus is on delivering measurable ROI through a blend of creative strategy, data-driven optimization, and dedicated client support. We pride ourselves on transparency, communication, and a genuine partnership approach."
  },
  {
    question: "How do you measure success?",
    answer: "We define success based on your specific business objectives. This could include metrics like website traffic, lead generation, conversion rates, return on ad spend (ROAS), brand awareness, and customer engagement. We provide detailed reports to show our impact."
  }
];

const Services = () => {
  const heroRef = useRef(null);
  const isInViewHero = useInView(heroRef, { once: true, amount: 0.3 });
  
  // Use useInViewAnimation for other sections to apply fade-in effect
  const servicesRef = useRef(null);
  const isInViewServices = useInView(servicesRef, { once: true, amount: 0.2 });

  const processRef = useRef(null);
  const isInViewProcess = useInView(processRef, { once: true, amount: 0.2 });

  const faqRef = useRef(null);
  const isInViewFaq = useInView(faqRef, { once: true, amount: 0.2 });

  const ctaRef = useRef(null);
  const isInViewCta = useInView(ctaRef, { once: true, amount: 0.2 });

  const navigate = useNavigate();

  return (
    <>
      <style>
        {`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap');
        
        body {
          font-family: 'Montserrat', sans-serif;
        }

        /* Custom keyframes for gradient movement */
        @keyframes gradientMove {
          0% { background-position: 0% 0%; }
          50% { background-position: 100% 100%; }
          100% { background-position: 0% 0%; }
        }

        .animate-gradient-move {
          animation: gradientMove 15s ease infinite;
        }

        /* Fade-in-up animation */
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        /* Staggered animation for grid items */
        .animate-staggered-fade-in-up > div {
          animation: fadeInUp 0.8s ease-out forwards;
          opacity: 0; /* Start hidden */
        }

        /* Process section specific styling */
        .process-step {
            position: relative;
        }
        `}
      </style>
      <header>
        <Navigation />
      </header>
      <main className="min-h-screen bg-white">
        {/* Hero Section - Reduced top margin and vertical padding */}
        <section 
          ref={heroRef}
          className="w-full flex items-center justify-center min-h-[80vh] py-16 px-2 md:px-4 mt-20 md:mt-24 overflow-hidden"
          style={{
            opacity: isInViewHero ? 1 : 0,
            transform: isInViewHero ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.8s ease-out, transform 0.8s ease-out'
          }}
        >
          <div
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
              transform: isInViewHero ? 'scale(1)' : 'scale(0.98)',
              opacity: isInViewHero ? 1 : 0,
              transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s',
            }}
          >
            {/* Gradient overlay */}
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
            {/* Centered content */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center w-full">
              <h1
                className="text-4xl md:text-6xl font-extrabold mb-8 leading-tight text-black"
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  color: '#000000',
                  letterSpacing: '-0.03em',
                  fontWeight: 400,
                  transform: isInViewHero ? 'translateY(0)' : 'translateY(20px)',
                  opacity: isInViewHero ? 1 : 0,
                  transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s'
                }}
              >
                Our Services
              </h1>
              <p
                className="text-xl md:text-2xl font-normal mb-12 max-w-3xl mx-auto leading-relaxed text-black"
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  color: '#000000',
                  transform: isInViewHero ? 'translateY(0)' : 'translateY(20px)',
                  opacity: isInViewHero ? 1 : 0,
                  transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s'
                }}
              >
                Digital marketing solutions to accelerate your growth.
              </p>
            </div>
          </div>
        </section>

        {/* Services Section - Reduced vertical padding further */}
        <section ref={servicesRef} className={`py-12 px-2 md:px-4 w-full ${isInViewServices ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <div className="w-full max-w-[90rem] mx-auto rounded-[48px] md:rounded-[48px] bg-white px-6 md:px-16 py-10 md:py-14 overflow-hidden">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-normal mb-8" style={{ fontFamily: 'Montserrat, sans-serif', color: '#18181b', fontWeight: 400, letterSpacing: '-0.03em' }}>
                Digital Marketing Services<br />That Drive Results
              </h2>
              <p className="text-lg md:text-xl text-black max-w-3xl mx-auto" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 300 }}>
                From social media management to website creation, we provide end-to-end digital marketing solutions that help your business grow and succeed online.
              </p>
            </div>

            {/* Modified Services Layout: Flexbox for more fluid wrapping */}
            <div className="flex flex-wrap justify-center gap-12 animate-staggered-fade-in-up">
              {services.map((service, idx) => {
                const IconComponent = service.icon;
                return (
                  <div
                    key={service.id}
                    className="w-full sm:w-[calc(50%-1.5rem)] lg:w-[calc(33.33%-2rem)] max-w-md group cursor-pointer transition-all duration-500 hover:shadow-2xl hover:scale-105 rounded-3xl overflow-hidden relative
                    bg-white border border-gray-100" // Changed background to white with border
                    style={{
                      animationDelay: `${idx * 150}ms`, // Staggered animation
                      boxShadow: '0 10px 30px rgba(0,0,0,0.05)', // Subtle initial shadow
                    }}
                    onClick={() => navigate('/pricing')}
                  >
                    <div className="p-8 md:p-10">
                      <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 bg-[#18181b] shadow-lg">
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-normal mb-4" style={{ fontFamily: 'Montserrat, sans-serif', color: '#18181b', fontWeight: 400 }}>
                        {service.title}
                      </h3>
                      <p className="text-base text-[#23272f] mb-6" style={{ fontFamily: 'Montserrat', fontWeight: 300 }}>
                        {service.description}
                      </p>
                      <div className="space-y-3 mb-6">
                        {service.features.map((feature, featureIdx) => (
                          <div key={featureIdx} className="flex items-center gap-3">
                            <CheckCircle className="w-5 h-5 text-black flex-shrink-0" />
                            <p className="text-black" style={{ fontFamily: 'Montserrat', fontWeight: 300 }}>
                              {feature}
                            </p>
                          </div>
                        ))}
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* How We Work / Our Process Section - Reduced vertical padding further */}
        <section ref={processRef} className={`py-12 px-2 md:px-4 w-full ${isInViewProcess ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <div className="w-full max-w-[90rem] mx-auto rounded-[48px] md:rounded-[48px] bg-white px-6 md:px-16 py-10 md:py-14 overflow-hidden">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-5xl font-normal mb-8" style={{ fontFamily: 'Montserrat, sans-serif', color: '#18181b', fontWeight: 400, letterSpacing: '-0.03em' }}>
                Our Simple Process
              </h2>
              <p className="text-lg md:text-xl text-black max-w-3xl mx-auto" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 300 }}>
                We follow a clear, collaborative approach to ensure your digital marketing success.
              </p>
            </div>

            <div className="flex flex-col md:flex-row justify-center items-center md:items-stretch gap-8 animate-staggered-fade-in-up">
              {/* Step 1 */}
              <div 
                className="process-step flex flex-col items-center text-center p-8 rounded-3xl relative overflow-hidden bg-white border border-gray-100 w-full md:w-1/3"
                style={{
                  animationDelay: '0ms',
                  boxShadow: '0 10px 20px rgba(0,0,0,0.03)'
                }}
              >
                <div className="w-16 h-16 rounded-full bg-[#18181b] flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Lightbulb className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-normal mb-4" style={{ fontFamily: 'Montserrat, sans-serif', color: '#18181b', fontWeight: 400 }}>
                  1. Discover & Strategize
                </h3>
                <p className="text-black" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 300 }}>
                  We start by understanding your unique business, goals, and target audience to craft a tailored strategy.
                </p>
              </div>

              {/* Step 2 */}
              <div 
                className="process-step flex flex-col items-center text-center p-8 rounded-3xl relative overflow-hidden bg-white border border-gray-100 w-full md:w-1/3"
                style={{
                  animationDelay: '150ms',
                  boxShadow: '0 10px 20px rgba(0,0,0,0.03)'
                }}
              >
                <div className="w-16 h-16 rounded-full bg-[#18181b] flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Handshake className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-normal mb-4" style={{ fontFamily: 'Montserrat, sans-serif', color: '#18181b', fontWeight: 400 }}>
                  2. Execute & Optimize
                </h3>
                <p className="text-black" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 300 }}>
                  Our team implements the strategy, continuously monitoring performance and optimizing for best results.
                </p>
              </div>

              {/* Step 3 */}
              <div 
                className="process-step flex flex-col items-center text-center p-8 rounded-3xl relative overflow-hidden bg-white border border-gray-100 w-full md:w-1/3"
                style={{
                  animationDelay: '300ms',
                  boxShadow: '0 10px 20px rgba(0,0,0,0.03)'
                }}
              >
                <div className="w-16 h-16 rounded-full bg-[#18181b] flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Rocket className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-normal mb-4" style={{ fontFamily: 'Montserrat, sans-serif', color: '#18181b', fontWeight: 400 }}>
                  3. Analyze & Grow
                </h3>
                <p className="text-black" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 300 }}>
                  We provide transparent reports, analyze data, and adapt strategies to ensure sustained growth.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section - Reduced vertical padding further */}
        <section className="py-12 px-2 md:px-4 w-full">
          <div className="w-full max-w-[90rem] mx-auto rounded-[48px] md:rounded-[48px] bg-white px-6 md:px-16 py-10 md:py-14 overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="text-center md:text-left animate-fade-in-up">
              <h2 className="text-3xl md:text-5xl font-normal mb-8" style={{ fontFamily: 'Montserrat, sans-serif', color: '#18181b', fontWeight: 400, letterSpacing: '-0.03em' }}>
                Why Choose Media Levelling?
              </h2>
              <p className="text-lg md:text-xl text-[#23272f] max-w-3xl md:max-w-full mx-auto" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 300 }}>
                We combine creativity, strategy, and data-driven insights to deliver exceptional results for your business. Our unique approach ensures you get the most out of your digital marketing investment.
              </p>
            </div>

            <div className="space-y-8 animate-staggered-fade-in-up">
              <div 
                className="flex items-start gap-4 p-6 rounded-2xl bg-white border border-gray-100"
                style={{ animationDelay: '0ms', boxShadow: '0 5px 15px rgba(0,0,0,0.02)' }}
              >
                <div className="w-12 h-12 rounded-full bg-[#18181b] flex items-center justify-center flex-shrink-0 shadow-lg">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-normal mb-2" style={{ fontFamily: 'Montserrat, sans-serif', color: '#18181b', fontWeight: 400 }}>
                    Fast Results
                  </h3>
                  <p className="text-black" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 300 }}>
                    Quick implementation and optimization to see results faster than traditional marketing methods.
                  </p>
                </div>
              </div>

              <div 
                className="flex items-start gap-4 p-6 rounded-2xl bg-white border border-gray-100"
                style={{ animationDelay: '150ms', boxShadow: '0 5px 15px rgba(0,0,0,0.02)' }}
              >
                <div className="w-12 h-12 rounded-full bg-[#18181b] flex items-center justify-center flex-shrink-0 shadow-lg">
                  <Eye className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-normal mb-2" style={{ fontFamily: 'Montserrat, sans-serif', color: '#18181b', fontWeight: 400 }}>
                    Transparent Reporting
                  </h3>
                  <p className="text-black" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 300 }}>
                    Detailed analytics and regular reports so you always know how your campaigns are performing.
                  </p>
                </div>
              </div>

              <div 
                className="flex items-start gap-4 p-6 rounded-2xl bg-white border border-gray-100"
                style={{ animationDelay: '300ms', boxShadow: '0 5px 15px rgba(0,0,0,0.02)' }}
              >
                <div className="w-12 h-12 rounded-full bg-[#18181b] flex items-center justify-center flex-shrink-0 shadow-lg">
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-normal mb-2" style={{ fontFamily: 'Montserrat, sans-serif', color: '#18181b', fontWeight: 400 }}>
                    Dedicated Support
                  </h3>
                  <p className="text-black" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 300 }}>
                    Direct access to your marketing team with personalized support and strategic guidance.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Frequently Asked Questions Section - Reduced vertical padding further */}
        <section ref={faqRef} className={`py-12 px-2 md:px-4 w-full ${isInViewFaq ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <div className="w-full max-w-[90rem] mx-auto rounded-[48px] md:rounded-[48px] bg-white px-6 md:px-16 py-10 md:py-14 overflow-hidden">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-normal mb-8" style={{ fontFamily: 'Montserrat, sans-serif', color: '#18181b', fontWeight: 400, letterSpacing: '-0.03em' }}>
                Frequently Asked Questions
              </h2>
              <p className="text-lg md:text-xl text-black max-w-3xl mx-auto" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 300 }}>
                Find answers to common questions about our services and approach.
              </p>
            </div>

            <div className="space-y-6">
              {faqs.map((faq, idx) => (
                <div 
                  key={idx} 
                  className="rounded-2xl p-6 border border-gray-100 bg-white"
                  style={{
                    animationDelay: `${idx * 100}ms`,
                    boxShadow: '0 5px 15px rgba(0,0,0,0.02)'
                  }}
                >
                  <h3 className="flex items-start text-lg font-normal text-[#18181b] mb-2" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 400 }}>
                    <HelpCircle className="w-5 h-5 text-[#18181b] mr-3 mt-1 flex-shrink-0" />
                    {faq.question}
                  </h3>
                  {/* For a real accordion, this would be conditionally rendered/toggled */}
                  <p className="text-black pl-8" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 300 }}>
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section - Reduced vertical padding further */}
        <section ref={ctaRef} className={`py-12 px-2 md:px-4 w-full ${isInViewCta ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <div className="w-full max-w-[90rem] mx-auto">
            <div
              className="relative w-full rounded-[32px] bg-white flex flex-col items-center justify-center px-4 md:px-16 py-10 min-h-[320px] overflow-hidden"
              style={{
                borderRadius: '32px',
                background: `
                  radial-gradient(ellipse at 10% 20%, #e0f7fa 0%, transparent 50%),
                  radial-gradient(ellipse at 90% 80%, #f3e8ff 0%, transparent 55%),
                  radial-gradient(ellipse at 30% 70%, #d1f5e0 0%, transparent 65%),
                  radial-gradient(ellipse at 70% 40%, #ffe4fa 0%, transparent 60%),
                  linear-gradient(135deg, #f7fafc 0%, #f8fafc 100%)
                `,
                boxShadow: 'none',
                backgroundSize: '400% 400%',
                position: 'relative',
              }}
            >
              {/* Added a subtle animated gradient overlay for more dynamism */}
              <div
                className="absolute inset-0 rounded-[32px] z-0 pointer-events-none animate-gradient-move"
                style={{
                  background: `
                    radial-gradient(circle at 15% 25%, #e0f7fa 0%, transparent 60%),
                    radial-gradient(circle at 85% 75%, #f3e8ff 0%, transparent 55%),
                    radial-gradient(circle at 25% 65%, #d1f5e0 0%, transparent 70%),
                    radial-gradient(circle at 75% 35%, #ffe4fa 0%, transparent 65%)
                  `,
                  opacity: 0.8,
                  backgroundSize: '400% 400%',
                }}
              />
              <div className="relative z-10 flex flex-col items-center justify-center h-full text-center w-full">
                <h2 className="text-3xl md:text-5xl font-normal mb-6 text-center" style={{ fontFamily: 'Montserrat, sans-serif', color: '#18181b', fontWeight: 400 }}>
                  Ready to Level Up Your Business?
                </h2>
                <p className="text-lg text-black mb-8 max-w-2xl mx-auto text-center" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 300 }}>
                  Let's discuss your goals and create a custom digital marketing strategy that drives real results for your business.
                </p>
                <div className="flex flex-col md:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    className="bg-[#18181b] hover:bg-[#23272f] text-white px-8 py-3 rounded-lg font-normal text-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
                    onClick={() => navigate('/contact')}
                    style={{ fontFamily: 'Montserrat', fontWeight: 400, boxShadow: '0 4px 14px rgba(0, 0, 0, 0.1)' }}
                  >
                    Get Started Today
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-[#18181b] text-[#18181b] hover:bg-[#f3f4f6] px-8 py-3 rounded-lg font-normal text-lg transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
                    onClick={() => navigate('/pricing')}
                    style={{ fontFamily: 'Montserrat', fontWeight: 400, borderColor: '#18181b', boxShadow: '0 4px 14px rgba(0, 0, 0, 0.05)' }}
                  >
                    View Pricing Plans
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

export default Services;
