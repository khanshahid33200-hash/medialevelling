import { useEffect, useState } from 'react';

const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 z-50 p-3 rounded-full bg-[#18181b] text-white shadow-lg transition-all duration-300 transform ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-75 pointer-events-none'} hover:bg-[#23272f] hover:scale-110`}
      aria-label="Back to top"
      style={{ fontFamily: 'Montserrat, sans-serif' }}
    >
      ↑
    </button>
  );
};

export default BackToTop; 