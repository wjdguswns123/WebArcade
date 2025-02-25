import { OrthographicCamera } from '@react-three/drei';
import { Canvas, Vector3 } from '@react-three/fiber';
import React from 'react';
import Player from './Player';

interface ArcadeCanvasProps {
  move: number;
  rotate: number;
}

const ArcadeCanvas:React.FC<ArcadeCanvasProps> = ({move, rotate}) => {
  const degToRad = (deg: number) => {
    return (Math.PI / 180) * deg;
  };

  const drawFloor = () => {
    return (
      <mesh receiveShadow rotation={[degToRad(-90), 0, 0]}>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial color="#7D7D7D" />
      </mesh>
    );
  };

  const drawArcadeConsole = (pos: Vector3) => {
    return (
      <mesh castShadow position={pos} >
        <boxGeometry args={[4, 6, 3]} />
        <meshStandardMaterial color="#9BF7FF" />
      </mesh>
    );
  };

  return (
    <Canvas shadows style={{width: "100vw", height: "100vh"}}>
      <axesHelper args={[10]} />
      <group rotation={[0, degToRad(-45), 0]}>
        <OrthographicCamera makeDefault 
          near={0.1} 
          far={200} 
          position={[0, 15, 20]} 
          rotation={[degToRad(-30), 0, 0]} 
          zoom={30}  
        />
      </group>
      <directionalLight
        castShadow 
        shadow-camera-top={50}
        shadow-camera-bottom={-50}
        shadow-camera-left={-50}
        shadow-camera-right={50}

        position={[10, 10, 10]} 
        rotation={[0, degToRad(30), degToRad(30)]} 
        args={["#ffffff", 3]}
      />
      <group rotation={[0, 0, 0]}>
        {drawFloor()}
        {drawArcadeConsole([0, 3, -5])}
        {drawArcadeConsole([6, 3, -5])}
        <Player move={move} rotate={rotate} />
      </group>
    </Canvas>
  )
}

export default ArcadeCanvas;