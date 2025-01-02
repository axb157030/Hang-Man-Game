import React from "react";

const Keyboard = ({
  guessedLetters,
  incorrectLetters,
  handleGuess,
  isGameOver,
}) => {
  const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

  return (
    <div className="grid grid-cols-10 gap-2 mt-5">
      {alphabet.map((letter) => {
        const isGuessed = guessedLetters.includes(letter);
        const isIncorrect = incorrectLetters.includes(letter);
        const isDisabled = isGuessed || isIncorrect || isGameOver;

        return (
          <button
            key={letter}
            onClick={() => handleGuess(letter)}
            disabled={isDisabled}
            className={`py-3 px-5 rounded-lg text-white focus:outline-none transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-blue-500 ${
              isGuessed
                ? "bg-green-400 opacity-70"
                : isIncorrect
                ? "bg-red-400 opacity-70"
                : "bg-gray-800 hover:bg-blue-600"
            } ${
              isDisabled ? "cursor-not-allowed opacity-50" : "active:scale-95"
            }`}
          >
            {letter}
          </button>
        );
      })}
    </div>
  );
};

export default Keyboard;
