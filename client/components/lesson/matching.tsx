import React, { useState, useEffect } from "react";
import styles from "./matching.module.css";

interface MatchingExerciseProps {
  thisExercise: {
    title: string;
    instructions: string;
    questions: string[];
    choices: string[];
    answers: number[];
    type: string;
  };
  revealAnswers: boolean;
}

function MatchingExercise({
  thisExercise,
  revealAnswers,
}: MatchingExerciseProps) {
  console.log(thisExercise);
  const [dropSpots, setDropSpots] = useState<number[]>([]);
  const [updatedExercise, setUpdatedExercise] = useState<any>(thisExercise);

  useEffect(() => {
    initializeDropSpots();
  }, []);

  const initializeDropSpots = () => {
    const count = thisExercise.questions.length;
    const spots = Array(count).fill(-1);
    setDropSpots(spots);
  };

  const handleDragStart = (
    event: React.DragEvent<HTMLParagraphElement>,
    index: number
  ) => {
    event.dataTransfer.setData("text/plain", index.toString());
  };

  const handleDragOver = (
    event: React.DragEvent<HTMLParagraphElement>,
    index: number
  ) => {
    event.preventDefault();
  };

  const handleDrop = (
    event: React.DragEvent<HTMLParagraphElement>,
    index: number
  ) => {
    event.preventDefault();
    const draggedIndex = parseInt(event.dataTransfer.getData("text/plain"), 10);

    const updatedDropSpots = [...dropSpots];
    updatedDropSpots[index] = draggedIndex;
    setDropSpots(updatedDropSpots);

    const updatedChoices = [...updatedExercise.choices];
    const draggedChoice = updatedChoices[draggedIndex];
    updatedChoices[draggedIndex] = updatedChoices[index];
    updatedChoices[index] = draggedChoice;

    const updatedQuestions = {
      ...updatedExercise,
      choices: updatedChoices,
    };

    setUpdatedExercise(updatedQuestions);
  };

  return (
    <>
      {thisExercise.questions.map((question: string, index: number) => (
        <React.Fragment key={index}>
          <li key={`li${index}`} className={styles.matching}>
            <p>{question}</p>
            {!revealAnswers ? (
              <p
                key={`pchoice${index}`}
                draggable={true}
                onDragStart={(event) => handleDragStart(event, index)}
                onDragOver={(event) => handleDragOver(event, index)}
                onDrop={(event) => handleDrop(event, index)}
              >
                {updatedExercise.choices[index]}
              </p>
            ) : (
              <span key={`span${index}`}>
                {updatedExercise.answers.map((answerIndex: number) => (
                  <p key={`answer${answerIndex}`}>
                    {updatedExercise.choices[answerIndex]}
                  </p>
                ))}
              </span>
            )}
          </li>
          <br key={`br${index}`} />
          <hr key={`hr${index}`} />
        </React.Fragment>
      ))}
    </>
  );
}

export default MatchingExercise;
