import React from 'react';
import '../css/JoystickUI.css';

interface JoystickUIProps {
  onUpMoveStart: () => void;
  onUpMoveEnd: () => void;
  onDownMoveStart: () => void;
  onDownMoveEnd: () => void;
  onLeftKeyStart: () => void;
  onLeftKeyEnd: () => void;
  onRightKeyStart: () => void;
  onRightKeyEnd: () => void;
}

const JoystickUI:React.FC<JoystickUIProps> = ({onUpMoveStart, onUpMoveEnd, onDownMoveStart, onDownMoveEnd, onLeftKeyStart, onLeftKeyEnd, onRightKeyStart, onRightKeyEnd}) => {
  return (
    <div className="joystick">
      <div className="arrow-button up-arrow" onMouseDown={onUpMoveStart} onMouseUp={onUpMoveEnd} onMouseLeave={onUpMoveEnd} >
        <img className="arrow-img" src="Images/Icons/arrow.png" alt="" />
      </div>
      <div className="arrow-button left-arrow" onMouseDown={onLeftKeyStart} onMouseUp={onLeftKeyEnd} onMouseLeave={onLeftKeyEnd} >
        <img className="arrow-img" src="Images/Icons/arrow.png" alt="" />
      </div>
      <div className="arrow-button right-arrow" onMouseDown={onRightKeyStart} onMouseUp={onRightKeyEnd} onMouseLeave={onRightKeyEnd} >
        <img className="arrow-img" src="Images/Icons/arrow.png" alt="" />
      </div>
      <div className="arrow-button down-arrow" onMouseDown={onDownMoveStart} onMouseUp={onDownMoveEnd} onMouseLeave={onDownMoveEnd} >
        <img className="arrow-img" src="Images/Icons/arrow.png" alt="" />
      </div>
    </div>
  )
}

export default JoystickUI;