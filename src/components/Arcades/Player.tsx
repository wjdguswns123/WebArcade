import { useFrame } from '@react-three/fiber';
import { CylinderCollider, RapierRigidBody, RigidBody } from '@react-three/rapier';
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface PlayerProps {
  move: number;
  rotate: number;
}

const MOVE_SPEED = 10;
const ROTATE_SPEED = 5;

const Player:React.FC<PlayerProps> = ({move, rotate}) => {
  const [isMove, setIsMove] = useState<number>(0);
  const [isRotate, setIsRotate] = useState<number>(0);

  const playerRef = useRef<RapierRigidBody>(null);
  const pressedKeys = useRef<Record<string, boolean>>({});

  useFrame(() => {
    if(playerRef && playerRef.current) {
      const moveValue = isMove !== 0 ? isMove : (move !== 0 ? move : 0);
      const rotateValue = isRotate !== 0 ? isRotate : (rotate !== 0 ? rotate : 0);

      const direction = new THREE.Vector3(0, 0, 1).applyQuaternion(playerRef.current.rotation());

      playerRef.current.setAngvel(new THREE.Vector3(0, rotateValue * ROTATE_SPEED, 0), true);
      playerRef.current.setLinvel(new THREE.Vector3(direction.x * moveValue * MOVE_SPEED, 0, direction.z * moveValue * MOVE_SPEED), true);
    }
  });

  const handleKeyDown = (e: KeyboardEvent) => {
    if(!pressedKeys.current[e.key]) {
      pressedKeys.current[e.key] = true;
    }
    
    setIsMove((pressedKeys.current["ArrowUp"] ? 1 : 0) + (pressedKeys.current["ArrowDown"] ? -1 : 0));
    setIsRotate((pressedKeys.current["ArrowLeft"] ? 1 : 0) + (pressedKeys.current["ArrowRight"] ? -1 : 0));
  };

  const handleKeyUp = (e: KeyboardEvent) => {
    delete pressedKeys.current[e.key];

    setIsMove((pressedKeys.current["ArrowUp"] ? 1 : 0) + (pressedKeys.current["ArrowDown"] ? -1 : 0));
    setIsRotate((pressedKeys.current["ArrowLeft"] ? 1 : 0) + (pressedKeys.current["ArrowRight"] ? -1 : 0));
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return (
    <group position={[0, 2, 2]} >
      <RigidBody colliders={false} ref={playerRef} >
        <CylinderCollider args={[1, 1]} position={[0, -1, 0]} onCollisionEnter={() => {console.log("오락기 충돌돌");}} />
        <mesh castShadow >
          <capsuleGeometry args={[1, 2]} />
          <meshStandardMaterial color="#00ffff" />
        </mesh>
        <mesh position={[0, 0, 2]}>
          <boxGeometry args={[1, 1]} />
          <meshStandardMaterial color="#00ffff" />
        </mesh> 
      </RigidBody>
    </group>
  );
}

export default Player;