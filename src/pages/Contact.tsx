import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Paperclip, Instagram, HelpCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useInViewAnimation } from '@/hooks/use-in-view-animation';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import { db, collection, addDoc } from '@/lib/firebase';

const Contact = () => {
  // Main Project Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Ask Anything / Query Form State
  const [queryData, setQueryData] = useState({
    name: '',
    email: '',
    city: '',
    profession: '',
    query: ''
  });
  const [isQuerySubmitting, setIsQuerySubmitting] = useState(false);
  const [isQuerySuccess, setIsQuerySuccess] = useState(false);

  const { ref, className } = useInViewAnimation<HTMLDivElement>('animate-fade-in-up');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setQueryData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // 1. Save directly into Firebase Firestore
      const newLeadObj = {
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone?.trim() || '',
        service: formData.service || 'General Inquiry',
        message: formData.message.trim(),
        type: 'Project Inquiry',
        status: 'new',
        createdAt: new Date().toISOString()
      };

      try {
        const existingLeads = JSON.parse(localStorage.getItem('media_levelling_leads') || '[]');
        existingLeads.unshift({ _id: `local-${Date.now()}`, ...newLeadObj });
        localStorage.setItem('media_levelling_leads', JSON.stringify(existingLeads));
      } catch (e) {}

      if (db) {
        try {
          await addDoc(collection(db, 'contact_messages'), newLeadObj);
        } catch (firebaseErr) {
          console.warn('Firestore contact submit fallback:', firebaseErr);
        }
      }

      // 2. Submit to Backend API
      try {
        await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
      } catch (apiErr) {
        fetch('https://formspree.io/f/mnnzrzda', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        }).catch(() => {});
      }

      setIsSuccess(true);
      toast({
        title: "Message received!",
        description: "We'll get back to you within 24 hours.",
      });

      setTimeout(() => {
        setFormData({ name: '', email: '', phone: '', service: '', message: '' });
        setIsSuccess(false);
      }, 2000);
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Error",
        description: "There was an error sending your message. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleQuerySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!queryData.name || !queryData.email || !queryData.query) {
      toast({
        title: "Required fields missing",
        description: "Please fill in Name, Email, and Query.",
        variant: "destructive"
      });
      return;
    }

    setIsQuerySubmitting(true);
    try {
      const queryLeadObj = {
        name: queryData.name.trim(),
        email: queryData.email.trim().toLowerCase(),
        phone: queryData.city ? `City: ${queryData.city.trim()}` : '',
        service: queryData.profession ? `Profession: ${queryData.profession.trim()}` : 'Ask Anything Query',
        message: `[Ask Anything Query]\nCity: ${queryData.city}\nProfession: ${queryData.profession}\nQuery: ${queryData.query}`,
        city: queryData.city.trim(),
        profession: queryData.profession.trim(),
        type: 'Ask Anything Query',
        status: 'new',
        createdAt: new Date().toISOString()
      };

      try {
        const existingLeads = JSON.parse(localStorage.getItem('media_levelling_leads') || '[]');
        existingLeads.unshift({ _id: `local-${Date.now()}`, ...queryLeadObj });
        localStorage.setItem('media_levelling_leads', JSON.stringify(existingLeads));
      } catch (e) {}

      // 1. Save directly into Firebase Firestore 'queries' & 'contact_messages'
      if (db) {
        try {
          await addDoc(collection(db, 'queries'), {
            name: queryData.name.trim(),
            email: queryData.email.trim().toLowerCase(),
            city: queryData.city.trim(),
            profession: queryData.profession.trim(),
            query: queryData.query.trim(),
            type: 'Ask Anything Query',
            status: 'new',
            createdAt: new Date().toISOString()
          });

          await addDoc(collection(db, 'contact_messages'), queryLeadObj);
        } catch (fErr) {
          console.warn('Firestore query submit notice:', fErr);
        }
      }

      // 2. Submit to Backend API
      try {
        await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: queryData.name,
            email: queryData.email,
            phone: queryData.city ? `City: ${queryData.city}` : '',
            service: queryData.profession ? `Query (${queryData.profession})` : 'Ask Anything Query',
            message: `[Ask Anything Query]\nCity: ${queryData.city}\nProfession: ${queryData.profession}\nQuery: ${queryData.query}`
          })
        });
      } catch (aErr) {}

      setIsQuerySuccess(true);
      toast({
        title: "Query submitted!",
        description: "Thank you for asking. Our team will get back to you shortly.",
      });

      setTimeout(() => {
        setQueryData({ name: '', email: '', city: '', profession: '', query: '' });
        setIsQuerySuccess(false);
      }, 2500);
    } catch (err) {
      toast({
        title: "Submission Error",
        description: "Failed to submit query. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsQuerySubmitting(false);
    }
  };

  return (
    <>
      <header>
        <Navigation />
      </header>
      <main className="min-h-screen bg-white">
        <div className="container mx-auto px-4 pt-40 md:pt-48">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-normal text-gray-900 mb-6">
              Contact Us
            </h1>
            <p className="text-xl text-black max-w-3xl mx-auto">
              Get in touch with us to discuss your digital media needs or ask us any questions
            </p>
          </div>
        </div>
        
        {/* Contact Form Section */}
        <section id="contact" className="py-0 px-4 pb-20 bg-white">
          <div ref={ref} className={`max-w-7xl mx-auto flex flex-col md:flex-row gap-12 items-stretch ${className}`}>
            {/* Left: Heading and contact info */}
            <div 
              className="flex-1 flex flex-col justify-between rounded-3xl p-10 md:p-16 min-h-[520px] animate-fade-in-up relative overflow-hidden" 
              style={{ 
                animationDelay: '200ms',
                background: `
                  radial-gradient(ellipse at 10% 10%, #e0f7fa 0%, transparent 50%),
                  radial-gradient(ellipse at 90% 90%, #f3e8ff 0%, transparent 55%),
                  radial-gradient(ellipse at 70% 30%, #d1f5e0 0%, transparent 45%),
                  radial-gradient(ellipse at 30% 70%, #ffe4fa 0%, transparent 60%),
                  linear-gradient(165deg, #f8f9fc 0%, #f7fafc 100%)
                `
              }}
            >
              <div>
                <h2 className="text-2xl md:text-4xl font-bold mb-8 text-black" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 400}}>
                  Have a digital marketing project?<br />We would love to help your business grow.
                </h2>
              </div>
              <div className="mt-auto text-base md:text-lg text-black opacity-80" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 400 }}>
                <a
                  href="mailto:info@medialevelling.com"
                  className="flex items-center gap-2 mt-0 text-[#000] hover:text-[#6366f1] transition-colors group bg-transparent border-none p-0 shadow-none hover:bg-transparent hover:shadow-none hover:border-none"
                  style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 400 }}
                >
                  <span className="not-italic">info@medialevelling.com</span>
                </a>
                <a
                  href="https://instagram.com/medialevelling"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 mt-4 text-[#000] hover:text-[#C13584] transition-colors group bg-transparent border-none p-0 shadow-none hover:bg-transparent hover:shadow-none hover:border-none"
                  style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 400 }}
                >
                  <Instagram size={22} className="inline-block group-hover:scale-110 transition-transform" />
                  <span className="not-italic">@mediallevelling</span>
                </a>
              </div>
            </div>

            {/* Right: Form */}
            <div className="flex-1 bg-white rounded-3xl border border-gray-200 p-8 md:p-12 flex flex-col justify-center animate-fade-in-up" style={{ animationDelay: '380ms' }}>
              {isSuccess && (
                <div className="absolute inset-0 bg-green-500/95 backdrop-blur-sm flex items-center justify-center z-10 rounded-3xl">
                  <div className="text-center text-white">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 transform animate-scale-in">
                      <svg className="w-8 h-8 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-light mb-2">Message Sent!</h3>
                    <p className="font-light">We'll get back to you soon.</p>
                  </div>
                </div>
              )}
              <form action="https://formspree.io/f/mnnzrzda" method="POST" onSubmit={handleSubmit} className="space-y-8 relative z-0">
                <div className="space-y-6">
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full border-0 border-b border-gray-300 rounded-none bg-transparent focus:border-[#6366f1] focus:bg-[#f3f4f6] focus:ring-0 focus:outline-none outline-none py-4 px-0 text-lg transition-all duration-300 placeholder:text-gray-400"
                    placeholder="Your name"
                    style={{ fontFamily: 'Montserrat, sans-serif' }}
                  />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full border-0 border-b border-gray-300 rounded-none bg-transparent focus:border-[#6366f1] focus:bg-[#f3f4f6] focus:ring-0 focus:outline-none outline-none py-4 px-0 text-lg transition-all duration-300 placeholder:text-gray-400"
                    placeholder="Your email"
                    style={{ fontFamily: 'Montserrat, sans-serif' }}
                  />
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full border-0 border-b border-gray-300 rounded-none bg-transparent focus:border-[#6366f1] focus:bg-[#f3f4f6] focus:ring-0 focus:outline-none outline-none py-4 px-0 text-lg transition-all duration-300 resize-none placeholder:text-gray-400"
                    placeholder="Tell us about your project..."
                    style={{ fontFamily: 'Montserrat, sans-serif' }}
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#18181b] hover:bg-[#23263a] text-white py-4 rounded-xl font-semibold text-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                >
                  {isSubmitting ? 'Sending...' : 'Send'}
                </Button>
              </form>
            </div>
          </div>
        </section>

        {/* Ask Anything / Query Form Section */}
        <section className="py-16 px-4 pb-28 bg-gradient-to-b from-white to-slate-50 border-t border-gray-100">
          <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-slate-200 p-8 md:p-14 shadow-xl">
            <div className="text-center mb-10">
              <span className="bg-indigo-50 text-indigo-700 text-xs font-semibold px-4 py-1.5 rounded-full uppercase tracking-wider border border-indigo-200 inline-flex items-center gap-1.5">
                <HelpCircle className="h-3.5 w-3.5" /> Query - Ask Anything
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-4 mb-3" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Have a Question? Ask Anything
              </h2>
              <p className="text-slate-600 text-base max-w-xl mx-auto font-light">
                Have a query about digital marketing, branding, or growth? Fill in your details and ask us anything.
              </p>
            </div>

            {isQuerySuccess ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center animate-fade-in">
                <div className="w-14 h-14 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto mb-3 text-2xl font-bold">
                  ✓
                </div>
                <h3 className="text-2xl font-bold text-emerald-900 mb-1">Query Submitted Successfully!</h3>
                <p className="text-emerald-700 text-sm">We have received your question and will reply to your email soon.</p>
              </div>
            ) : (
              <form onSubmit={handleQuerySubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="query-name" className="text-sm font-semibold text-slate-700">Full Name</Label>
                    <Input
                      id="query-name"
                      name="name"
                      value={queryData.name}
                      onChange={handleQueryChange}
                      required
                      placeholder="Your Full Name"
                      className="rounded-xl border-slate-300 py-6 text-base"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="query-email" className="text-sm font-semibold text-slate-700">Email Address</Label>
                    <Input
                      id="query-email"
                      name="email"
                      type="email"
                      value={queryData.email}
                      onChange={handleQueryChange}
                      required
                      placeholder="yourname@example.com"
                      className="rounded-xl border-slate-300 py-6 text-base"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="query-city" className="text-sm font-semibold text-slate-700">City</Label>
                    <Input
                      id="query-city"
                      name="city"
                      value={queryData.city}
                      onChange={handleQueryChange}
                      placeholder="e.g. Mumbai, Delhi, London"
                      className="rounded-xl border-slate-300 py-6 text-base"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="query-profession" className="text-sm font-semibold text-slate-700">Profession / Role</Label>
                    <Input
                      id="query-profession"
                      name="profession"
                      value={queryData.profession}
                      onChange={handleQueryChange}
                      placeholder="e.g. Founder, Marketer, Student"
                      className="rounded-xl border-slate-300 py-6 text-base"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="query-message" className="text-sm font-semibold text-slate-700">Your Query / Question</Label>
                  <textarea
                    id="query-message"
                    name="query"
                    value={queryData.query}
                    onChange={handleQueryChange}
                    required
                    rows={4}
                    placeholder="Ask us anything here..."
                    className="w-full rounded-xl border border-slate-300 p-4 text-base focus:border-indigo-600 focus:ring-0 focus:outline-none resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isQuerySubmitting}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-6 rounded-xl font-bold text-lg transition-all duration-300 shadow-md"
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                >
                  {isQuerySubmitting ? 'Submitting Question...' : 'Submit Query'}
                </Button>
              </form>
            )}
          </div>
        </section>
        
        <BackToTop />
      </main>
      <Footer />
    </>
  );
};

export default Contact;