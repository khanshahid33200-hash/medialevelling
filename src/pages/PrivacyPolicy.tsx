import { useInViewAnimation } from '@/hooks/use-in-view-animation';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';

const PrivacyPolicy = () => {
  const { ref, className } = useInViewAnimation<HTMLDivElement>('animate-fade-in-up');

  return (
    <>
      <header>
        <Navigation />
      </header>
      <main className="min-h-screen bg-white">
        <div className="container mx-auto px-4 pt-40 md:pt-48">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-normal text-gray-900 mb-6">
              Privacy Policy
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              How we collect, use, and protect your personal information
            </p>
          </div>
        </div>
        
        <section ref={ref} className={`py-16 px-4 md:px-8 ${className}`}>
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none">
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <p className="text-sm text-gray-500 mb-8" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  Last updated: January 2024
                </p>

                <div className="space-y-8">
                  <section>
                    <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'Montserrat, sans-serif', color: '#18181b' }}>
                      1. Information We Collect
                    </h2>
                    <div className="space-y-4 text-[#23263a]" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 400 }}>
                      <p>
                        We collect information you provide directly to us, such as when you:
                      </p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Contact us through our website forms</li>
                        <li>Request a quote or consultation</li>
                        <li>Sign up for our newsletter</li>
                        <li>Engage with our services</li>
                        <li>Apply for employment opportunities</li>
                      </ul>
                      <p>
                        This information may include your name, email address, phone number, company name, website URL, and any other information you choose to provide.
                      </p>
                    </div>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'Montserrat, sans-serif', color: '#18181b' }}>
                      2. How We Use Your Information
                    </h2>
                    <div className="space-y-4 text-[#23263a]" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 400 }}>
                      <p>
                        We use the information we collect to:
                      </p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Provide and improve our services</li>
                        <li>Communicate with you about our services</li>
                        <li>Send you marketing materials (with your consent)</li>
                        <li>Respond to your inquiries and support requests</li>
                        <li>Analyze website usage and improve user experience</li>
                        <li>Comply with legal obligations</li>
                      </ul>
                    </div>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'Montserrat, sans-serif', color: '#18181b' }}>
                      3. Information Sharing
                    </h2>
                    <div className="space-y-4 text-[#23263a]" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 400 }}>
                      <p>
                        We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except in the following circumstances:
                      </p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>With your explicit consent</li>
                        <li>To comply with legal obligations</li>
                        <li>To protect our rights and safety</li>
                        <li>With trusted service providers who assist us in operating our website and conducting our business</li>
                      </ul>
                    </div>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'Montserrat, sans-serif', color: '#18181b' }}>
                      4. Data Security
                    </h2>
                    <div className="space-y-4 text-[#23263a]" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 400 }}>
                      <p>
                        We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:
                      </p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Encryption of sensitive data</li>
                        <li>Regular security assessments</li>
                        <li>Access controls and authentication</li>
                        <li>Secure data storage practices</li>
                      </ul>
                    </div>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'Montserrat, sans-serif', color: '#18181b' }}>
                      5. Cookies and Tracking
                    </h2>
                    <div className="space-y-4 text-[#23263a]" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 400 }}>
                      <p>
                        We use cookies and similar tracking technologies to:
                      </p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Remember your preferences and settings</li>
                        <li>Analyze website traffic and usage patterns</li>
                        <li>Improve website functionality and user experience</li>
                        <li>Provide personalized content and advertisements</li>
                      </ul>
                      <p>
                        You can control cookie settings through your browser preferences, though disabling cookies may affect website functionality.
                      </p>
                    </div>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'Montserrat, sans-serif', color: '#18181b' }}>
                      6. Your Rights
                    </h2>
                    <div className="space-y-4 text-[#23263a]" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 400 }}>
                      <p>
                        You have the right to:
                      </p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Access your personal information</li>
                        <li>Correct inaccurate information</li>
                        <li>Request deletion of your information</li>
                        <li>Object to processing of your information</li>
                        <li>Withdraw consent for marketing communications</li>
                        <li>Request data portability</li>
                      </ul>
                      <p>
                        To exercise these rights, please contact us using the information provided below.
                      </p>
                    </div>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'Montserrat, sans-serif', color: '#18181b' }}>
                      7. Children's Privacy
                    </h2>
                    <div className="space-y-4 text-[#23263a]" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 400 }}>
                      <p>
                        Our services are not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you believe we have collected information from a child under 13, please contact us immediately.
                      </p>
                    </div>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'Montserrat, sans-serif', color: '#18181b' }}>
                      8. International Transfers
                    </h2>
                    <div className="space-y-4 text-[#23263a]" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 400 }}>
                      <p>
                        Your information may be transferred to and processed in countries other than your own. We ensure that such transfers comply with applicable data protection laws and implement appropriate safeguards to protect your information.
                      </p>
                    </div>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'Montserrat, sans-serif', color: '#18181b' }}>
                      9. Changes to This Policy
                    </h2>
                    <div className="space-y-4 text-[#23263a]" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 400 }}>
                      <p>
                        We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. We encourage you to review this policy periodically.
                      </p>
                    </div>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'Montserrat, sans-serif', color: '#18181b' }}>
                      10. Contact Us
                    </h2>
                    <div className="space-y-4 text-[#23263a]" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 400 }}>
                      <p>
                        If you have any questions about this Privacy Policy or our data practices, please contact us:
                      </p>
                      <ul className="list-none space-y-2">
                        <li><strong>Email:</strong> privacy@medialevelling.com</li>
                        <li><strong>Phone:</strong> +1 (555) 123-4567</li>
                        <li><strong>Address:</strong> 123 Digital Marketing Ave, Suite 100, City, State 12345</li>
                      </ul>
                    </div>
                  </section>
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

export default PrivacyPolicy; 