import { useFrame } from '@react-three/fiber';
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface PlayerProps {
  move: number;
  rotate: number;
}

const Player:React.FC<PlayerProps> = ({move, rotate}) => {
  const [playerPosition, setPlayerPosition] = useState<THREE.Vector3>(new THREE.Vector3(0, 0, 0));
  const [playerRotation, setPlayerRotation] = useState<THREE.Vector3>(new THREE.Vector3(0, 0, 0));
  const [isMove, setIsMove] = useState<number>(0);
  const [isRotate, setIsRotate] = useState<number>(0);

  const playerRef = useRef<THREE.Group>(null);
  const pressedKeys = useRef<Record<string, boolean>>({});

  useFrame(() => {
    if(playerRef.current) {
      let pos = playerPosition;
      let rot = playerRotation;

      const moveValue = isMove !== 0 ? isMove : (move !== 0 ? move : 0);
      const rotateValue = isRotate !== 0 ? isRotate : (rotate !== 0 ? rotate : 0);

      let dir: THREE.Vector3 = new THREE.Vector3();
      playerRef.current.getWorldDirection(dir);
      pos.x += dir.x * moveValue * 0.1;
      pos.z += dir.z * moveValue * 0.1;

      if(rot) {
        rot.y += rotateValue * 0.05;
      }
      
      playerRef.current.position.set(pos.x, pos.y, pos.z);
      setPlayerPosition(pos);

      playerRef.current.rotation.set(rot.x, rot.y, rot.z);
      setPlayerRotation(rot);
    }
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if(!pressedKeys.current[e.key]) {
        pressedKeys.current[e.key] = true;
      }

      if(pressedKeys.current["ArrowUp"]) {
        setIsMove(1);
      } else if(pressedKeys.current["ArrowDown"]) {
        setIsMove(-1);
      }

      if(pressedKeys.current["ArrowRight"]) {
        setIsRotate(-1);
      } else if(pressedKeys.current["ArrowLeft"]) {
        setIsRotate(1);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      delete pressedKeys.current[e.key];

      if(e.key === "ArrowUp" || e.key === "ArrowDown") {
        setIsMove(0);
      }

      if(e.key === "ArrowRight" || e.key === "ArrowLeft") {
        setIsRotate(0);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return (
    <group ref={playerRef}>
      <mesh castShadow position={[0, 2, 0]}>
        <capsuleGeometry args={[1, 2]} />
        <meshStandardMaterial color="#00ffff" />
      </mesh>
      <mesh position={[0, 2, 2]}>
        <boxGeometry args={[1, 1]} />
        <meshStandardMaterial color="#00ffff" />
      </mesh>
    </group>
  );
}

export default Player;