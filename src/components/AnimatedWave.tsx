
import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedWaveProps {
  className?: string;
  fill?: string;
  animationDuration?: number;
  delay?: number;
  opacity?: number;
  position?: 'top' | 'bottom';
}

const AnimatedWave: React.FC<AnimatedWaveProps> = ({ 
  className = '',
  fill = '#9bd5e9',
  animationDuration = 25,
  delay = 0,
  opacity = 0.6,
  position = 'bottom'
}) => {
  return (
    <div className={`absolute w-full ${position === 'top' ? 'top-0' : 'bottom-0'} left-0 overflow-hidden line-height-0 z-0 ${className}`}>
      <motion.svg 
        className="relative block w-[calc(100%+1.5px)] h-[70px] md:h-[120px]"
        viewBox="0 0 1200 120" 
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        initial={{ translateX: "0%" }}
        animate={{
          translateX: "-50%"
        }}
        transition={{
          duration: animationDuration,
          repeat: Infinity, 
          ease: "linear",
          delay
        }}
      >
        <motion.path 
          d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H2400V95.8C2132.19,118.92,2055.71,111.31,1985.66,92.83Z" 
          fill={fill} 
          fillOpacity={opacity}
        />
      </motion.svg>
      
      {/* Second wave with different speed for parallax effect */}
      <motion.svg 
        className="absolute bottom-0 left-0 w-[calc(200%+1.5px)] h-[70px] md:h-[120px]"
        viewBox="0 0 2400 120" 
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        initial={{ translateX: "0%" }}
        animate={{
          translateX: "-50%"
        }}
        transition={{
          duration: animationDuration * 1.5,
          repeat: Infinity, 
          ease: "linear",
          delay: delay + 0.5
        }}
      >
        <motion.path 
          d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H2400V95.8C2132.19,118.92,2055.71,111.31,1985.66,92.83Z" 
          fill={fill} 
          fillOpacity={opacity * 0.7}
        />
      </motion.svg>
    </div>
  );
};

export default AnimatedWave;
