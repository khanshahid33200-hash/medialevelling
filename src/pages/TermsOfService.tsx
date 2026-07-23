import { useInViewAnimation } from '@/hooks/use-in-view-animation';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';

const TermsOfService = () => {
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
              Terms of Service
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The terms and conditions governing your use of our services
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
                      1. Acceptance of Terms
                    </h2>
                    <div className="space-y-4 text-[#23263a]" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 400 }}>
                      <p>
                        By accessing and using the services provided by Media Levelling ("we," "us," or "our"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                      </p>
                    </div>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'Montserrat, sans-serif', color: '#18181b' }}>
                      2. Description of Services
                    </h2>
                    <div className="space-y-4 text-[#23263a]" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 400 }}>
                      <p>
                        Media Levelling provides digital marketing services including but not limited to:
                      </p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Search Engine Optimization (SEO)</li>
                        <li>Google Ads management</li>
                        <li>Meta Ads (Facebook & Instagram) management</li>
                        <li>Short-form content creation</li>
                        <li>Website development and design</li>
                        <li>Content strategy and marketing</li>
                        <li>Digital marketing consulting</li>
                      </ul>
                    </div>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'Montserrat, sans-serif', color: '#18181b' }}>
                      3. Service Agreements
                    </h2>
                    <div className="space-y-4 text-[#23263a]" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 400 }}>
                      <p>
                        When you engage our services, you agree to:
                      </p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Provide accurate and complete information</li>
                        <li>Cooperate with our team in good faith</li>
                        <li>Provide necessary access to accounts and platforms</li>
                        <li>Pay all fees in a timely manner</li>
                        <li>Not interfere with our work or processes</li>
                      </ul>
                    </div>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'Montserrat, sans-serif', color: '#18181b' }}>
                      4. Payment Terms
                    </h2>
                    <div className="space-y-4 text-[#23263a]" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 400 }}>
                      <p>
                        Payment terms are as follows:
                      </p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>All fees are due upon receipt of invoice</li>
                        <li>Late payments may result in service suspension</li>
                        <li>We reserve the right to charge late fees</li>
                        <li>Refunds are provided at our discretion</li>
                        <li>Prices are subject to change with 30 days notice</li>
                      </ul>
                    </div>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'Montserrat, sans-serif', color: '#18181b' }}>
                      5. Intellectual Property
                    </h2>
                    <div className="space-y-4 text-[#23263a]" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 400 }}>
                      <p>
                        Intellectual property rights are governed as follows:
                      </p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>You retain ownership of your existing content and materials</li>
                        <li>We retain ownership of our proprietary methods and tools</li>
                        <li>Content we create for you becomes your property upon full payment</li>
                        <li>We may use anonymized work examples in our portfolio</li>
                        <li>You grant us license to use your brand for service delivery</li>
                      </ul>
                    </div>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'Montserrat, sans-serif', color: '#18181b' }}>
                      6. Confidentiality
                    </h2>
                    <div className="space-y-4 text-[#23263a]" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 400 }}>
                      <p>
                        We maintain strict confidentiality regarding your business information, including:
                      </p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Business strategies and plans</li>
                        <li>Financial information and data</li>
                        <li>Customer lists and information</li>
                        <li>Proprietary processes and methods</li>
                        <li>Any other confidential information you share</li>
                      </ul>
                      <p>
                        This confidentiality obligation survives the termination of our services.
                      </p>
                    </div>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'Montserrat, sans-serif', color: '#18181b' }}>
                      7. Performance and Results
                    </h2>
                    <div className="space-y-4 text-[#23263a]" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 400 }}>
                      <p>
                        Regarding performance and results:
                      </p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>We strive for excellence but cannot guarantee specific outcomes</li>
                        <li>Results depend on many factors beyond our control</li>
                        <li>We provide regular reporting and transparent communication</li>
                        <li>We commit to using industry best practices</li>
                        <li>We will work diligently to achieve your goals</li>
                      </ul>
                    </div>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'Montserrat, sans-serif', color: '#18181b' }}>
                      8. Limitation of Liability
                    </h2>
                    <div className="space-y-4 text-[#23263a]" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 400 }}>
                      <p>
                        Our liability is limited as follows:
                      </p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>We are not liable for indirect, incidental, or consequential damages</li>
                        <li>Our total liability is limited to the amount paid for services</li>
                        <li>We are not responsible for third-party platform changes</li>
                        <li>We disclaim warranties not expressly stated</li>
                        <li>Force majeure events relieve us of obligations</li>
                      </ul>
                    </div>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'Montserrat, sans-serif', color: '#18181b' }}>
                      9. Termination
                    </h2>
                    <div className="space-y-4 text-[#23263a]" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 400 }}>
                      <p>
                        Either party may terminate services with written notice:
                      </p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>We require 30 days written notice for termination</li>
                        <li>You may terminate immediately for material breach</li>
                        <li>We may terminate for non-payment or violation of terms</li>
                        <li>Upon termination, you remain liable for services rendered</li>
                        <li>We will provide final deliverables within 30 days</li>
                      </ul>
                    </div>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'Montserrat, sans-serif', color: '#18181b' }}>
                      10. Dispute Resolution
                    </h2>
                    <div className="space-y-4 text-[#23263a]" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 400 }}>
                      <p>
                        In the event of disputes:
                      </p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>We prefer to resolve issues through direct communication</li>
                        <li>If needed, disputes will be resolved through mediation</li>
                        <li>Legal action is a last resort</li>
                        <li>This agreement is governed by applicable state law</li>
                        <li>Any legal action must be brought in our jurisdiction</li>
                      </ul>
                    </div>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'Montserrat, sans-serif', color: '#18181b' }}>
                      11. Changes to Terms
                    </h2>
                    <div className="space-y-4 text-[#23263a]" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 400 }}>
                      <p>
                        We may update these terms from time to time. We will notify you of any material changes by posting the new terms on our website and updating the "Last updated" date. Your continued use of our services after such changes constitutes acceptance of the new terms.
                      </p>
                    </div>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'Montserrat, sans-serif', color: '#18181b' }}>
                      12. Contact Information
                    </h2>
                    <div className="space-y-4 text-[#23263a]" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 400 }}>
                      <p>
                        If you have any questions about these Terms of Service, please contact us:
                      </p>
                      <ul className="list-none space-y-2">
                        <li><strong>Email:</strong> legal@medialevelling.com</li>
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

export default TermsOfService; 