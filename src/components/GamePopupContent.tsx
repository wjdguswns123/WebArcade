import React, { useEffect } from "react";
import { GameInfo } from "../resources/gameInfo";
import { Unity, useUnityContext } from "react-unity-webgl";
import '../css/GamePopup.css';

interface GamePopupContentProps {
  gameData: GameInfo;
  onClose: () => void;
}

const GamePopupContent:React.FC<GamePopupContentProps> = ({gameData, onClose}) => {
  const { unityProvider, sendMessage, addEventListener, removeEventListener } = useUnityContext({
    loaderUrl: `${gameData.buildPath}.loader.js`,
    dataUrl: `${gameData.buildPath}.data.unityweb`,
    frameworkUrl: `${gameData.buildPath}.framework.js.unityweb`,
    codeUrl: `${gameData.buildPath}.wasm.unityweb`,
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
      const width = gameData.isLandscape ? 80 * 1.78 : 80 * 0.5625;
      return `${width}vh`;
    };

  return (
    <>
      <button className="close-Button" onClick={() => {
        sendMessage("GameManager", "ReceiveExitGame");
      }}>
        <img src="/Images/Icons/icon_close.png" alt="" />
      </button>
      <p className="title">{gameData.name}</p>

      <Unity className="game-canvas" unityProvider={unityProvider}
        style={{ width: getWidth() }}
      />
    </>
  );
}

export default GamePopupContent;