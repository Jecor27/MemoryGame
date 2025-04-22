
import { create } from 'zustand';

// Initial form data with Rick and Morty as the default category
const initialFormData = { category: "rick-and-morty", number: 10 };

// Configuration for lives and timer based on card count
const getGameConfig = (cardCount) => {
  const count = parseInt(cardCount);
  
  // Scale timer and lives based on number of cards
  if (count <= 10) {
    return { timer: 60, lives: 6 }; // 1 minute for 10 cards
  } else if (count <= 20) {
    return { timer: 120, lives: 10 }; // 2 minutes for 20 cards
  } else if (count <= 30) {
    return { timer: 180, lives: 20 }; // 3 minutes for 30 cards
  } else if (count <= 40) {
    return { timer: 240, lives: 25}; // 4 minutes for 40 cards
  } else {
    return { timer: 300, lives: 35 }; // 5 minutes for 50 cards
  }
};

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
  isCheckingMatch: false, // Prevents clicking during card flip animation
  isLoading: false, // Loading state for API calls
  
  // Timer and lives state
  timer: 60, // Default initial timer in seconds
  lives: 3, // Default initial lives
  timerInterval: null, // Store the timer interval
  gameOver: false, // Game over flag
  gameOverReason: "", // Reason for game over (time out or lives depleted)

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
    set({ isError: false, isLoading: true });
    
    try {
      const { formData } = get();
      let data = [];
      
      // Handle different API endpoints based on the selected category
      if (formData.category === "rick-and-morty") {
        // Fetch Rick and Morty characters
        const rickAndMortyData = await get().fetchRickAndMortyCharacters();
        data = rickAndMortyData;
      } else {
        // Fetch emoji data from the original API
        const emojiResponse = await fetch(`https://emojihub.yurace.pro/api/all/category/${formData.category}`);
        
        if (!emojiResponse.ok) {
          throw new Error(`Emoji API response status: ${emojiResponse.status}`);
        }
        
        data = await emojiResponse.json();
      }
      
      // Get a slice of the data based on the number selected
      const dataSlice = await get().getDataSlice(data);
      
      // Create paired array and shuffle it
      const emojisArray = get().getEmojisArray(dataSlice);
      
      // Get configuration based on card count
      const { timer, lives } = getGameConfig(formData.number);
      
      set({ 
        emojisData: emojisArray,
        isGameOn: true,
        isFirstRender: false,
        isLoading: false,
        timer,
        lives,
        gameOver: false,
        gameOverReason: "",
        selectedCards: [],
        matchedCards: [],
        areAllCardsMatched: false
      });
      
      // Start the timer
      get().startTimer();
      
    } catch (err) {
      console.error("Error starting game:", err);
      set({ 
        isError: true,
        isFirstRender: false,
        isLoading: false
      });
    }
  },
  
  // Start the countdown timer
  startTimer: () => {
    // Clear any existing timer
    const existingInterval = get().timerInterval;
    if (existingInterval) {
      clearInterval(existingInterval);
    }
    
    // Create new timer interval
    const interval = setInterval(() => {
      const currentTimer = get().timer;
      const isGameOn = get().isGameOn;
      
      // Only update if game is still on
      if (isGameOn) {
        if (currentTimer <= 1) {
          // Time's up
          clearInterval(interval);
          set({ 
            timer: 0,
            gameOver: true,
            gameOverReason: "time",
            isGameOn: false
          });
        } else {
          // Decrement timer
          set({ timer: currentTimer - 1 });
        }
      } else {
        // Game is not on, clear the interval
        clearInterval(interval);
      }
    }, 1000);
    
    // Store the interval ID
    set({ timerInterval: interval });
  },
  
  // Lose a life
  loseLife: () => {
    const currentLives = get().lives;
    
    if (currentLives <= 1) {
      // No more lives, game over
      set({ 
        lives: 0,
        gameOver: true,
        gameOverReason: "lives", 
        isGameOn: false 
      });
      
      // Clear timer
      const interval = get().timerInterval;
      if (interval) {
        clearInterval(interval);
      }
    } else {
      // Decrement lives
      set({ lives: currentLives - 1 });
    }
  },
  
  // Fetch Rick and Morty characters from the API
  fetchRickAndMortyCharacters: async () => {
    try {
      // We'll get multiple pages to have a good selection of characters
      const pages = 3; // Fetch 3 pages (60 characters)
      let allCharacters = [];
      
      for (let page = 1; page <= pages; page++) {
        const response = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`);
        
        if (!response.ok) {
          throw new Error(`Rick and Morty API response status: ${response.status}`);
        }
        
        const data = await response.json();
        allCharacters = [...allCharacters, ...data.results];
      }
      
      // Filter characters to only include ones with images
      // Map the data to match the structure used by the emoji data
      const charactersWithImages = allCharacters
        .filter(character => character.image && character.image.trim() !== '')
        .map(character => ({
          id: character.id,
          name: character.name,
          image: character.image,
          // For compatibility with the emoji structure
          htmlCode: [character.image],
          // Add any additional data needed
          species: character.species,
          status: character.status
        }));
      
      return charactersWithImages;
    } catch (error) {
      console.error("Error fetching Rick and Morty characters:", error);
      throw error;
    }
  },
  
  // Get random indices for the data slice
  getRandomIndices: (data) => {
    const { formData } = get();
    const randomIndicesArray = [];
    const pairsNeeded = parseInt(formData.number) / 2;
    
    // Safety to prevent infinite loop if not enough data
    const maxAttempts = data.length * 2;
    let attempts = 0;
    
    while (randomIndicesArray.length < pairsNeeded && attempts < maxAttempts) {
      attempts++;
      const randomIndex = Math.floor(Math.random() * data.length);
      
      // Ensure no duplicates
      if (!randomIndicesArray.includes(randomIndex)) {
        randomIndicesArray.push(randomIndex);
      }
    }
    
    return randomIndicesArray;
  },
  
  // Get a slice of data based on random indices
  getDataSlice: (data) => {
    const randomIndices = get().getRandomIndices(data);
    
    // Create array of items at the random indices
    const dataSlice = randomIndices.reduce((array, index) => {
      if (data[index]) {
        array.push(data[index]);
      }
      return array;
    }, []);
    
    return dataSlice;
  },
  
  // Create paired array and shuffle it
  getEmojisArray: (data) => {
    // Create pairs by duplicating the array
    const pairedArray = [...data, ...data];

    // Shuffle the array
    for (let i = pairedArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pairedArray[i], pairedArray[j]] = [pairedArray[j], pairedArray[i]];
    }

    return pairedArray;
  },
  
  // Handle card turning
  turnCard: (name, index) => {
    const { selectedCards, isCheckingMatch, gameOver } = get();
    
    // Don't allow card turning if game is over or checking match
    if (isCheckingMatch || gameOver) return;
    
    const selectedCardEntry = selectedCards.find((card) => card.index === index);

    // Add card to selected if not already selected and fewer than 2 cards selected
    if (selectedCards.length < 2 && !selectedCardEntry) {
      set((state) => ({ 
        selectedCards: [...state.selectedCards, { name, index }]
      }));
    } 
    // If already 2 cards selected, replace with new selection
    else if (selectedCards.length === 2) {
      set({ selectedCards: [{ name, index }] });
    }
  },
  
  // Reset game state
  resetGame: () => {
    // Clear timer interval
    const interval = get().timerInterval;
    if (interval) {
      clearInterval(interval);
    }
    
    set({
      isGameOn: false,
      selectedCards: [],
      matchedCards: [],
      areAllCardsMatched: false,
      gameOver: false,
      gameOverReason: ""
    });
  },
  
  // Reset error state
  resetError: () => set({ isError: false }),
  
  // Check for matches between selected cards
  checkForMatches: () => {
    const { selectedCards } = get();
    
    if (selectedCards.length === 2) {
      if (selectedCards[0].name === selectedCards[1].name) {
        // Cards match
        set((state) => ({
          matchedCards: [...state.matchedCards, ...state.selectedCards]
        }));
        
        // Clear selected cards after a short delay
        setTimeout(() => {
          set({ selectedCards: [] });
        }, 300);
      } else {
        // Cards don't match - prevent new selections during animation
        set({ isCheckingMatch: true });
        
        // Flip cards back after delay
        setTimeout(() => {
          set({ 
            selectedCards: [],
            isCheckingMatch: false
          });
          
          // Lose a life when cards don't match
          get().loseLife();
          
        }, 1000);
      }
    }
  },
  
  // Check if all cards are matched
  checkGameCompletion: () => {
    const { emojisData, matchedCards, timerInterval } = get();
    
    if (emojisData.length > 0 && matchedCards.length === emojisData.length) {
      // Clear timer when game is completed
      if (timerInterval) {
        clearInterval(timerInterval);
      }
      
      set({ 
        areAllCardsMatched: true,
        isGameOn: false
      });
    }
  },
  
  // Format the timer as MM:SS
  formatTime: () => {
    const seconds = get().timer;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  }
}));

export default useGameStore;