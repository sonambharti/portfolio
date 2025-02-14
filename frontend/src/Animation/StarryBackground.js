import React, { useEffect, useState } from "react";
import "../Style/StarryBackground.css";

const StarryBackground = () => {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    const generateStars = () => {
      const starArray = [];
      for (let i = 0; i < 150; i++) {
        starArray.push({
          id: i,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: Math.random() * 2 + 1,
          delay: Math.random() * 5,
        });
      }
      setStars(starArray);
    };

    generateStars();
    window.addEventListener("resize", generateStars);

    return () => window.removeEventListener("resize", generateStars);
  }, []);

  return (
    <div className="starry-background">
      {stars.map((star) => (
        <div
          key={star.id}
          className="star"
          style={{
            left: `${star.x}px`,
            top: `${star.y}px`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDelay: `${star.delay}s`,
          }}
        />
      ))}
    </div>
  );
};

export default StarryBackground;
