"use client";

import { useState, useEffect, useCallback } from 'react';
import { Heart } from 'lucide-react';

interface HeartType {
  id: number;
  x: number;
  y: number;
}

const HeartClickAnimation = () => {
  const [hearts, setHearts] = useState<HeartType[]>([]);

  const handleClick = useCallback((e: MouseEvent) => {
    const newHeart: HeartType = {
      id: Date.now(),
      x: e.clientX,
      y: e.clientY,
    };
    setHearts(prevHearts => [...prevHearts, newHeart]);

    setTimeout(() => {
      setHearts(prevHearts => prevHearts.filter(h => h.id !== newHeart.id));
    }, 800);
  }, []);

  useEffect(() => {
    window.addEventListener('click', handleClick);
    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, [handleClick]);

  return (
    <>
      {hearts.map(heart => (
        <div
          key={heart.id}
          className="heart"
          style={{
            left: heart.x,
            top: heart.y,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <Heart className="w-12 h-12 text-primary fill-primary" />
        </div>
      ))}
    </>
  );
};

export default HeartClickAnimation;
