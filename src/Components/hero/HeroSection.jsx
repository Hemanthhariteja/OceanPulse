import React from "react";
import { ArrowDown } from "lucide-react";
import { motion } from "framer-motion";

export default function HeroSection() {
  const [scrollY, setScrollY] = React.useState(0);

  React.useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Parallax Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?q=80&w=2000)',
          transform: `translateY(${scrollY * 0.5}px)`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e1a]/70 via-[#0a0e1a]/50 to-[#0a0e1a]" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-center max-w-5xl"
        >
          <h1 className="heading-font text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 glow-text">
            OCEAN PULSE
          </h1>
          <p className="heading-font text-xl sm:text-2xl md:text-3xl text-cyan-400 mb-8 tracking-wide">
            Unveiling NASA's Interconnected Planet
          </p>
          <p className="text-base sm:text-lg text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed">
            Explore the data shaping our future. From orbital ice loss to deep ocean currents, 
            this is the story of Earth as a dynamic system.
          </p>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-12"
        >
          <div className="flex flex-col items-center gap-2 animate-bounce">
            <span className="text-sm text-cyan-400 font-medium">Explore</span>
            <ArrowDown className="w-6 h-6 text-cyan-400" />
          </div>
        </motion.div>
      </div>

      {/* Animated Grid Overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(to right, #00d9ff 1px, transparent 1px),
                           linear-gradient(to bottom, #00d9ff 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>
    </div>
  );
}