import React, { useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { useGameDataStore } from '../stores/GameDataStore';
import GamePopupContent from '../components/GamePopupContent';
import '../css/GamePopup.css';

interface GamePopupProps {
  isShow: boolean;
  onClose: () => void;
}

const GamePopup:React.FC<GamePopupProps> = ({isShow, onClose}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const nodeRef = useRef<HTMLDivElement>(null);

  const gameData = useGameDataStore.getState().selectGameInfo;

  return (
    <CSSTransition
      nodeRef={nodeRef}
      in={isShow}
      timeout={300}

      classNames={{
        enter: "",
        enterActive: "popupOpen",
        exit: "",
        exitActive: "popupClose",
        appear: "",
        appearActive: "",
      }}

      onEntering={() => {
        setIsLoaded(true);
      }}
      mountOnEnter
      unmountOnExit
    >
      <div className="game-popup-background" ref={nodeRef}>
        <div className="game-popup-border-pink">
          <div className="game-popup-border-skyblue">
            <div className="game-popup-border-stroke">
            
            {isLoaded && <GamePopupContent gameData={gameData} onClose={onClose} />};

            </div>
          </div>
        </div>
      </div>
    </CSSTransition>
    
  )
}

export default GamePopup;