import { useEffect, useState, useCallback, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const location = useLocation();
  const [isIsland, setIsIsland] = useState(false);
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);
  const tickingRef = useRef(false);
  const lastScrollY = useRef(0);

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    const shouldBeIsland = scrollY > 40;
    
    if (shouldBeIsland !== isIsland && Math.abs(scrollY - lastScrollY.current) > 5) {
      setIsIsland(shouldBeIsland);
      lastScrollY.current = scrollY;
    }
  }, [isIsland]);

  useEffect(() => {
    const throttledHandleScroll = () => {
      if (!tickingRef.current) {
        requestAnimationFrame(() => {
          handleScroll();
          tickingRef.current = false;
        });
        tickingRef.current = true;
      }
    };

    window.addEventListener('scroll', throttledHandleScroll, { passive: true });
    return () => window.removeEventListener('scroll', throttledHandleScroll);
  }, [handleScroll]);

  return (
    <nav
      aria-label="Main navigation"
      className={`fixed top-0 left-0 w-full z-50 flex justify-center transition-all duration-500 ease-in-out ${
        isIsland ? 'pointer-events-auto' : ''
      }`}
      style={{ background: 'transparent' }}
    >
      <div
      className={`flex items-center transition-[max-width,margin,padding,gap] duration-700 ease-in-out backdrop-blur-lg bg-white/80
        ${isIsland
          ? 'justify-center max-w-7xl mt-4 rounded-xl px-8 py-6 gap-8 shadow-2xl'
          : 'justify-between max-w-[110rem] mt-0 rounded-2xl px-12 md:px-24 py-12 gap-10'}
      `}
      style={{
        width: isIsland ? '98%' : '100%',
        minWidth: 0,
        overflow: 'hidden',
        boxShadow: isIsland
          ? '0 8px 32px 0 rgba(31, 38, 135, 0.15)'
          : '0 0 0 rgba(0,0,0,0)',
        transition:
          'max-width 0.7s cubic-bezier(0.4,0,0.2,1), padding 0.7s cubic-bezier(0.4,0,0.2,1), margin 0.7s cubic-bezier(0.4,0,0.2,1), gap 0.7s cubic-bezier(0.4,0,0.2,1), box-shadow 0.4s ease 0.1s, background-color 0.4s ease 0.1s',
      }}
    >
      <div className="flex items-center min-w-[120px]">
        <Link to="/">
          <img
            src="/logo.png"
            alt="Logo"
            className="transition-[height] duration-700 ease-in-out"
            style={{ height: isIsland ? '2.5rem' : '3.5rem', width: 'auto' }}
          />
        </Link>
      </div>

      {isMobile ? (
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button
              aria-label="Open menu"
              className="md:hidden block p-2"
              onClick={() => setOpen(true)}
            >
              <Menu size={28} />
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="p-8">
            <Link to="/" className="block mb-4" onClick={() => setOpen(false)}>Home</Link>
            <Link to="/services" className="block mb-4" onClick={() => setOpen(false)}>Services</Link>
            <Link to="/pricing" className="block mb-4" onClick={() => setOpen(false)}>Pricing</Link>
            <Link to="/audit" className="block mb-4" onClick={() => setOpen(false)}>Audit</Link>
            <Link to="/case-studies" className="block mb-4" onClick={() => setOpen(false)}>Case Studies</Link>
            <Link to="/portfolio" className="block mb-4 text-[#18181b]" style={{ fontFamily: 'Montserrat, sans-serif' }} onClick={() => setOpen(false)}>Portfolio</Link>
            <Link to="/about" className="block mb-4" onClick={() => setOpen(false)}>About</Link>
            <Link to="/contact" className="block" onClick={() => setOpen(false)}>Contact</Link>
          </SheetContent>
        </Sheet>
      ) : (
        <div
          className={`flex ${isIsland ? 'gap-4' : 'gap-6'} min-w-0 flex-wrap ${
            isIsland ? 'justify-center' : 'justify-end'
          } flex-1 transition-[gap] duration-700 ease-in-out`}
        >
          <Link
            to="/"
            className={`font-normal transition-[font-size] duration-700 ease-in-out hover:scale-105 hover:shadow-md hover:bg-[#f3e8ff]/60 rounded-md px-2 ${
              location.pathname === '/' ? 'font-medium' : ''
            }`}
            style={{
              fontFamily: 'Montserrat, sans-serif',
              color: '#000000',
              fontWeight: 300,
              fontSize: isIsland ? '0.875rem' : '1rem',
            }}
          >
            Home
          </Link>
          <Link to="/services" className={`font-normal transition-[font-size] duration-700 ease-in-out hover:scale-105 hover:shadow-md hover:bg-[#f3e8ff]/60 rounded-md px-2 ${
            location.pathname === '/services' ? 'font-medium' : ''
          }`} style={{ fontFamily: 'Montserrat, sans-serif', color: '#000000', fontWeight: 300, fontSize: isIsland ? '0.875rem' : '1rem' }}>
            Services
          </Link>
          <Link to="/pricing" className={`font-normal transition-[font-size] duration-700 ease-in-out hover:scale-105 hover:shadow-md hover:bg-[#f3e8ff]/60 rounded-md px-2 ${
            location.pathname === '/pricing' ? 'font-medium' : ''
          }`} style={{ fontFamily: 'Montserrat, sans-serif', color: '#000000', fontWeight: 300, fontSize: isIsland ? '0.875rem' : '1rem' }}>
            Pricing
          </Link>
          <Link to="/audit" className="font-normal transition-[font-size] duration-700 ease-in-out hover:scale-105 hover:shadow-md hover:bg-[#f3e8ff]/60 rounded-md px-2" style={{ fontFamily: 'Montserrat, sans-serif', color: '#18181b', fontWeight: 300, fontSize: isIsland ? '0.875rem' : '1rem' }}>
            Audit
          </Link>
          <Link to="/case-studies" className="font-normal transition-[font-size] duration-700 ease-in-out hover:scale-105 hover:shadow-md hover:bg-[#f3e8ff]/60 rounded-md px-2" style={{ fontFamily: 'Montserrat, sans-serif', color: '#18181b', fontWeight: 300, fontSize: isIsland ? '0.875rem' : '1rem' }}>
            Case Studies
          </Link>
          <Link to="/portfolio" className={`font-normal transition-[font-size] duration-700 ease-in-out hover:scale-105 hover:shadow-md hover:bg-[#f3e8ff]/60 rounded-md px-2 ${
            location.pathname === '/portfolio' ? 'font-medium' : ''
          }`} style={{ fontFamily: 'Montserrat, sans-serif', color: '#18181b', fontWeight: 300, fontSize: isIsland ? '0.875rem' : '1rem' }}>
            Portfolio
          </Link>
          <Link to="/about" className="font-normal transition-[font-size] duration-700 ease-in-out hover:scale-105 hover:shadow-md hover:bg-[#f3e8ff]/60 rounded-md px-2" style={{ fontFamily: 'Montserrat, sans-serif', color: '#18181b', fontWeight: 300, fontSize: isIsland ? '0.875rem' : '1rem' }}>
            About
          </Link>
          <Link to="/contact" className="font-normal transition-[font-size] duration-700 ease-in-out hover:scale-105 hover:shadow-md hover:bg-[#f3e8ff]/60 rounded-md px-2" style={{ fontFamily: 'Montserrat, sans-serif', color: '#18181b', fontWeight: 300, fontSize: isIsland ? '0.875rem' : '1rem' }}>
            Contact
          </Link>
        </div>
      )}
    </div>

    </nav>
  );
};

export default Navigation;
