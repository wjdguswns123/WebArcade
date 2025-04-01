import { useLoader, Vector3 } from '@react-three/fiber';
import { CuboidCollider, RigidBody } from '@react-three/rapier';
import React, { useEffect, useState } from 'react';
import { useGameDataStore } from '../../stores/GameDataStore';
import { GLTFLoader } from 'three/examples/jsm/Addons.js';
import { Clone } from '@react-three/drei';
import { degToRad } from '../../Utils/utils';

interface ArcadeConsoleModelInfo {
  modelName: string;
  scale: number;
  positionY: number;
  rotationY: number;
}

const arcadeConsoleModelInfos: ArcadeConsoleModelInfo[] = [
  {
    modelName: "ArcadeConsole1",
    scale: 2,
    positionY: -3.5,
    rotationY: 0,
  },
  {
    modelName: "ArcadeConsole2",
    scale: 0.3,
    positionY: -3.5,
    rotationY: 0,
  },
  {
    modelName: "ArcadeConsole3",
    scale: 1,
    positionY: -3,
    rotationY: degToRad(20),
  },
];

interface ArcadeConsoleProps {
  gameId: number;
  pos: Vector3;
  modelType: number;
  onShowGameInfoPopup: (gameId: number) => void;
  onCloseGameInfoPopup: () => void;
}

const ArcadeConsole:React.FC<ArcadeConsoleProps> = ({gameId, pos, modelType, onShowGameInfoPopup, onCloseGameInfoPopup}) => {
  const [isEnter, setIsEnter] = useState(false);

  const arcadeConsoleModelInfo = arcadeConsoleModelInfos[modelType - 1];
  const model = useLoader(GLTFLoader, `Models/${arcadeConsoleModelInfo.modelName}/scene.gltf`);

  const setSelectGameID = useGameDataStore(state => state.setSelectGameID);

  let touchStartTime = 0;

  const OnArcadeConsoleZoneEnter = () => {
    setSelectGameID(gameId);
    setIsEnter(true);
  };

  const OnArcadeConsoleZoneExit = () => {
    onCloseGameInfoPopup();

    setSelectGameID(0);
    setIsEnter(false);
  };

  const touchStart = () => {
    touchStartTime = Date.now();
  };

  const touchEnd = () => {
    if(isEnter && ((Date.now() - touchStartTime) / 1000 > 2)) {
      onShowGameInfoPopup(gameId);
    }
  };
  
  useEffect(() => {
    window.addEventListener("touchstart", touchStart);
    window.addEventListener("touchend", touchEnd);

    return () => {
      window.removeEventListener("touchstart", touchStart);
      window.removeEventListener("touchend", touchEnd);
    };
  }, [touchStart, touchEnd]);

  useEffect(() => {
      model.scene.traverse((child) => {
        child.castShadow = true;
    });
  }, [model.scene]);

  return (
    <RigidBody type="fixed" position={pos} >
      {gameId > 0 &&
        <CuboidCollider 
          sensor 
          args={[2, 2, 2]} 
          position={[0, -1, 3.5]} 
          onIntersectionEnter={OnArcadeConsoleZoneEnter}
          onIntersectionExit={OnArcadeConsoleZoneExit}
      />}
      <Clone castShadow
        object={model.scene}
        scale={arcadeConsoleModelInfo.scale}
        position-y={arcadeConsoleModelInfo.positionY}
        rotation-y={arcadeConsoleModelInfo.rotationY}
      />
      {isEnter &&
        <mesh position={[0, 5.5, -1]}>
          <sphereGeometry args={[0.5, 16, 16]} />
          <meshBasicMaterial color="#FF1111" />
        </mesh>
      }
    </RigidBody>
  )
}

export default ArcadeConsole;