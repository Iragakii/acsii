import { useState, useEffect } from "react";

interface GlitchTextProps {
  text: string;
  className?: string;
}

const GlitchText = ({ text, className = "" }: GlitchTextProps) => {
  const [glitchedText, setGlitchedText] = useState(text);
  const [isGlitching, setIsGlitching] = useState(false);

  const glitchChars = "!@#$%^&*()_+-=[]{}|;:,.<>?";

  const glitchText = () => {
    if (isGlitching) return;

    setIsGlitching(true);
    const originalText = text;
    let iterations = 0;

    const interval = setInterval(() => {
      setGlitchedText(
        originalText
          .split("")
          .map((_, index) => {
            if (index < iterations) {
              return originalText[index];
            }
            return glitchChars[Math.floor(Math.random() * glitchChars.length)];
          })
          .join("")
      );

      if (iterations >= originalText.length) {
        clearInterval(interval);
        setGlitchedText(originalText);
        setIsGlitching(false);
      }

      iterations += 1 / 3;
    }, 30);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      if (Math.random() < 0.1) {
        // 10% chance to glitch
        glitchText();
      }
    }, 2000);

    return () => clearInterval(timer);
  }, [text]);

  return (
    <span
      className={`${className} ${isGlitching ? "animate-pulse" : ""}`}
      onMouseEnter={glitchText}
    >
      {glitchedText}
    </span>
  );
};

export default GlitchText;
