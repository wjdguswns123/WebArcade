import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useInputStateStore } from '../stores/InputStateStore';
import '../css/JoystickUI.css';

const JoystickUI = () => {
  const areaRef = useRef<HTMLDivElement>(null);
  const knobRef = useRef<HTMLDivElement>(null);

  const [isDragging, setIsDragging] = useState(false);
  const [knobPosition, setKnobPosition] = useState({x: 0, y: 0});

  const { setInput } = useInputStateStore();

  let maxDistance = 0;

  const onMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    calculateKnobPosition(e.clientX, e.clientY);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    setIsDragging(true);
    calculateKnobPosition(e.touches[0].clientX, e.touches[0].clientY);
  };

  const calculateKnobPosition = useCallback((posX: number, posY: number) => {
    if(!areaRef.current || !knobRef.current){
      setKnobPosition({x: 0, y: 0});
    }
    else {
      const areaRect = areaRef.current.getBoundingClientRect();

      const centerX = areaRect.left + areaRect.width / 2;
      const centerY = areaRect.top + areaRect.height / 2;

      let deltaX = posX - centerX;
      let deltaY = posY - centerY;

      if(maxDistance == 0){
        const knobRect = knobRef.current.getBoundingClientRect();
        maxDistance = (areaRect.width - knobRect.width) / 2;
      }

      const distance = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
      const angle = Math.atan2(deltaY, deltaX);

      if(distance > maxDistance) {
        deltaX = Math.cos(angle) * maxDistance;
        deltaY = Math.sin(angle) * maxDistance;
      }

      setKnobPosition({x: deltaX, y: deltaY});

      if(deltaX > 20) {
        setInput("right", true);
        setInput("left", false);
      } else if(deltaX < -20) {
        setInput("right", false);
        setInput("left", true);
      } else {
        setInput("right", false);
        setInput("left", false);
      }

      if(deltaY < -20) {
        setInput("forward", true);
        setInput("backward", false);
      } else if(deltaY > 20) {
        setInput("forward", false);
        setInput("backward", true);
      } else {
        setInput("forward", false);
        setInput("backward", false);
      }
    }
  }, []);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent)  => {
      if(isDragging) {
        calculateKnobPosition(e.clientX, e.clientY);
      }
    };

    const onTouchMove = (e: TouchEvent)  => {
      if(isDragging) {
        calculateKnobPosition(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const onMouseUp = () => {
      setIsDragging(false);
      setKnobPosition({x: 0, y: 0});
      setInput("forward", false);
      setInput("backward", false);
      setInput("right", false);
      setInput("left", false);
    };

    if(isDragging){
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);
      window.addEventListener("touchmove", onTouchMove);
      window.addEventListener("touchend", onMouseUp);
    }
    
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onMouseUp);  
    };
  }, [isDragging]);

  return (
    <div className="joystick">
      <div className="area" ref={areaRef}></div>
      <div className="knob" ref={knobRef} onMouseDown={onMouseDown} onTouchStart={onTouchStart} style={{
        transform: `translate(${knobPosition.x}px, ${knobPosition.y}px)`,
      }}></div>
      <img className="arrow-img up-arrow" src="Images/Icons/arrow.png" alt="" onContextMenu={(e) => e.preventDefault()} />
      <img className="arrow-img left-arrow" src="Images/Icons/arrow.png" alt="" onContextMenu={(e) => e.preventDefault()} />
      <img className="arrow-img right-arrow" src="Images/Icons/arrow.png" alt="" onContextMenu={(e) => e.preventDefault()} />
      <img className="arrow-img down-arrow" src="Images/Icons/arrow.png" alt="" onContextMenu={(e) => e.preventDefault()} />
    </div>
  )
}

export default JoystickUI;