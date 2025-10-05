import React from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

export default function PlanetCard({ planet, onClick, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.1 }}
      className={`cursor-pointer ${planet.is_featured ? 'heartbeat' : ''}`}
    >
      <div
        onClick={onClick}
        className={`
          relative group
          w-32 sm:w-40 p-4 rounded-2xl
          bg-gradient-to-br from-[#0f1419] to-[#0a0e1a]
          border-2 transition-all duration-300
          ${planet.is_featured 
            ? 'border-cyan-400 shadow-[0_0_40px_rgba(0,217,255,0.4)]' 
            : 'border-cyan-500/20 hover:border-cyan-400/50'
          }
        `}
      >
        {planet.is_featured && (
          <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-cyan-400 animate-pulse flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-white" />
          </div>
        )}

        <div
          className="w-16 h-16 mx-auto mb-3 rounded-full"
          style={{
            background: `radial-gradient(circle, ${planet.color}, ${planet.color}dd)`,
            boxShadow: `0 0 20px ${planet.color}80`,
          }}
        />

        <h3 className="heading-font text-center text-sm font-bold text-white mb-1">
          {planet.name}
        </h3>
        <p className="text-xs text-gray-400 text-center mb-3 line-clamp-2">
          {planet.tagline}
        </p>

        <div className="flex justify-center">
          <div className="flex items-center gap-1 text-cyan-400 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
            <span>Explore</span>
            <ChevronRight className="w-3 h-3" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}