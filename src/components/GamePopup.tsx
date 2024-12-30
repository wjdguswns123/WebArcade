import React from 'react';
import '../css/GamePopup.css';

const GamePopup = ({title, onClose}: {title: string, onClose: () => void}) => {
  return (
    <div className="game-popup-background">
      {title}
      <button onClick={() => {onClose()}}>
        <img src="/Images/Icons/icon_close.png" alt="" />
      </button>
    </div>
  )
}

export default GamePopup;