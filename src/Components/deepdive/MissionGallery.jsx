import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";

const missionImages = [
  {
    url: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?q=80&w=2000",
    caption: "SWOT Satellite Launch - December 2022"
  },
  {
    url: "https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?q=80&w=2000",
    caption: "PACE Mission - Ocean Color Monitoring"
  },
  {
    url: "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?q=80&w=2000",
    caption: "GRACE-FO Gravity Measurements"
  }
];

export default function MissionGallery() {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % missionImages.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + missionImages.length) % missionImages.length);
  };

  return (
    <div className="bg-[#0f1419] rounded-2xl border border-cyan-500/20 overflow-hidden holographic-border">
      <div className="p-4 border-b border-cyan-500/20">
        <h3 className="heading-font font-semibold text-white">Mission Gallery</h3>
      </div>
      
      <div className="relative aspect-video">
        <img
          src={missionImages[currentIndex].url}
          alt={missionImages[currentIndex].caption}
          className="w-full h-full object-cover"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e1a] to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <p className="text-sm text-gray-300 mb-3">{missionImages[currentIndex].caption}</p>
          
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              {missionImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex ? 'bg-cyan-400 w-8' : 'bg-gray-600'
                  }`}
                />
              ))}
            </div>
            
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={prev}
                className="w-8 h-8 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30"
              >
                <ChevronLeft className="w-4 h-4 text-cyan-400" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={next}
                className="w-8 h-8 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30"
              >
                <ChevronRight className="w-4 h-4 text-cyan-400" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}