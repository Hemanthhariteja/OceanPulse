import React from "react";
import { useParams, Link } from "react-router-dom";

const MODEL_TO_FOLDER = {
  "shark": "shark",
  "ocean": "ocean",
  "solar-system": "Solar system",
  "satellite": "Satellite",
};

export default function ModelViewer() {
  const { model } = useParams();
  const folder = MODEL_TO_FOLDER[model];

  if (!folder) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-12 text-center">
        <p className="text-red-400 mb-4">Unknown model.</p>
        <Link to="/models" className="text-cyan-400 underline">Back to Models</Link>
      </div>
    );
  }

  const base = (import.meta.env && import.meta.env.BASE_URL) ? import.meta.env.BASE_URL : "/";
  const src = encodeURI(`${base}${folder}/index.html`);

  return (
    <div className="max-w-7xl mx-auto px-6 py-6">
      <div className="flex items-center justify-between mb-4">
        <Link to="/models" className="text-cyan-400 hover:underline">← Back to Models</Link>
        <a href={src} target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline">Open in new tab</a>
      </div>
      <div className="w-full aspect-video rounded-xl overflow-hidden holographic-border bg-black">
        <iframe
          title={`${model}-viewer`}
          src={src}
          className="w-full h-full"
          style={{ border: "0" }}
          allow="autoplay; fullscreen"
        />
      </div>
      <p className="text-gray-400 text-sm mt-3">
        If the model does not load, pop it out using “Open in new tab”. Paths are prefixed with the site base for GitHub Pages compatibility.
      </p>
    </div>
  );
}


