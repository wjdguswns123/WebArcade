import { ContactShadows, OrthographicCamera } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Physics, RigidBody } from '@react-three/rapier';
import React from 'react';
import Player from './Player';
import ArcadeConsole from './ArcadeConsole';

interface ArcadeCanvasProps {
  onShowGameInfoPopup: () => void;
  onCloseGameInfoPopup: () => void;
}

const ArcadeCanvas:React.FC<ArcadeCanvasProps> = ({onShowGameInfoPopup, onCloseGameInfoPopup}) => {
  const degToRad = (deg: number) => {
    return (Math.PI / 180) * deg;
  };

  const drawFloor = () => {
    return (
      <RigidBody>
        <mesh receiveShadow rotation={[degToRad(-90), 0, 0]}>
          <planeGeometry args={[50, 50]} />
          <meshStandardMaterial color="#7D7D7D" />
        </mesh>
      </RigidBody>
    );
  };

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

        position={[0, 20, 0]} 
        args={["#ffffff", 2000]}
       />
      <ContactShadows position={[0, -2, -0.16]} />
      <Physics>
        <group rotation={[0, 0, 0]}>
          {drawFloor()}
          <ArcadeConsole gameId={1} pos={[-4, 3, -5]} onShowGameInfoPopup={onShowGameInfoPopup} onCloseGameInfoPopup={onCloseGameInfoPopup} />
          <ArcadeConsole gameId={2} pos={[4, 3, -5]} onShowGameInfoPopup={onShowGameInfoPopup} onCloseGameInfoPopup={onCloseGameInfoPopup} />
          <Player onShowGameInfoPopup={onShowGameInfoPopup} />
        </group>
      </Physics>
    </Canvas>
  )
}

export default ArcadeCanvas;