import React, { useEffect } from 'react';
import { Unity, useUnityContext } from "react-unity-webgl";
import { GameInfo } from "../resources/gameInfo";
import '../css/GamePopup.css';

interface GamePopupProps {
  data: GameInfo;
  onClose: () => void;
}

const GamePopup:React.FC<GamePopupProps> = ({data, onClose}) => {
  const { unityProvider, sendMessage, addEventListener, removeEventListener } = useUnityContext({
    loaderUrl: `${data.buildPath}.loader.js`,
    dataUrl: `${data.buildPath}.data.unityweb`,
    frameworkUrl: `${data.buildPath}.framework.js.unityweb`,
    codeUrl: `${data.buildPath}.wasm.unityweb`,
  });

  const exitGame = () => {
    onClose();
  };

  useEffect(() => {
    addEventListener("CloseGamePopup", exitGame);

    return () => {
      removeEventListener("CloseGamePopup", exitGame);
    };
  }, [addEventListener, removeEventListener, exitGame]);

  const getWidth = () => {
    const width = data.isLandscape ? 80 * 1.78 : 80 * 0.5625;
    return `${width}vh`;
  };

  return (
    <div className="game-popup-background">
      <div className="game-popup-border-pink">
        <div className="game-popup-border-skyblue">
          <div className="game-popup-border-stroke">

          <button className="close-Button" onClick={() => {
            sendMessage("GameManager", "ReceiveExitGame");
          }}>
            <img src="/Images/Icons/icon_close.png" alt="" />
          </button>
          <p className="title">{data.name}</p>
          
          <Unity className="game-canvas" unityProvider={unityProvider}
            style={{ width: getWidth() }} />

          </div>
        </div>
      </div>
    </div>
  )
}

export default GamePopup;