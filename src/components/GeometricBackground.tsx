import React, { useEffect, useRef } from 'react';

interface Line {
  id: number;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  opacity: number;
  color: 'black' | 'gray';
}

interface MovingDot {
  id: number;
  lineId: number;
  progress: number;
  speed: number;
  opacity: number;
}

const GeometricBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);
  const linesRef = useRef<Line[]>([]);
  const nodesRef = useRef<{ x: number; y: number }[]>([]);
  const movingDotsRef = useRef<MovingDot[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const generatePattern = () => {
      const width = canvas.width;
      const height = canvas.height;
      
      // Clear existing lines and nodes
      linesRef.current = [];
      nodesRef.current = [];
      movingDotsRef.current = [];
      
      // Create a grid of nodes concentrated on the right side
      const nodeSpacing = 40;
      const startX = width * 0.3; // Start from 30% of screen width
      const endX = width + 50; // Extend slightly beyond right edge
      
      // Generate nodes in a grid pattern
      for (let x = startX; x <= endX; x += nodeSpacing) {
        for (let y = 50; y <= height - 50; y += nodeSpacing) {
          // Add some randomness to node positions
          const randomX = x + (Math.random() - 0.5) * 20;
          const randomY = y + (Math.random() - 0.5) * 20;
          
          // Higher density on the right side
          const density = Math.max(0.3, (x - startX) / (endX - startX));
          if (Math.random() < density) {
            nodesRef.current.push({ x: randomX, y: randomY });
          }
        }
      }
      
      // Connect nodes to create triangular and polygonal patterns
      nodesRef.current.forEach((node1, index1) => {
        nodesRef.current.slice(index1 + 1).forEach((node2, index2) => {
          const distance = Math.sqrt(
            Math.pow(node1.x - node2.x, 2) + Math.pow(node1.y - node2.y, 2)
          );
          
          // Connect nodes that are close to each other (reduced probability from 0.7 to 0.5)
          if (distance < nodeSpacing * 1.5 && Math.random() < 0.5) {
            // Calculate opacity based on position (fade towards left)
            const centerX = (node1.x + node2.x) / 2;
            const fadeFactor = Math.max(0.1, (centerX - startX) / (endX - startX));
            
            const newLine = {
              id: linesRef.current.length,
              x1: node1.x,
              y1: node1.y,
              x2: node2.x,
              y2: node2.y,
              opacity: fadeFactor,
              color: (Math.random() < 0.8 ? 'black' : 'gray') as 'black' | 'gray'
            };
            
            linesRef.current.push(newLine);
            
            // Add a moving dot to only some lines (30% chance)
            if (Math.random() < 0.3) {
              movingDotsRef.current.push({
                id: Math.random(),
                lineId: newLine.id,
                progress: Math.random(), // Random starting position
                speed: 0.005 + Math.random() * 0.01, // Random speed
                opacity: fadeFactor
              });
            }
          }
        });
      });
    };

    const animate = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw all lines
      linesRef.current.forEach(line => {
        const alpha = line.opacity;
        const color = line.color === 'black' ? `rgba(0, 0, 0, ${alpha})` : `rgba(75, 75, 75, ${alpha * 0.7})`;
        
        ctx.strokeStyle = color;
        ctx.lineWidth = 1;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(line.x1, line.y1);
        ctx.lineTo(line.x2, line.y2);
        ctx.stroke();
      });

      // Draw nodes at line intersections
      nodesRef.current.forEach(node => {
        const centerX = node.x;
        const centerY = node.y;
        
        // Calculate opacity based on position (fade towards left)
        const width = canvas.width;
        const startX = width * 0.3;
        const endX = width + 50;
        const fadeFactor = Math.max(0.1, (centerX - startX) / (endX - startX));
        
        ctx.fillStyle = `rgba(0, 0, 0, ${fadeFactor * 0.8})`;
        ctx.beginPath();
        ctx.arc(centerX, centerY, 1.5, 0, 2 * Math.PI);
        ctx.fill();
      });

      // Update and draw moving dots
      movingDotsRef.current.forEach((dot, index) => {
        const line = linesRef.current.find(l => l.id === dot.lineId);
        if (!line) return;

        // Update dot position
        dot.progress += dot.speed;
        
        // If dot reaches the end, reset to beginning
        if (dot.progress >= 1) {
          dot.progress = 0;
        }

        // Calculate dot position along the line
        const x = line.x1 + (line.x2 - line.x1) * dot.progress;
        const y = line.y1 + (line.y2 - line.y1) * dot.progress;

        // Draw the moving dot
        ctx.fillStyle = `rgba(0, 0, 0, ${dot.opacity * 0.9})`;
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, 2 * Math.PI);
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    // Generate initial pattern once
    generatePattern();
    
    // Start animation
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: 'transparent' }}
    />
  );
};

export default GeometricBackground;
