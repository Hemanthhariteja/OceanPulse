import React from "react";
import { Link } from "react-router-dom";

const cards = [
  { key: "shark", title: "Great White Shark", desc: "Explore an animated shark scene", path: "/models/shark" },
  { key: "ocean", title: "Ocean Waves", desc: "Realistic wave animation", path: "/models/ocean" },
  { key: "solar-system", title: "Solar System", desc: "Custom solar system model", path: "/models/solar-system" },
  { key: "satellite", title: "Satellite", desc: "Inspect a satellite up close", path: "/models/satellite" },
];

export default function Models() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="text-center mb-10">
        <h2 className="heading-font text-3xl md:text-4xl font-bold glow-text">3D Model Hub</h2>
        <p className="text-gray-300 mt-2">Open any model in an embedded viewer.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map(card => (
          <Link
            key={card.key}
            to={card.path}
            className="block p-5 rounded-xl holographic-border hover:bg-cyan-500/5 transition"
          >
            <div className="heading-font text-xl mb-2 text-cyan-300">{card.title}</div>
            <div className="text-gray-400 text-sm">{card.desc}</div>
            <div className="mt-4 text-cyan-400 text-sm">Open →</div>
          </Link>
        ))}
      </div>
    </div>
  );
}


