import React from 'react';
import { GameInfo } from "../resources/gameInfo";
import '../css/GameInfoPopup.css';

interface GameInfoPopupProps {
  data: GameInfo;
  onClose: () => void;
  onStartGame: () => void;
}

const GameInfoPopup:React.FC<GameInfoPopupProps> = ({ data, onClose, onStartGame }) => {
  return (
    <div className="game-info-popup-background">
      <div className="titleBar">
        <p>{data.name}</p>
        <p>{data.description}</p>
        <button className="close-Button" onClick={onClose}>
          <img src="/Images/Icons/icon_close.png" alt="" />
        </button>
      </div>
      
      <button onClick={onStartGame}>{"시작"}</button>
    </div>
  )
}

export default GameInfoPopup;