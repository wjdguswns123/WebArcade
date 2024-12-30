import React from 'react';
import '../css/GameInfoPopup.css';

const GameInfoPopup = ({ data, onClose, onStartGame }: {data: string, onClose: () => void, onStartGame: () => void}) => {
  return (
    <div className="game-info-popup-background">
      <div>{data}</div>
      <button className="close-Button" onClick={() => {onClose()}}>
        <img src="/Images/Icons/icon_close.png" alt="" />
      </button>
      <button onClick={() => {onStartGame()}}>{"시작"}</button>
    </div>
  )
}

export default GameInfoPopup;