import React, { useState, useEffect } from "react";
import Keyboard from "./components/Keyboard"; // Import the Keyboard component

const words = ["javascript", "react", "hangman", "programming", "tailwind"];

const HangmanGame = () => {
  const [chosenWord, setChosenWord] = useState("");
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [incorrectLetters, setIncorrectLetters] = useState([]); // Track incorrect guesses
  const [incorrectGuesses, setIncorrectGuesses] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isGameWon, setIsGameWon] = useState(false);

  // Randomly choose a word when the component mounts
  useEffect(() => {
    const randomWord = words[Math.floor(Math.random() * words.length)];
    setChosenWord(randomWord);
  }, []);

  // Check if the game is won
  useEffect(() => {
    if (!isGameOver) {
      const wordGuessed = chosenWord
        .split("")
        .every((letter) => guessedLetters.includes(letter));
      if (wordGuessed) {
        setIsGameWon(true);
        setIsGameOver(true);
      }
    }
  }, [guessedLetters, chosenWord, isGameOver]);

  // Handle a letter guess
  const handleGuess = (letter) => {
    if (guessedLetters.includes(letter) || isGameOver) return;

    setGuessedLetters([...guessedLetters, letter]);

    if (!chosenWord.includes(letter)) {
      setIncorrectGuesses(incorrectGuesses + 1);
      setIncorrectLetters([...incorrectLetters, letter]); // Track incorrect guesses
    }
  };

  // Render the word with underscores for unguessed letters
  const renderWord = () => {
    return chosenWord
      .split("")
      .map((letter, index) => (guessedLetters.includes(letter) ? letter : "_"))
      .join(" ");
  };

  // Reset the game
  const resetGame = () => {
    const randomWord = words[Math.floor(Math.random() * words.length)];
    setChosenWord(randomWord);
    setGuessedLetters([]);
    setIncorrectLetters([]);
    setIncorrectGuesses(0);
    setIsGameOver(false);
    setIsGameWon(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-10">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-5">Hangman Game</h1>

        {/* Display word with guessed letters */}
        <p className="text-3xl font-mono mb-5">{renderWord()}</p>

        {/* Display incorrect guesses */}
        <p className="text-lg mb-5">Incorrect Guesses: {incorrectGuesses}</p>

        {/* Display win/lose messages */}
        {isGameOver && (
          <div className="mb-5">
            {isGameWon ? (
              <p className="text-3xl text-green-500">You Win!</p>
            ) : (
              <p className="text-3xl text-red-500">
                Game Over! The word was: {chosenWord}
              </p>
            )}
            <button
              onClick={resetGame}
              className="mt-5 px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 focus:outline-none transition-all duration-300"
            >
              Play Again
            </button>
          </div>
        )}

        {/* Display the virtual keyboard */}
        {!isGameOver && (
          <Keyboard
            guessedLetters={guessedLetters}
            incorrectLetters={incorrectLetters} // Pass incorrect guesses to Keyboard
            handleGuess={handleGuess}
            isGameOver={isGameOver}
          />
        )}
      </div>
    </div>
  );
};

export default HangmanGame;
