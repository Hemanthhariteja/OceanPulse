
import React from "react";
import { motion } from "framer-motion";
import PlanetCard from "./PlanetCard";

export default function SolarSystemMap({ planets, onPlanetClick }) {
  const orbitDiameters = [280, 440, 600]; // Diameters for the rings

  return (
    <div className="relative py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <h2 className="heading-font text-4xl md:text-5xl font-bold mb-4 glow-text">
            PLANETARY DEEP DIVES
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Select a celestial body to explore its unique story through NASA's data
          </p>
        </motion.div>

        {/* Solar System Visualization */}
        <div className="relative min-h-[600px] md:min-h-[700px] flex items-center justify-center">
          <div className="absolute w-full h-full bg-gradient-radial from-cyan-500/5 to-transparent rounded-3xl border border-cyan-500/20 p-8 md:p-12">
            {/* Sun in center */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 blur-sm animate-pulse" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-gradient-to-br from-yellow-300 to-orange-400" />

            {/* Orbital rings */}
            {orbitDiameters.map((diameter, i) => (
              <div
                key={i}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-500/10"
                style={{
                  width: `${diameter}px`,
                  height: `${diameter}px`,
                }}
              />
            ))}

            {/* Planets */}
            <div className="relative w-full h-full">
              {planets.map((planet, index) => {
                const planetsPerOrbit = 2;
                const orbitIndex = Math.floor(index / planetsPerOrbit);
                const radius = orbitDiameters[orbitIndex] / 2;
                
                // Stagger planets on the same orbit
                const angleOffset = orbitIndex * 0.5; // radians
                const positionInOrbit = index % planetsPerOrbit;
                const angle = positionInOrbit * Math.PI + angleOffset;

                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;

                return (
                  <div
                    key={planet.id}
                    className="absolute top-1/2 left-1/2"
                    style={{
                      transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                    }}
                  >
                    <PlanetCard
                      planet={planet}
                      onClick={() => onPlanetClick(planet)}
                      delay={index * 0.1}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
