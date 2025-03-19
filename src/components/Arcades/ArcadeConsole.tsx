import { Vector3 } from '@react-three/fiber';
import { CuboidCollider, RigidBody } from '@react-three/rapier';
import React, { useEffect, useState } from 'react';
import { useGameDataStore } from '../../stores/GameDataStore';

interface ArcadeConsoleProps {
  gameId: number;
  pos: Vector3;
  onShowGameInfoPopup: (gameId: number) => void;
  onCloseGameInfoPopup: () => void;
}

const ArcadeConsole:React.FC<ArcadeConsoleProps> = ({gameId, pos, onShowGameInfoPopup, onCloseGameInfoPopup}) => {
  const [isEnter, setIsEnter] = useState(false);

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