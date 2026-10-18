import React, { useState, useEffect } from 'react';

interface ScrambleTextProps {
  text: string;
  delay?: number;
  duration?: number;
  className?: string;
}

const GLYPHS = '0123456789_:-+/*=XVASL';

export const ScrambleText: React.FC<ScrambleTextProps> = ({
  text,
  delay = 0,
  duration = 800,
  className = '',
}) => {
  const [displayText, setDisplayText] = useState(text);

  useEffect(() => {
    let frameId: number;
    let startTime: number | null = null;
    let timeoutId: number;

    timeoutId = window.setTimeout(() => {
      const step = (now: number) => {
        if (!startTime) startTime = now;
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);

        const revealedLength = Math.floor(progress * text.length);
        let result = text.slice(0, revealedLength);

        for (let i = revealedLength; i < text.length; i++) {
          if (text[i] === ' ') {
            result += ' ';
          } else {
            result += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          }
        }

        setDisplayText(result);

        if (progress < 1) {
          frameId = requestAnimationFrame(step);
        } else {
          setDisplayText(text);
        }
      };

      frameId = requestAnimationFrame(step);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      cancelAnimationFrame(frameId);
    };
  }, [text, delay, duration]);

  return (
    <span className={className}>
      <span aria-hidden="true">{displayText}</span>
      <span className="sr-only">{text}</span>
    </span>
  );
};
