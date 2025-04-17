// src/store/useGameStore.js
import { create } from 'zustand';

const initialFormData = { category: "animals-and-nature", number: 10 };

const useGameStore = create((set, get) => ({
  // State
  isFirstRender: true,
  formData: initialFormData,
  isGameOn: false,
  emojisData: [],
  selectedCards: [],
  matchedCards: [],
  areAllCardsMatched: false,
  isError: false,

  // Actions
  setIsFirstRender: (value) => set({ isFirstRender: value }),
  
  handleFormChange: (e) => set((state) => ({
    formData: {
      ...state.formData,
      [e.target.name]: e.target.value
    }
  })),
  
  startGame: async (e) => {
    e.preventDefault();
    set({ isError: false });
    
    try {
      const { formData } = get();
      const URL = `https://emojihub.yurace.pro/api/all/category/${formData.category}`;
      const response = await fetch(URL);
      
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      
      const data = await response.json();
      const dataSlice = await get().getDataSlice(data);
      const emojisArray = get().getEmojisArray(dataSlice);
      
      set({ 
        emojisData: emojisArray,
        isGameOn: true,
        isFirstRender: false
      });
    } catch (err) {
      console.error(err);
      set({ 
        isError: true,
        isFirstRender: false 
      });
    }
  },
  
  getRandomIndices: (data) => {
    const { formData } = get();
    const randomIndicesArray = [];
    for (let i = 0; i < formData.number / 2; i++) {
      const randomIndex = Math.floor(Math.random() * data.length);
      if (!randomIndicesArray.includes(randomIndex)) {
        randomIndicesArray.push(randomIndex);
      } else {
        i--;
      }
    }
    return randomIndicesArray;
  },
  
  getDataSlice: async (data) => {
    const randomIndices = get().getRandomIndices(data);
    const dataSlice = randomIndices.reduce((array, index) => {
      array.push(data[index]);
      return array;
    }, []);
    return dataSlice;
  },
  
  getEmojisArray: (data) => {
    const pairedEmojisArray = [...data, ...data];

    for (let i = pairedEmojisArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = pairedEmojisArray[i];
      pairedEmojisArray[i] = pairedEmojisArray[j];
      pairedEmojisArray[j] = temp;
    }

    return pairedEmojisArray;
  },
  
  turnCard: (name, index) => {
    const { selectedCards } = get();
    const selectedCardEntry = selectedCards.find((emoji) => emoji.index === index);

    if (selectedCards.length < 2 && !selectedCardEntry) {
      set((state) => ({ 
        selectedCards: [...state.selectedCards, { name, index }]
      }));
    } else if (selectedCards.length === 2) {
      set({ selectedCards: [{ name, index }] });
    }
  },
  
  resetGame: () => set({
    isGameOn: false,
    selectedCards: [],
    matchedCards: [],
    areAllCardsMatched: false
  }),
  
  resetError: () => set({ isError: false }),
  
  // Effects
  checkForMatches: () => {
    const { selectedCards, matchedCards } = get();
    
    if (selectedCards.length === 2 && selectedCards[0].name === selectedCards[1].name) {
      set((state) => ({
        matchedCards: [...state.matchedCards, ...state.selectedCards]
      }));
    }
  },
  
  checkGameCompletion: () => {
    const { emojisData, matchedCards } = get();
    
    if (emojisData.length && matchedCards.length === emojisData.length) {
      set({ areAllCardsMatched: true });
    }
  }
}));

export default useGameStore;