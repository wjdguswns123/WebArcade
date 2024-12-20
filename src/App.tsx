import React, { useState, useEffect, useCallback } from 'react';
import { Unity, useUnityContext } from "react-unity-webgl";
import GameInfoPopup from './components/GameInfoPopup';
import './App.css';

function App() {
  const [isShowGameInfoPopup, setIsShowGameInfoPopup] = useState(false);
  const [currentGameInfo, setCurrentGameInfo] = useState("");

  const { unityProvider, addEventListener, removeEventListener } = useUnityContext({
    loaderUrl: "Build/Output.loader.js",
    dataUrl: "Build/Output.data.unityweb",
    frameworkUrl: "Build/Output.framework.js.unityweb",
    codeUrl: "Build/Output.wasm.unityweb",
  });

  const showGameInfoPopup = useCallback((data: string) => {
    setIsShowGameInfoPopup(true);
    setCurrentGameInfo(data);    
  }, []);

  const closeGameInfoPopup = useCallback(() => {
    setIsShowGameInfoPopup(false);
    setCurrentGameInfo("");
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
          <GameInfoPopup data={currentGameInfo} />
        </div>
      }
    </div>
  );
}

export default App;
