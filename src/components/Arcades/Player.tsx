import { useAnimations, useKeyboardControls } from '@react-three/drei';
import { useFrame, useLoader } from '@react-three/fiber';
import { CylinderCollider, RapierRigidBody, RigidBody } from '@react-three/rapier';
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { InputTypes, useInputStateStore } from '../../stores/InputStateStore';
import { GLTFLoader } from 'three/examples/jsm/Addons.js';

interface PlayerProps {
  onShowGameInfoPopup: () => void;
}

const MOVE_SPEED = 7;
const ROTATE_SPEED = 5;

const Player:React.FC<PlayerProps> = ({onShowGameInfoPopup}) => {
  const [action, setAction] = useState("Idle");
  const model = useLoader(GLTFLoader, "Models/Character/scene.gltf");
  const animations = useAnimations(model.animations, model.scene);

  const playerRef = useRef<RapierRigidBody>(null);

  const [sub] = useKeyboardControls<InputTypes>();

  const { forward, backward, left, right, setInput } = useInputStateStore();

  const playAnimation = (action: string) => {
    Object.values(animations.actions).forEach((action) => action?.stop());
    const animation = animations.actions[action];
    animation?.play().fadeIn(0.2);
    animation?.setEffectiveTimeScale(1.5);
  };

  useFrame(() => {
    if(playerRef && playerRef.current) {
      const moveValue = (forward ? 1 : 0) + (backward ? -1 : 0);
      const rotateValue = (left ? 1 : 0) + (right ? -1 : 0);

      const direction = new THREE.Vector3(0, 0, 1).applyQuaternion(playerRef.current.rotation());

      playerRef.current.setAngvel(new THREE.Vector3(0, rotateValue * ROTATE_SPEED, 0), true);
      playerRef.current.setLinvel(new THREE.Vector3(direction.x * moveValue * MOVE_SPEED, 0, direction.z * moveValue * MOVE_SPEED), true);

      if((moveValue === 1 || moveValue === -1) && action !== "Walk") setAction("Walk");
      if((moveValue === 0) && action !== "Idle") setAction("Idle");
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

  useEffect(() => {
    model.scene.traverse((child) => {
      child.castShadow = true;
  });
  }, [model.scene]);

  useEffect(() => {
    playAnimation(action);
  }, [model, action]);

  return (
    <group position={[0, 2, 2]} >
      <RigidBody colliders={false} ref={playerRef} >
        <CylinderCollider args={[2, 2]} position={[0, 0, 0]} />
        <primitive castShadow
          object={model.scene}
          scale={2}
          position-y={-2}
        />
      </RigidBody>
    </group>
  );
}

export default Player;