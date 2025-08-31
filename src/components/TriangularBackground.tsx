import React from 'react';

const TriangularBackground: React.FC = () => {
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <style>
        {`
          @keyframes triangleFlash {
            0%, 100% { opacity: 0.25; }
            50% { opacity: 0.9; }
          }
          
          .flashing-triangle {
            animation: triangleFlash 3s ease-in-out infinite;
          }
        `}
      </style>
      
      <svg 
        width="100%" 
        height="100%" 
        className="absolute inset-0"
      >
        {/* Triangular Tessellation Pattern with Scattered Effect and Random Flashing */}
        {(() => {
          const triangleSize = 40; // Size of each equilateral triangle
          const rows = Math.ceil(screenHeight / (triangleSize * Math.sqrt(3) / 2)) + 2;
          const cols = Math.ceil(screenWidth / triangleSize) + 2;
          
          const triangles = [];
          
          for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
              const x = col * triangleSize;
              const y = row * triangleSize * Math.sqrt(3) / 2;
              
              // Calculate left side ratio for scattered effect
              const leftSideRatio = x / screenWidth; // 0 = far left, 1 = far right
              
              // Apply scattered effect similar to the dots
              // No triangles on far left, scattered in middle, scattered on far right
              const shouldHide = leftSideRatio < 0.5 || (leftSideRatio < 0.8 && Math.random() < 0.9) || (leftSideRatio < 0.95 && Math.random() < 0.7) || (leftSideRatio > 0.95 && Math.random() < 0.6);
              
              // Add some random triangles that extend further to the right for natural distribution
              const shouldAddRandomRight = leftSideRatio > 0.6 && Math.random() < 0.1; // 10% chance for random right extension
              const randomRightOffset = Math.random() * 200; // Random offset up to 200px to the right
              
              if (shouldHide && !shouldAddRandomRight) continue;
              
              // Use random right position for scattered triangles
              const finalX = shouldAddRandomRight ? x + randomRightOffset : x;
              
              // Random flashing effect - 15% chance for any triangle to flash
              const shouldFlash = Math.random() < 0.15;
              const flashDelay = Math.random() * 3; // Random delay between 0-3 seconds
              
              // Create two triangles per grid position (pointing up and down)
              // Upward pointing triangle
              const upTriangle = {
                points: [
                  `${finalX},${y}`,
                  `${finalX + triangleSize},${y}`,
                  `${finalX + triangleSize/2},${y - triangleSize * Math.sqrt(3) / 2}`
                ].join(' '),
                fill: leftSideRatio > 0.8 && Math.random() < 0.4 ? 
                  `hsl(0, 0%, ${60 + (row + col) % 3 * 8}%)` : // Darker grays on far right for light mode
                  `hsl(0, 0%, ${75 + (row + col) % 3 * 6}%)` // Medium grays for better visibility
              };
              
              // Downward pointing triangle
              const downTriangle = {
                points: [
                  `${finalX},${y}`,
                  `${finalX + triangleSize},${y}`,
                  `${finalX + triangleSize/2},${y + triangleSize * Math.sqrt(3) / 2}`
                ].join(' '),
                fill: leftSideRatio > 0.8 && Math.random() < 0.3 ? 
                  `hsl(0, 0%, ${55 + (row + col) % 3 * 10}%)` : // Even darker grays on far right
                  `hsl(0, 0%, ${70 + (row + col) % 3 * 8}%)` // Medium grays for better visibility
              };
              
              triangles.push(
                <polygon
                  key={`up-${row}-${col}-${finalX}`}
                  points={upTriangle.points}
                  fill={upTriangle.fill}
                  opacity="0.25"
                  className={shouldFlash ? "flashing-triangle" : ""}
                  style={shouldFlash ? { animationDelay: `${flashDelay}s` } : {}}
                />,
                <polygon
                  key={`down-${row}-${col}-${finalX}`}
                  points={downTriangle.points}
                  fill={downTriangle.fill}
                  opacity="0.25"
                  className={shouldFlash ? "flashing-triangle" : ""}
                  style={shouldFlash ? { animationDelay: `${flashDelay}s` } : {}}
                />
              );
            }
          }
          
          return triangles;
        })()}
      </svg>
    </div>
  );
};

export default TriangularBackground;
