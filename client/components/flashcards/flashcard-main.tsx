import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import styles from "./flashcard-main.module.css";
// @ts-ignore
import SingleFlashcard from "./singleFlashcard";

function FlashcardMain() {
  const { flashcards } = useSelector((state: any) => state.auth);
  const [showFlashcards, setShowFlashcards] = useState(false);
  const [sideUp, setSideUp] = useState("");


  const setSpanishUpHandler = () => {
    setSideUp("spanish");
    setShowFlashcards(true);
  };

  const setEnglishUpHandler = () => {
    setSideUp("english");
    setShowFlashcards(true);
  };

  return (
    <div className={styles.flashcardMain}>
      <div className={styles.cardContainer}>
        {!showFlashcards ? (
          <>
            <div>
              <button onClick={setSpanishUpHandler}>Spanish Up</button>
            </div>
            <div>
              <button onClick={setEnglishUpHandler}>English Up</button>
            </div>
          </>
        ) : (
          <SingleFlashcard sideUp={sideUp} flashcards={flashcards} />
        )}
      </div>
    </div>
  );
}

export default FlashcardMain;
