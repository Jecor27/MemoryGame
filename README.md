# Memory Game

A fun and interactive card matching game built with modern web technologies.

## Live Demo

Check out the live version of the game: [Memory Game](https://memorygamey.netlify.app)

## About the Game

Memory Game is a classic concentration card game where players need to match pairs of cards with identical emojis. The game features:

- Various emoji categories to choose from (Animals and Nature, Food and Drink, Travel and Places, Objects, Symbols)
- Customizable number of cards (10-50)
- Animated card flipping effects
- Accessibility features for assistive technology users
- Responsive design that works on mobile, tablet, and desktop

## How to Play

1. Select an emoji category and the number of cards you want to play with
2. Click "Start Game" to begin
3. Click on cards to flip them over
4. Try to remember the position of each emoji
5. Match all pairs to win the game
6. Click "Play again" to start a new game with different settings

## Technologies Used

### Core Technologies
- **React** - UI components and state management
- **Vite** - Fast build tool and development server
- **JavaScript (ES6+)** - Modern JavaScript syntax
- **Zustand** - Lightweight state management
- **CSS3** - Styling with transitions and animations

### APIs & Services
- **EmojiHub API** - External API for emoji data

### Development Tools
- **ESLint** - Code quality and style checking
- **Git/GitHub** - Version control
- **Netlify** - Hosting and deployment

## Project Structure

The application follows a modular architecture:

```
src/
├── components/      # React UI components
├── store/           # Zustand state management
├── hooks/           # Custom React hooks
├── data/            # Static game data
├── services/        # API services
└── utils/           # Helper functions
```

## Features

- **Dynamic Content**: Fetches emoji data from an external API
- **State Management**: Uses Zustand for efficient state management
- **Responsive Design**: Works on all device sizes
- **Accessibility**: Includes screen reader support and keyboard navigation
- **Animations**: Card flip animations enhance the user experience

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/memory-game.git
   cd memory-game
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Future Enhancements

- Add a timer and score tracking
- Implement difficulty levels
- Add sound effects
- Create a leaderboard using local storage
- Add user accounts to save progress

