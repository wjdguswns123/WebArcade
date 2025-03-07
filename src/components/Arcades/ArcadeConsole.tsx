import { Vector3 } from '@react-three/fiber';
import { CuboidCollider, RigidBody } from '@react-three/rapier';
import React, { useEffect, useState } from 'react';

interface ArcadeConsoleProps {
  gameId: number;
  pos: Vector3;
  onShowGameInfoPopup: (gameId: number) => void;
  onCloseGameInfoPopup: () => void;
}

const ArcadeConsole:React.FC<ArcadeConsoleProps> = ({gameId, pos, onShowGameInfoPopup, onCloseGameInfoPopup}) => {
  const [isEnter, setIsEnter] = useState(false);

  const gameID = gameId;
  let touchStartTime = 0;

  const OnArcadeConsoleZoneEnter = (payload) => {
    setIsEnter(true);
  };

  const OnArcadeConsoleZoneExit = () => {
    setIsEnter(false);
    onCloseGameInfoPopup();
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if(e.key === " ") {
      if(isEnter) {
        onShowGameInfoPopup(gameID);
      }
    }
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
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("touchstart", touchStart);
    window.addEventListener("touchend", touchEnd);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("touchstart", touchStart);
      window.removeEventListener("touchend", touchEnd);
    };
  }, [handleKeyDown, touchStart, touchEnd]);

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