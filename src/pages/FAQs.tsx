import { useState, useRef } from 'react';
import { useInView } from 'framer-motion';
// Assuming useInViewAnimation applies a simple fade-in-up,
// we'll focus on direct framer-motion approach for more control.
// import { useInViewAnimation } from '@/hooks/use-in-view-animation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  ChevronDown,
  ChevronUp,
  ArrowRight,
  MessageSquare,
  Clock,
  DollarSign,
  Target,
  TrendingUp,
  Search,
  Video,
  Globe,
  HelpCircle,
  Mail,
  Phone
} from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import { useNavigate } from 'react-router-dom';

const faqCategories = [
  {
    id: 'general',
    title: 'General Questions',
    icon: HelpCircle,
    questions: [
      {
        question: 'What services does Media Levelling offer?',
        answer: 'We offer comprehensive digital marketing services including SEO, Google Ads, Meta Ads (Facebook & Instagram), short-form content creation, website development, and content strategy. Each service is designed to help businesses grow their online presence and drive real results.'
      },
      {
        question: 'How long does it take to see results?',
        answer: 'Results vary by service and your specific goals. SEO typically shows initial improvements in 3-6 months, while paid advertising can show immediate results. We provide regular reporting so you can track progress and see the impact of our strategies.'
      },
      {
        question: 'Do you work with small businesses?',
        answer: 'Absolutely! We work with businesses of all sizes, from startups to established companies. We offer scalable solutions that can be customized to fit your budget and goals, ensuring every business can benefit from professional digital marketing.'
      },
      {
        question: 'What makes Media Levelling different from other agencies?',
        answer: 'We combine data-driven strategies with creative thinking, transparent reporting, and personalized support. Our team stays current with industry trends and focuses on delivering measurable results that directly impact your business growth.'
      }
    ]
  },
  {
    id: 'seo',
    title: 'SEO Services',
    icon: Search,
    questions: [
      {
        question: 'How long does SEO take to work?',
        answer: 'SEO is a long-term strategy that typically shows initial improvements in 3-6 months. However, the timeline varies based on your website\'s current state, competition, and the specific keywords you\'re targeting. We provide regular updates on your progress.'
      },
      {
        question: 'What\'s included in your SEO services?',
        answer: 'Our SEO services include technical audits, on-page optimization, keyword research, content strategy, link building, local SEO, and performance monitoring. We provide comprehensive reports and recommendations for ongoing improvement.'
      },
      {
        question: 'Do you guarantee first page rankings?',
        answer: 'While we can\'t guarantee specific rankings due to the many factors involved, we do guarantee that we\'ll work diligently to improve your search visibility and provide transparent reporting on your progress. Our strategies are based on proven methods and industry best practices.'
      },
      {
        question: 'How do you measure SEO success?',
        answer: 'We track multiple metrics including organic traffic, keyword rankings, click-through rates, conversion rates, and overall website performance. We provide detailed monthly reports showing your progress and ROI.'
      }
    ]
  },
  {
    id: 'ads',
    title: 'Paid Advertising',
    icon: Target,
    questions: [
      {
        question: 'What\'s the difference between Google Ads and Meta Ads?',
        answer: 'Google Ads targets users actively searching for your products/services, while Meta Ads (Facebook/Instagram) targets users based on interests and demographics. Both are effective but serve different purposes in your marketing strategy.'
      },
      {
        question: 'How much should I budget for advertising?',
        answer: 'Advertising budgets vary based on your industry, goals, and competition. We typically recommend starting with $500-2000/month for small businesses, but we\'ll work with you to create a budget that fits your needs and provides a good ROI.'
      },
      {
        question: 'How quickly can I see results from paid ads?',
        answer: 'Paid advertising can show immediate results in terms of traffic and leads. However, it takes time to optimize campaigns for the best performance and ROI. We typically see significant improvements within the first 30-60 days.'
      },
      {
        question: 'Do you manage the ad spend or do I?',
        answer: 'We can manage your ad spend directly or provide guidance while you maintain control. Many clients prefer us to manage everything for convenience and optimization, but we\'re flexible to work with your preferences.'
      }
    ]
  },
  {
    id: 'content',
    title: 'Content & Social Media',
    icon: Video,
    questions: [
      {
        question: 'What platforms do you create content for?',
        answer: 'We create content for all major social media platforms including Instagram, TikTok, Facebook, LinkedIn, YouTube, and Twitter. We focus on platforms where your target audience is most active and engaged.'
      },
      {
        question: 'How often should I post on social media?',
        answer: 'Posting frequency depends on your platform and audience. Generally, we recommend 3-5 posts per week for Instagram, 1-2 daily for Twitter, and 2-3 weekly for LinkedIn. We\'ll create a custom content calendar for your business.'
      },
      {
        question: 'Do you create all the content or just strategy?',
        answer: 'We offer both options! We can create all your content including copy, graphics, and videos, or we can provide strategy and guidance while you create the content. Our packages are flexible to meet your needs.'
      },
      {
        question: 'How do you measure content performance?',
        answer: 'We track engagement rates, reach, impressions, click-through rates, and conversion rates. We also monitor brand mentions and sentiment to ensure your content is resonating with your audience.'
      }
    ]
  },
  {
    id: 'website',
    title: 'Website Development',
    icon: Globe,
    questions: [
      {
        question: 'How long does it take to build a website?',
        answer: 'Website development timelines vary based on complexity. A simple 3-5 page website typically takes 2-4 weeks, while more complex sites with custom features can take 6-12 weeks. We\'ll provide a detailed timeline during our initial consultation.'
      },
      {
        question: 'Do you provide ongoing website maintenance?',
        answer: 'Yes, we offer ongoing maintenance packages that include updates, security monitoring, performance optimization, and content updates. This ensures your website stays current, secure, and performs optimally.'
      },
      {
        question: 'Can you redesign my existing website?',
        answer: 'Absolutely! We can redesign your existing website to improve user experience, conversion rates, and search engine performance. We\'ll analyze your current site and provide recommendations for improvement.'
      },
      {
        question: 'Do you provide hosting and domain services?',
        answer: 'Yes, we can handle hosting, domain registration, and SSL certificates. We work with reliable hosting providers to ensure your website is fast, secure, and always available.'
      }
    ]
  },
  {
    id: 'pricing',
    title: 'Pricing & Billing',
    icon: DollarSign,
    questions: [
      {
        question: 'How do you structure your pricing?',
        answer: 'We offer transparent, monthly pricing based on the services you need. Our packages are designed to be scalable, so you can start with essential services and add more as your business grows.'
      },
      {
        question: 'Do you require long-term contracts?',
        answer: 'We offer flexible terms with no long-term contracts required. Most of our services are month-to-month, though we do offer discounts for annual commitments. We want you to be satisfied with our services.'
      },
      {
        question: 'What\'s included in your monthly fees?',
        answer: 'Monthly fees include strategy development, campaign management, content creation, reporting, and ongoing optimization. We\'re transparent about what\'s included and will clearly outline all deliverables.'
      },
      {
        question: 'Do you offer custom packages?',
        answer: 'Yes! We understand that every business has unique needs. We\'re happy to create custom packages that combine the services you need at a price that fits your budget.'
      }
    ]
  }
];

