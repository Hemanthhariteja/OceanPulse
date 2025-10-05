import React from "react";
import { Play, Pause, Volume2, VolumeX, SkipForward, SkipBack } from "lucide-react";
import { Slider } from "../ui/slider";

export default function CustomAudioPlayer({ 
  audioRef, 
  isPlaying, 
  currentTime, 
  duration, 
  volume,
  onPlayPause, 
  onSeek, 
  onVolumeChange,
  chapters = []
}) {
  const [isMuted, setIsMuted] = React.useState(false);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleVolumeToggle = () => {
    setIsMuted(!isMuted);
    onVolumeChange(isMuted ? volume : 0);
  };

  const skipToChapter = (time) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  return (
    <div className="bg-[#0f1419] rounded-2xl border border-cyan-500/20 p-6 holographic-border">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse" />
          <span className="heading-font text-sm text-cyan-400 font-semibold tracking-wider">
            AUDIO NARRATION
          </span>
        </div>
        <div className="text-sm text-gray-400 font-mono">
          {formatTime(currentTime)} / {formatTime(duration)}
        </div>
      </div>

      {/* Progress Bar with Chapter Markers */}
      <div className="relative mb-6">
        <Slider
          value={[currentTime]}
          max={duration}
          step={0.1}
          onValueChange={(value) => onSeek(value[0])}
          className="cursor-pointer"
        />
        
        {/* Chapter markers */}
        <div className="absolute top-0 left-0 right-0 flex justify-between mt-2">
          {chapters.map((chapter, index) => {
            const position = (chapter.start_time / duration) * 100;
            return (
              <button
                key={index}
                onClick={() => skipToChapter(chapter.start_time)}
                className="group relative"
                style={{ left: `${position}%` }}
              >
                <div className="w-2 h-2 rounded-full bg-cyan-400 group-hover:scale-150 transition-transform" />
                <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <div className="bg-[#0a0e1a] px-3 py-1 rounded-lg border border-cyan-500/30 whitespace-nowrap text-xs text-cyan-400">
                    {chapter.title}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => skipToChapter(Math.max(0, currentTime - 10))}
            className="w-10 h-10 rounded-full bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center transition-all duration-300"
          >
            <SkipBack className="w-5 h-5 text-cyan-400" />
          </button>

          <button
            onClick={onPlayPause}
            className="w-14 h-14 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 hover:from-cyan-300 hover:to-blue-500 flex items-center justify-center transition-all duration-300 shadow-[0_0_20px_rgba(0,217,255,0.4)]"
          >
            {isPlaying ? (
              <Pause className="w-6 h-6 text-white" />
            ) : (
              <Play className="w-6 h-6 text-white ml-1" />
            )}
          </button>

          <button
            onClick={() => skipToChapter(Math.min(duration, currentTime + 10))}
            className="w-10 h-10 rounded-full bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center transition-all duration-300"
          >
            <SkipForward className="w-5 h-5 text-cyan-400" />
          </button>
        </div>

        <div className="flex items-center gap-3">
          <button onClick={handleVolumeToggle} className="text-cyan-400 hover:text-cyan-300 transition-colors">
            {isMuted || volume === 0 ? (
              <VolumeX className="w-5 h-5" />
            ) : (
              <Volume2 className="w-5 h-5" />
            )}
          </button>
          <Slider
            value={[isMuted ? 0 : volume * 100]}
            max={100}
            step={1}
            onValueChange={(value) => onVolumeChange(value[0] / 100)}
            className="w-24 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}