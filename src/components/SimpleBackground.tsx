import React from 'react';

const SimpleBackground: React.FC = () => {
  // Hexagonal grid spacing
  const hexSpacing = 60; // Distance between hexagon centers
  const hexHeight = hexSpacing * Math.sqrt(3); // Height of hexagon
  const hexWidth = hexSpacing * 2; // Width of hexagon
  
  // Calculate grid dimensions
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  
  // Calculate how many hexagons fit in each row and column
  const cols = Math.ceil(screenWidth / (hexWidth * 0.75)) + 2; // 0.75 accounts for hexagon overlap
  const rows = Math.ceil(screenHeight / hexHeight) + 2;
  
  // Generate hexagonal grid of dots
  const dots: Array<{x: number, y: number, index: number}> = [];
  const subDots: Array<{x: number, y: number, index: number}> = []; // Array for sub-dots
  
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      // Hexagonal grid positioning
      const x = col * hexWidth * 0.75; // 0.75 for hexagon overlap
      const y = row * hexHeight;
      
      // Offset every other row for hexagonal pattern
      const offsetX = row % 2 === 0 ? 0 : hexWidth * 0.375;
      
      dots.push({
        x: x + offsetX,
        y: y,
        index: row * cols + col
      });
      
      // Add sub-dots in a normal grid pattern between main dots
      if (col < cols - 1 && row < rows - 1) {
        // Sub-dot at the center of the square formed by 4 main dots
        const centerX = x + offsetX + hexWidth * 0.375;
        const centerY = y + hexHeight / 2;
        
        subDots.push({
          x: centerX,
          y: centerY,
          index: subDots.length
        });
        
        // Sub-dot at the midpoint between current dot and right neighbor
        const midRightX = x + offsetX + hexWidth * 0.375;
        const midRightY = y;
        
        subDots.push({
          x: midRightX,
          y: midRightY,
          index: subDots.length
        });
        
        // Sub-dot at the midpoint between current dot and bottom neighbor
        const midBottomX = x + offsetX;
        const midBottomY = y + hexHeight / 2;
        
        subDots.push({
          x: midBottomX,
          y: midBottomY,
          index: subDots.length
        });
      }
    }
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <svg 
        width="100%" 
        height="100%" 
        className="absolute inset-0"
      >
        {/* Triangular Tessellation Pattern - Background Layer */}
        {(() => {
          const triangleSize = 40; // Size of each equilateral triangle
          const rows = Math.ceil(screenHeight / (triangleSize * Math.sqrt(3) / 2)) + 2;
          const cols = Math.ceil(screenWidth / triangleSize) + 2;
          
          const triangles = [];
          
          for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
              const x = col * triangleSize;
              const y = row * triangleSize * Math.sqrt(3) / 2;
              
              // Create two triangles per grid position (pointing up and down)
              // Upward pointing triangle
              const upTriangle = {
                points: [
                  `${x},${y}`,
                  `${x + triangleSize},${y}`,
                  `${x + triangleSize/2},${y - triangleSize * Math.sqrt(3) / 2}`
                ].join(' '),
                fill: `hsl(0, 0%, ${85 + (row + col) % 3 * 5}%)` // Subtle gray variations
              };
              
              // Downward pointing triangle
              const downTriangle = {
                points: [
                  `${x},${y}`,
                  `${x + triangleSize},${y}`,
                  `${x + triangleSize/2},${y + triangleSize * Math.sqrt(3) / 2}`
                ].join(' '),
                fill: `hsl(0, 0%, ${80 + (row + col) % 3 * 8}%)` // Slightly different gray variations
              };
              
              triangles.push(
                <polygon
                  key={`up-${row}-${col}`}
                  points={upTriangle.points}
                  fill={upTriangle.fill}
                  opacity="0.15"
                />,
                <polygon
                  key={`down-${row}-${col}`}
                  points={downTriangle.points}
                  fill={downTriangle.fill}
                  opacity="0.15"
                />
              );
            }
          }
          
          return triangles;
        })()}
        
        {/* Existing dots and lines remain on top */}
        {/* Sub-dots with scattered left side effect */}
        {subDots.map((subDot) => {
          // Gradually hide sub-dots on the left side with some random dots extending towards center
          const leftSideRatio = subDot.x / screenWidth; // 0 = far left, 1 = far right
          const shouldHide = leftSideRatio < 0.3 || (leftSideRatio < 0.6 && Math.random() < 0.7) || (leftSideRatio < 0.8 && Math.random() < 0.3); // No dots on far left, scattered in middle, some random dots extending left
          
          if (shouldHide) return null;
          
          return (
            <g key={`sub-${subDot.index}`}>
              <circle
                cx={subDot.x}
                cy={subDot.y}
                r="3"
                fill="#666666"
                opacity="0.6"
              />
              <text
                x={subDot.x}
                y={subDot.y + 4}
                textAnchor="middle"
                fontSize="10"
                fill="#666666"
                opacity="0.8"
              >
                {subDot.index}
              </text>
            </g>
          );
        })}
        
        {/* Main dots with scattered left side effect */}
        {dots.map((dot) => {
          // Gradually hide main dots on the left side
          const leftSideRatio = dot.x / screenWidth; // 0 = far left, 1 = far right
          const shouldHide = leftSideRatio < 0.5 || (leftSideRatio < 0.75 && Math.random() < 0.75); // No dots on far left, heavily scattered in middle
          
          if (shouldHide) return null;
          
          return (
            <g key={dot.index}>
              <circle
                cx={dot.x}
                cy={dot.y}
                r="4"
                fill="#000000"
                opacity="1"
              />
              <text
                x={dot.x}
                y={dot.y + 5}
                textAnchor="middle"
                fontSize="12"
                fill="#000000"
                opacity="1"
              >
                {dot.index}
              </text>
            </g>
          );
        })}
        
        {/* Animated line from dot 30 to dot 32 that draws itself */}
        {(() => {
          const dot30 = dots.find(d => d.index === 30);
          const dot32 = dots.find(d => d.index === 32);
          
          if (dot30 && dot32) {
            return (
              <g key="animated-line-30-32">
                <line
                  x1={dot30.x}
                  y1={dot30.y}
                  x2={dot32.x}
                  y2={dot32.y}
                  stroke="#000000"
                  strokeWidth="2"
                  opacity="0.8"
                  strokeDasharray="1000"
                  strokeDashoffset="1000"
                  style={{
                    animation: "drawLine 3s linear infinite"
                  }}
                />
              </g>
            );
          }
          return null;
        })()}
        
        {/* Original Triangle 1: sub-dot 140, main dot 83, main dot 85 */}
        {(() => {
          const subDot140 = subDots.find(d => d.index === 140);
          const dot83 = dots.find(d => d.index === 83);
          const dot85 = dots.find(d => d.index === 85);
          
          if (subDot140 && dot83 && dot85) {
            return (
              <g key="first-triangle">
                <line
                  x1={subDot140.x}
                  y1={subDot140.y}
                  x2={dot83.x}
                  y2={dot83.y}
                  stroke="#000000"
                  strokeWidth="2"
                  opacity="1"
                />
                <line
                  x1={dot83.x}
                  y1={dot83.y}
                  x2={dot85.x}
                  y2={dot85.y}
                  stroke="#000000"
                  strokeWidth="2"
                  opacity="1"
                />
                <line
                  x1={dot85.x}
                  y1={dot85.y}
                  x2={subDot140.x}
                  y2={subDot140.y}
                  stroke="#000000"
                  strokeWidth="2"
                  opacity="1"
                />
              </g>
            );
          }
          return null;
        })()}
        
        {/* Original Triangle 2: sub-dot 140, sub-dot 146, main dot 85 */}
        {(() => {
          const subDot140 = subDots.find(d => d.index === 140);
          const subDot146 = subDots.find(d => d.index === 146);
          const dot85 = dots.find(d => d.index === 85);
          
          if (subDot140 && subDot146 && dot85) {
            return (
              <g key="second-triangle">
                <line
                  x1={subDot140.x}
                  y1={subDot140.y}
                  x2={subDot146.x}
                  y2={subDot146.y}
                  stroke="#000000"
                  strokeWidth="2"
                  opacity="1"
                />
                <line
                  x1={subDot146.x}
                  y1={subDot146.y}
                  x2={dot85.x}
                  y2={dot85.y}
                  stroke="#000000"
                  strokeWidth="2"
                  opacity="1"
                />
                <line
                  x1={dot85.x}
                  y1={dot85.y}
                  x2={subDot140.x}
                  y2={subDot140.y}
                  stroke="#000000"
                  strokeWidth="2"
                  opacity="1"
                />
              </g>
            );
          }
          return null;
        })()}
        
        {/* Original Lines */}
        {(() => {
          const dot85 = dots.find(d => d.index === 85);
          const dot288 = dots.find(d => d.index === 288);
          const subDot388 = subDots.find(d => d.index === 388);
          const dot83 = dots.find(d => d.index === 83);
          const subDot394 = subDots.find(d => d.index === 394);
          const dot88 = dots.find(d => d.index === 88);
          const dot80 = dots.find(d => d.index === 80);
          
          return (
            <>
              {/* Line 85 to 288 */}
              {dot85 && dot288 && (
                <line
                  x1={dot85.x}
                  y1={dot85.y}
                  x2={dot288.x}
                  y2={dot288.y}
                  stroke="#000000"
                  strokeWidth="2"
                  opacity="1"
                />
              )}
              
              {/* Line 85 to sub-388 */}
              {dot85 && subDot388 && (
                <line
                  x1={dot85.x}
                  y1={dot85.y}
                  x2={subDot388.x}
                  y2={subDot388.y}
                  stroke="#000000"
                  strokeWidth="2"
                  opacity="1"
                />
              )}
              
              {/* Line 83 to sub-394 */}
              {dot83 && subDot394 && (
                <line
                  x1={dot83.x}
                  y1={dot83.y}
                  x2={subDot394.x}
                  y2={subDot394.y}
                  stroke="#000000"
                  strokeWidth="2"
                  opacity="1"
                />
              )}
              
              {/* Line 88 to 80 */}
              {dot88 && dot80 && (
                <line
                  x1={dot88.x}
                  y1={dot88.y}
                  x2={dot80.x}
                  y2={dot80.y}
                  stroke="#000000"
                  strokeWidth="2"
                  opacity="1"
                />
              )}
            </>
          );
        })()}
      </svg>
      
      {/* CSS Animation for the drawing line */}
      <style>
        {`
          @keyframes drawLine {
            to {
              stroke-dashoffset: 0;
            }
          }
        `}
      </style>
    </div>
  );
};

export default SimpleBackground;
