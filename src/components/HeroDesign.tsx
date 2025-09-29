import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

interface HeroDesignProps {
  className?: string;
}

const HeroDesign: React.FC<HeroDesignProps> = ({ className = '' }) => {
  // Calculate grid dimensions
  const gridSize = 50;
  const [gridWidth, setGridWidth] = React.useState(0);
  const [gridHeight, setGridHeight] = React.useState(0);
  
  // Refs for GSAP animations
  const svgRef = useRef<SVGSVGElement>(null);
  const linesRef = useRef<SVGLineElement[]>([]);
  const circleRef = useRef<SVGCircleElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const updateDimensions = () => {
      setGridWidth(window.innerWidth);
      setGridHeight(window.innerHeight);
    };
    
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // GSAP Animations
  useEffect(() => {
    if (!svgRef.current || linesRef.current.length === 0) return;

    const tl = gsap.timeline({ delay: 0.5 });
    
    // Set initial states
    gsap.set(linesRef.current, { 
      strokeDasharray: "1000 1000",
      strokeDashoffset: 1000,
      opacity: 0
    });
    gsap.set(circleRef.current, { 
      scale: 0,
      opacity: 0
    });

    // Animate the red circle first
    tl.to(circleRef.current, {
      scale: 1,
      opacity: 1,
      duration: 0.8,
      ease: "back.out(1.7)"
    });

    // Animate lines in waves
    const lineGroups = [
      linesRef.current.slice(0, 10),   // First wave
      linesRef.current.slice(10, 20),  // Second wave
      linesRef.current.slice(20, 30),  // Third wave
      linesRef.current.slice(30, 40),  // Fourth wave
      linesRef.current.slice(40, 50),  // Fifth wave
    ];

    lineGroups.forEach((group, index) => {
      tl.to(group, {
        strokeDashoffset: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power2.out",
        stagger: {
          amount: 0.3,
          from: "start"
        }
      }, index * 0.2);
    });

    // Remove floating and rotation animations - keep design static after initial load

    // Scroll-triggered animations
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top center",
      end: "bottom center",
      onEnter: () => {
        gsap.to(linesRef.current, {
          strokeWidth: 3,
          duration: 0.5,
          stagger: 0.02
        });
      },
      onLeave: () => {
        gsap.to(linesRef.current, {
          strokeWidth: 2,
          duration: 0.5,
          stagger: 0.02
        });
      }
    });

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [gridWidth, gridHeight]);

  const xLabels = [];
  const yLabels = [];

  // Generate X-axis labels (top and bottom)
  for (let x = 0; x <= gridWidth; x += gridSize) {
    xLabels.push(
      <text
        key={`x-top-${x}`}
        x={x}
        y={15}
        textAnchor="middle"
        fontSize="12"
        fill="#666"
        className="font-mono"
      >
        {x}
      </text>
    );
    xLabels.push(
      <text
        key={`x-bottom-${x}`}
        x={x}
        y={gridHeight - 5}
        textAnchor="middle"
        fontSize="12"
        fill="#666"
        className="font-mono"
      >
        {x}
      </text>
    );
  }

  // Generate Y-axis labels (left and right)
  for (let y = 0; y <= gridHeight; y += gridSize) {
    yLabels.push(
      <text
        key={`y-left-${y}`}
        x={5}
        y={y + 4}
        textAnchor="start"
        fontSize="12"
        fill="#666"
        className="font-mono"
      >
        {y}
      </text>
    );
    yLabels.push(
      <text
        key={`y-right-${y}`}
        x={gridWidth - 5}
        y={y + 4}
        textAnchor="end"
        fontSize="12"
        fill="#666"
        className="font-mono"
      >
        {y}
      </text>
    );
  }

  // Add hover effects
  const handleLineHover = (index: number) => {
    gsap.to(linesRef.current[index], {
      strokeWidth: 4,
      stroke: "#ef4444",
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const handleLineLeave = (index: number) => {
    gsap.to(linesRef.current[index], {
      strokeWidth: 2,
      stroke: "black",
      duration: 0.3,
      ease: "power2.out"
    });
  };

  return (
    <div ref={containerRef} className={`absolute inset-0 w-full h-full ${className}`}>
      {/* Grid of lines */}
      <svg
        ref={svgRef}
        className="w-full h-full cursor-pointer"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1920 1000"
        preserveAspectRatio="xMidYMid meet"
      >
        <g transform="scale(1) translate(0, 0)">
        {/* Vertical lines */}
        {/* <defs>
          <pattern
            id="verticalGrid"
            width="50"
            height="50"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 50 0 L 50 50"
              stroke="#d1d5db"
              strokeWidth="1"
              fill="none"
            />
          </pattern>
          <pattern
            id="horizontalGrid"
            width="50"
            height="50"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 0 50 L 50 50"
              stroke="#d1d5db"
              strokeWidth="1"
              fill="none"
            />
          </pattern>
        </defs> */}
        
        {/* Apply the grid patterns */}
        {/* <rect
          width="100%"
          height="100%"
          fill="url(#verticalGrid)"
        />
        <rect
          width="100%"
          height="100%"
          fill="url(#horizontalGrid)"
        /> */}
        
        {/* Dot at (0,0) */}
        <circle
          ref={circleRef}
          cx="0"
          cy="0"
          r="3"
          fill="#ef4444"
          className="cursor-pointer"
          onMouseEnter={() => {
            gsap.to(circleRef.current, {
              scale: 1.5,
              duration: 0.3,
              ease: "power2.out"
            });
          }}
          onMouseLeave={() => {
            gsap.to(circleRef.current, {
              scale: 1,
              duration: 0.3,
              ease: "power2.out"
            });
          }}
        />
        
        {/* Line 1 - Down-Left Diagonal: A(1920, 127) to B(1100, 620) */}
        <line
          ref={(el) => { if (el) linesRef.current[0] = el; }}
          x1="1920"
          y1="127"
          x2="1100"
          y2="620"
          stroke="black"
          strokeWidth="2"
          className="cursor-pointer transition-all duration-300"
          onMouseEnter={() => handleLineHover(0)}
          onMouseLeave={() => handleLineLeave(0)}
        />
        
        {/* Line 2 - Down-Left Diagonal: A(1500, 260) to B(1000, 560) */}
        <line
          ref={(el) => { if (el) linesRef.current[1] = el; }}
          x1="1500"
          y1="260"
          x2="1000"
          y2="560"
          stroke="black"
          strokeWidth="2"
          className="cursor-pointer transition-all duration-300"
          onMouseEnter={() => handleLineHover(1)}
          onMouseLeave={() => handleLineLeave(1)}
        />
        
        {/* Line 3 - Down-Left Diagonal: A(1500, 140) to B(1300, 260) */}
        <line
          ref={(el) => { if (el) linesRef.current[2] = el; }}
          x1="1500"
          y1="140"
          x2="1300"
          y2="260"
          stroke="black"
          strokeWidth="2"
          className="cursor-pointer transition-all duration-300"
          onMouseEnter={() => handleLineHover(2)}
          onMouseLeave={() => handleLineLeave(2)}
        />
        
        {/* Line 4 - Down-Left Diagonal: A(1200, 320) to B(900, 500) */}
        <line
          ref={(el) => { if (el) linesRef.current[3] = el; }}
          x1="1200"
          y1="320"
          x2="900"
          y2="500"
          stroke="black"
          strokeWidth="2"
          className="cursor-pointer transition-all duration-300"
          onMouseEnter={() => handleLineHover(3)}
          onMouseLeave={() => handleLineLeave(3)}
        />
        
        {/* Line 5 - Down-Left Diagonal: A(1201, 199) to B(900, 380) */}
        <line
          ref={(el) => { if (el) linesRef.current[4] = el; }}
          x1="1201"
          y1="199"
          x2="900"
          y2="380"
          stroke="black"
          strokeWidth="2"
          className="cursor-pointer transition-all duration-300"
          onMouseEnter={() => handleLineHover(4)}
          onMouseLeave={() => handleLineLeave(4)}
        />
        
        {/* Line 6 - Down-Left Diagonal: A(1800, 320) to B(1400, 560) */}
        <line
          ref={(el) => { if (el) linesRef.current[5] = el; }}
          x1="1800"
          y1="320"
          x2="1400"
          y2="560"
          stroke="black"
          strokeWidth="2"
          className="cursor-pointer transition-all duration-300"
          onMouseEnter={() => handleLineHover(5)}
          onMouseLeave={() => handleLineLeave(5)}
        />
        
        {/* Line 7 - Down-Left Diagonal: A(1300, 620) to B(1025, 784) */}
        <line
          ref={(el) => { if (el) linesRef.current[6] = el; }}
          x1="1300"
          y1="620"
          x2="1025"
          y2="784"
          stroke="black"
          strokeWidth="2"
          className="cursor-pointer transition-all duration-300"
          onMouseEnter={() => handleLineHover(6)}
          onMouseLeave={() => handleLineLeave(6)}
        />
        
        {/* Line 8 - Down-Left Diagonal: A(1700, 500) to B(1400, 680) */}
        <line
          ref={(el) => { if (el) linesRef.current[7] = el; }}
          x1="1700"
          y1="500"
          x2="1400"
          y2="680"
          stroke="black"
          strokeWidth="2"
          className="cursor-pointer transition-all duration-300"
          onMouseEnter={() => handleLineHover(7)}
          onMouseLeave={() => handleLineLeave(7)}
        />
        
        {/* Line 9 - Down-Left Diagonal: A(1700, 620) to B(1357, 826) */}
        <line
          ref={(el) => { if (el) linesRef.current[8] = el; }}
          x1="1700"
          y1="620"
          x2="1357"
          y2="826"
          stroke="black"
          strokeWidth="2"
          className="cursor-pointer transition-all duration-300"
          onMouseEnter={() => handleLineHover(8)}
          onMouseLeave={() => handleLineLeave(8)}
        />
        
        {/* Line 10 - Down-Right Diagonal: A(1700, 260) to B(1920, 392) */}
        <line
          ref={(el) => { if (el) linesRef.current[9] = el; }}
          x1="1700"
          y1="260"
          x2="1920"
          y2="392"
          stroke="black"
          strokeWidth="2"
          className="cursor-pointer transition-all duration-300"
          onMouseEnter={() => handleLineHover(9)}
          onMouseLeave={() => handleLineLeave(9)}
        />
        
        {/* Line 11 - Down-Right Diagonal: A(1600, 320) to B(1698, 379) */}
        <line
          ref={(el) => { if (el) linesRef.current[10] = el; }}
          x1="1600"
          y1="320"
          x2="1698"
          y2="379"
          stroke="black"
          strokeWidth="2"
          className="cursor-pointer transition-all duration-300"
          onMouseEnter={() => handleLineHover(10)}
          onMouseLeave={() => handleLineLeave(10)}
        />
        
        {/* Line 12 - Down-Right Diagonal: A(1400, 200) to B(1500, 260) */}
        <line
          ref={(el) => { if (el) linesRef.current[11] = el; }}
          x1="1400"
          y1="200"
          x2="1500"
          y2="260"
          stroke="black"
          strokeWidth="2"
          className="cursor-pointer transition-all duration-300"
          onMouseEnter={() => handleLineHover(11)}
          onMouseLeave={() => handleLineLeave(11)}
        />
        
        {/* Line 13 - Down-Right Diagonal: A(1400, 320) to B(1920, 632) */}
        <line
          ref={(el) => { if (el) linesRef.current[12] = el; }}
          x1="1400"
          y1="320"
          x2="1920"
          y2="632"
          stroke="black"
          strokeWidth="2"
          className="cursor-pointer transition-all duration-300"
          onMouseEnter={() => handleLineHover(12)}
          onMouseLeave={() => handleLineLeave(12)}
        />
        
        {/* Line 14 - Down-Right Diagonal: A(1100, 260) to B(1800, 680) */}
        <line
          ref={(el) => { if (el) linesRef.current[13] = el; }}
          x1="1100"
          y1="260"
          x2="1800"
          y2="680"
          stroke="black"
          strokeWidth="2"
          className="cursor-pointer transition-all duration-300"
          onMouseEnter={() => handleLineHover(13)}
          onMouseLeave={() => handleLineLeave(13)}
        />
        
        {/* Line 15 - Down-Right Diagonal: A(1000, 320) to B(1300, 500) */}
        <line
          ref={(el) => { if (el) linesRef.current[14] = el; }}
          x1="1000"
          y1="320"
          x2="1300"
          y2="500"
          stroke="black"
          strokeWidth="2"
          className="cursor-pointer transition-all duration-300"
          onMouseEnter={() => handleLineHover(14)}
          onMouseLeave={() => handleLineLeave(14)}
        />
        
        {/* Line 16 - Down-Right Diagonal: A(1400, 560) to B(1600, 680) */}
        <line
          ref={(el) => { if (el) linesRef.current[15] = el; }}
          x1="1400"
          y1="560"
          x2="1600"
          y2="680"
          stroke="black"
          strokeWidth="2"
          className="cursor-pointer transition-all duration-300"
          onMouseEnter={() => handleLineHover(15)}
          onMouseLeave={() => handleLineLeave(15)}
        />
        
        {/* Line 17 - Down-Right Diagonal: A(1000, 440) to B(1500, 740) */}
        <line
          ref={(el) => { if (el) linesRef.current[16] = el; }}
          x1="1000"
          y1="440"
          x2="1500"
          y2="740"
          stroke="black"
          strokeWidth="2"
          className="cursor-pointer transition-all duration-300"
          onMouseEnter={() => handleLineHover(16)}
          onMouseLeave={() => handleLineLeave(16)}
        />
        
        {/* Line 18: A(1000, 440) to B(1000, 560) - Vertical */}
        <line
          ref={(el) => { if (el) linesRef.current[17] = el; }}
          x1="1000"
          y1="440"
          x2="1000"
          y2="560"
          stroke="black"
          strokeWidth="2"
          className="cursor-pointer transition-all duration-300"
          onMouseEnter={() => handleLineHover(17)}
          onMouseLeave={() => handleLineLeave(17)}
        />
        
        {/* Line 19: A(1100, 260) to B(1100, 740) - Vertical */}
        <line
          ref={(el) => { if (el) linesRef.current[18] = el; }}
          x1="1100"
          y1="260"
          x2="1100"
          y2="740"
          stroke="black"
          strokeWidth="2"
          className="cursor-pointer transition-all duration-300"
          onMouseEnter={() => handleLineHover(18)}
          onMouseLeave={() => handleLineLeave(18)}
        />
        
        {/* Line 20: A(1200, 320) to B(1200, 800) - Vertical */}
        <line
          ref={(el) => { if (el) linesRef.current[19] = el; }}
          x1="1200"
          y1="320"
          x2="1200"
          y2="800"
          stroke="black"
          strokeWidth="2"
          className="cursor-pointer transition-all duration-300"
          onMouseEnter={() => handleLineHover(19)}
          onMouseLeave={() => handleLineLeave(19)}
        />
        
        {/* Line 21: A(1300, 260) to B(1300, 740) - Vertical */}
        <line
          ref={(el) => { if (el) linesRef.current[20] = el; }}
          x1="1300"
          y1="260"
          x2="1300"
          y2="740"
          stroke="black"
          strokeWidth="2"
          className="cursor-pointer transition-all duration-300"
          onMouseEnter={() => handleLineHover(20)}
          onMouseLeave={() => handleLineLeave(20)}
        />
        
        {/* Line 22: A(1400, 200) to B(1400, 897) - Vertical */}
        <line
          ref={(el) => { if (el) linesRef.current[21] = el; }}
          x1="1400"
          y1="200"
          x2="1400"
          y2="897"
          stroke="black"
          strokeWidth="2"
          className="cursor-pointer transition-all duration-300"
          onMouseEnter={() => handleLineHover(21)}
          onMouseLeave={() => handleLineLeave(21)}
        />
        
        {/* Line 23: A(1500, 260) to B(1500, 740) - Vertical */}
        <line
          ref={(el) => { if (el) linesRef.current[22] = el; }}
          x1="1500"
          y1="260"
          x2="1500"
          y2="740"
          stroke="black"
          strokeWidth="2"
          className="cursor-pointer transition-all duration-300"
          onMouseEnter={() => handleLineHover(22)}
          onMouseLeave={() => handleLineLeave(22)}
        />
        
        {/* Line 24: A(1600, 207) to B(1600, 440) - Vertical */}
        <line
          ref={(el) => { if (el) linesRef.current[23] = el; }}
          x1="1600"
          y1="207"
          x2="1600"
          y2="440"
          stroke="black"
          strokeWidth="2"
          className="cursor-pointer transition-all duration-300"
          onMouseEnter={() => handleLineHover(23)}
          onMouseLeave={() => handleLineLeave(23)}
        />
        
        {/* Line 25: A(1700, 260) to B(1700, 855) - Vertical */}
        <line
          ref={(el) => { if (el) linesRef.current[24] = el; }}
          x1="1700"
          y1="260"
          x2="1700"
          y2="855"
          stroke="black"
          strokeWidth="2"
          className="cursor-pointer transition-all duration-300"
          onMouseEnter={() => handleLineHover(24)}
          onMouseLeave={() => handleLineLeave(24)}
        />
        
        {/* Line 26 - Horizontal: A(1000, 320) to B(1065, 320) */}
        <line
          ref={(el) => { if (el) linesRef.current[25] = el; }}
          x1="1000"
          y1="320"
          x2="1065"
          y2="320"
          stroke="black"
          strokeWidth="2"
          className="cursor-pointer transition-all duration-300"
          onMouseEnter={() => handleLineHover(25)}
          onMouseLeave={() => handleLineLeave(25)}
        />
        
        {/* Line 27 - Down-Right Diagonal: A(1065, 320) to B(1100, 380) */}
        <line
          ref={(el) => { if (el) linesRef.current[26] = el; }}
          x1="1065"
          y1="320"
          x2="1100"
          y2="380"
          stroke="black"
          strokeWidth="2"
          className="cursor-pointer transition-all duration-300"
          onMouseEnter={() => handleLineHover(26)}
          onMouseLeave={() => handleLineLeave(26)}
        />
        
        {/* Line 28 - Up-Right Diagonal: A(1065, 320) to B(1100, 260) */}
        <line
          ref={(el) => { if (el) linesRef.current[27] = el; }}
          x1="1065"
          y1="320"
          x2="1100"
          y2="260"
          stroke="black"
          strokeWidth="2"
          className="cursor-pointer transition-all duration-300"
          onMouseEnter={() => handleLineHover(27)}
          onMouseLeave={() => handleLineLeave(27)}
        />
        
        {/* Line 29 - Down-Right Diagonal: A(1200, 320) to B(1234, 380) */}
        <line
          ref={(el) => { if (el) linesRef.current[28] = el; }}
          x1="1200"
          y1="320"
          x2="1234"
          y2="380"
          stroke="black"
          strokeWidth="2"
          className="cursor-pointer transition-all duration-300"
          onMouseEnter={() => handleLineHover(28)}
          onMouseLeave={() => handleLineLeave(28)}
        />
        
        {/* Line 30 - Down-Left Diagonal: A(1234, 380) to B(1200, 440) */}
        <line
          ref={(el) => { if (el) linesRef.current[29] = el; }}
          x1="1234"
          y1="380"
          x2="1200"
          y2="440"
          stroke="black"
          strokeWidth="2"
          className="cursor-pointer transition-all duration-300"
          onMouseEnter={() => handleLineHover(29)}
          onMouseLeave={() => handleLineLeave(29)}
        />
        
        {/* Line 31 - Horizontal: A(1234, 380) to B(1300, 380) */}
        <line
          ref={(el) => { if (el) linesRef.current[30] = el; }}
          x1="1234"
          y1="380"
          x2="1300"
          y2="380"
          stroke="black"
          strokeWidth="2"
          className="cursor-pointer transition-all duration-300"
          onMouseEnter={() => handleLineHover(30)}
          onMouseLeave={() => handleLineLeave(30)}
        />
        
        {/* Line 32 - Down-Right Diagonal: A(1000, 440) to B(1034, 500) */}
        <line
          ref={(el) => { if (el) linesRef.current[31] = el; }}
          x1="1000"
          y1="440"
          x2="1034"
          y2="500"
          stroke="black"
          strokeWidth="2"
          className="cursor-pointer transition-all duration-300"
          onMouseEnter={() => handleLineHover(31)}
          onMouseLeave={() => handleLineLeave(31)}
        />
        
        {/* Line 33 - Down-Left Diagonal: A(1034, 500) to B(1000, 560) */}
        <line
          ref={(el) => { if (el) linesRef.current[32] = el; }}
          x1="1034"
          y1="500"
          x2="1000"
          y2="560"
          stroke="black"
          strokeWidth="2"
          className="cursor-pointer transition-all duration-300"
          onMouseEnter={() => handleLineHover(32)}
          onMouseLeave={() => handleLineLeave(32)}
        />
        
        {/* Line 34 - Horizontal: A(1034, 500) to B(1100, 500) */}
        <line
          ref={(el) => { if (el) linesRef.current[33] = el; }}
          x1="1034"
          y1="500"
          x2="1100"
          y2="500"
          stroke="black"
          strokeWidth="2"
          className="cursor-pointer transition-all duration-300"
          onMouseEnter={() => handleLineHover(33)}
          onMouseLeave={() => handleLineLeave(33)}
        />
        
        {/* Line 35 - Horizontal: A(1100, 620) to B(1165, 620) */}
        <line
          ref={(el) => { if (el) linesRef.current[34] = el; }}
          x1="1100"
          y1="620"
          x2="1165"
          y2="620"
          stroke="black"
          strokeWidth="2"
          className="cursor-pointer transition-all duration-300"
          onMouseEnter={() => handleLineHover(34)}
          onMouseLeave={() => handleLineLeave(34)}
        />
        
        {/* Line 36 - Up-Right Diagonal: A(1165, 620) to B(1200, 560) */}
        <line
          ref={(el) => { if (el) linesRef.current[35] = el; }}
          x1="1165"
          y1="620"
          x2="1200"
          y2="560"
          stroke="black"
          strokeWidth="2"
          className="cursor-pointer transition-all duration-300"
          onMouseEnter={() => handleLineHover(35)}
          onMouseLeave={() => handleLineLeave(35)}
        />
        
        {/* Line 37 - Down-Right Diagonal: A(1165, 620) to B(1200, 680) */}
        <line
          ref={(el) => { if (el) linesRef.current[36] = el; }}
          x1="1165"
          y1="620"
          x2="1200"
          y2="680"
          stroke="black"
          strokeWidth="2"
          className="cursor-pointer transition-all duration-300"
          onMouseEnter={() => handleLineHover(36)}
          onMouseLeave={() => handleLineLeave(36)}
        />
        
        {/* Line 38 - Down-Right Diagonal: A(1100, 620) to B(1200, 680) */}
        <line
          ref={(el) => { if (el) linesRef.current[37] = el; }}
          x1="1100"
          y1="620"
          x2="1200"
          y2="680"
          stroke="black"
          strokeWidth="2"
          className="cursor-pointer transition-all duration-300"
          onMouseEnter={() => handleLineHover(37)}
          onMouseLeave={() => handleLineLeave(37)}
        />
        
        {/* Line 39 - Horizontal: A(1400, 680) to B(1465, 680) */}
        <line
          ref={(el) => { if (el) linesRef.current[38] = el; }}
          x1="1400"
          y1="680"
          x2="1465"
          y2="680"
          stroke="black"
          strokeWidth="2"
          className="cursor-pointer transition-all duration-300"
          onMouseEnter={() => handleLineHover(38)}
          onMouseLeave={() => handleLineLeave(38)}
        />
        
        {/* Line 40 - Up-Right Diagonal: A(1465, 680) to B(1500, 620) */}
        <line
          ref={(el) => { if (el) linesRef.current[39] = el; }}
          x1="1465"
          y1="680"
          x2="1500"
          y2="620"
          stroke="black"
          strokeWidth="2"
          className="cursor-pointer transition-all duration-300"
          onMouseEnter={() => handleLineHover(39)}
          onMouseLeave={() => handleLineLeave(39)}
        />
        
        {/* Line 41 - Down-Right Diagonal: A(1465, 680) to B(1500, 740) */}
        <line
          ref={(el) => { if (el) linesRef.current[40] = el; }}
          x1="1465"
          y1="680"
          x2="1500"
          y2="740"
          stroke="black"
          strokeWidth="2"
          className="cursor-pointer transition-all duration-300"
          onMouseEnter={() => handleLineHover(40)}
          onMouseLeave={() => handleLineLeave(40)}
        />
        
        {/* Line 42 - Down-Right Diagonal: A(1400, 440) to B(1434, 500) */}
        <line
          ref={(el) => { if (el) linesRef.current[41] = el; }}
          x1="1400"
          y1="440"
          x2="1434"
          y2="500"
          stroke="black"
          strokeWidth="2"
          className="cursor-pointer transition-all duration-300"
          onMouseEnter={() => handleLineHover(41)}
          onMouseLeave={() => handleLineLeave(41)}
        />
        
        {/* Line 43 - Horizontal: A(1434, 500) to B(1500, 500) */}
        <line
          ref={(el) => { if (el) linesRef.current[42] = el; }}
          x1="1434"
          y1="500"
          x2="1500"
          y2="500"
          stroke="black"
          strokeWidth="2"
          className="cursor-pointer transition-all duration-300"
          onMouseEnter={() => handleLineHover(42)}
          onMouseLeave={() => handleLineLeave(42)}
        />
        
        {/* Line 44 - Down-Left Diagonal: A(1434, 500) to B(1400, 560) */}
        <line
          ref={(el) => { if (el) linesRef.current[43] = el; }}
          x1="1434"
          y1="500"
          x2="1400"
          y2="560"
          stroke="black"
          strokeWidth="2"
          className="cursor-pointer transition-all duration-300"
          onMouseEnter={() => handleLineHover(43)}
          onMouseLeave={() => handleLineLeave(43)}
        />
        
        {/* Line 45 - Down-Right Diagonal: A(1400, 200) to B(1434, 260) */}
        <line
          ref={(el) => { if (el) linesRef.current[44] = el; }}
          x1="1400"
          y1="200"
          x2="1434"
          y2="260"
          stroke="black"
          strokeWidth="2"
          className="cursor-pointer transition-all duration-300"
          onMouseEnter={() => handleLineHover(44)}
          onMouseLeave={() => handleLineLeave(44)}
        />
        
        {/* Line 46 - Down-Left Diagonal: A(1434, 260) to B(1400, 320) */}
        <line
          ref={(el) => { if (el) linesRef.current[45] = el; }}
          x1="1434"
          y1="260"
          x2="1400"
          y2="320"
          stroke="black"
          strokeWidth="2"
          className="cursor-pointer transition-all duration-300"
          onMouseEnter={() => handleLineHover(45)}
          onMouseLeave={() => handleLineLeave(45)}
        />
        
        {/* Line 47 - Horizontal: A(1434, 260) to B(1500, 260) */}
        <line
          ref={(el) => { if (el) linesRef.current[46] = el; }}
          x1="1434"
          y1="260"
          x2="1500"
          y2="260"
          stroke="black"
          strokeWidth="2"
          className="cursor-pointer transition-all duration-300"
          onMouseEnter={() => handleLineHover(46)}
          onMouseLeave={() => handleLineLeave(46)}
        />
        
        {/* Line 48 - Horizontal: A(1600, 320) to B(1665, 320) */}
        <line
          ref={(el) => { if (el) linesRef.current[47] = el; }}
          x1="1600"
          y1="320"
          x2="1665"
          y2="320"
          stroke="black"
          strokeWidth="2"
          className="cursor-pointer transition-all duration-300"
          onMouseEnter={() => handleLineHover(47)}
          onMouseLeave={() => handleLineLeave(47)}
        />
        
        {/* Line 49 - Down-Left Diagonal: A(1700, 260) to B(1665, 320) */}
        <line
          ref={(el) => { if (el) linesRef.current[48] = el; }}
          x1="1700"
          y1="260"
          x2="1665"
          y2="320"
          stroke="black"
          strokeWidth="2"
          className="cursor-pointer transition-all duration-300"
          onMouseEnter={() => handleLineHover(48)}
          onMouseLeave={() => handleLineLeave(48)}
        />
        
        {/* Line 50 - Down-Right Diagonal: A(1665, 320) to B(1698, 379) */}
        <line
          ref={(el) => { if (el) linesRef.current[49] = el; }}
          x1="1665"
          y1="320"
          x2="1698"
          y2="379"
          stroke="black"
          strokeWidth="2"
          className="cursor-pointer transition-all duration-300"
          onMouseEnter={() => handleLineHover(49)}
          onMouseLeave={() => handleLineLeave(49)}
        />
        
        {/* Line 51 - Horizontal: A(1600, 560) to B(1665, 560) */}
        <line
          ref={(el) => { if (el) linesRef.current[50] = el; }}
          x1="1600"
          y1="560"
          x2="1665"
          y2="560"
          stroke="black"
          strokeWidth="2"
          className="cursor-pointer transition-all duration-300"
          onMouseEnter={() => handleLineHover(50)}
          onMouseLeave={() => handleLineLeave(50)}
        />
        
        {/* Line 52 - Up-Right Diagonal: A(1665, 560) to B(1700, 500) */}
        <line
          ref={(el) => { if (el) linesRef.current[51] = el; }}
          x1="1665"
          y1="560"
          x2="1700"
          y2="500"
          stroke="black"
          strokeWidth="2"
          className="cursor-pointer transition-all duration-300"
          onMouseEnter={() => handleLineHover(51)}
          onMouseLeave={() => handleLineLeave(51)}
        />
        
        {/* Line 53 - Down-Right Diagonal: A(1665, 560) to B(1700, 620) */}
        <line
          ref={(el) => { if (el) linesRef.current[52] = el; }}
          x1="1665"
          y1="560"
          x2="1700"
          y2="620"
          stroke="black"
          strokeWidth="2"
          className="cursor-pointer transition-all duration-300"
          onMouseEnter={() => handleLineHover(52)}
          onMouseLeave={() => handleLineLeave(52)}
        />
        
        {/* Coordinate labels */}
        {/* {xLabels}
        {yLabels} */}
        </g>
      </svg>
    </div>
  );
};

export default HeroDesign;
