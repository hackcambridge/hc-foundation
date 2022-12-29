import React, { CSSProperties, useCallback, useEffect, useRef, useState } from 'react';
import './MovingBackground.css';

// Hook for dynamic resizing
export const useResize = () => {
    const [width, setWidth] = useState(window.innerWidth)
    const [height, setHeight] = useState(window.innerHeight)
    useEffect(() => {
      const handleResize = () => {
        setWidth(window.innerWidth)
        setHeight(window.innerHeight)
      }
      handleResize();
      window.addEventListener('resize', handleResize)
  
      return () => {
        window.removeEventListener('resize', handleResize)
      }
    }, [])
    return { width, height }
};
  
// Interface for custom css properties
export interface CustomCSSForMovingBackground extends CSSProperties {
  '--before-bg-pos': string,
  '--before-bg-img': string
}

export type MovingBackgroundProps = {
    children: React.ReactNode;
    background: string
};

/**
 * @deprecated
 */
export default function MovingBackground({children, background}: MovingBackgroundProps) {
    const [backgroundPos, setBackgroundPos] = useState([50, 50]);
    const ref = useRef<HTMLDivElement>(null);
    const { width, height } = useResize();

    const handleMouseMove = useCallback<React.MouseEventHandler<HTMLDivElement>>((event) => {
        setBackgroundPos([(100-100 * event.clientX / width) * 1 / 2 + 25, (100-100 * event.clientY / height) * 9 / 10 + 10]);
    }, [width, height]);

    const getStyle = (beforeBgImage: string, beforeBgPos: Array<number>) => {
      return {
        '--before-bg-img': `url(${beforeBgImage})`,
        '--before-bg-pos': `${beforeBgPos[0]}% ${beforeBgPos[1]}%`
      } as CustomCSSForMovingBackground;
    };

    return (
        <div className="MovingBackground" style={getStyle(background, backgroundPos)} ref={ref} onMouseMove={handleMouseMove}>
            {children}
        </div>
    );
}
