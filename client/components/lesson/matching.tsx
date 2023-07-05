import React, { useState, useEffect } from "react";
import styles from "./matching.module.css";

interface MatchingExerciseProps {
  thisExercise: {
    title: string;
    instructions: string;
    questions: string[];
    choices: string[];
    answers: string[];
    type: string;
  };
  revealAnswers: boolean;
  setMatchingInput: (input: string[]) => void;
  answerStyle: string[];
}

function MatchingExercise({
  thisExercise,
  revealAnswers,
  setMatchingInput,
  answerStyle,
}: MatchingExerciseProps) {
  const [dropSpots, setDropSpots] = useState<number[]>([]);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [updatedExercise, setUpdatedExercise] = useState<any>(thisExercise);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [displacedIndex, setDisplacedIndex] = useState<number | null>(null);

  console.log(answerStyle);

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
    setDraggedIndex(index);
  };

  const handleDragOver = (
    event: React.DragEvent<HTMLParagraphElement>,
    index: number
  ) => {
    event.preventDefault();
    setHoveredIndex(index);
    setDisplacedIndex(hoveredIndex !== index ? draggedIndex : null);
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
    setHoveredIndex(null);
    setDisplacedIndex(draggedIndex); // Set displacedIndex to draggedIndex
    setMatchingInput(updatedChoices);
  };

  console.log(updatedExercise);

  return (
    <>
      {thisExercise.questions.map((question: string, index: number) => (
        <React.Fragment key={index}>
          <li key={`li${index}`} className={styles.matching}>
            <p>{question}</p>
            {!revealAnswers ? (
              <p
                key={`pchoice${index}`}
                style={{ border: answerStyle[index] }}
                className={`${styles.choices} ${
                  hoveredIndex === index ? styles.hovered : ""
                } ${displacedIndex === index ? styles.displaced : ""}`}
                draggable={true}
                onDragStart={(event) => handleDragStart(event, index)}
                onDragOver={(event) => handleDragOver(event, index)}
                onDragLeave={() => {
                  setHoveredIndex(null);
                  setDisplacedIndex(null);
                }}
                onDrop={(event) => handleDrop(event, index)}
              >
                {hoveredIndex === index && draggedIndex !== null ? (
                  <span className={styles.placeholder}>Drop Here</span>
                ) : (
                  updatedExercise.choices[index]
                )}
              </p>
            ) : (
              <span key={`span${index}`}>
                {
                  <p className={styles.choices} key={`answer${index}`}>
                    {thisExercise.answers[index]}
                  </p>
                }
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
