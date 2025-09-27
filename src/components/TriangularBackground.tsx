import React from 'react';

const TriangularBackground: React.FC = () => {
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <style>
        {`
          @keyframes diamondFlash {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 0.9; }
          }
          
          .flashing-diamond {
            animation: diamondFlash 3s ease-in-out infinite;
          }
        `}
      </style>
      
      <svg 
        width="100%" 
        height="100%" 
        className="absolute inset-0"
      >
        {/* Diamond Tessellation Pattern with Scattered Effect and Random Flashing */}
        {(() => {
          const diamondSize = 40; // Size of each diamond
          const rows = Math.ceil(screenHeight / (diamondSize * Math.sqrt(3) / 2)) + 2;
          const cols = Math.ceil(screenWidth / diamondSize) + 2;
          
          const diamonds = [];
          
          for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
              const x = col * diamondSize;
              const y = row * diamondSize * Math.sqrt(3) / 2;
              
              // Calculate left side ratio for scattered effect
              const leftSideRatio = x / screenWidth; // 0 = far left, 1 = far right
              
              // Apply scattered effect similar to the dots
              // No diamonds on far left, scattered in middle, scattered on far right
              const shouldHide = leftSideRatio < 0.5 || (leftSideRatio < 0.8 && Math.random() < 0.9) || (leftSideRatio < 0.95 && Math.random() < 0.7) || (leftSideRatio > 0.95 && Math.random() < 0.6);
              
              // Add some random diamonds that extend further to the right for natural distribution
              const shouldAddRandomRight = leftSideRatio > 0.6 && Math.random() < 0.1; // 10% chance for random right extension
              const randomRightOffset = Math.random() * 200; // Random offset up to 200px to the right
              
              if (shouldHide && !shouldAddRandomRight) continue;
              
              // Use random right position for scattered diamonds
              const finalX = shouldAddRandomRight ? x + randomRightOffset : x;
              
              // Random flashing effect - 15% chance for any diamond to flash
              const shouldFlash = Math.random() < 0.15;
              const flashDelay = Math.random() * 3; // Random delay between 0-3 seconds
              
              // Create whole diamond shape (rhombus) instead of split triangles
              const diamond = {
                points: [
                  `${finalX + diamondSize/2},${y - diamondSize * Math.sqrt(3) / 2}`, // Top point
                  `${finalX + diamondSize},${y}`, // Right point
                  `${finalX + diamondSize/2},${y + diamondSize * Math.sqrt(3) / 2}`, // Bottom point
                  `${finalX},${y}` // Left point
                ].join(' '),
                // Add gold colors like in the reference image
                fill: (() => {
                  const colorChoice = Math.random();
                  if (colorChoice < 0.15) {
                    // Gold variations (15% chance - reduced from 40%)
                    const goldShades = [
                      '#FFD700', // Bright gold
                      '#DAA520', // Goldenrod
                      '#B8860B'  // Dark goldenrod
                    ];
                    return goldShades[Math.floor(Math.random() * goldShades.length)];
                  } else if (colorChoice < 0.6) {
                    // White/light gray variations (45% chance - increased from 30%)
                    const lightShades = [
                      '#FFFFFF', // Pure white
                      '#F5F5F5', // White smoke
                      '#F0F0F0', // Light gray
                      '#E8E8E8', // Light gray
                      '#D3D3D3'  // Light gray
                    ];
                    return lightShades[Math.floor(Math.random() * lightShades.length)];
                  } else {
                    // Subtle gray variations (40% chance - increased from 30%)
                    return `hsl(0, 0%, ${75 + (row + col) % 3 * 8}%)`;
                  }
                })()
              };
              
              diamonds.push(
                <polygon
                  key={`diamond-${row}-${col}-${finalX}`}
                  points={diamond.points}
                  fill={diamond.fill}
                  opacity="0.3"
                  className={shouldFlash ? "flashing-diamond" : ""}
                  style={shouldFlash ? { animationDelay: `${flashDelay}s` } : {}}
                  stroke="#FFD700" // Gold outline like in reference image
                  strokeWidth="1"
                />
              );
            }
          }
          
          return diamonds;
        })()}
      </svg>
    </div>
  );
};

export default TriangularBackground;
