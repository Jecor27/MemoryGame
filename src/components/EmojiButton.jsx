
import { decodeEntity } from "html-entities";

export default function EmojiButton({
  emoji,
  handleClick,
  selectedCardEntry,
  matchedCardEntry,
  index,
  disabled
}) {
  // Check if we're dealing with Rick and Morty character (image URL) or emoji
  const isRickAndMortyCharacter = emoji.image !== undefined;
  
  // Determine back content (visible when card is flipped)
  let backContent;
  if (isRickAndMortyCharacter) {
    backContent = <img src={emoji.image} alt={emoji.name} className="character-image" />;
  } else {
    backContent = decodeEntity(emoji.htmlCode[0]);
  }
  
  // Determine which content to show based on card state
  const btnContent = selectedCardEntry || matchedCardEntry ? backContent : null;

  const btnStyle = matchedCardEntry
    ? "btn--emoji__back--matched"
    : selectedCardEntry
    ? "btn--emoji__back--selected"
    : "btn--emoji__front";

  const btnAria = matchedCardEntry
    ? `${emoji.name}. Matched.`
    : selectedCardEntry
    ? `${emoji.name}. Not matched yet.`
    : "Card upside down.";

  return (
    <button
      className={`btn btn--emoji ${btnStyle} ${isRickAndMortyCharacter ? 'btn--character' : ''}`}
      onClick={selectedCardEntry || disabled ? null : handleClick}
      disabled={matchedCardEntry || disabled}
      aria-label={`Position ${index + 1}: ${btnAria}`}
      aria-live="polite"
    >
      {btnContent}
    </button>
  );
}