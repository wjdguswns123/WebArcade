import React, { useRef } from 'react';
import { CSSTransition } from "react-transition-group";
import { useGameDataStore } from '../stores/GameDataStore';
import '../css/GameInfoPopup.css';

interface GameInfoPopupProps {
  isShow: boolean;
  onClose: () => void;
  onCompleteClose: () => void;
  onStartGame: () => void;
}

const GameInfoPopup:React.FC<GameInfoPopupProps> = ({ isShow, onClose, onCompleteClose, onStartGame }) => {
  const nodeRef = useRef<HTMLDivElement>(null);

  const gameData = useGameDataStore.getState().selectGameInfo;

  const drawScreenShots = () => {
    return (
      <div className="screenshots">
        {
          gameData.screenShots.map((res, index) => {
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
    <CSSTransition 
      nodeRef={nodeRef} 
      in={isShow} 
      timeout={1000}
      classNames={{
        enter: "",
        enterActive: "popupOpen",
        exit: "",
        exitActive: "popupClose",
        appear: "",
        appearActive: "",
      }}
      onExited={onCompleteClose}
      mountOnEnter
      unmountOnExit >
      <div className="game-info-popup-background" ref={nodeRef}>
        <div className="game-info-popup-border-pink">
          <div className="game-info-popup-border-skyblue">
            <div className="game-info-popup-border-stroke">

              <button className="close-Button" onClick={onClose}>
                <img src="/Images/Icons/icon_close.png" alt="" />
              </button>

              <p className="title">{gameData.name}</p>
              <p className="description">{gameData.description}</p>
              
              {drawScreenShots()}
              
              <button className="start-button" onClick={onStartGame}>{"게임 시작"}</button>

            </div>
          </div>
        </div>
      </div>
    </CSSTransition>
  )
}

export default GameInfoPopup;