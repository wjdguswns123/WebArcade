import { ContactShadows, OrthographicCamera } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
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
  return (
    <Canvas shadows style={{width: "100vw", height: "100vh"}}>
      {/* <axesHelper args={[10]} /> */}
      <group rotation={[0, degToRad(-45), 0]}>
        <OrthographicCamera makeDefault 
          near={0.1} 
          far={200} 
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
      <pointLight
        castShadow
        shadow-camera-top={50}
        shadow-camera-bottom={-50}
        shadow-camera-left={-50}
        shadow-camera-right={50}

        position={[0, 20, -14]} 
        args={["#ffffff", 3000]}
      />
      <pointLight
        castShadow
        shadow-camera-top={50}
        shadow-camera-bottom={-50}
        shadow-camera-left={-50}
        shadow-camera-right={50}

        position={[0, 20, 14]} 
        args={["#ffffff", 3000]}
      />
      <ContactShadows position={[0, -2, -0.16]} />
      <Physics>
        <group rotation={[0, 0, 0]}>
          <ArcadeRoom />
          <ArcadeConsole gameId={1} pos={[-4, 3, -6]} modelType={1} onShowGameInfoPopup={onShowGameInfoPopup} onCloseGameInfoPopup={onCloseGameInfoPopup} />
          <ArcadeConsole gameId={2} pos={[4, 3, -6]} modelType={1} onShowGameInfoPopup={onShowGameInfoPopup} onCloseGameInfoPopup={onCloseGameInfoPopup} />
          <ArcadeConsole gameId={0} pos={[12, 3, -6]} modelType={1} onShowGameInfoPopup={onShowGameInfoPopup} onCloseGameInfoPopup={onCloseGameInfoPopup} />

          <ArcadeConsole gameId={0} pos={[-13, 3, 8]} modelType={3} onShowGameInfoPopup={onShowGameInfoPopup} onCloseGameInfoPopup={onCloseGameInfoPopup} />
          <ArcadeConsole gameId={0} pos={[-6, 3, 8]} modelType={3} onShowGameInfoPopup={onShowGameInfoPopup} onCloseGameInfoPopup={onCloseGameInfoPopup} />

          <ArcadeConsole gameId={0} pos={[6, 3, 8]} modelType={2} onShowGameInfoPopup={onShowGameInfoPopup} onCloseGameInfoPopup={onCloseGameInfoPopup} />
          <ArcadeConsole gameId={0} pos={[13, 3, 8]} modelType={2} onShowGameInfoPopup={onShowGameInfoPopup} onCloseGameInfoPopup={onCloseGameInfoPopup} />

          <Player onShowGameInfoPopup={onShowGameInfoPopup} />
        </group>
      </Physics>
    </Canvas>
  )
}

export default ArcadeCanvas;