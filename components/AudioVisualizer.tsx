'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface AudioVisualizerProps {
  isPlaying: boolean;
}

const AudioVisualizer: React.FC<AudioVisualizerProps> = ({ isPlaying }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let offset = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const time = Date.now() * 0.002;
      const width = canvas.width;
      const height = canvas.height;
      const centerY = height / 2;

      // Draw multi-layered sine waves (chromatic effect)
      const colors = [
        'rgba(147, 197, 253, 0.5)', // blue-300
        'rgba(196, 181, 253, 0.5)', // violet-300
        'rgba(249, 168, 212, 0.5)', // pink-300
      ];

      colors.forEach((color, i) => {
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;

        for (let x = 0; x < width; x++) {
          const amplitude = isPlaying ? 20 + Math.sin(time + i) * 10 : 2;
          const frequency = 0.02 + i * 0.01;
          const y = centerY + Math.sin(x * frequency + time + (i * Math.PI / 2)) * amplitude;
          
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      });

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [isPlaying]);

  return (
    <div className="w-full h-24 bg-slate-950/50 rounded-xl overflow-hidden relative border border-slate-800">
      <canvas
        ref={canvasRef}
        width={800}
        height={100}
        className="w-full h-full"
      />
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="text-slate-500 text-xs uppercase tracking-widest">Ready to speak</span>
        </div>
      )}
    </div>
  );
};

export default AudioVisualizer;
