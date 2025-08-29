'use client';

import { useEffect, useRef } from 'react';

const StarsBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stars = useRef<Array<{
    x: number;
    y: number;
    radius: number;
    vx: number;
    vy: number;
    alpha: number;
    targetAlpha: number;
    twinkleSpeed: number;
  }>>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // Initialize stars
    const initStars = (count: number) => {
      stars.current = [];
      for (let i = 0; i < count; i++) {
        stars.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.2 + 0.3, // Slightly smaller stars
          vx: (Math.random() * 0.15 - 0.075) * 1.5, // Increased max speed by 50%
          vy: (Math.random() * 0.15 - 0.075) * 1.5, // Increased max speed by 50%
          alpha: 0,
          targetAlpha: Math.random(),
          twinkleSpeed: Math.random() * 0.02 + 0.01,
        });
      }
    };

    // Draw stars
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      stars.current.forEach(star => {
        // Update position with slight movement
        star.x += star.vx;
        star.y += star.vy;
        
        // Wrap around edges
        if (star.x < 0) star.x = canvas.width;
        if (star.x > canvas.width) star.x = 0;
        if (star.y < 0) star.y = canvas.height;
        if (star.y > canvas.height) star.y = 0;
        
        // Twinkle effect
        if (Math.abs(star.alpha - star.targetAlpha) < 0.01) {
          star.targetAlpha = Math.random();
        }
        star.alpha += (star.targetAlpha - star.alpha) * star.twinkleSpeed;
        
        // Draw star
        ctx.beginPath();
        const gradient = ctx.createRadialGradient(
          star.x, star.y, 0,
          star.x, star.y, star.radius * 2
        );
        
        gradient.addColorStop(0, `rgba(255, 255, 255, ${star.alpha})`);
        gradient.addColorStop(0.5, `rgba(255, 255, 200, ${star.alpha * 0.7})`);
        gradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = gradient;
        ctx.arc(star.x, star.y, star.radius * 2, 0, Math.PI * 2);
        ctx.fill();
      });
      
      requestAnimationFrame(draw);
    };

    // Handle window resize
    window.addEventListener('resize', () => {
      resizeCanvas();
      initStars(25); // Further reduced to 25 stars
    });

    // Initialize
    resizeCanvas();
    initStars(25); // Further reduced to 25 stars
    draw();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        pointerEvents: 'none',
      }}
    />
  );
};

export default StarsBackground;
