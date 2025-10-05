import React from "react";
import { Satellite } from "lucide-react";

const missions = [
  { name: "NASA", logo: "NASA" },
  { name: "JPL", logo: "JPL" },
  { name: "PACE", logo: "PACE" },
  { name: "SWOT", logo: "SWOT" },
  { name: "GRACE-FO", logo: "GRACE-FO" },
];

export default function MissionLogos() {
  return (
    <div className="py-16 bg-[#0f1419]/50">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-center text-sm text-gray-400 mb-8 uppercase tracking-wider">
          Powered by Leading Space Missions
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {missions.map((mission) => (
            <div
              key={mission.name}
              className="flex items-center gap-3 px-6 py-3 bg-[#0a0e1a]/50 rounded-lg border border-cyan-500/10 hover:border-cyan-500/30 transition-all duration-300"
            >
              <Satellite className="w-5 h-5 text-cyan-400" />
              <span className="heading-font text-lg font-semibold text-gray-400 hover:text-cyan-400 transition-colors">
                {mission.logo}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}