const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  // Add ref for individual FAQ item animation
  const itemRef = useRef(null);
  const isInView = useInView(itemRef, { once: true, amount: 0.2 });

  return (
    <div
      ref={itemRef}
      className="border-b border-gray-100 last:border-b-0"
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 0.6s ease-out, transform 0.6s ease-out'
      }}
    >
      <button
        className="w-full py-6 text-left flex items-center justify-between hover:bg-gray-50/50 transition-colors duration-200 rounded-lg px-4"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-lg font-semibold pr-8" style={{ fontFamily: 'Montserrat, sans-serif', color: '#18181b' }}>
          {question}
        </h3>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-[#18181b] flex-shrink-0" />
        ) : (
          <ChevronDown className="w-5 h-5 text-[#18181b] flex-shrink-0" />
        )}
      </button>
      {isOpen && (
        <div className="pb-6 px-4">
          <p className="text-[#23272f] leading-relaxed" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 300 }}>
            {answer}
          </p>
        </div>
      )}
    </div>
  );
};

const FAQs = () => {
  const heroRef = useRef(null);
  const isInViewHero = useInView(heroRef, { once: true, amount: 0.3 });
  // Ref for the category section
  const categoryRef = useRef(null);
  const isInViewCategory = useInView(categoryRef, { once: true, amount: 0.2 });
  // Ref for the FAQ content section (Card)
  const faqContentRef = useRef(null);
  const isInViewFaqContent = useInView(faqContentRef, { once: true, amount: 0.2 });
  // Ref for the Contact CTA section
  const contactCTARef = useRef(null);
  const isInViewContactCTA = useInView(contactCTARef, { once: true, amount: 0.2 });
  // Ref for the Contact Info section
  const contactInfoRef = useRef(null);
  const isInViewContactInfo = useInView(contactInfoRef, { once: true, amount: 0.2 });

  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('general');

  return (
    <>
      <header>
        <Navigation />
      </header>
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section
          ref={heroRef}
          className="w-full flex items-center justify-center min-h-[80vh] py-8 px-4 md:px-8 mt-24 md:mt-32 overflow-hidden"
          style={{
            opacity: isInViewHero ? 1 : 0,
            transform: isInViewHero ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.8s ease-out, transform 0.8s ease-out'
          }}
        >
          <div
            className="relative w-full max-w-7xl mx-auto rounded-[48px] md:rounded-[48px] bg-white flex flex-col items-center justify-center px-6 md:px-16 py-12 md:py-20 overflow-hidden"
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
                  transform: isInViewHero ? 'translateY(0)' : 'translateY(20px)',
                  opacity: isInViewHero ? 1 : 0,
                  transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s'
                }}
              >
                Frequently Asked<br />Questions
              </h1>
              <p
                className="text-xl md:text-2xl font-normal mb-12 max-w-3xl mx-auto leading-relaxed"
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  color: '#23272f',
                  transform: isInViewHero ? 'translateY(0)' : 'translateY(20px)',
                  opacity: isInViewHero ? 1 : 0,
                  transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s'
                }}
              >
                Find answers to common questions about our digital marketing services and processes. We believe in transparency and clear communication.
              </p>
            </div>
          </div>
        </section>

        {/* Category Navigation */}
        <section
          ref={categoryRef}
          className="py-16 px-4 md:px-8 bg-white"
          style={{
            opacity: isInViewCategory ? 1 : 0,
            transform: isInViewCategory ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.8s ease-out, transform 0.8s ease-out'
          }}
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-normal mb-4" style={{ fontFamily: 'Montserrat, sans-serif', color: '#18181b', fontWeight: 400 }}>
                Browse by Category
              </h2>
              <p className="text-lg text-[#23272f]" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 300 }}>
                Select a category to find relevant answers
              </p>
            </div>
            <div className="flex flex-wrap gap-4 justify-center">
              {faqCategories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center gap-3 px-6 py-4 rounded-xl border-2 transition-all duration-300 hover:scale-105 ${
                      selectedCategory === category.id
                        ? 'border-[#18181b] bg-[#f3e8ff] text-[#18181b]'
                        : 'border-gray-200 bg-white text-[#23272f] hover:border-gray-300'
                    }`}
                    style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 400 }}
                  >
                    <IconComponent className="w-5 h-5" />
                    {category.title}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* FAQ Content */}
        <section
          ref={faqContentRef}
          className={`pt-8 pb-16 px-4 md:px-8 bg-gradient-to-br from-gray-50/50 to-white`}
          style={{
            opacity: isInViewFaqContent ? 1 : 0,
            transform: isInViewFaqContent ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.8s ease-out, transform 0.8s ease-out'
          }}
        >
          <div className="max-w-4xl mx-auto">
            {faqCategories
              .filter(category => category.id === selectedCategory)
              .map((category) => (
                <div key={category.id}>
                  <div className="text-center mb-12">
                    <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                      <category.icon className="w-8 h-8 text-gray-700" />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-normal mb-4" style={{ fontFamily: 'Montserrat, sans-serif', color: '#18181b', fontWeight: 400 }}>
                      {category.title}
                    </h2>
                    <p className="text-lg text-[#23272f] max-w-2xl mx-auto" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 300 }}>
                      Get answers to common questions about {category.title.toLowerCase()}
                    </p>
                  </div>

                  <Card className="border-0 shadow-none bg-white">
                    <CardContent className="p-0">
                      <div className="divide-y divide-gray-100">
                        {category.questions.map((faq, idx) => (
                          <FAQItem key={idx} question={faq.question} answer={faq.answer} />
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
          </div>
        </section>

        {/* Contact CTA Section */}
        <section
          ref={contactCTARef}
          className="py-24 px-4 md:px-8 bg-white"
          style={{
            opacity: isInViewContactCTA ? 1 : 0,
            transform: isInViewContactCTA ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.8s ease-out, transform 0.8s ease-out'
          }}
        >
          <div className="max-w-7xl mx-auto">
            <div className="relative rounded-[32px] overflow-hidden">
              <div
                className="absolute inset-0"
                style={{
                  background: `
                    radial-gradient(ellipse at 20% 30%, #e0f7fa 0%, transparent 60%),
                    radial-gradient(ellipse at 80% 70%, #f3e8ff 0%, transparent 55%),
                    radial-gradient(ellipse at 40% 60%, #d1f5e0 0%, transparent 65%),
                    linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)
                  `
                }}
              />
              <div className="relative z-10 p-12 md:p-16">
                <div className="max-w-4xl mx-auto text-center">
                  <h2 className="text-3xl md:text-5xl font-normal mb-8" style={{ fontFamily: 'Montserrat, sans-serif', color: '#18181b', fontWeight: 400, letterSpacing: '-0.03em' }}>
                    Still Have Questions?
                  </h2>
                  <p className="text-lg md:text-xl text-[#23272f] mb-12 max-w-2xl mx-auto" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 300 }}>
                    Can't find what you're looking for? Our team is here to help. Contact us for personalized answers and expert guidance.
                  </p>
                  <div className="flex flex-col md:flex-row gap-4 justify-center">
                    <Button
                      size="lg"
                      className="bg-[#18181b] hover:bg-[#23272f] text-white px-10 py-4 rounded-xl font-semibold text-lg transform transition-all duration-300 hover:scale-105"
                      onClick={() => navigate('/contact')}
                      style={{
                        fontFamily: 'Montserrat, sans-serif'
                      }}
                    >
                      Contact Us
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-[#18181b] text-[#18181b] hover:bg-[#f3f4f6] px-10 py-4 rounded-xl font-semibold text-lg transform transition-all duration-300 hover:scale-105"
                      onClick={() => navigate('/audit')}
                      style={{
                        fontFamily: 'Montserrat, sans-serif',
                        borderColor: '#18181b'
                      }}
                    >
                      Get Free Audit
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Info Section */}
        <section
          ref={contactInfoRef}
          className="py-16 px-4 md:px-8 bg-white"
          style={{
            opacity: isInViewContactInfo ? 1 : 0,
            transform: isInViewContactInfo ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.8s ease-out, transform 0.8s ease-out'
          }}
        >
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center group">
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Mail className="w-8 h-8 text-gray-700" />
                </div>
                <h3 className="text-xl font-semibold mb-3" style={{ fontFamily: 'Montserrat, sans-serif', color: '#18181b' }}>
                  Email Support
                </h3>
                <p className="text-[#23272f] mb-4" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 300 }}>
                  Get quick answers via email
                </p>
                <p className="text-sm text-[#18181b] font-semibold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  hello@medialevelling.com
                </p>
              </div>

              <div className="text-center group">
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Clock className="w-8 h-8 text-gray-700" />
                </div>
                <h3 className="text-xl font-semibold mb-3" style={{ fontFamily: 'Montserrat, sans-serif', color: '#18181b' }}>
                  Response Time 
                </h3>
                <p className="text-[#23272f] mb-4" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 300 }}>
                  We typically respond within
                </p>
                <p className="text-sm text-[#18181b] font-semibold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  24 hours
                </p>
              </div>

              <div className="text-center group">
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Target className="w-8 h-8 text-gray-700" />
                </div>
                <h3 className="text-xl font-semibold mb-3" style={{ fontFamily: 'Montserrat, sans-serif', color: '#18181b' }}>
                  Free Consultation
                </h3>
                <p className="text-[#23272f] mb-4" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 300 }}>
                  Schedule a free strategy call
                </p>
                <Button
                  size="sm"
                  className="bg-[#18181b] hover:bg-[#23272f] text-white"
                  onClick={() => navigate('/contact')}
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                >
                  Book Now
                </Button>
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

export default FAQs;