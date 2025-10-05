import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createPageUrl } from "../utils";
import { DataLayer } from "../Entities/DataLayer";
import { AudioChapter } from "../Entities/AudioChapter";
import { Button } from "../Components/ui/button";
import { ArrowLeft, Download } from "lucide-react";

import CustomAudioPlayer from "../Components/deepdive/CustomAudioPlayer";
import DataLayerMap from "../Components/deepdive/DataLayerMap";
import NarrationPanel from "../Components/deepdive/NarrationPanel";
import StatsWidget from "../Components/deepdive/StatsWidget";
import MissionGallery from "../Components/deepdive/MissionGallery";

export default function EarthDeepDive() {
  const navigate = useNavigate();
  const audioRef = useRef(null);
  
  const [layers, setLayers] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [activeLayer, setActiveLayer] = useState(null);
  const [currentChapter, setCurrentChapter] = useState(null);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [showTranscript, setShowTranscript] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const updateChapterBasedOnTime = useCallback((time) => {
    const chapter = chapters.find(
      ch => time >= ch.start_time && time < ch.end_time
    );
    
    if (chapter && chapter.id !== currentChapter?.id) {
      setCurrentChapter(chapter);
      
      if (chapter.visual_cue) {
        const layer = layers.find(l => 
          l.name.toLowerCase().includes(chapter.visual_cue.toLowerCase())
        );
        if (layer) {
          setActiveLayer(layer);
        }
      }
    }
  }, [chapters, layers, currentChapter]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      updateChapterBasedOnTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleEnded = () => {
      setIsPlaying(false);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [updateChapterBasedOnTime]);

  const loadData = async () => {
    const [layersData, chaptersData] = await Promise.all([
      DataLayer.list('order'),
      AudioChapter.list('order')
    ]);
    
    setLayers(layersData);
    setChapters(chaptersData);
    
    if (layersData.length > 0) {
      setActiveLayer(layersData[0]);
    }
    if (chaptersData.length > 0) {
      setCurrentChapter(chaptersData[0]);
    }
  };

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSeek = (time) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  const handleVolumeChange = (newVolume) => {
    setVolume(newVolume);
  };

  return (
    <div className="min-h-screen pb-20">
      <audio ref={audioRef} src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" />

      <div className="bg-gradient-to-b from-[#0f1419] to-transparent border-b border-cyan-500/20 py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-6">
            <Button
              variant="outline"
              onClick={() => navigate(createPageUrl("Landing"))}
              className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Return to Gateway
            </Button>
            
            <Button
              variant="outline"
              className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10"
            >
              <Download className="w-4 h-4 mr-2" />
              Download Raw Data
            </Button>
          </div>

          <div className="text-center">
            <h1 className="heading-font text-4xl md:text-5xl font-bold mb-4 glow-text">
              OCEAN PULSE
            </h1>
            <p className="text-xl text-gray-300">
              Earth's Interconnected Ocean System
            </p>

            <div className="mt-6">
              <Link
                to="/models"
                className="inline-block px-6 py-3 rounded-lg border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 transition-all duration-300"
              >
                Explore 3D Models
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <StatsWidget />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <DataLayerMap
              activeLayer={activeLayer}
              layers={layers}
              onLayerChange={setActiveLayer}
            />

            <CustomAudioPlayer
              audioRef={audioRef}
              isPlaying={isPlaying}
              currentTime={currentTime}
              duration={duration}
              volume={volume}
              onPlayPause={handlePlayPause}
              onSeek={handleSeek}
              onVolumeChange={handleVolumeChange}
              chapters={chapters}
            />
          </div>

          <div className="space-y-6">
            <NarrationPanel
              currentChapter={currentChapter}
              showTranscript={showTranscript}
              onToggleTranscript={() => setShowTranscript(!showTranscript)}
              allChapters={chapters}
            />

            <MissionGallery />
          </div>
        </div>
      </div>
    </div>
  );
}