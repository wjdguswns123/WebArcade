import { useKeyboardControls } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { CylinderCollider, RapierRigidBody, RigidBody } from '@react-three/rapier';
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { InputTypes, useInputStateStore } from '../../stores/InputStateStore';

interface PlayerProps {
  onShowGameInfoPopup: () => void;
}

const MOVE_SPEED = 10;
const ROTATE_SPEED = 5;

const Player:React.FC<PlayerProps> = ({onShowGameInfoPopup}) => {
  const playerRef = useRef<RapierRigidBody>(null);

  const [sub] = useKeyboardControls<InputTypes>();

  const { forward, backward, left, right, setInput } = useInputStateStore();

  useFrame(() => {
    if(playerRef && playerRef.current) {
      const moveValue = (forward ? 1 : 0) + (backward ? -1 : 0);
      const rotateValue = (left ? 1 : 0) + (right ? -1 : 0);

      const direction = new THREE.Vector3(0, 0, 1).applyQuaternion(playerRef.current.rotation());

      playerRef.current.setAngvel(new THREE.Vector3(0, rotateValue * ROTATE_SPEED, 0), true);
      playerRef.current.setLinvel(new THREE.Vector3(direction.x * moveValue * MOVE_SPEED, 0, direction.z * moveValue * MOVE_SPEED), true);
    }
  });

  useEffect(() => {
    return sub((state) => {
      if(state.forward) setInput("forward", true);
      if(state.backward) setInput("backward", true);
      if(state.left) setInput("left", true);
      if(state.right) setInput("right", true);
      if(state.space) {
        onShowGameInfoPopup();
      }

      if(!state.forward) setInput("forward", false);
      if(!state.backward) setInput("backward", false);
      if(!state.left) setInput("left", false);
      if(!state.right) setInput("right", false);
    });
  }, []);

  return (
    <group position={[0, 2, 2]} >
      <RigidBody colliders={false} ref={playerRef} >
        <CylinderCollider args={[1, 1]} position={[0, -1, 0]} />
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