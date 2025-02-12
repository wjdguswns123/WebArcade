import React from 'react';
import '../css/JoystickUI.css';

const JoystickUI = () => {
  return (
    <div className="joystick">
      <div className="arrow-button up-arrow">
        <img className="arrow-img" src="Images/Icons/arrow.png" alt="" />
      </div>
      <div className="arrow-button left-arrow">
        <img className="arrow-img" src="Images/Icons/arrow.png" alt="" />
      </div>
      <div className="arrow-button right-arrow">
        <img className="arrow-img" src="Images/Icons/arrow.png" alt="" />
      </div>
      <div className="arrow-button down-arrow">
        <img className="arrow-img" src="Images/Icons/arrow.png" alt="" />
      </div>
    </div>
  )
}

export default JoystickUI;