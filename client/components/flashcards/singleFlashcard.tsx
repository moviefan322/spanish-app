import React, { useEffect } from "react";
import { useState } from "react";
import styles from "./singleFlashcard.module.css";

interface singleFlashcardProps {
  sideUp: string;
  flashcards: Flashcard[];
}

interface Flashcard {
  id: number;
  english: string;
  spanish: string;
  userId: number;
}

function SingleFlashcard({ sideUp, flashcards }: singleFlashcardProps) {
  const [currentFlashcard, setCurrentFlashcard] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [showSide, setShowSide] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [customStyle, setCustomStyle] = useState({
    backgroundColor: "rgb(23, 23, 23)",
  });

  useEffect(() => {
    if (sideUp === "spanish") {
      setShowSide(flashcards[currentFlashcard].spanish);
      setCorrectAnswer(flashcards[currentFlashcard].english);
    } else {
      setShowSide(flashcards[currentFlashcard].english);
      setCorrectAnswer(flashcards[currentFlashcard].spanish);
    }
  }, [currentFlashcard, sideUp]);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  const checkAnswer = () => {
    if (userInput === correctAnswer) {
      setCustomStyle({ backgroundColor: "green" });
      setTimeout(() => {
        setCustomStyle({ backgroundColor: "rgb(23, 23, 23)" });
        setUserInput("");
        if (currentFlashcard < flashcards.length - 1) {
          setCurrentFlashcard((prev) => prev + 1);
        } else {
          setCurrentFlashcard(0);
        }
      }, 2000);
    } else {
      setCustomStyle({ backgroundColor: "red" });
      setTimeout(() => {
        setCustomStyle({ backgroundColor: "rgb(23, 23, 23)" });
        setUserInput("");
        if (currentFlashcard < flashcards.length - 1) {
          setCurrentFlashcard((prev) => prev + 1);
        } else {
          setCurrentFlashcard(0);
        }
      }, 2000);
    }
  };

  return (
    <div className={styles.singleFlashcard} style={customStyle}>
      <>
        <div>
          <p>{showSide}</p>
        </div>
        <div>
          <input type="text" value={userInput} onChange={onChangeHandler} />
          <button onClick={checkAnswer}>Submit</button>
        </div>
      </>
    </div>
  );
}

export default SingleFlashcard;
