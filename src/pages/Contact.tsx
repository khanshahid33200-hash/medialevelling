import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Paperclip, Instagram } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useInViewAnimation } from '@/hooks/use-in-view-animation';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { ref, className } = useInViewAnimation<HTMLDivElement>('animate-fade-in-up');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('https://formspree.io/f/mnnzrzda', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setIsSuccess(true);
        
        toast({
          title: "Message sent successfully!",
          description: "We'll get back to you within 24 hours.",
        });

        // Reset form after success animation
        setTimeout(() => {
          setFormData({ name: '', email: '', message: '' });
          setIsSuccess(false);
        }, 2000);
      } else {
        const data = await response.json();
        throw new Error(data.error || 'Failed to send message');
      }
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
              Get in touch with us to discuss your digital media needs and how we can help grow your business
            </p>
          </div>
        </div>
        
        {/* Contact Form Section */}
        <section id="contact" className="py-0 px-4 pb-24 bg-white">
          {/* CHANGED: Widened the max-width for the entire contact section container */}
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
              {/* Success overlay */}
              {isSuccess && (
                <div className="absolute inset-0 bg-green-500/95 backdrop-blur-sm flex items-center justify-center z-10 rounded-3xl">
                  <div className="text-center text-white">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 transform animate-scale-in">
                      <svg className="w-8 h-8 text-green-500" fill="currentColor" viewBox="0 0 20 20" role="img" aria-label="Success icon for digital marketing contact form">
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
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                      Sending...
                    </div>
                  ) : (
                    'Send'
                  )}
                </Button>
              </form>
            </div>
          </div>
        </section>
        
        <BackToTop />
      </main>
      <Footer />
    </>
  );
};

export default Contact; 