import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import { useInViewAnimation } from '@/hooks/use-in-view-animation';
import { toast, useToast } from '@/hooks/use-toast';
import {
  ArrowRight,
  BarChart3,
  CheckCircle,
  Lightbulb,
  TrendingUp,
  Award,
  Users,
  MessageSquare,
  Zap,
  Star,
  Shield,
  Clock,
  ExternalLink,
  HelpCircle,
  Dna,
  Rocket
} from 'lucide-react';

const Audit = () => {
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();
  
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!formRef.current) return;
    
    const formData = new FormData(formRef.current);
    
    try {
      const response = await fetch('https://formspree.io/f/mwpqzqlj', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        toast({
          title: "Audit Request Submitted",
          description: "Thank you for your request. Our team will review your information and get back to you within 1-2 business days.",
          variant: "default",
        });
        
        formRef.current.reset();
      } else {
        const data = await response.json();
        throw new Error(data.error || 'Failed to submit form');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Error",
        description: "There was an error submitting your form. Please try again later.",
        variant: "destructive",
      });
    }
  };

  const { ref: headingRef, className: headingClassName } = useInViewAnimation<HTMLDivElement>('animate-fade-in-up');
  const { ref: whyAuditRef, className: whyAuditClassName } = useInViewAnimation<HTMLDivElement>('animate-fade-in-up');
  const { ref: scoreWidgetRef, className: scoreWidgetClassName } = useInViewAnimation<HTMLDivElement>('animate-fade-in-up');
  const { ref: competitorRef, className: competitorClassName } = useInViewAnimation<HTMLDivElement>('animate-fade-in-up');
  const { ref: provenPathRef, className: provenPathClassName } = useInViewAnimation<HTMLDivElement>('animate-fade-in-up');
  const { ref: methodologyRef, className: methodologyClassName } = useInViewAnimation<HTMLDivElement>('animate-fade-in-up');
  const { ref: resultsFastRef, className: resultsFastClassName } = useInViewAnimation<HTMLDivElement>('animate-fade-in-up');
  const { ref: testimonialsRef, className: testimonialsClassName } = useInViewAnimation<HTMLDivElement>('animate-fade-in-up');
  const { ref: faqRef, className: faqClassName } = useInViewAnimation<HTMLDivElement>('animate-fade-in-up');
  const { ref: finalCtaRef, className: finalCtaClassName } = useInViewAnimation<HTMLDivElement>('animate-fade-in-up');

  const [auditScore, setAuditScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showQuiz, setShowQuiz] = useState(false);
  const [showResultsModal, setShowResultsModal] = useState(false);

  const auditQuestions = [
    { id: 'q1', text: 'How well do you understand your target audience?', type: 'radio', options: ['Not at all', 'Partially', 'Well', 'Very well'] },
    { id: 'q2', text: 'How frequently do you update your website content?', type: 'radio', options: ['Rarely', 'Monthly', 'Weekly', 'Daily/Continuously'] },
    { id: 'q3', text: 'Are your digital marketing efforts generating qualified leads?', type: 'radio', options: ['No', 'Sometimes', 'Often', 'Consistently'] },
    { id: 'q4', text: 'Do you have a clear SEO strategy in place?', type: 'radio', options: ['No', 'Developing one', 'Yes, basic', 'Yes, advanced'] },
    { id: 'q5', text: 'How effectively are you using social media for business growth?', type: 'radio', options: ['Not at all', 'Limited', 'Moderately', 'Very effectively'] },
  ];

  
  const scoreImpact = {
    'Not at all': 0,
    'Partially': 5,
    'Well': 10,
    'Very well': 20,
    'No': 0,
    'Sometimes': 5,
    'Often': 10,
    'Consistently': 20,
    'Rarely': 0,
    'Monthly': 5,
    'Weekly': 10,
    'Daily/Continuously': 20,
    'Developing one': 5,
    'Yes, basic': 10,
    'Yes, advanced': 20,
    'Limited': 5,
    'Moderately': 10,
    'Very effectively': 20
  };

  
  const calculateScore = (currentAnswers) => {
    let totalScore = 0;
    auditQuestions.forEach(q => {
      const answer = currentAnswers[q.id];
      if (answer) {
        totalScore += scoreImpact[answer] || 0;
      }
    });
    const maxPossibleScore = auditQuestions.length * 20;
    return Math.round((totalScore / maxPossibleScore) * 100);
  };

  
  const handleAuditAnswer = (questionId, value) => {
    const newAnswers = { ...answers, [questionId]: value };
    setAnswers(newAnswers);
    setAuditScore(calculateScore(newAnswers));
  };

  const nextQuestion = () => {
    if (currentQuestion < auditQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
          } else {
        setShowResultsModal(true);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const startAudit = () => {
    setAuditScore(0);
    setCurrentQuestion(0);
    setAnswers({});
    setShowQuiz(true);
    setShowResultsModal(false);
  };

  const whyGoForAuditItems = [
    {
      icon: Lightbulb,
      title: 'Uncover Hidden Opportunities',
      description: 'Identify untapped potential in your digital marketing strategy and reveal new avenues for growth.'
    },
    {
      icon: BarChart3,
      title: 'Pinpoint Weaknesses',
      description: 'Discover critical areas where your current efforts are falling short and costing you leads or sales.'
    },
    {
      icon: Zap,
      title: 'Optimize Performance',
      description: 'Receive data-driven recommendations to enhance your campaigns, content, and website for maximum ROI.'
    },
    {
      icon: Shield,
      title: 'Stay Ahead of Competitors',
      description: 'Understand your market position and learn strategies to outperform your rivals in the digital landscape.'
    }
  ];

  const testimonials = [
    {
      name: 'Ashish',
      role: 'Hagrid PetFood',
      content: 'MediaLeveling boosted our reach, improved engagement, and helped us connect with more pet owners.',
      rating: 5
    },
    {
      name: 'Ravi',
      role: 'RKH Herbal',
      content: 'Their creative strategy built trust, positioned us as a lifestyle brand, and supported steady sales growth.',
      rating: 5
    },
    {
      name: 'Meenakshi',
      role: 'Tithi',
      content: 'MediaLeveling increased our visibility, grew our followers, and strengthened our overall brand presence.',
      rating: 5
    }
  ];

  const faqItems = [
    {
      question: 'What does a digital marketing audit involve?',
      answer: 'Our comprehensive digital marketing audit analyzes your website SEO, content strategy, social media presence, paid advertising campaigns, and overall online brand visibility. We use advanced tools and expert analysis to identify strengths, weaknesses, opportunities, and threats.'
    },
    {
      question: 'How long does an audit take?',
      answer: 'The time frame for an audit varies depending on the complexity and scale of your existing digital presence. Typically, you can expect to receive your detailed audit report and recommendations within 5-7 business days after we gather all necessary information.'
    },
    {
      question: 'What will I receive after the audit?',
      answer: 'You will receive a detailed report outlining our findings, including actionable insights and strategic recommendations tailored to your business goals. This often includes a personalized consultation to walk you through the report and answer any questions.'
    },
    {
      question: 'Is the audit really free?',
      answer: 'Yes, our initial top-level audit is completely free with no obligation. It\'s designed to give you a snapshot of your current digital marketing health and highlight key areas where we can help. For more in-depth analysis, we offer paid advanced audit services.'
    },
    {
      question: 'What happens after I receive my audit report?',
      answer: 'After you receive your report, we encourage you to schedule a follow-up call with our experts to discuss the findings and explore how our services can help you implement the recommended strategies. There is no pressure to commit to any services.'
    }
  ];

  return (
    <>
      <header>
        <Navigation />
      </header>
      <main className="min-h-screen bg-white">

        <section
          ref={headingRef}
          aria-label="Audit Page Hero"
          className="w-full flex flex-col items-center justify-center min-h-[60vh] py-4 px-4 md:px-8 pt-32 md:pt-40 overflow-hidden relative"
          style={{
            opacity: headingClassName.includes('animate-fade-in-up') ? 1 : 0,
            transform: headingClassName.includes('animate-fade-in-up') ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.8s ease-out, transform 0.8s ease-out'
          }}
        >
          <div className="relative w-full max-w-[90rem] mx-auto rounded-[48px] md:rounded-[48px] bg-white flex flex-col items-center justify-center px-8 md:px-20 py-12 md:py-16 overflow-hidden"
            style={{
              minHeight: 380,
              background: `
                radial-gradient(ellipse at 10% 20%, #e0f7fa 0%, transparent 50%),
                radial-gradient(ellipse at 90% 80%, #f3e8ff 0%, transparent 55%),
                radial-gradient(ellipse at 30% 70%, #d1f5e0 0%, transparent 65%),
                radial-gradient(ellipse at 70% 40%, #ffe4fa 0%, transparent 60%),
                linear-gradient(135deg, #f7fafc 0%, #f8fafc 100%)
              `
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
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between w-full gap-16 max-w-[85rem] mx-auto">
              <div className="text-center lg:text-left lg:w-1/2">
                <h1
                  className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight"
                  style={{ fontFamily: 'Montserrat, sans-serif', color: '#18181b', fontWeight: 400, letterSpacing: '-0.03em' }}
                >
                  Unlock Your Digital<br />Growth Potential
                </h1>
                <p
                  className="text-xl md:text-2xl font-normal mb-8 max-w-2xl lg:mx-0 mx-auto leading-relaxed"
                  style={{ fontFamily: 'Montserrat, sans-serif', color: '#23272f' }}
                >
                  Get a Free, Comprehensive Digital Marketing Audit to identify opportunities and roadblocks.
                </p>
              </div>
              <div className="w-full lg:w-1/2 flex justify-center">
                <Card className="w-full max-w-lg border-0 shadow-lg p-8 md:p-10 rounded-3xl bg-white/80 backdrop-blur-sm">
                  <CardHeader className="text-center pb-6">
                    <CardTitle className="text-2xl font-bold" style={{ fontFamily: 'Montserrat, sans-serif', color: '#18181b' }}>
                      Request Your Free Audit
                    </CardTitle>
                    <p className="text-[#23272f] text-sm" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 300 }}>
                      Fill out the form below to get started.
                    </p>
                  </CardHeader>
                  <CardContent>
                    <form ref={formRef} action="https://formspree.io/f/mwpqzqlj" method="POST" className="space-y-6" onSubmit={handleFormSubmit}>
                      <div>
                        <Label htmlFor="name" className="text-[#18181b] font-medium mb-2 block">Your Name</Label>
                        <Input id="name" name="name" type="text" placeholder="John Doe" className="rounded-lg border-gray-300 focus:border-[#18181b] focus:ring-[#18181b] text-[#18181b]" required />
                      </div>
                      <div>
                        <Label htmlFor="email" className="text-[#18181b] font-medium mb-2 block">Business Email</Label>
                        <Input id="email" name="email" type="email" placeholder="yourmail@email.com" className="rounded-lg border-gray-300 focus:border-[#18181b] focus:ring-[#18181b] text-[#18181b]" required />
                      </div>
                      <div>
                        <Label htmlFor="website" className="text-[#18181b] font-medium mb-2 block">Your Website URL (Optional)</Label>
                        <Input id="website" name="website" type="url" placeholder="https://yourwebsite.com" className="rounded-lg border-gray-300 focus:border-[#18181b] focus:ring-[#18181b] text-[#18181b]" />
                      </div>
                      <div>
                        <Label htmlFor="goals" className="text-[#18181b] font-medium mb-2 block">What are your main digital marketing goals?</Label>
                        <Textarea id="goals" name="goals" placeholder="e.g., Increase leads, boost sales, improve brand awareness" className="rounded-lg border-gray-300 focus:border-[#18181b] focus:ring-[#18181b] text-[#18181b]" rows={4} required />
                      </div>
                      <Button type="submit" size="lg" className="w-full bg-[#18181b] hover:bg-[#23272f] text-white px-8 py-3 rounded-xl font-semibold text-lg transform transition-all duration-300 hover:scale-105" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                        Get My Free Audit
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Video (VSL) 
        <section className="py-24 px-2 md:px-4 bg-gradient-to-br from-gray-50/50 to-white w-full">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-normal mb-8" style={{ fontFamily: 'Montserrat, sans-serif', color: '#18181b', fontWeight: 400, letterSpacing: '-0.03em' }}>
              See How Our Audit Transforms Businesses
            </h2>
            <p className="text-lg md:text-xl text-[#23272f] max-w-3xl mx-auto mb-12" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 300 }}>
              Watch this short video to understand the power of a strategic digital marketing audit.
            </p>
            <div className="relative aspect-video w-full max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-2xl transition-transform duration-500 hover:scale-[1.01]">
              {/* Replace with your actual video embed code or player 
              <iframe
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?si=abcdefg" // Replace with your actual VSL link
                title="Audit Process Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full"
              ></iframe>
            </div>
          </div>
        </section> */}

                <section ref={whyAuditRef} className={`py-12 px-4 md:px-8 bg-white ${whyAuditClassName}`}>
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-normal mb-8" style={{ fontFamily: 'Montserrat, sans-serif', color: '#18181b', fontWeight: 400, letterSpacing: '-0.03em' }}>
                Why a Digital Marketing Audit is Essential for Your Business
              </h2>
              <p className="text-lg md:text-xl text-[#23272f] max-w-3xl mx-auto" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 300 }}>
                Gain clarity, identify opportunities, and build a stronger foundation for growth with our expert analysis.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {whyGoForAuditItems.map((item, index) => (
                <div
                  key={item.title}
                  className="group"
                  style={{
                    transform: whyAuditClassName.includes('animate-fade-in-up') ? 'translateY(0)' : 'translateY(20px)',
                    opacity: whyAuditClassName.includes('animate-fade-in-up') ? 1 : 0,
                    transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${0.1 + index * 0.1}s`
                  }}
                >
                  <Card className="border-0 shadow-none bg-gradient-to-br from-gray-50 to-gray-100 transition-all duration-500 group-hover:scale-[1.02] h-full">
                    <CardContent className="p-8 flex flex-col items-center text-center">
                      <div className="w-16 h-16 mb-6 rounded-2xl bg-[#18181b] flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                        <item.icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold mb-3" style={{ fontFamily: 'Montserrat, sans-serif', color: '#18181b' }}>
                        {item.title}
                      </h3>
                      <p className="text-[#23272f] leading-relaxed" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 300 }}>
                        {item.description}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </section>


        <section ref={scoreWidgetRef} className={`py-12 px-4 md:px-8 bg-gradient-to-br from-white to-gray-50/50 ${scoreWidgetClassName}`}>
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-normal mb-6" style={{ fontFamily: 'Montserrat, sans-serif', color: '#18181b', fontWeight: 400, letterSpacing: '-0.03em' }}>
                Why Choose Our Professional Audit?
              </h2>
              <p className="text-lg md:text-xl text-[#23272f] max-w-3xl mx-auto" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 300 }}>
                Our comprehensive audit delivers actionable insights to transform your digital presence and drive real results.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: <BarChart3 className="w-8 h-8" />,
                  title: "Data-Driven Analysis",
                  description: "Get insights backed by comprehensive data analysis and industry benchmarks to make informed decisions."
                },
                {
                  icon: <Lightbulb className="w-8 h-8" />,
                  title: "Actionable Recommendations",
                  description: "Receive clear, prioritized recommendations that you can implement immediately to improve performance."
                },
                {
                  icon: <TrendingUp className="w-8 h-8" />,
                  title: "ROI-Focused",
                  description: "Our audit focuses on identifying high-impact opportunities that deliver the best return on your investment."
                },
                {
                  icon: <Users className="w-8 h-8" />,
                  title: "Audience-Centric",
                  description: "Understand your target audience better and optimize your strategy to connect with them effectively."
                },
                {
                  icon: <Zap className="w-8 h-8" />,
                  title: "Quick Implementation",
                  description: "Get a clear action plan with quick wins and long-term strategies you can start implementing right away."
                },
                {
                  icon: <Award className="w-8 h-8" />,
                  title: "Proven Results",
                  description: "Join hundreds of businesses that have transformed their digital presence with our audit process."
                }
              ].map((benefit, index) => (
                <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-all duration-300 h-full">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 mb-6 rounded-2xl bg-[#18181b] flex items-center justify-center shadow-lg">
                      {React.cloneElement(benefit.icon, { className: 'w-8 h-8 text-white' })}
                    </div>
                    <h3 className="text-xl font-semibold mb-3" style={{ fontFamily: 'Montserrat, sans-serif', color: '#18181b' }}>
                      {benefit.title}
                    </h3>
                    <p className="text-[#23272f] leading-relaxed" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 300 }}>
                      {benefit.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-16 text-center">
              <Button
                size="lg"
                className="bg-[#18181b] hover:bg-[#23272f] text-white px-10 py-4 rounded-xl font-semibold text-lg transform transition-all duration-300 hover:scale-105"
                onClick={() => formRef.current?.scrollIntoView({ behavior: 'smooth' })}
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                Get Your Free Audit <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>


        <section ref={competitorRef} className={`pt-0 mt-12 px-4 md:px-8 bg-white ${competitorClassName}`}>
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <img
                src="1.jpg"
                alt="Competitor Analysis"
                className="rounded-xl w-full h-auto transition-transform duration-500 hover:scale-[1.02]"
                style={{
                  transform: competitorClassName.includes('animate-fade-in-up') ? 'translateY(0)' : 'translateY(20px)',
                  opacity: competitorClassName.includes('animate-fade-in-up') ? 1 : 0,
                  transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s`
                }}
              />
            </div>
            <div className="lg:w-1/2 text-center lg:text-left">
              <h2 className="text-3xl md:text-5xl font-normal mb-8" style={{ fontFamily: 'Montserrat, sans-serif', color: '#18181b', fontWeight: 400, letterSpacing: '-0.03em' }}>
                Benchmark Against Your Top Competitors
              </h2>
              <p className="text-lg md:text-xl text-[#23272f] mb-8" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 300 }}>
                Understanding your competition is key to dominating your market. Our audit includes a deep dive into your competitors' digital strategies.
              </p>
              <ul className="space-y-4 text-left mx-auto lg:mx-0 max-w-xl text-[#23272f] text-lg">
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-1" />
                  <span style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 300 }}>Identify their strengths and weaknesses in SEO, PPC, and content.</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-1" />
                  <span style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 300 }}>Discover their top-performing keywords and content topics.</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-1" />
                  <span style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 300 }}>Uncover their backlink profiles and authority-building tactics.</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-1" />
                  <span style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 300 }}>Gain insights into their social media engagement and audience growth.</span>
                </li>
              </ul>
              <Button
                size="lg"
                className="mt-10 bg-[#18181b] hover:bg-[#23272f] text-white px-10 py-4 rounded-xl font-semibold text-lg transform transition-all duration-300 hover:scale-105"
                onClick={() => navigate('/contact')}
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                Request Competitor Analysis <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              </div>
          </div>
        </section>

        <section ref={provenPathRef} className={`pt-0 px-2 md:px-4 w-full ${provenPathClassName}`}>
          <div className="w-full max-w-[90rem] mx-auto rounded-[48px] md:rounded-[48px] bg-white px-6 md:px-16 py-16 md:py-24 overflow-hidden text-center">
            <h2 className="text-3xl md:text-5xl font-normal mb-8" style={{ fontFamily: 'Montserrat, sans-serif', color: '#18181b', fontWeight: 400, letterSpacing: '-0.03em' }}>
              Our Proven Path to Digital Marketing Success
            </h2>
            <p className="text-lg md:text-xl text-[#23272f] max-w-3xl mx-auto mb-16" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 300 }}>
              We follow a strategic, data-driven framework that ensures sustainable growth and measurable results for our clients.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
              <div className="group" style={{ transform: provenPathClassName.includes('animate-fade-in-up') ? 'translateY(0)' : 'translateY(20px)', opacity: provenPathClassName.includes('animate-fade-in-up') ? 1 : 0, transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s` }}>
                <Card className="border-0 shadow-none bg-white transition-all duration-500 group-hover:scale-[1.02] h-full">
                  <CardContent className="p-8 flex flex-col items-center text-center">
                    <div className="w-16 h-16 mb-6 rounded-2xl bg-[#18181b] flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <Dna className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3" style={{ fontFamily: 'Montserrat, sans-serif', color: '#18181b' }}>
                      Discovery & Audit
                    </h3>
                    <p className="text-[#23272f] leading-relaxed" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 300 }}>
                      Deep dive into your current performance, target audience, and competitive landscape.
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="group" style={{ transform: provenPathClassName.includes('animate-fade-in-up') ? 'translateY(0)' : 'translateY(20px)', opacity: provenPathClassName.includes('animate-fade-in-up') ? 1 : 0, transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s` }}>
                <Card className="border-0 shadow-none bg-white transition-all duration-500 group-hover:scale-[1.02] h-full">
                  <CardContent className="p-8 flex flex-col items-center text-center">
                    <div className="w-16 h-16 mb-6 rounded-2xl bg-[#18181b] flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <Lightbulb className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3" style={{ fontFamily: 'Montserrat, sans-serif', color: '#18181b' }}>
                      Strategy & Planning
                    </h3>
                    <p className="text-[#23272f] leading-relaxed" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 300 }}>
                      Develop a custom, data-driven strategy with clear KPIs and action plans.
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="group" style={{ transform: provenPathClassName.includes('animate-fade-in-up') ? 'translateY(0)' : 'translateY(20px)', opacity: provenPathClassName.includes('animate-fade-in-up') ? 1 : 0, transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s` }}>
                <Card className="border-0 shadow-none bg-white transition-all duration-500 group-hover:scale-[1.02] h-full">
                  <CardContent className="p-8 flex flex-col items-center text-center">
                    <div className="w-16 h-16 mb-6 rounded-2xl bg-[#18181b] flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <Rocket className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3" style={{ fontFamily: 'Montserrat, sans-serif', color: '#18181b' }}>
                      Execution & Optimization
                    </h3>
                    <p className="text-[#23272f] leading-relaxed" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 300 }}>
                      Implement campaigns, monitor performance, and continuously optimize for results.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section ref={methodologyRef} className="pt-0 px-2 md:px-4 w-full -mt-12">
          <div className="w-full max-w-[90rem] mx-auto rounded-t-none md:rounded-t-none rounded-[48px] md:rounded-[48px] bg-white px-6 md:px-16 pt-0 pb-6 md:pb-8 overflow-hidden flex flex-col lg:flex-row items-center gap-4">
            <div className="lg:w-1/2 text-center lg:text-left">
              <h2 className="text-3xl md:text-5xl font-normal mb-8" style={{ fontFamily: 'Montserrat, sans-serif', color: '#18181b', fontWeight: 400, letterSpacing: '-0.03em' }}>
                Our Meticulous Audit Methodology
              </h2>
              <p className="text-lg md:text-xl text-[#23272f] mb-8" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 300 }}>
                We leave no stone unturned. Our audit process is thorough, analytical, and tailored to your specific business needs.
              </p>
              <ul className="space-y-4 text-left mx-auto lg:mx-0 max-w-xl text-[#23272f] text-lg">
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-purple-500 mr-3 flex-shrink-0 mt-1" />
                  <span style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 300 }}>In-depth Website & Technical SEO Analysis.</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-purple-500 mr-3 flex-shrink-0 mt-1" />
                  <span style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 300 }}>Content Strategy & Gap Analysis.</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-purple-500 mr-3 flex-shrink-0 mt-1" />
                  <span style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 300 }}>Paid Advertising (PPC & Social Ads) Performance Review.</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-purple-500 mr-3 flex-shrink-0 mt-1" />
                  <span style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 300 }}>Social Media Presence & Engagement Evaluation.</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-purple-500 mr-3 flex-shrink-0 mt-1" />
                  <span style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 300 }}>Conversion Rate Optimization (CRO) Assessment.</span>
                </li>
              </ul>
              <Button
                size="lg"
                variant="outline"
                className="mt-10 border-[#18181b] text-[#18181b] hover:bg-[#f3f4f6] px-10 py-4 rounded-xl font-semibold text-lg transform transition-all duration-300 hover:scale-105"
                onClick={() => navigate('/contact')}
                style={{ fontFamily: 'Montserrat, sans-serif', borderColor: '#18181b' }}
              >
                Learn More About Our Process <ExternalLink className="ml-2 h-5 w-5" />
              </Button>
            </div>
            <div className="lg:w-1/2">
              <img
                src="/4.jpg"
                alt="Our Methodology"
                className="rounded-xl w-full h-auto transition-transform duration-500 hover:scale-[1.02]"
                style={{
                  transform: methodologyClassName.includes('animate-fade-in-up') ? 'translateY(0)' : 'translateY(20px)',
                  opacity: methodologyClassName.includes('animate-fade-in-up') ? 1 : 0,
                  transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s`
                }}
              />
            </div>
          </div>
        </section>


        <section ref={resultsFastRef} className={`pt-0 px-2 md:px-4 w-full ${resultsFastClassName}`}>
          <div className="w-full max-w-[90rem] mx-auto rounded-[48px] md:rounded-[48px] bg-white px-6 md:px-16 py-16 md:py-24 overflow-hidden text-center">
            <h2 className="text-3xl md:text-5xl font-normal mb-8" style={{ fontFamily: 'Montserrat, sans-serif', color: '#18181b', fontWeight: 400, letterSpacing: '-0.03em' }}>
              From Audit to Action: We Deliver Fast Results
            </h2>
            <p className="text-lg md:text-xl text-[#23272f] max-w-3xl mx-auto mb-16" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 300 }}>
              Our audits aren't just reports; they're blueprints for rapid, tangible improvements.
            </p>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div
                className="group text-left"
                style={{
                  transform: resultsFastClassName.includes('animate-fade-in-up') ? 'translateY(0)' : 'translateY(20px)',
                  opacity: resultsFastClassName.includes('animate-fade-in-up') ? 1 : 0,
                  transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s`
                }}
              >
                <Card className="border-0 shadow-lg p-8 rounded-3xl h-full bg-white transition-all duration-500 group-hover:scale-[1.02]">
                  <CardHeader className="p-0 mb-6">
                    <div className="w-16 h-16 mb-4 rounded-2xl bg-[#18181b] flex items-center justify-center shadow-lg">
                      <Clock className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold" style={{ fontFamily: 'Montserrat, sans-serif', color: '#18181b' }}>
                      Rapid Implementation
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <p className="text-[#23272f] leading-relaxed mb-4" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 300 }}>
                      Once the audit is complete, we focus on quick wins and strategic changes that yield immediate impact on your performance.
                    </p>
                    <ul className="space-y-2 text-[#23272f] text-base">
                      <li className="flex items-center"><CheckCircle className="w-5 h-5 text-blue-500 mr-2" /> Prioritized Action Plans</li>
                      <li className="flex items-center"><CheckCircle className="w-5 h-5 text-blue-500 mr-2" /> Swift Campaign Adjustments</li>
                      <li className="flex items-center"><CheckCircle className="w-5 h-5 text-blue-500 mr-2" /> Enhanced Website Elements</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <div
                className="group text-left"
                style={{
                  transform: resultsFastClassName.includes('animate-fade-in-up') ? 'translateY(0)' : 'translateY(20px)',
                  opacity: resultsFastClassName.includes('animate-fade-in-up') ? 1 : 0,
                  transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s`
                }}
              >
                <Card className="border-0 shadow-lg p-8 rounded-3xl h-full bg-white transition-all duration-500 group-hover:scale-[1.02]">
                  <CardHeader className="p-0 mb-6">
                    <div className="w-16 h-16 mb-4 rounded-2xl bg-[#18181b] flex items-center justify-center shadow-lg">
                      <TrendingUp className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold" style={{ fontFamily: 'Montserrat, sans-serif', color: '#18181b' }}>
                      Measurable ROI
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <p className="text-[#23272f] leading-relaxed mb-4" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 300 }}>
                      Our focus is always on delivering a strong return on your investment, tracking key metrics to ensure tangible growth.
                    </p>
                    <ul className="space-y-2 text-[#23272f] text-base">
                      <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-500 mr-2" /> Increased Organic Traffic</li>
                      <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-500 mr-2" /> Higher Conversion Rates</li>
                      <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-500 mr-2" /> Improved Ad Performance</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>


        <section ref={testimonialsRef} className={`pt-0 px-2 md:px-4 w-full ${testimonialsClassName}`}>
          <div className="w-full max-w-[90rem] mx-auto rounded-[48px] md:rounded-[48px] bg-white px-6 md:px-16 py-12 md:py-16 overflow-hidden">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-normal mb-8" style={{ fontFamily: 'Montserrat, sans-serif', color: '#18181b', fontWeight: 400, letterSpacing: '-0.03em' }}>
                Don't Just Take Our Word For It
              </h2>
              <p className="text-lg md:text-xl text-[#23272f] max-w-3xl mx-auto" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 300 }}>
                Hear from businesses that have significantly improved their digital presence after our audit and strategic guidance.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.name}
                  className="group"
                  style={{
                    transform: testimonialsClassName.includes('animate-fade-in-up') ? 'translateY(0)' : 'translateY(20px)',
                    opacity: testimonialsClassName.includes('animate-fade-in-up') ? 1 : 0,
                    transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${0.1 + index * 0.1}s`
                  }}
                >
                  <Card className="border-0 shadow-none bg-gradient-to-br from-gray-50 to-gray-100 transition-all duration-500 group-hover:scale-[1.01] h-full">
                    <CardContent className="p-8">
                      <div className="flex flex-col items-center text-center gap-6">
                        <div className="flex-shrink-0">
                          <div className="w-16 h-16 rounded-full bg-[#18181b] flex items-center justify-center shadow-lg">
                            <Users className="w-8 h-8 text-white" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-center gap-2 mb-4">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                          <blockquote className="text-base text-[#23272f] leading-relaxed mb-6" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 300 }}>
                            "{testimonial.content}"
                          </blockquote>
                          <div>
                            <p className="font-semibold text-[#18181b]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                              {testimonial.name}
                            </p>
                            <p className="text-[#23272f] text-sm" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 300 }}>
                              {testimonial.role}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </section>


        <section ref={faqRef} className={`pt-0 px-2 md:px-4 w-full ${faqClassName}`}>
          <div className="w-full max-w-[90rem] mx-auto rounded-[48px] md:rounded-[48px] bg-white px-6 md:px-16 py-12 md:py-16 overflow-hidden">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-normal mb-8" style={{ fontFamily: 'Montserrat, sans-serif', color: '#18181b', fontWeight: 400, letterSpacing: '-0.03em' }}>
                Frequently Asked Questions About Our Audits
              </h2>
              <p className="text-lg md:text-xl text-[#23272f] max-w-3xl mx-auto" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 300 }}>
                Find answers to common questions about our digital marketing audit process and what you can expect.
              </p>
            </div>

            <div className="space-y-6 max-w-3xl mx-auto">
              {faqItems.map((item, index) => (
                <Card
                  key={index}
                  className="border-0 shadow-md p-6 rounded-2xl bg-white"
                  style={{
                    transform: faqClassName.includes('animate-fade-in-up') ? 'translateY(0)' : 'translateY(20px)',
                    opacity: faqClassName.includes('animate-fade-in-up') ? 1 : 0,
                    transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${0.1 + index * 0.05}s`
                  }}
                >
                  <CardHeader className="p-0 mb-4">
                    <CardTitle className="text-xl font-semibold flex items-center text-[#18181b]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      <div className="w-10 h-10 rounded-xl bg-[#18181b] flex items-center justify-center shadow-md mr-3 flex-shrink-0">
                        <HelpCircle className="w-5 h-5 text-white" />
                      </div> {item.question}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <p className="text-[#23272f] leading-relaxed ml-9" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 300 }}>
                      {item.answer}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>


        <section ref={finalCtaRef} className={`pt-0 pb-16 px-2 md:px-4 w-full ${finalCtaClassName}`}>
          <div className="w-full max-w-[90rem] mx-auto">
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
                <h2 className="text-3xl md:text-5xl font-normal mb-8" style={{ fontFamily: 'Montserrat, sans-serif', color: '#18181b', fontWeight: 400, letterSpacing: '-0.03em' }}>
                  Ready to Uncover Your Digital Growth Path?
                </h2>
                <p className="text-lg md:text-xl text-[#23272f] mb-12 max-w-2xl mx-auto" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 300 }}>
                  Take the first step towards a stronger online presence and measurable business success. Request your free audit today!
                </p>
                <div className="flex flex-col md:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    className="bg-[#18181b] hover:bg-[#23272f] text-white px-10 py-4 rounded-xl font-semibold text-lg transform transition-all duration-300 hover:scale-105"
                    onClick={() => formRef.current?.scrollIntoView({ behavior: 'smooth' })}
                    style={{ fontFamily: 'Montserrat, sans-serif' }}
                  >
                    Get Your Free Audit Now <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-[#18181b] text-[#18181b] hover:bg-[#f3f4f6] px-10 py-4 rounded-xl font-semibold text-lg transform transition-all duration-300 hover:scale-105"
                    onClick={() => navigate('/contact')}
                    style={{ fontFamily: 'Montserrat, sans-serif', borderColor: '#18181b' }}
                  >
                    Have Questions? Contact Us
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

export default Audit;
