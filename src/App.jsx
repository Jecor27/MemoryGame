import { useState } from "react";
import Form from "./components/Form";
import MemoryCard from "./components/MemoryCard";

import "./App.css";

/**
 * To do:
 * Step 1: Get random emojis from API
 * Step 2: Duplicate unique emojis
 * Step 3: Shuffle emojis data
 */

function App() {
  const [isGameOn, setIsGameOn] = useState(false);
  const [emojisData, setEmojisData] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);

  //console.log(emojisData)

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
    setSelectedCards([{ name, index }]);
  }

  //console.log(selectedCards);
  return (
    <main>
      <h1>Memory</h1>
      {!isGameOn && <Form handleSubmit={startGame} />}
      {isGameOn && <MemoryCard handleClick={turnCard} data={emojisData} />}
    </main>
  );
}

export default App;
