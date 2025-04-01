import React from 'react'
import { RigidBody } from '@react-three/rapier';
import { degToRad } from '../../Utils/utils';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/Addons.js';
import { Clone } from '@react-three/drei';

interface ArcadePropsModelInfo {
  modelName: string;
  scale: number;
  positionY: number;
  rotationY: number;
}

const arcadePropseModelInfos: ArcadePropsModelInfo[] = [
  {
    modelName: "ArcadeProps1",
    scale: 0.02,
    positionY: 0,
    rotationY: 0,
  },
  {
    modelName: "ArcadeProps2",
    scale: 0.5,
    positionY: 0,
    rotationY: degToRad(-90),
  },
];

const ArcadeRoom = () => {
  const props1 = useLoader(GLTFLoader, `Models/${arcadePropseModelInfos[0].modelName}/scene.gltf`);
  const props2 = useLoader(GLTFLoader, `Models/${arcadePropseModelInfos[1].modelName}/scene.gltf`);

  const drawRoom = () => {
    return (
      <RigidBody>
        <mesh receiveShadow rotation={[degToRad(-90), 0, 0]}>
          <planeGeometry args={[60, 60]} />
          <meshStandardMaterial color="#7D7D7D" />
        </mesh>
        <mesh receiveShadow 
          rotation={[0, 0, 0]}
          position={[0, 10, -30]}
        >
          <planeGeometry args={[60, 20]} />
          <meshStandardMaterial color="#FFECCA" />
        </mesh>
        <mesh receiveShadow 
          rotation={[0, degToRad(-90), 0]}
          position={[30, 10, 0]}
        >
          <planeGeometry args={[60, 20]} />
          <meshStandardMaterial color="#FFECCA" />
        </mesh>
      </RigidBody>
    );
  };

  const drawProps = () => {
    return (
      <RigidBody type="fixed">
        <Clone castShadow
          object={props1.scene}
          scale={arcadePropseModelInfos[0].scale}
          position={[-10, arcadePropseModelInfos[0].positionY, -22]}
          rotation-y={arcadePropseModelInfos[0].rotationY}
        />
        <Clone castShadow
          object={props1.scene}
          scale={arcadePropseModelInfos[0].scale}
          position={[-3, arcadePropseModelInfos[0].positionY, -22]}
          rotation-y={arcadePropseModelInfos[0].rotationY}
        />

        <Clone castShadow
          object={props2.scene}
          scale={arcadePropseModelInfos[1].scale}
          position={[8, arcadePropseModelInfos[1].positionY, -25]}
          rotation-y={arcadePropseModelInfos[1].rotationY}
        />
        <Clone castShadow
          object={props2.scene}
          scale={arcadePropseModelInfos[1].scale}
          position={[16, arcadePropseModelInfos[1].positionY, -25]}
          rotation-y={arcadePropseModelInfos[1].rotationY}
        />
      </RigidBody>
    );
  };

  return (
    <>
      {drawRoom()}
      {drawProps()}
    </>
  );
}

export default ArcadeRoom;