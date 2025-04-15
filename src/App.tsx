import React, { useState, useCallback } from 'react';
import { KeyboardControls } from '@react-three/drei';
import ArcadeCanvas from './components/Arcades/ArcadeCanvas';
import GameInfoPopup from './components/GameInfoPopup';
import GamePopup from './components/GamePopup';
import JoystickUI from './components/JoystickUI';
import { GameInfo, getInitGameInfo, gameInfos, loadGameInfo } from './resources/gameInfo';
import { useGameDataStore } from './stores/GameDataStore';
import './App.css';
import MainUI from './components/MainUI';

const keyMap = [
  { name: "forward", keys: ["ArrowUp"] },
  { name: "backward", keys: ["ArrowDown"] },
  { name: "left", keys: ["ArrowLeft"] },
  { name: "right", keys: ["ArrowRight"] },
  { name: "space", keys: ["Space"] },
];

function App() {
  const [isShowGameInfoPopup, setIsShowGameInfoPopup] = useState(false);
  const [isPlayingGame, setIsPlayingGame] = useState(false);
  const [currentGameInfo, setCurrentGameInfo] = useState<GameInfo>(getInitGameInfo);

  loadGameInfo();
  
  const showGameInfoPopup = useCallback(() => {
    if(useGameDataStore.getState().selectGameID !== 0) {
      const info = gameInfos.find(i => i.id === useGameDataStore.getState().selectGameID);
      setIsShowGameInfoPopup(true);
      setCurrentGameInfo(info ? info : getInitGameInfo);
    }
  }, []);

  const closeGameInfoPopup = useCallback(() => {
    setIsShowGameInfoPopup(false);
    setCurrentGameInfo(getInitGameInfo);
  }, []);

  const startGame = useCallback(() => {
    setIsShowGameInfoPopup(false);
    setIsPlayingGame(true);
  }, []);

  return (
    <div className="App">
      <MainUI />
      <KeyboardControls map={keyMap}>
        <ArcadeCanvas onShowGameInfoPopup={showGameInfoPopup} onCloseGameInfoPopup={closeGameInfoPopup} />
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
        <JoystickUI />
      </KeyboardControls>
    </div>
  );
}

export default App;
