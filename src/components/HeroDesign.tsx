import React from 'react';

interface HeroDesignProps {
  className?: string;
}

const HeroDesign: React.FC<HeroDesignProps> = ({ className = '' }) => {
  // Calculate grid dimensions
  const gridSize = 50;
  const [gridWidth, setGridWidth] = React.useState(0);
  const [gridHeight, setGridHeight] = React.useState(0);

  React.useEffect(() => {
    const updateDimensions = () => {
      setGridWidth(window.innerWidth);
      setGridHeight(window.innerHeight);
    };
    
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

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

  return (
    <div className={`absolute inset-0 w-full h-full ${className}`}>
      {/* Grid of lines */}
      <svg
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1920 1000"
        preserveAspectRatio="xMidYMid meet"
        style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh' }}
      >
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
          cx="0"
          cy="0"
          r="3"
          fill="#ef4444"
        />
        
        {/* Line 1 - Down-Left Diagonal: A(1920, 127) to B(1100, 620) */}
        <line
          x1="1920"
          y1="127"
          x2="1100"
          y2="620"
          stroke="#ef4444"
          strokeWidth="2"
        />
        
        {/* Line 2 - Down-Left Diagonal: A(1500, 260) to B(1000, 560) */}
        <line
          x1="1500"
          y1="260"
          x2="1000"
          y2="560"
          stroke="#ef4444"
          strokeWidth="2"
        />
        
        {/* Line 3 - Down-Left Diagonal: A(1500, 140) to B(1300, 260) */}
        <line
          x1="1500"
          y1="140"
          x2="1300"
          y2="260"
          stroke="#ef4444"
          strokeWidth="2"
        />
        
        {/* Line 4 - Down-Left Diagonal: A(1200, 320) to B(900, 500) */}
        <line
          x1="1200"
          y1="320"
          x2="900"
          y2="500"
          stroke="#ef4444"
          strokeWidth="2"
        />
        
        {/* Line 5 - Down-Left Diagonal: A(1201, 199) to B(900, 380) */}
        <line
          x1="1201"
          y1="199"
          x2="900"
          y2="380"
          stroke="#ef4444"
          strokeWidth="2"
        />
        
        {/* Line 6 - Down-Left Diagonal: A(1800, 320) to B(1400, 560) */}
        <line
          x1="1800"
          y1="320"
          x2="1400"
          y2="560"
          stroke="#ef4444"
          strokeWidth="2"
        />
        
        {/* Line 7 - Down-Left Diagonal: A(1300, 620) to B(1025, 784) */}
        <line
          x1="1300"
          y1="620"
          x2="1025"
          y2="784"
          stroke="#ef4444"
          strokeWidth="2"
        />
        
        {/* Line 8 - Down-Left Diagonal: A(1700, 500) to B(1400, 680) */}
        <line
          x1="1700"
          y1="500"
          x2="1400"
          y2="680"
          stroke="#ef4444"
          strokeWidth="2"
        />
        
        {/* Line 9 - Down-Left Diagonal: A(1700, 620) to B(1357, 826) */}
        <line
          x1="1700"
          y1="620"
          x2="1357"
          y2="826"
          stroke="#ef4444"
          strokeWidth="2"
        />
        
        {/* Line 10 - Down-Right Diagonal: A(1700, 260) to B(1920, 392) */}
        <line
          x1="1700"
          y1="260"
          x2="1920"
          y2="392"
          stroke="#ef4444"
          strokeWidth="2"
        />
        
        {/* Line 11 - Down-Right Diagonal: A(1600, 320) to B(1698, 379) */}
        <line
          x1="1600"
          y1="320"
          x2="1698"
          y2="379"
          stroke="#ef4444"
          strokeWidth="2"
        />
        
        {/* Line 12 - Down-Right Diagonal: A(1400, 200) to B(1500, 260) */}
        <line
          x1="1400"
          y1="200"
          x2="1500"
          y2="260"
          stroke="#ef4444"
          strokeWidth="2"
        />
        
        {/* Line 13 - Down-Right Diagonal: A(1400, 320) to B(1920, 632) */}
        <line
          x1="1400"
          y1="320"
          x2="1920"
          y2="632"
          stroke="#ef4444"
          strokeWidth="2"
        />
        
        {/* Line 14 - Down-Right Diagonal: A(1100, 260) to B(1800, 680) */}
        <line
          x1="1100"
          y1="260"
          x2="1800"
          y2="680"
          stroke="#ef4444"
          strokeWidth="2"
        />
        
        {/* Line 15 - Down-Right Diagonal: A(1000, 320) to B(1300, 500) */}
        <line
          x1="1000"
          y1="320"
          x2="1300"
          y2="500"
          stroke="#ef4444"
          strokeWidth="2"
        />
        
        {/* Line 16 - Down-Right Diagonal: A(1400, 560) to B(1600, 680) */}
        <line
          x1="1400"
          y1="560"
          x2="1600"
          y2="680"
          stroke="#ef4444"
          strokeWidth="2"
        />
        
        {/* Line 17 - Down-Right Diagonal: A(1000, 440) to B(1500, 740) */}
        <line
          x1="1000"
          y1="440"
          x2="1500"
          y2="740"
          stroke="#ef4444"
          strokeWidth="2"
        />
        
        {/* Line 18: A(1000, 440) to B(1000, 560) - Vertical */}
        <line
          x1="1000"
          y1="440"
          x2="1000"
          y2="560"
          stroke="#ef4444"
          strokeWidth="2"
        />
        
        {/* Line 19: A(1100, 260) to B(1100, 740) - Vertical */}
        <line
          x1="1100"
          y1="260"
          x2="1100"
          y2="740"
          stroke="#ef4444"
          strokeWidth="2"
        />
        
        {/* Line 20: A(1200, 320) to B(1200, 800) - Vertical */}
        <line
          x1="1200"
          y1="320"
          x2="1200"
          y2="800"
          stroke="#ef4444"
          strokeWidth="2"
        />
        
        {/* Line 21: A(1300, 260) to B(1300, 740) - Vertical */}
        <line
          x1="1300"
          y1="260"
          x2="1300"
          y2="740"
          stroke="#ef4444"
          strokeWidth="2"
        />
        
        {/* Line 22: A(1400, 200) to B(1400, 897) - Vertical */}
        <line
          x1="1400"
          y1="200"
          x2="1400"
          y2="897"
          stroke="#ef4444"
          strokeWidth="2"
        />
        
        {/* Line 23: A(1500, 260) to B(1500, 740) - Vertical */}
        <line
          x1="1500"
          y1="260"
          x2="1500"
          y2="740"
          stroke="#ef4444"
          strokeWidth="2"
        />
        
        {/* Line 24: A(1600, 207) to B(1600, 440) - Vertical */}
        <line
          x1="1600"
          y1="207"
          x2="1600"
          y2="440"
          stroke="#ef4444"
          strokeWidth="2"
        />
        
        {/* Line 25: A(1700, 260) to B(1700, 855) - Vertical */}
        <line
          x1="1700"
          y1="260"
          x2="1700"
          y2="855"
          stroke="#ef4444"
          strokeWidth="2"
        />
        
        {/* Line 26 - Horizontal: A(1000, 320) to B(1065, 320) */}
        <line
          x1="1000"
          y1="320"
          x2="1065"
          y2="320"
          stroke="#ef4444"
          strokeWidth="2"
        />
        
        {/* Line 27 - Down-Right Diagonal: A(1065, 320) to B(1100, 380) */}
        <line
          x1="1065"
          y1="320"
          x2="1100"
          y2="380"
          stroke="#ef4444"
          strokeWidth="2"
        />
        
        {/* Line 28 - Up-Right Diagonal: A(1065, 320) to B(1100, 260) */}
        <line
          x1="1065"
          y1="320"
          x2="1100"
          y2="260"
          stroke="#ef4444"
          strokeWidth="2"
        />
        
        {/* Line 29 - Down-Right Diagonal: A(1200, 320) to B(1234, 380) */}
        <line
          x1="1200"
          y1="320"
          x2="1234"
          y2="380"
          stroke="#ef4444"
          strokeWidth="2"
        />
        
        {/* Line 30 - Down-Left Diagonal: A(1234, 380) to B(1200, 440) */}
        <line
          x1="1234"
          y1="380"
          x2="1200"
          y2="440"
          stroke="#ef4444"
          strokeWidth="2"
        />
        
        {/* Line 31 - Horizontal: A(1234, 380) to B(1300, 380) */}
        <line
          x1="1234"
          y1="380"
          x2="1300"
          y2="380"
          stroke="#ef4444"
          strokeWidth="2"
        />
        
        {/* Line 32 - Down-Right Diagonal: A(1000, 440) to B(1034, 500) */}
        <line
          x1="1000"
          y1="440"
          x2="1034"
          y2="500"
          stroke="#ef4444"
          strokeWidth="2"
        />
        
        {/* Line 33 - Down-Left Diagonal: A(1034, 500) to B(1000, 560) */}
        <line
          x1="1034"
          y1="500"
          x2="1000"
          y2="560"
          stroke="#ef4444"
          strokeWidth="2"
        />
        
        {/* Line 34 - Horizontal: A(1034, 500) to B(1100, 500) */}
        <line
          x1="1034"
          y1="500"
          x2="1100"
          y2="500"
          stroke="#ef4444"
          strokeWidth="2"
        />
        
        {/* Line 35 - Horizontal: A(1100, 620) to B(1165, 620) */}
        <line
          x1="1100"
          y1="620"
          x2="1165"
          y2="620"
          stroke="#ef4444"
          strokeWidth="2"
        />
        
        {/* Line 36 - Up-Right Diagonal: A(1165, 620) to B(1200, 560) */}
        <line
          x1="1165"
          y1="620"
          x2="1200"
          y2="560"
          stroke="#ef4444"
          strokeWidth="2"
        />
        
        {/* Line 37 - Down-Right Diagonal: A(1165, 620) to B(1200, 680) */}
        <line
          x1="1165"
          y1="620"
          x2="1200"
          y2="680"
          stroke="#ef4444"
          strokeWidth="2"
        />
        
        {/* Line 38 - Down-Right Diagonal: A(1100, 620) to B(1200, 680) */}
        <line
          x1="1100"
          y1="620"
          x2="1200"
          y2="680"
          stroke="#ef4444"
          strokeWidth="2"
        />
        
        {/* Line 39 - Horizontal: A(1400, 680) to B(1465, 680) */}
        <line
          x1="1400"
          y1="680"
          x2="1465"
          y2="680"
          stroke="#ef4444"
          strokeWidth="2"
        />
        
        {/* Line 40 - Up-Right Diagonal: A(1465, 680) to B(1500, 620) */}
        <line
          x1="1465"
          y1="680"
          x2="1500"
          y2="620"
          stroke="#ef4444"
          strokeWidth="2"
        />
        
        {/* Line 41 - Down-Right Diagonal: A(1465, 680) to B(1500, 740) */}
        <line
          x1="1465"
          y1="680"
          x2="1500"
          y2="740"
          stroke="#ef4444"
          strokeWidth="2"
        />
        
        {/* Line 42 - Down-Right Diagonal: A(1400, 440) to B(1434, 500) */}
        <line
          x1="1400"
          y1="440"
          x2="1434"
          y2="500"
          stroke="#ef4444"
          strokeWidth="2"
        />
        
        {/* Line 43 - Horizontal: A(1434, 500) to B(1500, 500) */}
        <line
          x1="1434"
          y1="500"
          x2="1500"
          y2="500"
          stroke="#ef4444"
          strokeWidth="2"
        />
        
        {/* Line 44 - Down-Left Diagonal: A(1434, 500) to B(1400, 560) */}
        <line
          x1="1434"
          y1="500"
          x2="1400"
          y2="560"
          stroke="#ef4444"
          strokeWidth="2"
        />
        
        {/* Line 45 - Down-Right Diagonal: A(1400, 200) to B(1434, 260) */}
        <line
          x1="1400"
          y1="200"
          x2="1434"
          y2="260"
          stroke="#ef4444"
          strokeWidth="2"
        />
        
        {/* Line 46 - Down-Left Diagonal: A(1434, 260) to B(1400, 320) */}
        <line
          x1="1434"
          y1="260"
          x2="1400"
          y2="320"
          stroke="#ef4444"
          strokeWidth="2"
        />
        
        {/* Line 47 - Horizontal: A(1434, 260) to B(1500, 260) */}
        <line
          x1="1434"
          y1="260"
          x2="1500"
          y2="260"
          stroke="#ef4444"
          strokeWidth="2"
        />
        
        {/* Line 48 - Horizontal: A(1600, 320) to B(1665, 320) */}
        <line
          x1="1600"
          y1="320"
          x2="1665"
          y2="320"
          stroke="#ef4444"
          strokeWidth="2"
        />
        
        {/* Line 49 - Down-Left Diagonal: A(1700, 260) to B(1665, 320) */}
        <line
          x1="1700"
          y1="260"
          x2="1665"
          y2="320"
          stroke="#ef4444"
          strokeWidth="2"
        />
        
        {/* Line 50 - Down-Right Diagonal: A(1665, 320) to B(1698, 379) */}
        <line
          x1="1665"
          y1="320"
          x2="1698"
          y2="379"
          stroke="#ef4444"
          strokeWidth="2"
        />
        
        {/* Line 51 - Horizontal: A(1600, 560) to B(1665, 560) */}
        <line
          x1="1600"
          y1="560"
          x2="1665"
          y2="560"
          stroke="#ef4444"
          strokeWidth="2"
        />
        
        {/* Line 52 - Up-Right Diagonal: A(1665, 560) to B(1700, 500) */}
        <line
          x1="1665"
          y1="560"
          x2="1700"
          y2="500"
          stroke="#ef4444"
          strokeWidth="2"
        />
        
        {/* Line 53 - Down-Right Diagonal: A(1665, 560) to B(1700, 620) */}
        <line
          x1="1665"
          y1="560"
          x2="1700"
          y2="620"
          stroke="#ef4444"
          strokeWidth="2"
        />
        
        {/* Coordinate labels */}
        {/* {xLabels}
        {yLabels} */}
      </svg>
    </div>
  );
};

export default HeroDesign;
