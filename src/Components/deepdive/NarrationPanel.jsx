import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Download } from "lucide-react";
import { Button } from "../ui/button";

export default function NarrationPanel({ 
  currentChapter, 
  showTranscript, 
  onToggleTranscript,
  allChapters = []
}) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="heading-font text-xl font-bold text-white">Narration</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={onToggleTranscript}
          className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10"
        >
          <FileText className="w-4 h-4 mr-2" />
          {showTranscript ? 'Hide' : 'Show'} Transcript
        </Button>
      </div>

      <AnimatePresence mode="wait">
        {currentChapter && !showTranscript && (
          <motion.div
            key={currentChapter.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="bg-[#0f1419] rounded-2xl p-6 border border-cyan-500/20 holographic-border"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-sm text-cyan-400 font-semibold">
                {currentChapter.title}
              </span>
            </div>
            
            <p className="text-gray-300 leading-relaxed">
              {currentChapter.text_content?.split(' ').map((word, i) => {
                const isHighlighted = currentChapter.highlight_terms?.some(
                  term => word.toLowerCase().includes(term.toLowerCase())
                );
                return (
                  <span
                    key={i}
                    className={isHighlighted ? 'text-cyan-400 font-semibold' : ''}
                  >
                    {word}{' '}
                  </span>
                );
              })}
            </p>
          </motion.div>
        )}

        {showTranscript && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-[#0f1419] rounded-2xl p-6 border border-cyan-500/20 max-h-96 overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-4">
              <h4 className="heading-font font-semibold text-white">Full Transcript</h4>
              <Button variant="ghost" size="sm" className="text-cyan-400">
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>
            
            <div className="space-y-6">
              {allChapters.map((chapter, index) => (
                <div key={chapter.id} className="border-l-2 border-cyan-500/30 pl-4">
                  <div className="text-xs text-gray-500 mb-2">
                    Chapter {index + 1} - {chapter.title}
                  </div>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    {chapter.text_content}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}