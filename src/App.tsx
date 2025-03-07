import React, { useState, useCallback } from 'react';
import ArcadeCanvas from './components/Arcades/ArcadeCanvas';
import GameInfoPopup from './components/GameInfoPopup';
import GamePopup from './components/GamePopup';
import JoystickUI from './components/JoystickUI';
import { GameInfo, getInitGameInfo, gameInfos, loadGameInfo } from './resources/gameInfo';
import './App.css';

function App() {
  const [isShowGameInfoPopup, setIsShowGameInfoPopup] = useState(false);
  const [isPlayingGame, setIsPlayingGame] = useState(false);
  const [currentGameInfo, setCurrentGameInfo] = useState<GameInfo>(getInitGameInfo);

  const [moveState, setMoveState] = useState<number>(0);
  const [rotateState, setRotateState] = useState<number>(0);

  loadGameInfo();
  
  const showGameInfoPopup = useCallback((gameId: number) => {
    const info = gameInfos.find(i => i.id === gameId);
    setIsShowGameInfoPopup(true);
    setCurrentGameInfo(info ? info : getInitGameInfo);
  }, []);

  const closeGameInfoPopup = useCallback(() => {
    setIsShowGameInfoPopup(false);
    setCurrentGameInfo(getInitGameInfo);
  }, []);

  const startGame = useCallback(() => {
    setIsShowGameInfoPopup(false);
    setIsPlayingGame(true);
  }, []);

  const onUpMoveStart = () => {
    setMoveState(1);
  };

  const onUpMoveEnd = () => {
    setMoveState(0);
  };

  const onDownMoveStart = () => {
    setMoveState(-1);
  };

  const onDownMoveEnd = () => {
    setMoveState(0);
  };

  const onLeftKeyStart = () => {
    setRotateState(1);
  };

  const onRightKeyStart = () => {
    setRotateState(-1);
  };

  const onRotateKeyEnd = () => {
    setRotateState(0);
  };

  return (
    <div className="App">
      <ArcadeCanvas move={moveState} rotate={rotateState} onShowGameInfoPopup={showGameInfoPopup} onCloseGameInfoPopup={closeGameInfoPopup} />
      {isShowGameInfoPopup && 
        <div>
          <GameInfoPopup data={currentGameInfo} onClose={closeGameInfoPopup} onStartGame={startGame} />
        </div>
      }
      {isPlayingGame &&
        <GamePopup data={currentGameInfo} onClose={() => {
          setIsPlayingGame(false);
        }} />
      }
      <JoystickUI 
        onUpMoveStart={onUpMoveStart} onUpMoveEnd={onUpMoveEnd} 
        onDownMoveStart={onDownMoveStart} onDownMoveEnd={onDownMoveEnd}
        onLeftKeyStart={onLeftKeyStart} onLeftKeyEnd={onRotateKeyEnd}
        onRightKeyStart={onRightKeyStart} onRightKeyEnd={onRotateKeyEnd} />
    </div>
  );
}

export default App;
