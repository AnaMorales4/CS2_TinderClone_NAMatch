import { useEffect } from "react";

const HeartFloatingEffect = () => {
  useEffect(() => {
    const container = document.createElement("div");
    container.style.position = "fixed";
    container.style.top = 0;
    container.style.left = 0;
    container.style.width = "100%";
    container.style.height = "100%";
    container.style.pointerEvents = "none";
    container.style.zIndex = 9999;
    document.body.appendChild(container);

    const createHeart = () => {
      const heart = document.createElement("div");
      heart.textContent = "❤"; // heart character
      heart.style.position = "absolute";
      heart.style.left = `${Math.random() * 100}%`;
      heart.style.bottom = "0";
      heart.style.fontSize = `${Math.random() * 20 + 16}px`;
      heart.style.color = "#FD5068";
      heart.style.opacity = 0.8;
      heart.style.animation = "floatUp 2s ease-out forwards";
      container.appendChild(heart);

      setTimeout(() => {
        heart.remove();
      }, 2000);
    };

    const interval = setInterval(createHeart, 150);
    setTimeout(() => clearInterval(interval), 2000);

    return () => {
      clearInterval(interval);
      container.remove();
    };
  }, []);

  return null;
};

export default HeartFloatingEffect;