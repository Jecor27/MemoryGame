import { useState, useEffect } from "react";
import Form from "./components/Form";
import MemoryCard from "./components/MemoryCard";

import "./App.css";

function App() {
  const [isGameOn, setIsGameOn] = useState(false);
  const [emojisData, setEmojisData] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [areAllCardsMatched, setAreAllCardsMatched] = useState(false);

  //console.log(emojisData)
  //console.log(selectedCards);
  //console.log(matchedCards);
  useEffect(() => {
    if (
      selectedCards.length === 2 &&
      selectedCards[0].name === selectedCards[1].name
    ) {
      setMatchedCards((prevMatchedCards) => [
        ...prevMatchedCards,
        ...selectedCards,
      ]);
    }
  }, [selectedCards]);

  useEffect(() => {
    if (emojisData.length && matchedCards.length === emojisData.length) {
      setAreAllCardsMatched(true);
    }
  }, [matchedCards]);

  async function startGame(e) {
    e.preventDefault();
    try {
      const URL =
        "https://emojihub.yurace.pro/api/all/category/animals-and-nature";
      const response = await fetch(URL);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const data = await response.json();

      //console.log(data);
      //console.log(getRandomIndices(data));
      const dataSlice = await getDataSlice(data);
      const emojisArray = await getEmojisArray(dataSlice);

      setEmojisData(emojisArray);
      setIsGameOn(true);
    } catch (err) {
      console.error(err.message);
    }
  }

  const getDataSlice = async (data) => {
    const randomIndices = getRandomIndices(data);
    const dataSlice = randomIndices.reduce((array, index) => {
      array.push(data[index]);
      return array;
    }, []);
    return dataSlice;
  };

  const getRandomIndices = (data) => {
    const randomIndicesArray = [];
    for (let i = 0; i < 5; i++) {
      const randomIndex = Math.floor(Math.random() * data.length);
      if (!randomIndicesArray.includes(randomIndex)) {
        randomIndicesArray.push(randomIndex);
        console.log("hello worlds");
      } else {
        i--;
      }
    }
    return randomIndicesArray;
  };

  function getEmojisArray(data) {
    const pairedEmojisArray = [...data, ...data];

    for (let i = pairedEmojisArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = pairedEmojisArray[i];
      pairedEmojisArray[i] = pairedEmojisArray[j];
      pairedEmojisArray[j] = temp;
    }

    return pairedEmojisArray;
  }

  function turnCard(name, index) {
    const selectedCardEntry = selectedCards.find(
      (emoji) => emoji.index === index
    );

    if (selectedCards.length < 2) {
      setSelectedCards((prevSelectedCards) => [
        ...prevSelectedCards,
        { name, index },
      ]);
    } else if (selectedCards.length === 2) {
      setSelectedCards([{ name, index }]);
    }
  }

  //console.log(selectedCards);
  return (
    <main>
      <h1>Memory</h1>
      {!isGameOn && <Form handleSubmit={startGame} />}
      {isGameOn && (
        <MemoryCard
          handleClick={turnCard}
          data={emojisData}
          selectedCards={selectedCards}
          matchedCards={matchedCards}
        />
      )}
    </main>
  );
}

export default App;
