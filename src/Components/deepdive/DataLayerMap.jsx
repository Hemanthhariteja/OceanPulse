import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layers, Waves, Droplets, TrendingUp } from "lucide-react";

const layerIcons = {
  temperature: Waves,
  phytoplankton: Droplets,
  sealevel: TrendingUp,
  default: Layers
};

export default function DataLayerMap({ activeLayer, layers, onLayerChange }) {
  return (
    <div className="space-y-6">
      {/* Layer Selector */}
      <div className="flex flex-wrap gap-3">
        {layers.map((layer) => {
          const Icon = layerIcons[layer.icon] || layerIcons.default;
          const isActive = activeLayer?.id === layer.id;
          
          return (
            <button
              key={layer.id}
              onClick={() => onLayerChange(layer)}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300
                ${isActive 
                  ? 'bg-cyan-500/20 border-2 border-cyan-400 text-cyan-400' 
                  : 'bg-[#0f1419] border border-cyan-500/20 text-gray-400 hover:border-cyan-400/50 hover:text-cyan-400'
                }
              `}
            >
              <Icon className="w-4 h-4" />
              <span className="text-sm font-medium">{layer.name}</span>
            </button>
          );
        })}
      </div>

      {/* Map Visualization */}
      <AnimatePresence mode="wait">
        {activeLayer && (
          <motion.div
            key={activeLayer.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="relative rounded-2xl overflow-hidden border-2 border-cyan-500/30 holographic-border"
          >
            {/* World Map Background */}
            <div className="aspect-video bg-gradient-to-br from-blue-950 to-[#0a0e1a] relative">
              <img 
                src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000"
                alt="Earth from space"
                className="w-full h-full object-cover opacity-40"
              />
              
              {/* Data Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/20 via-transparent to-blue-500/20 mix-blend-screen" />
              
              {/* Data Points */}
              <div className="absolute inset-0">
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    className="absolute w-3 h-3 rounded-full bg-cyan-400 pulse-animation"
                    style={{
                      left: `${Math.random() * 90 + 5}%`,
                      top: `${Math.random() * 80 + 10}%`,
                      boxShadow: '0 0 20px rgba(0, 217, 255, 0.8)',
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Layer Info Overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#0a0e1a] via-[#0a0e1a]/90 to-transparent p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="heading-font text-xl font-bold text-white mb-2">
                    {activeLayer.name}
                  </h3>
                  <p className="text-sm text-gray-300 mb-2">{activeLayer.description}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-400">
                    <span>Source: {activeLayer.mission_source}</span>
                    <span>Unit: {activeLayer.data_unit}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-cyan-400 font-mono">
                    {(Math.random() * 10).toFixed(2)}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">{activeLayer.data_unit}</div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}