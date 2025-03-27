import { useLoader, Vector3 } from '@react-three/fiber';
import { CuboidCollider, RigidBody } from '@react-three/rapier';
import React, { useEffect, useState } from 'react';
import { useGameDataStore } from '../../stores/GameDataStore';
import { GLTFLoader } from 'three/examples/jsm/Addons.js';
import { Clone } from '@react-three/drei';

interface ArcadeConsoleProps {
  gameId: number;
  pos: Vector3;
  onShowGameInfoPopup: (gameId: number) => void;
  onCloseGameInfoPopup: () => void;
}

const ArcadeConsole:React.FC<ArcadeConsoleProps> = ({gameId, pos, onShowGameInfoPopup, onCloseGameInfoPopup}) => {
  const [isEnter, setIsEnter] = useState(false);

  const model = useLoader(GLTFLoader, "Models/ArcadeConsole1/scene.gltf");

  const setSelectGameID = useGameDataStore(state => state.setSelectGameID);

  const gameID = gameId;
  let touchStartTime = 0;

  const OnArcadeConsoleZoneEnter = () => {
    setSelectGameID(gameID);
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
      onShowGameInfoPopup(gameID);
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
      <CuboidCollider 
        sensor 
        args={[2, 2, 2]} 
        position={[0, -1, 3.5]} 
        onIntersectionEnter={OnArcadeConsoleZoneEnter}
        onIntersectionExit={OnArcadeConsoleZoneExit}
      />
      <Clone castShadow
         object={model.scene}
         scale={2}
         position-y={-3.5}
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