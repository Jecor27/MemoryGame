
import React from 'react';
import useGameStore from '../store/useGameStore';

export default function GameStatus() {
  const timer = useGameStore((state) => state.timer);
  const lives = useGameStore((state) => state.lives);
  const formatTime = useGameStore((state) => state.formatTime);
  
  return (
    <div className="game-status">
      <div className="game-status__timer">
        <div className="timer-icon">⏱️</div>
        <div className="timer-display">{formatTime()}</div>
      </div>
      <div className="game-status__lives">
        <div className="lives-label">Lives:</div>
        <div className="lives-hearts">
          {Array.from({ length: lives }).map((_, index) => (
            <span key={index} className="heart-icon">❤️</span>
          ))}
        </div>
      </div>
    </div>
  );
}