
import Form from "./components/Form";
import MemoryCard from "./components/MemoryCard";
import AssistiveTechInfo from "./components/AssistiveTechInfo";
import GameOver from "./components/GameOver";
import ErrorCard from "./components/ErrorCard";
import GameStatus from "./components/GameStatus";
import useGameStore from "./store/useGameStore";
import { useGameEffects } from "./hooks/useGameEffects";
import LoadingIndicator from "./components/LoadingIndicator";

export default function App() {
  // Get state from store
  const isFirstRender = useGameStore((state) => state.isFirstRender);
  const isGameOn = useGameStore((state) => state.isGameOn);
  const emojisData = useGameStore((state) => state.emojisData);
  const selectedCards = useGameStore((state) => state.selectedCards);
  const matchedCards = useGameStore((state) => state.matchedCards);
  const areAllCardsMatched = useGameStore((state) => state.areAllCardsMatched);
  const isError = useGameStore((state) => state.isError);
  const isCheckingMatch = useGameStore((state) => state.isCheckingMatch);
  const gameOver = useGameStore((state) => state.gameOver);
  const gameOverReason = useGameStore((state) => state.gameOverReason);
  const isLoading = useGameStore((state) => state.isLoading);
  
  // Get actions from store
  const handleFormChange = useGameStore((state) => state.handleFormChange);
  const startGame = useGameStore((state) => state.startGame);
  const turnCard = useGameStore((state) => state.turnCard);
  const resetGame = useGameStore((state) => state.resetGame);
  const resetError = useGameStore((state) => state.resetError);
  
  // Setup game effects
  useGameEffects();

  return (
    <main>
      <h1>Cosmic Memory</h1>
      
      {/* Loading indicator for API calls */}
      {isLoading && <LoadingIndicator />}
      
      {/* Form view */}
      {!isGameOn && !isError && !gameOver && !areAllCardsMatched && !isLoading && (
        <Form
          handleSubmit={startGame}
          handleChange={handleFormChange}
          isFirstRender={isFirstRender}
        />
      )}
      
      {/* Game view with timer and status */}
      {isGameOn && !areAllCardsMatched && (
        <>
          <GameStatus />
          <AssistiveTechInfo
            emojisData={emojisData}
            matchedCards={matchedCards}
          />
        </>
      )}
      
      {/* Game over view */}
      {(areAllCardsMatched || gameOver) && !isLoading && (
        <GameOver 
          handleClick={resetGame} 
          reason={gameOverReason}
          victory={areAllCardsMatched && !gameOver}
        />
      )}
      
      {/* Memory cards */}
      {isGameOn && (
        <MemoryCard
          handleClick={turnCard}
          data={emojisData}
          selectedCards={selectedCards}
          matchedCards={matchedCards}
          isCheckingMatch={isCheckingMatch}
        />
      )}
      
      {/* Error view */}
      {isError && <ErrorCard handleClick={resetError} />}
    </main>
  );
}