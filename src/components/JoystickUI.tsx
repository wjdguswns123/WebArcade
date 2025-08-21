import React from 'react';
import '../css/JoystickUI.css';
import { useInputStateStore } from '../stores/InputStateStore';

const JoystickUI = () => {
  const { setInput } = useInputStateStore();

  return (
    <div className="joystick">
      <div className="arrow-button up-arrow"
        onMouseDown={() => { setInput("forward", true); }} 
        onMouseUp={() => { setInput("forward", false); }}
        onMouseLeave={() => { setInput("forward", false); }}
        onTouchStart={() => { setInput("forward", true); }}
        onTouchEnd={() => { setInput("forward", false); }}
      >
        <img className="arrow-img" src="Images/Icons/arrow.png" alt="" onContextMenu={(e) => e.preventDefault()} />
      </div>
      <div className="arrow-button left-arrow" 
        onMouseDown={() => { setInput("left", true); }} 
        onMouseUp={() => { setInput("left", false); }}
        onMouseLeave={() => { setInput("left", false); }}
        onTouchStart={() => { setInput("left", true); }}
        onTouchEnd={() => { setInput("left", false); }}
      >
        <img className="arrow-img" src="Images/Icons/arrow.png" alt="" onContextMenu={(e) => e.preventDefault()} />
      </div>
      <div className="arrow-button right-arrow" 
        onMouseDown={() => { setInput("right", true); }} 
        onMouseUp={() => { setInput("right", false); }}
        onMouseLeave={() => { setInput("right", false); }}
        onTouchStart={() => { setInput("right", true); }}
        onTouchEnd={() => { setInput("right", false); }}
      >
        <img className="arrow-img" src="Images/Icons/arrow.png" alt="" onContextMenu={(e) => e.preventDefault()} />
      </div>
      <div className="arrow-button down-arrow" 
        onMouseDown={() => { setInput("backward", true); }} 
        onMouseUp={() => { setInput("backward", false); }}
        onMouseLeave={() => { setInput("backward", false); }}
        onTouchStart={() => { setInput("backward", true); }}
        onTouchEnd={() => { setInput("backward", false); }}
      >
        <img className="arrow-img" src="Images/Icons/arrow.png" alt="" onContextMenu={(e) => e.preventDefault()} />
      </div>
    </div>
  )
}

export default JoystickUI;