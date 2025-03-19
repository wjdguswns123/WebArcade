import React from 'react';
import { GameInfo } from "../resources/gameInfo";
import '../css/GameInfoPopup.css';

interface GameInfoPopupProps {
  data: GameInfo;
  onClose: () => void;
  onStartGame: () => void;
}

const GameInfoPopup:React.FC<GameInfoPopupProps> = ({ data, onClose, onStartGame }) => {
  const drawScreenShots = () => {
    return (
      <div className="screenshots">
        {
          data.screenShots.map((res, index) => {
            const path = "Images/ScreenShots/" + res;
            return (
              <img key={index} src={path} alt="" />
            );
          })
        }
      </div>
    );
  };

  return (
    <div className="game-info-popup-background">
      <button className="close-Button" onClick={onClose}>
        <img src="/Images/Icons/icon_close.png" alt="" />
      </button>

      <p className="title">{data.name}</p>
      <p className="description">{data.description}</p>
      
      {drawScreenShots()}
      
      <button className="start-button" onClick={onStartGame}>{"게임 시작"}</button>
    </div>
  )
}

export default GameInfoPopup;