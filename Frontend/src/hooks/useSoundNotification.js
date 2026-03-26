import { useEffect, useRef } from 'react';

const useSoundNotification = () => {
  const audioRef = useRef(null);

  useEffect(() => {
    // Create audio element for notification sound
    audioRef.current = new Audio('/notification-sound.mp3');
    audioRef.current.volume = 0.5;
    
    // Preload the sound
    audioRef.current.load();

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const playNotification = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch((error) => {
        console.log('Audio playback failed:', error);
      });
    }
  };

  return { playNotification };
};

export default useSoundNotification;
