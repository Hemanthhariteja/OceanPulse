import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createPageUrl } from "../utils";
import { Planet } from "../Entities/Planet";
import { Button } from "../Components/ui/button";
import { Play } from "lucide-react";

import HeroSection from "../Components/hero/HeroSection";
import DataFeedTicker from "../Components/hero/DataFeedTicker";
import SolarSystemMap from "../Components/planets/SolarSystemMap";
import MissionLogos from "../Components/hero/MissionLogos";

export default function Landing() {
  const navigate = useNavigate();
  const [planets, setPlanets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPlanets();
  }, []);

  const loadPlanets = async () => {
    const data = await Planet.list('order');
    setPlanets(data);
    setLoading(false);
  };

  const handlePlanetClick = (planet) => {
    if (planet.name === "Earth") {
      navigate(createPageUrl("EarthDeepDive"));
    }
  };

  const handleBeginJourney = () => {
    navigate(createPageUrl("EarthDeepDive"));
  };

  return (
    <div className="min-h-screen">
      <HeroSection />

      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <p className="text-gray-300 text-lg max-w-3xl mx-auto leading-relaxed mb-8">
            Explore the data shaping our future. From orbital ice loss to deep ocean currents, 
            this is the story of Earth as a dynamic system.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              onClick={handleBeginJourney}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-8 py-6 text-lg rounded-xl shadow-[0_0_40px_rgba(0,217,255,0.4)] hover:shadow-[0_0_60px_rgba(0,217,255,0.6)] transition-all duration-300"
            >
              <Play className="w-5 h-5 mr-2" />
              BEGIN THE OCEAN PULSE JOURNEY
            </Button>

            <Link
              to="/models"
              className="px-8 py-6 text-lg rounded-xl border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 transition-all duration-300"
            >
              Explore 3D Models
            </Link>
          </div>
        </div>
      </div>

      <DataFeedTicker />

      {!loading && (
        <SolarSystemMap 
          planets={planets}
          onPlanetClick={handlePlanetClick}
        />
      )}

      <MissionLogos />
    </div>
  );
}