import { Vector3 } from '@react-three/fiber';
import { CuboidCollider, RigidBody } from '@react-three/rapier';
import React, { useState } from 'react';

interface ArcadeConsoleProps {
  pos: Vector3;
}

const ArcadeConsole:React.FC<ArcadeConsoleProps> = ({pos}) => {
  const [isEnter, setIsEnter] = useState(false);

  const OnArcadeConsoleZoneEnter = (payload) => {
    console.log("들어옴", payload);
    setIsEnter(true);
  };

  const OnArcadeConsoleZoneExit = () => {
    console.log("나감");
    setIsEnter(false);
  };

  return (
    <RigidBody type="fixed" position={pos} >
      <CuboidCollider 
        sensor 
        args={[2, 2, 2]} 
        position={[0, -1, 3.5]} 
        onIntersectionEnter={OnArcadeConsoleZoneEnter}
        onIntersectionExit={OnArcadeConsoleZoneExit}
      />
      <mesh castShadow >
        <boxGeometry args={[4, 6, 3]} />
        <meshStandardMaterial color="#9BF7FF" />
      </mesh>
      {isEnter &&
        <mesh position={[0, 5, 0]}>
          <boxGeometry args={[1, 2, 1]} />
          <meshStandardMaterial color="#FF1111" />
        </mesh>
      }
    </RigidBody>
  )
}

export default ArcadeConsole;