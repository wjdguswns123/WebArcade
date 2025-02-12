import React, { useState, useEffect, useCallback } from 'react';
import { Unity, useUnityContext } from "react-unity-webgl";
import GameInfoPopup from './components/GameInfoPopup';
import GamePopup from './components/GamePopup';
import JoystickUI from './components/JoystickUI';
import { GameInfo, gameInfos, loadGameInfo } from './resources/gameInfo';
import './App.css';

function App() {
  const [isShowGameInfoPopup, setIsShowGameInfoPopup] = useState(false);
  const [currentGameInfo, setCurrentGameInfo] = useState<GameInfo>();
  const [isPlayingGame, setIsPlayingGame] = useState(false);

  const { unityProvider, addEventListener, removeEventListener } = useUnityContext({
    loaderUrl: "Build/Output.loader.js",
    dataUrl: "Build/Output.data.unityweb",
    frameworkUrl: "Build/Output.framework.js.unityweb",
    codeUrl: "Build/Output.wasm.unityweb",
  });

  loadGameInfo();
  
  const showGameInfoPopup = useCallback((data: number) => {
    const info = gameInfos.find(i => i.id === data);
    setIsShowGameInfoPopup(true);
    setCurrentGameInfo(info);
  }, []);

  const closeGameInfoPopup = useCallback(() => {
    setIsShowGameInfoPopup(false);
    setCurrentGameInfo(null);
  }, []);

  const startGame = useCallback(() => {
    setIsShowGameInfoPopup(false);
    setIsPlayingGame(true);
  }, []);

  useEffect(() => {
    addEventListener("ShowGameInfoPage", showGameInfoPopup);
    addEventListener("CloseGameInfoPage", closeGameInfoPopup);

    return () => {
      removeEventListener("ShowGameInfoPage", showGameInfoPopup);
      removeEventListener("CloseGameInfoPage", closeGameInfoPopup);
    };
  }, [addEventListener, removeEventListener, showGameInfoPopup, closeGameInfoPopup]);

  return (
    <div className="App">
      <Unity unityProvider={unityProvider}
        style={{ width: "100vw", height: "100vh" }}/>
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
    </div>
  );
}

export default App;
