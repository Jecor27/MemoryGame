// src/hooks/useGameEffects.js
import { useEffect } from 'react';
import useGameStore from '../store/useGameStore';

export function useGameEffects() {
  const selectedCards = useGameStore((state) => state.selectedCards);
  const emojisData = useGameStore((state) => state.emojisData);
  const matchedCards = useGameStore((state) => state.matchedCards);
  const checkForMatches = useGameStore((state) => state.checkForMatches);
  const checkGameCompletion = useGameStore((state) => state.checkGameCompletion);

  // Check for matches when selected cards change
  useEffect(() => {
    checkForMatches();
  }, [selectedCards, checkForMatches]);

  // Check if game is complete when matched cards change
  useEffect(() => {
    checkGameCompletion();
  }, [matchedCards, checkGameCompletion]);

  return null;
}