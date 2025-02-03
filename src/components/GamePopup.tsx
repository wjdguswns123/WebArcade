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

  return (
    <div className="game-popup-background">
      <div className="titleBar">
        <p>{data.name}</p>
        <button onClick={() => {
          sendMessage("GameManager", "ReceiveExitGame");
        }}>
          <img src="/Images/Icons/icon_close.png" alt="" />
        </button>
      </div>
      
      <Unity unityProvider={unityProvider}
        style={data.isLandscape 
          ? { width: "90%", height: "90%" } 
          : { width: "50.625%", height: "90%" }}/>
    </div>
  )
}

export default GamePopup;