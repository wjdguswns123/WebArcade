import { ContactShadows, OrthographicCamera } from '@react-three/drei';
import { Canvas, Vector3 } from '@react-three/fiber';
import { Physics } from '@react-three/rapier';
import React from 'react';
import Player from './Player';
import ArcadeConsole from './ArcadeConsole';
import ArcadeRoom from './ArcadeRoom';
import { degToRad } from '../../Utils/utils';

interface ArcadeCanvasProps {
  onShowGameInfoPopup: () => void;
  onCloseGameInfoPopup: () => void;
}

const ArcadeCanvas:React.FC<ArcadeCanvasProps> = ({onShowGameInfoPopup, onCloseGameInfoPopup}) => {
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

  return (
    <Canvas shadows style={{width: "100vw", height: "100vh"}}>
      {/* <axesHelper args={[10]} /> */}
      <group rotation={[0, degToRad(-45), 0]}>
        <OrthographicCamera makeDefault 
          near={0.1} 
          far={500} 
          position={[0, 15, 20]} 
          rotation={[degToRad(-30), 0, 0]} 
          zoom={30}  
        />
      </group>
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
      <Physics>
        <group rotation={[0, 0, 0]}>
          <ArcadeRoom />
          <ArcadeConsole gameId={1} pos={[-4, 3, -6]} modelType={1} onShowGameInfoPopup={onShowGameInfoPopup} onCloseGameInfoPopup={onCloseGameInfoPopup} />
          <ArcadeConsole gameId={2} pos={[4, 3, -6]} modelType={1} onShowGameInfoPopup={onShowGameInfoPopup} onCloseGameInfoPopup={onCloseGameInfoPopup} />
          <ArcadeConsole gameId={0} pos={[12, 3, -6]} modelType={1} onShowGameInfoPopup={onShowGameInfoPopup} onCloseGameInfoPopup={onCloseGameInfoPopup} />

          <ArcadeConsole gameId={0} pos={[-13, 3, 10]} modelType={3} onShowGameInfoPopup={onShowGameInfoPopup} onCloseGameInfoPopup={onCloseGameInfoPopup} />
          <ArcadeConsole gameId={0} pos={[-6, 3, 10]} modelType={3} onShowGameInfoPopup={onShowGameInfoPopup} onCloseGameInfoPopup={onCloseGameInfoPopup} />

          <ArcadeConsole gameId={0} pos={[6, 3, 10]} modelType={2} onShowGameInfoPopup={onShowGameInfoPopup} onCloseGameInfoPopup={onCloseGameInfoPopup} />
          <ArcadeConsole gameId={0} pos={[13, 3, 10]} modelType={2} onShowGameInfoPopup={onShowGameInfoPopup} onCloseGameInfoPopup={onCloseGameInfoPopup} />

          <Player onShowGameInfoPopup={onShowGameInfoPopup} />
        </group>
      </Physics>
    </Canvas>
  )
}

export default ArcadeCanvas;