import React, { useState, useEffect } from "react";
import styles from "./matching.module.css";

function MatchingExercise({ thisExercise, revealAnswers }: any) {
  console.log(thisExercise);
  const [dropSpots, setDropSpots] = useState<number[]>([]);
  const [updatedExercise, setUpdatedExercise] = useState<any>(thisExercise);

  useEffect(() => {
    initializeDropSpots();
  }, []);

  const initializeDropSpots = () => {
    const count = thisExercise.questions.prompts.length;
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

    const updatedChoices = [...updatedExercise.questions.choices];
    const draggedChoice = updatedChoices[draggedIndex];
    updatedChoices[draggedIndex] = updatedChoices[index];
    updatedChoices[index] = draggedChoice;

    const updatedQuestions = {
      ...updatedExercise.questions,
      choices: updatedChoices,
    };

    setUpdatedExercise({
      ...updatedExercise,
      questions: updatedQuestions,
    });
  };

  return (
    <>
      {thisExercise.questions.prompts.map((question: any, index: number) => (
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
                {updatedExercise.questions.choices[index]}
              </p>
            ) : (
              <span key={`span${index}`}>
                {updatedExercise.answers.map(
                  (answer: any, answerIndex: number) => (
                    <p key={`answer${answerIndex}`}>
                      {updatedExercise.choices[answer]}
                    </p>
                  )
                )}
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
