import { useEffect, useState } from 'react';
import { Html, useProgress } from '@react-three/drei';
import '../css/LoadingUI.css';

const LoadingUI = () => {
  const [loadingDotCount, setLoadingDotCount] = useState(0);
  const { progress } = useProgress();

  useEffect(() => {
    setTimeout(repeatSetIndex, 300);
  }, []);

  useEffect(() => {
    if(loadingDotCount >= 5) {
      setLoadingDotCount(0);
    }
  }, [loadingDotCount]);

  const repeatSetIndex = () => {
    setLoadingDotCount(prev => prev + 1);
    setTimeout(repeatSetIndex, 300);
  };

  const drawLoadingText = () => {
    let text = "Loading";
    for(let i = 0; i < loadingDotCount; ++i) {
      text += ".";
    }

    return (
      <p className="loading-text">{text}</p>
    );
  };

  const drawLoadingSlider = () => {
    const loadingRate = `${progress.toFixed(0)}%`;
    return (
      <>
        <div className="slider-outline">
          <div className="slider-bar" 
            style={{width: loadingRate}}
          ></div>
        </div>
      </>
    );
  };

  return (
    <Html className="loading-root">
      <div className="loadingUI">
        {drawLoadingText()}
        {drawLoadingSlider()}
      </div>
    </Html>
  );
}

export default LoadingUI;