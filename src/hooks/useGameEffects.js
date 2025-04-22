
import { useEffect } from 'react';
import useGameStore from '../store/useGameStore';

export function useGameEffects() {
  const selectedCards = useGameStore((state) => state.selectedCards);
  const emojisData = useGameStore((state) => state.emojisData);
  const matchedCards = useGameStore((state) => state.matchedCards);
  const timer = useGameStore((state) => state.timer);
  const checkForMatches = useGameStore((state) => state.checkForMatches);
  const checkGameCompletion = useGameStore((state) => state.checkGameCompletion);
  const timerInterval = useGameStore((state) => state.timerInterval);
  const isGameOn = useGameStore((state) => state.isGameOn);

  // Check for matches when selected cards change
  useEffect(() => {
    checkForMatches();
  }, [selectedCards, checkForMatches]);

  // Check if game is complete when matched cards change
  useEffect(() => {
    checkGameCompletion();
  }, [matchedCards, checkGameCompletion]);

  // Timer color effects
  useEffect(() => {
    const timerDisplay = document.querySelector('.timer-display');
    if (timerDisplay) {
      if (timer <= 10) {
        timerDisplay.setAttribute('data-time', 'critical');
      } else if (timer <= 30) {
        timerDisplay.setAttribute('data-time', 'low');
      } else {
        timerDisplay.removeAttribute('data-time');
      }
    }
  }, [timer]);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (timerInterval) {
        clearInterval(timerInterval);
      }
    };
  }, [timerInterval]);

  // Game state effects
  useEffect(() => {
    // Add/remove active game class to body for potential styling
    if (isGameOn) {
      document.body.classList.add('game-active');
    } else {
      document.body.classList.remove('game-active');
    }

    return () => {
      document.body.classList.remove('game-active');
    };
  }, [isGameOn]);

  return null;
}