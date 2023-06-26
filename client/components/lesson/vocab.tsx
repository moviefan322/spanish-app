import React from "react";
import { FaCirclePlus } from "react-icons/fa6";
import { User } from "../../utils/interfaces";
import styles from "./single-lesson.module.css";

function Vocab({ vocab }: any) {
  const storedUser: string | null = localStorage.getItem("spanishuser");
  const currentUser: User | null = storedUser ? JSON.parse(storedUser) : null;

  const postToFlashcards = async (word: string[]) => {
    const data = {
      english: word[1],
      spanish: word[0],
      userId: Number(currentUser!.id),
    };
    const response = await fetch("http://localhost:3001/flashcards", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      console.log("Error posting to flashcards");
    }

    const flashcard = await response.json();
    console.log(flashcard);
  };
  return (
    <table>
      <thead>
        <tr>
          <th>{vocab.title}</th>
        </tr>
      </thead>
      <tbody>
        {vocab.chart.map((item: string, index: number) => {
          const splitItem = item.split(":");
          return (
            <tr key={index} className={styles.vocabRow}>
              <td>
                <button
                  className={styles.noStyleButton}
                  onClick={() => postToFlashcards(splitItem)}
                >
                  <FaCirclePlus />
                </button>
                <strong>{splitItem[0]}</strong>
              </td>
              <td>{splitItem[1]}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default Vocab;
