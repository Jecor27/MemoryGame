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
      const dataSample = data.splice(0, 5);
      //console.log(dataSample);
      setIsGameOn(true);
      setEmojisData(dataSample);
    } catch (err) {
      console.error(err.message);
    }
  }

  function turnCard() {
    console.log("Memory card clicked");
  }
  return (
    <main>
      <h1>Memory</h1>
      {!isGameOn && <Form handleSubmit={startGame} />}
      {isGameOn && <MemoryCard handleClick={turnCard} data={emojisData} />}
    </main>
  );
}

export default App;
