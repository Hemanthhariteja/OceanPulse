import React from "react";
import { Satellite, Database, Globe2, Users } from "lucide-react";

const missions = [
  {
    name: "SWOT",
    fullName: "Surface Water and Ocean Topography",
    description: "Measures sea surface height with unprecedented accuracy to track ocean currents, eddies, and sea level changes.",
    icon: Satellite,
    launched: "December 2022",
    organization: "NASA/JPL"
  },
  {
    name: "PACE",
    fullName: "Plankton, Aerosol, Cloud, ocean Ecosystem",
    description: "Advanced ocean color instrument tracking phytoplankton communities and ocean health from space.",
    icon: Globe2,
    launched: "February 2024",
    organization: "NASA"
  },
  {
    name: "GRACE-FO",
    fullName: "Gravity Recovery and Climate Experiment Follow-On",
    description: "Measures Earth's gravitational field to track water movement, ice mass changes, and sea level variations.",
    icon: Database,
    launched: "May 2018",
    organization: "NASA/GFZ"
  }
];

export default function About() {
  return (
    <div className="min-h-screen py-20">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <h1 className="heading-font text-5xl md:text-6xl font-bold mb-6 glow-text">
            ABOUT THE DATA
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Ocean Pulse synthesizes data from NASA's most advanced Earth observation missions 
            to tell the story of our planet's interconnected ocean systems.
          </p>
        </div>

        {/* Mission Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {missions.map((mission, index) => {
            const Icon = mission.icon;
            return (
              <div
                key={index}
                className="bg-[#0f1419] rounded-2xl p-8 border border-cyan-500/20 holographic-border hover:border-cyan-400/50 transition-all duration-300"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center mb-6">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="heading-font text-2xl font-bold text-white mb-2">
                  {mission.name}
                </h3>
                <p className="text-sm text-cyan-400 mb-4">{mission.fullName}</p>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  {mission.description}
                </p>
                
                <div className="flex items-center justify-between text-sm text-gray-400">
                  <span>Launched: {mission.launched}</span>
                  <span>{mission.organization}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Data Standards */}
        <div className="bg-[#0f1419] rounded-2xl p-12 border border-cyan-500/20 holographic-border mb-12">
          <div className="flex items-start gap-6">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
              <Database className="w-6 h-6 text-cyan-400" />
            </div>
            <div>
              <h2 className="heading-font text-2xl font-bold text-white mb-4">
                Data Standards & Accessibility
              </h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                All data presented in Ocean Pulse adheres to WCAG AA accessibility standards 
                and is sourced from peer-reviewed NASA Earth observation missions. Our visualizations 
                are optimized for accuracy, performance, and cross-device compatibility.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Raw datasets are available through NASA's Earth Data portal and can be downloaded 
                in multiple formats including CSV, JSON, and NetCDF for scientific research and analysis.
              </p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="text-center">
          <div className="inline-flex items-center gap-3 bg-[#0f1419] px-8 py-4 rounded-full border border-cyan-500/20">
            <Users className="w-6 h-6 text-cyan-400" />
            <span className="text-gray-300">
              Built with data from NASA, JPL, ESA, and international partners
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}