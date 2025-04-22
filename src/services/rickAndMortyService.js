
export async function fetchRickAndMortyCharacters() {
    try {
      // We'll get a good number of characters to have variety
      // The Rick and Morty API has pagination, with 20 characters per page
      const totalPages = 5; // We'll fetch 5 pages (100 characters)
      let allCharacters = [];
      
      for (let page = 1; page <= totalPages; page++) {
        const response = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`);
        
        if (!response.ok) {
          throw new Error(`API response error: ${response.status}`);
        }
        
        const data = await response.json();
        allCharacters = [...allCharacters, ...data.results];
      }
      
      // Filter out characters without images and extract only what we need
      const charactersWithImages = allCharacters
        .filter(character => character.image && character.image.trim() !== '')
        .map(character => ({
          id: character.id,
          name: character.name,
          image: character.image,
          // Using the character name as the match key, similar to how the emoji name is used
          htmlCode: [character.image], // We'll use this for display, repurposing the existing structure
        }));
      
      return charactersWithImages;
    } catch (error) {
      console.error("Error fetching Rick and Morty characters:", error);
      throw error;
    }
  }