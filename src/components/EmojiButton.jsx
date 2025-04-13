import { decodeEntity } from "html-entities";

export default function EmojiButton({
  emoji,
  handleClick,
  selectedCardEntry,
  matchedCardEntry,
}) {
  
  const btnContent =
    selectedCardEntry || matchedCardEntry
      ? decodeEntity(emoji.htmlCode[0])
      : "?";

  const btnStyle = matchedCardEntry
    ? "btn--emoji__back--matched"
    : selectedCardEntry
    ? "btn--emoji__back--selected"
    : "btn--emoji__front";

  return (
    <button
      className={`btn btn--emoji ${btnStyle}`}
      onClick={selectedCardEntry ? null : handleClick}
      disabled={matchedCardEntry}
    >
      {btnContent}
    </button>
  );
}
