import { useInViewAnimation } from '@/hooks/use-in-view-animation';
import { Link } from 'react-router-dom';

const Footer = () => {
  const { ref, className } = useInViewAnimation<HTMLDivElement>('animate-fade-in-up');
  return (
    <footer ref={ref} className={className} role="contentinfo">
      <div className="bg-gray-50 py-20 px-6 border-t border-gray-200/50 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
        <div className="max-w-6xl mx-auto animate-fade-in-up" style={{ animationDelay: '380ms' }}>
          <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-12 max-w-6xl mx-auto animate-fade-in-up" style={{ animationDelay: '560ms' }}>
            <div className="md:w-1/2">
              <h3 className="text-2xl font-light mb-6 text-black">
                MEDIA LEVELLING
              </h3>
              <p className="text-black leading-relaxed font-light">
                Transforming businesses through innovative digital media solutions.
              </p>
            </div>
            
            <div className="md:w-1/4">
              <h4 className="text-lg font-light mb-6 text-black">Services</h4>
              <ul className="space-y-3 text-black font-light">
                <li><Link to="/services" className="hover:text-blue-600 transition-colors">SEO Optimization</Link></li>
                <li><Link to="/services" className="hover:text-blue-600 transition-colors">Meta Ads</Link></li>
                <li><Link to="/services" className="hover:text-blue-600 transition-colors">Google Ads</Link></li>
                <li><Link to="/services" className="hover:text-blue-600 transition-colors">Short-form Content</Link></li>
                <li><Link to="/services" className="hover:text-blue-600 transition-colors">Website Creation</Link></li>
              </ul>
            </div>

            <div className="md:w-1/4">
              <h4 className="text-lg font-light mb-6 text-black">Legal</h4>
              <ul className="space-y-3 text-black font-light">
                <li><Link to="/privacy-policy" className="hover:text-blue-600 transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms-of-service" className="hover:text-blue-600 transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-200 pt-8 text-center text-black font-light animate-fade-in-up" style={{ animationDelay: '740ms' }}>
            <p>&copy; 2025 Media Levelling. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
