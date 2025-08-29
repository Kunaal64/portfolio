"use client";

import { useEffect, useRef, useState } from 'react';

interface Position {
  x: number;
  y: number;
}

interface Rotation {
  x: number;
  y: number;
  z: number;
}

const Firefly = () => {
  const [opacity, setOpacity] = useState(1);
  const fireflyRef = useRef<HTMLDivElement>(null);
  const lastMoveTime = useRef(0);
  const animationFrameId = useRef<number>();
  const targetPosition = useRef<Position>({ x: 0, y: 0 });
  const currentPosition = useRef<Position>({ x: 0, y: 0 });
  const velocity = useRef<Position>({ x: 0, y: 0 });
  const rotation = useRef<Rotation>({ x: 0, y: 0, z: 0 });

  // Handle mouse move with smooth acceleration and orientation
  useEffect(() => {
    let lastMouseX = 0;
    let lastMouseY = 0;
    let lastTimestamp = 0;
    
    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      const timeDiff = now - lastTimestamp;
      lastTimestamp = now;
      
      // Calculate movement direction based on cursor position
      const dx = e.clientX - (lastMouseX || e.clientX);
      const dy = e.clientY - (lastMouseY || e.clientY);
      lastMouseX = e.clientX;
      lastMouseY = e.clientY;
      
      // Calculate position with offset from the cursor
      const offsetDistance = 60; // Increased distance in pixels from cursor
      const angleToCursor = Math.atan2(
        e.clientY - (currentPosition.current.y || e.clientY),
        e.clientX - (currentPosition.current.x || e.clientX)
      );
      
      // Calculate offset position (behind the cursor)
      targetPosition.current = {
        x: e.clientX - Math.cos(angleToCursor) * offsetDistance,
        y: e.clientY - Math.sin(angleToCursor) * offsetDistance
      };
      
      // Calculate speed and direction of cursor movement
      const speed = Math.sqrt(dx * dx + dy * dy);
      
      if (speed > 0 && timeDiff > 0) {
        // Calculate angle of movement in radians
        const moveAngle = Math.atan2(dy, dx);
        
        // Update rotation based on movement direction
        // Convert to degrees and adjust for natural orientation
        const targetZRotation = -moveAngle * (180 / Math.PI);
        
        // Smoothly update rotation
        rotation.current = {
          x: Math.sin(moveAngle) * 15, // Tilt up/down based on vertical movement
          y: -Math.cos(moveAngle) * 15, // Tilt left/right based on horizontal movement
          z: targetZRotation // Rotate to face direction of movement
        };
        
        // Update firefly rotation immediately for more responsive feel
        const firefly = fireflyRef.current?.querySelector('.firefly') as HTMLElement;
        if (firefly) {
          firefly.style.transform = `
            rotateX(${rotation.current.x}deg)
            rotateY(${rotation.current.y}deg)
            rotateZ(${rotation.current.z}deg)
          `;
        }
      }
      
      // Trigger blink effect on significant movement
      if (speed > 5) {
        setOpacity(0.6);
        lastMoveTime.current = now;
        setTimeout(() => setOpacity(1), 200);
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  // Smooth movement with physics
  useEffect(() => {
    const updatePosition = () => {
      if (!fireflyRef.current) return;
      
      // Calculate direction vector
      const dx = targetPosition.current.x - currentPosition.current.x;
      const dy = targetPosition.current.y - currentPosition.current.y;
      
      // Smoothly update position with easing
      const targetVX = dx * 0.05;
      const targetVY = dy * 0.05;
      
      // Update velocity with damping
      velocity.current.x = (velocity.current.x + targetVX) * 0.8;
      velocity.current.y = (velocity.current.y + targetVY) * 0.8;
      
      // Add friction when moving slowly
      if (Math.abs(velocity.current.x) < 0.1) velocity.current.x *= 0.8;
      if (Math.abs(velocity.current.y) < 0.1) velocity.current.y *= 0.8;
      
      // Update current position
      currentPosition.current.x += velocity.current.x;
      currentPosition.current.y += velocity.current.y;
      
      // Apply position to element
      fireflyRef.current.style.left = `${currentPosition.current.x}px`;
      fireflyRef.current.style.top = `${currentPosition.current.y}px`;
      
      // Continue the animation loop
      animationFrameId.current = requestAnimationFrame(updatePosition);
    };
    
    // Start the animation loop
    animationFrameId.current = requestAnimationFrame(updatePosition);
    
    // Cleanup
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  return (
    <div
      ref={fireflyRef}
      className="firefly-container"
      style={{
        position: 'fixed',
        width: '32px',
        height: '32px',
        pointerEvents: 'none',
        zIndex: 9999,
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        transition: 'opacity 0.2s ease-in-out',
        opacity: opacity,
        perspective: '1000px',
      }}
    >
      <div className="firefly" style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        transformStyle: 'preserve-3d',
        transition: 'transform 0.2s cubic-bezier(0.25, 0.1, 0.25, 1)',
        transform: 'rotateX(0deg) rotateY(0deg)',
        willChange: 'transform',
        transformOrigin: 'center center',
        backfaceVisibility: 'hidden'
      }}>
        {/* Firefly body */}
        <div style={{
          position: 'absolute',
          width: '5px',
          height: '18px',
          background: 'linear-gradient(to bottom, var(--firefly-head, #2a2a2a) 0%, var(--firefly-body, #1a1a1a) 20%, var(--firefly-body, #1a1a1a) 80%, var(--firefly-glow, #fff8c2) 100%)',
          borderRadius: '3px',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%) translateZ(2px)',
          zIndex: 3,
          boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
          transition: 'all 0.2s ease-out',
        }} />
        
        {/* Head */}
        <div style={{
          position: 'absolute',
          width: '8px',
          height: '8px',
          backgroundColor: 'var(--firefly-head, #2a2a2a)',
          borderRadius: '50%',
          left: '50%',
          top: 'calc(50% - 10px)',
          transform: 'translateX(-50%) translateZ(2px)',
          zIndex: 4,
        }} />
        
        {/* Eyes */}
        <div style={{
          position: 'absolute',
          width: '3px',
          height: '3px',
          backgroundColor: 'var(--firefly-eye, #fff)',
          borderRadius: '50%',
          left: 'calc(50% - 1px)',
          top: 'calc(50% - 10px)',
          transform: 'translateX(-4px) translateZ(3px)',
          zIndex: 5,
        }} />
        <div style={{
          position: 'absolute',
          width: '3px',
          height: '3px',
          backgroundColor: 'var(--firefly-eye, #fff)',
          borderRadius: '50%',
          left: 'calc(50% - 1px)',
          top: 'calc(50% - 10px)',
          transform: 'translateX(2px) translateZ(3px)',
          zIndex: 5,
        }} />
        
        {/* Glowing abdomen */}
        <div style={{
          position: 'absolute',
          width: '9px',
          height: '12px',
          background: 'radial-gradient(ellipse at center, var(--firefly-glow, #fff8c2) 0%, var(--firefly-glow, #fff8c2) 30%, transparent 70%)',
          borderRadius: '50% 50% 30% 30%',
          left: '50%',
          top: 'calc(50% + 4px)',
          transform: 'translateX(-50%) translateZ(1px)',
          boxShadow: '0 0 15px 3px var(--firefly-glow, rgba(255, 248, 194, 0.8))',
          zIndex: 2,
          filter: 'blur(0.8px)',
          opacity: 0.9,
          transition: 'all 0.3s ease-out',
        }}>
          <div style={{
            position: 'absolute',
            width: '100%',
            height: '50%',
            background: 'var(--firefly-glow, #fff8c2)',
            borderRadius: '50% 50% 30% 30%',
            top: '25%',
            filter: 'blur(3px)',
            opacity: 0.7,
          }} />
        </div>
        
        {/* Wings */}
        <div style={{
          position: 'absolute',
          width: '28px',
          height: '20px',
          border: '1.5px solid var(--firefly-wing, rgba(0,0,0,0.15))',
          borderRadius: '50% 50% 0 0',
          left: '50%',
          top: 'calc(50% - 12px)',
          transform: 'translateX(-50%) rotate(45deg) translateZ(0.5px)',
          borderBottom: 'none',
          zIndex: 1,
          backgroundColor: 'var(--firefly-wing-bg, rgba(255,255,255,0.8))',
          backdropFilter: 'blur(1px)',
        }} />
        <div style={{
          position: 'absolute',
          width: '28px',
          height: '20px',
          border: '1.5px solid var(--firefly-wing, rgba(0,0,0,0.15))',
          borderRadius: '50% 50% 0 0',
          left: '50%',
          top: 'calc(50% - 12px)',
          transform: 'translateX(-50%) rotate(-45deg) translateZ(0.5px)',
          borderBottom: 'none',
          zIndex: 1,
          backgroundColor: 'var(--firefly-wing-bg, rgba(255,255,255,0.8))',
          backdropFilter: 'blur(1px)',
        }} />
        
        {/* Legs */}
        {[0, 1, 2].map((i) => (
          <div key={`leg-${i}`} style={{
            position: 'absolute',
            width: '8px',
            height: '2px',
            backgroundColor: 'var(--firefly-leg, #2a2a2a)',
            left: '50%',
            top: `calc(50% + ${i * 4 - 4}px)`,
            transform: `rotate(${i * 30 - 30}deg) translateX(-50%) translateZ(2px)`,
            transformOrigin: 'left center',
            zIndex: 2,
          }} />
        ))}
      </div>
      
      <style jsx global>{`
        :root {
          --firefly-body: #1a1a1a;
          --firefly-head: #2a2a2a;
          --firefly-eye: #fff;
          --firefly-glow: #fff8c2;
          --firefly-wing: rgba(0,0,0,0.15);
          --firefly-wing-bg: rgba(255,255,255,0.8);
          --firefly-leg: #2a2a2a;
        }
        
        @media (prefers-color-scheme: dark) {
          :root {
            --firefly-body: #2a2a2a;
            --firefly-head: #1a1a1a;
            --firefly-eye: #f0f0f0;
            --firefly-glow: #fff8a3;
            --firefly-wing: rgba(255,255,255,0.15);
            --firefly-wing-bg: rgba(30,30,30,0.2);
            --firefly-leg: #3a3a3a;
          }
          
          .firefly {
            filter: brightness(1.1) contrast(1.1);
          }
        }
        
        .firefly-container {
          transform-style: preserve-3d;
        }
        
        .firefly {
          animation: float 4s ease-in-out infinite;
          transform-style: preserve-3d;
          transition: transform 0.2s cubic-bezier(0.25, 0.1, 0.25, 1);
        }
        
        @keyframes float {
          0%, 100% { 
            transform: translateY(0) rotateX(0deg) rotateY(0deg);
            animation-timing-function: ease-in-out;
          }
          33% { 
            transform: translateY(-3px) rotateX(5deg) rotateY(2deg);
            animation-timing-function: ease-in-out;
          }
          66% { 
            transform: translateY(2px) rotateX(-3deg) rotateY(-1deg);
            animation-timing-function: ease-in-out;
          }
        }
      `}</style>
    </div>
  );
};

export default Firefly;
