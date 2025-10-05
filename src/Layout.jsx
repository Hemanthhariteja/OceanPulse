import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "./utils";
import { Globe2, Database, Info } from "lucide-react";

export default function Layout({ children }) {
  const location = useLocation();
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: createPageUrl("Landing"), icon: Globe2 },
    { name: "Ocean Pulse", path: createPageUrl("EarthDeepDive"), icon: Database },
    { name: "About Data", path: createPageUrl("About"), icon: Info },
    { name: "3D Models", path: createPageUrl("Models"), icon: Globe2 },
  ];

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght:400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700&display=swap');
        
        :root {
          --primary-cyan: #00d9ff;
          --secondary-cyan: #0ea5e9;
          --deep-black: #0a0e1a;
          --dark-gray: #0f1419;
          --accent-glow: rgba(0, 217, 255, 0.3);
        }
        
        * {
          font-family: 'Inter', sans-serif;
        }
        
        h1, h2, h3, h4, h5, h6, .heading-font {
          font-family: 'Orbitron', sans-serif;
          letter-spacing: 0.05em;
        }
        
        .glow-text {
          text-shadow: 0 0 20px var(--accent-glow), 0 0 40px var(--accent-glow);
        }
        
        .pulse-animation {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.7;
            transform: scale(1.05);
          }
        }
        
        .heartbeat {
          animation: heartbeat 1.5s ease-in-out infinite;
        }
        
        @keyframes heartbeat {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 0 20px var(--accent-glow);
          }
          25% {
            transform: scale(1.1);
            box-shadow: 0 0 40px var(--accent-glow), 0 0 60px var(--accent-glow);
          }
          50% {
            transform: scale(1);
            box-shadow: 0 0 20px var(--accent-glow);
          }
        }
        
        .holographic-border {
          border: 1px solid rgba(0, 217, 255, 0.3);
          box-shadow: inset 0 0 20px rgba(0, 217, 255, 0.1);
        }
        
        .smooth-scroll {
          scroll-behavior: smooth;
        }
      `}</style>

      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#0a0e1a]/95 backdrop-blur-lg border-b border-cyan-500/20' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <Link to={createPageUrl("Landing")} className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Globe2 className="w-6 h-6 text-white" />
              </div>
              <span className="heading-font text-xl font-bold text-white glow-text hidden sm:block">
                OCEAN PULSE
              </span>
            </Link>

            <div className="flex items-center gap-1 sm:gap-2">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                      isActive
                        ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                        : 'text-gray-400 hover:text-cyan-400 hover:bg-cyan-500/10'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="hidden sm:inline text-sm font-medium">{link.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-16">
        {children}
      </main>

      <footer className="bg-[#0f1419] border-t border-cyan-500/20 py-8 mt-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-gray-400 text-sm">
            Data provided by NASA, JPL, PACE, SWOT, and GRACE-FO missions
          </p>
          <p className="text-gray-500 text-xs mt-2">
            © 2024 Ocean Pulse Project. Exploring Earth's interconnected systems.
          </p>
        </div>
      </footer>
    </div>
  );
}