import React from "react";
import { Activity } from "lucide-react";
import { motion } from "framer-motion";

const dataStreams = [
  "GRACE-FO: Global Ocean Mass Anomaly: +0.2mm/yr",
  "SWOT: Sea Surface Height Accuracy: ±2cm",
  "PACE: Phytoplankton Density Index: 0.87 mg/m³",
  "Sentinel-6: Mean Sea Level Rise: +3.4mm/yr",
  "ICESat-2: Polar Ice Mass Loss: -279 Gt/yr",
  "SMAP: Ocean Salinity: 35.2 PSU",
];

export default function DataFeedTicker() {
  return (
    <div className="bg-[#0f1419] border-y border-cyan-500/20 py-6 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-4">
        <div className="flex items-center gap-2 text-cyan-400">
          <Activity className="w-5 h-5" />
          <h3 className="heading-font text-sm font-semibold tracking-wider">LIVE DATA STREAM</h3>
        </div>
      </div>

      <div className="space-y-3">
        {[0, 1, 2].map((index) => (
          <motion.div
            key={index}
            className="flex"
            animate={{
              x: [0, -1000],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear",
              delay: index * 0.5,
            }}
          >
            <div className="flex gap-8 whitespace-nowrap">
              {[...dataStreams, ...dataStreams].map((stream, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 px-4 py-2 bg-cyan-500/5 rounded-lg border border-cyan-500/20"
                >
                  <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  <span className="text-sm text-gray-300 font-mono">{stream}</span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}