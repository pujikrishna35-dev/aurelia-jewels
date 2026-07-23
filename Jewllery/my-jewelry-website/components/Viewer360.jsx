"use client";

import React, { useState, useRef, useEffect } from "react";
import { Rotate3d, MoveHorizontal } from "lucide-react";

export default function Viewer360({ images }) {
  const [currentAngle, setCurrentAngle] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [cursorStyle, setCursorStyle] = useState("grab");
  const startX = useRef(0);
  const baseAngle = useRef(0);
  const containerRef = useRef(null);

  const imagesList = images || [];
  
  // Decide which image to show based on angle (to simulate front/back view)
  let activeImage = imagesList[0] || "";
  if (imagesList.length > 1) {
    const normAngle = ((Math.round(currentAngle) % 360) + 360) % 360;
    if (normAngle > 90 && normAngle < 270) {
      activeImage = imagesList[1];
    }
  }

  const startDrag = (e) => {
    setIsDragging(true);
    startX.current = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    baseAngle.current = currentAngle;
    setCursorStyle("grabbing");
  };

  useEffect(() => {
    const moveDrag = (e) => {
      if (!isDragging) return;
      
      if (e.cancelable) e.preventDefault();
      
      const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
      const dx = clientX - startX.current;
      
      const newAngle = baseAngle.current + dx * 0.6;
      setCurrentAngle(newAngle);
    };

    const stopDrag = () => {
      setIsDragging(false);
      setCursorStyle("grab");
    };

    if (isDragging) {
      window.addEventListener("mousemove", moveDrag, { passive: false });
      window.addEventListener("mouseup", stopDrag);
      window.addEventListener("touchmove", moveDrag, { passive: false });
      window.addEventListener("touchend", stopDrag);
    }

    return () => {
      window.removeEventListener("mousemove", moveDrag);
      window.removeEventListener("mouseup", stopDrag);
      window.removeEventListener("touchmove", moveDrag);
      window.removeEventListener("touchend", stopDrag);
    };
  }, [isDragging]);

  return (
    <div
      ref={containerRef}
      className="viewer-360-container"
      id="viewer-360-element"
      style={{ cursor: cursorStyle }}
      onMouseDown={startDrag}
      onTouchStart={startDrag}
    >
      <div
        className="viewer-360-inner"
        id="viewer-360-inner"
        style={{
          transform: `perspective(1000px) rotateY(${currentAngle}deg)`,
        }}
      >
        <img
          src={activeImage}
          alt="360 View"
          id="viewer-360-img"
          draggable="false"
        />
      </div>
      <div className="viewer-360-badge">
        <Rotate3d size={14} style={{ display: "inline-block", verticalAlign: "middle" }} /> 360° View
      </div>
      <div className="viewer-360-instructions">
        <MoveHorizontal size={16} style={{ display: "inline-block", verticalAlign: "middle", marginRight: "4px" }} />
        <span>Drag horizontally to rotate</span>
      </div>
    </div>
  );
}
