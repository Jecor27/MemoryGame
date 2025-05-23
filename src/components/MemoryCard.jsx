
import EmojiButton from "./EmojiButton";

export default function MemoryCard({
  handleClick,
  data,
  selectedCards,
  matchedCards,
  isCheckingMatch
}) {
  const cardEl = data.map((emoji, index) => {
    const selectedCardEntry = selectedCards.find(
      (card) => card.index === index
    );
    const matchedCardEntry = matchedCards.find(
      (card) => card.index === index
    );

    const cardStyle = matchedCardEntry
      ? "card-item--matched"
      : selectedCardEntry
      ? "card-item--selected"
      : "";

    return (
      <li key={index} className={`card-item ${cardStyle} ${isCheckingMatch ? 'checking-match' : ''}`}>
        <EmojiButton
          index={index}
          emoji={emoji}
          handleClick={() => handleClick(emoji.name, index)}
          selectedCardEntry={selectedCardEntry}
          matchedCardEntry={matchedCardEntry}
          disabled={isCheckingMatch}
        />
      </li>
    );
  });

  return <ul className="card-container">{cardEl}</ul>;
}