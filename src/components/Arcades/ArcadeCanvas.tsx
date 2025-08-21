import { ContactShadows } from '@react-three/drei';
import { Canvas, Vector3 } from '@react-three/fiber';
import { Physics } from '@react-three/rapier';
import React, { Suspense, useEffect, useState } from 'react';
import Player from './Player';
import ArcadeConsole from './ArcadeConsole';
import ArcadeRoom from './ArcadeRoom';
import LoadingUI from '../LoadingUI';

interface ArcadeCanvasProps {
  onShowGameInfoPopup: () => void;
  onCloseGameInfoPopup: () => void;
}

const baseWidth = 1920; // 가로 해상도 기준 값.

const ArcadeCanvas:React.FC<ArcadeCanvasProps> = ({onShowGameInfoPopup, onCloseGameInfoPopup}) => {
  const [widthRatio, setWidthRatio] = useState(1);

  const setPointLight = (pos: Vector3) => {
    return (
      <pointLight
        castShadow
        shadow-camera-top={50}
        shadow-camera-bottom={-50}
        shadow-camera-left={-50}
        shadow-camera-right={50}

        position={pos} 
        args={["#ffffff", 3000]}
      />
    );
  };

  const resizeWindow = () => {
    setWidthRatio(window.innerWidth / baseWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", resizeWindow);
    return () => {
      window.removeEventListener("resize", resizeWindow);
    };
  }, []);

  return (
    <Canvas shadows style={{width: "100vw", height: "100vh"}}>
      <Suspense fallback={<LoadingUI />}>
        {/* <axesHelper args={[10]} /> */}
        {/* <directionalLight
          castShadow 
          shadow-camera-top={50}
          shadow-camera-bottom={-50}
          shadow-camera-left={-50}
          shadow-camera-right={50}

          position={[10, 10, 10]} 
          rotation={[0, degToRad(30), degToRad(30)]} 
          args={["#ffffff", 7]}
        /> */}
        {setPointLight([0, 20, -14])}
        {setPointLight([0, 20, 14])}
        <ContactShadows position={[0, -2, -0.16]} />
        <Physics /*debug*/>
          <group rotation={[0, 0, 0]}>
            <ArcadeRoom />
            <ArcadeConsole gameId={1} pos={[-4, 3, -6]} modelType={1} onShowGameInfoPopup={onShowGameInfoPopup} onCloseGameInfoPopup={onCloseGameInfoPopup} />
            <ArcadeConsole gameId={2} pos={[4, 3, -6]} modelType={1} onShowGameInfoPopup={onShowGameInfoPopup} onCloseGameInfoPopup={onCloseGameInfoPopup} />
            <ArcadeConsole gameId={0} pos={[12, 3, -6]} modelType={1} onShowGameInfoPopup={onShowGameInfoPopup} onCloseGameInfoPopup={onCloseGameInfoPopup} />

            <ArcadeConsole gameId={0} pos={[-13, 3, 10]} modelType={3} onShowGameInfoPopup={onShowGameInfoPopup} onCloseGameInfoPopup={onCloseGameInfoPopup} />
            <ArcadeConsole gameId={0} pos={[-6, 3, 10]} modelType={3} onShowGameInfoPopup={onShowGameInfoPopup} onCloseGameInfoPopup={onCloseGameInfoPopup} />

            <ArcadeConsole gameId={0} pos={[6, 3, 10]} modelType={2} onShowGameInfoPopup={onShowGameInfoPopup} onCloseGameInfoPopup={onCloseGameInfoPopup} />
            <ArcadeConsole gameId={0} pos={[13, 3, 10]} modelType={2} onShowGameInfoPopup={onShowGameInfoPopup} onCloseGameInfoPopup={onCloseGameInfoPopup} />

            <Player widthRatio={widthRatio} onShowGameInfoPopup={onShowGameInfoPopup} />
          </group>
        </Physics>
      </Suspense>
    </Canvas>
  )
}

export default ArcadeCanvas;