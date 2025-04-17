// src/services/emojiService.js
export async function fetchEmojis(category) {
    const URL = `https://emojihub.yurace.pro/api/all/category/${category}`;
    const response = await fetch(URL);
    
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    
    return await response.json();
  }