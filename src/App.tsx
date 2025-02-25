import React, { useState, useEffect, useCallback } from 'react';
import { Unity, useUnityContext } from "react-unity-webgl";
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

  // useEffect(() => {
  //   addEventListener("ShowGameInfoPage", showGameInfoPopup);
  //   addEventListener("CloseGameInfoPage", closeGameInfoPopup);

  //   return () => {
  //     removeEventListener("ShowGameInfoPage", showGameInfoPopup);
  //     removeEventListener("CloseGameInfoPage", closeGameInfoPopup);
  //   };
  // }, [addEventListener, removeEventListener, showGameInfoPopup, closeGameInfoPopup]);

  // const setMovePlayer = () => {
  //   console.log(upSpeed);
  // };

  const onUpMoveStart = () => {
    console.log("위로 이동 시작");
    setMoveState(1);
  };

  const onUpMoveEnd = () => {
    console.log("위로 이동 끝");
    setMoveState(0);
  };

  const onDownMoveStart = () => {
    console.log("아래로");
    setMoveState(-1);
  };

  const onDownMoveEnd = () => {
    console.log("아래로");
    setMoveState(0);
  };

  const onLeftKeyStart = () => {
    console.log("왼쪽으로");
    setRotateState(1);
  };

  const onRightKeyStart = () => {
    console.log("오른쪽으으로");
    setRotateState(-1);
  };

  const onRotateKeyEnd = () => {
    setRotateState(0);
  };

  return (
    <div className="App">
      {/* <Unity unityProvider={unityProvider}
        style={{ width: "100vw", height: "100vh" }}/> */}
      <ArcadeCanvas move={moveState} rotate={rotateState} />
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
