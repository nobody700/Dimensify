import React, { useEffect, useMemo, useRef } from 'react';
import { useWindowSize } from 'react-use';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  opacity: number;
}

const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const { width, height } = useWindowSize();
  const animationRef = useRef<number>(0);

  // Generate colors for particles
  const colors = useMemo(() => [
    'rgba(80, 106, 237, 0.7)',  // primary
    'rgba(57, 182, 212, 0.7)',   // secondary
    'rgba(229, 80, 168, 0.7)',   // accent
  ], []);

  // Initialize particles
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const particleCount = Math.min(Math.floor((width * height) / 25000), 80);
    const particles: Particle[] = [];
    
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.5 + 0.5,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: Math.random() * 0.5 + 0.2
      });
    }
    
    particlesRef.current = particles;

    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, [width, height, colors]);

  // Animation loop
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    canvas.width = width;
    canvas.height = height;
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particlesRef.current.forEach(particle => {
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Handle edge cases
        if (particle.x < 0 || particle.x > width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > height) particle.speedY *= -1;
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color.replace('0.7', `${particle.opacity}`);
        ctx.fill();
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, [width, height]);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 z-0 pointer-events-none opacity-40"
    />
  );
};

export default ParticleBackground;
