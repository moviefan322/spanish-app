import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import styles from "./flashcard-main.module.css";
import SingleFlashcard from "./singleFlashcard";
import { shuffle } from "@/utils/shuffle";

function FlashcardMain() {
  const { flashcards } = useSelector((state: any) => state.auth);
  const [showFlashcards, setShowFlashcards] = useState(false);
  const [shuffledFlashcards, setShuffledFlashcards] = useState<any[]>([]);
  const [sideUp, setSideUp] = useState("");

  useEffect(() => {
    setShuffledFlashcards(shuffle(flashcards));
  }, [flashcards]);

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
