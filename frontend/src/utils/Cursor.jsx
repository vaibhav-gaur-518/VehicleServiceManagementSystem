import { useEffect, useState } from "react";

const Cursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const moveCursor = (e) => {
      requestAnimationFrame(() => {
        setPosition({ x: e.clientX, y: e.clientY });
      });
    };

    const handleScroll = () => {
      setIsVisible(false);
      requestAnimationFrame(() => setIsVisible(true));
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`
        pointer-events-none 
        fixed 
        top-0 
        left-0 
        w-16 
        h-16
        bg-white 
        rounded-full 
        mix-blend-difference 
        transition-opacity 
        duration-300
        z-[9999]
        ${isVisible ? "opacity-100" : "opacity-0"}
      `}
      style={{
        transform: `translate(${position.x - 8}px, ${position.y - 8}px)`,
        transition: "transform 0.15s ease-out",
      }}
    />
  );
};

export default Cursor;