import { useState, useCallback, useEffect } from 'react';
import { KeyboardControls } from '@react-three/drei';
import ArcadeCanvas from './components/Arcades/ArcadeCanvas';
import GameInfoPopup from './components/GameInfoPopup';
import GamePopup from './components/GamePopup';
import JoystickUI from './components/JoystickUI';
import MainUI from './components/MainUI';
import { getInitGameInfo, gameInfos, loadGameInfo } from './resources/gameInfo';
import { useGameDataStore } from './stores/GameDataStore';
import './App.css';

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

  const setSelectGameInfo = useGameDataStore(state => state.setSelectGameInfo);

  loadGameInfo();
  
  const showGameInfoPopup = useCallback(() => {
    if(useGameDataStore.getState().selectGameID !== 0) {
      const info = gameInfos.find(i => i.id === useGameDataStore.getState().selectGameID);
      setIsShowGameInfoPopup(true);
      setSelectGameInfo(info ? info : getInitGameInfo());
    }
  }, []);

  const closeGameInfoPopup = useCallback(() => {
    setIsShowGameInfoPopup(false);
  }, []);

  const completeCloseGameInfoPopup = useCallback(() => {
    if(!isPlayingGame) {
      setSelectGameInfo(getInitGameInfo());
    }
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
        <GameInfoPopup isShow={isShowGameInfoPopup} onClose={closeGameInfoPopup} onCompleteClose={completeCloseGameInfoPopup} onStartGame={startGame} />
        <GamePopup isShow={isPlayingGame} onClose={() => {
          setIsPlayingGame(false);
        }} />
        <JoystickUI />
      </KeyboardControls>
    </div>
  );
}

export default App;
