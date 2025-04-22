// App.jsx - Update the title
import Form from "./components/Form";
import MemoryCard from "./components/MemoryCard";
import AssistiveTechInfo from "./components/AssistiveTechInfo";
import GameOver from "./components/GameOver";
import CosmicParticleEffect from "./components/CosmicParticleEffect";
import ErrorCard from "./components/ErrorCard";
import useGameStore from "./store/useGameStore";
import { useGameEffects } from "./hooks/useGameEffects";

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

  // Get actions from store
  const handleFormChange = useGameStore((state) => state.handleFormChange);
  const startGame = useGameStore((state) => state.startGame);
  const turnCard = useGameStore((state) => state.turnCard);
  const resetGame = useGameStore((state) => state.resetGame);
  const resetError = useGameStore((state) => state.resetError);

  // Setup game effects
  useGameEffects();

  return (
    <>
      <CosmicParticleEffect />
      <main>
        <h1>Cosmic Memory</h1>
        {!isGameOn && !isError && (
          <Form
            handleSubmit={startGame}
            handleChange={handleFormChange}
            isFirstRender={isFirstRender}
          />
        )}
        {isGameOn && !areAllCardsMatched && (
          <AssistiveTechInfo
            emojisData={emojisData}
            matchedCards={matchedCards}
          />
        )}
        {areAllCardsMatched && <GameOver handleClick={resetGame} />}
        {isGameOn && (
          <MemoryCard
            handleClick={turnCard}
            data={emojisData}
            selectedCards={selectedCards}
            matchedCards={matchedCards}
            isCheckingMatch={isCheckingMatch}
          />
        )}
        {isError && <ErrorCard handleClick={resetError} />}
      </main>
    </>
  );
}
