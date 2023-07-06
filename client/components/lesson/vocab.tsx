import React from "react";
import { FaCirclePlus } from "react-icons/fa6";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { createFlashcard } from "../../features/auth/authActions";
import PostFlashcard from "../../types/PostFlashcard";
import styles from "./single-lesson.module.css";

function Vocab({ vocab }: any) {
  const { user } = useSelector((state: any) => state.auth, shallowEqual);
  const dispatch = useDispatch<any>();

  const postToFlashcards = async (word: string[]) => {
    const flashcard: PostFlashcard = {
      english: word[1],
      spanish: word[0],
      userId: Number(user!.id),
    };

    dispatch(createFlashcard(flashcard));
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
                </button>{" "}
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
