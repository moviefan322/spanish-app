import React, { useEffect, useState } from "react";
import Chart from "./chart";
import Vocab from "./vocab";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import styles from "./single-lesson.module.css";

function SingleLesson({ lesson, setCurrentLesson }: any) {
  const [currentExercise, setCurrentExercise] = useState(0);
  const [toggleExercise, setToggleExercise] = useState(false);
  const [exerciseLength, setExerciseLength] = useState(0);
  const [inputValues, setInputValues] = useState<any>([]);

  useEffect(() => {
    const getExerciseLength = async () => {
      const exercisesFilter = lesson.filter(
        (item: any) => item.type === "exercises"
      );
      const exercises = exercisesFilter.map((item: any) => item.exercises);
      setExerciseLength(exercises[0].length);
    };
    getExerciseLength();
  }, []);

  const handleInputChange = (index: number, value: string) => {
    setInputValues((prevInputValues: string[]) => {
      const newInputValues = [...prevInputValues];
      newInputValues[index] = value;
      return newInputValues;
    });
  };

  const renderLesson = (lesson: any) => {
    return lesson.map((item: any, index: number) => {
      switch (item.type) {
        case "title":
          return (
            <React.Fragment key={index}>
              <h3 key={index}>{item.text}</h3> <br />
            </React.Fragment>
          );
        case "grammar":
          return (
            <div key={index}>
              {item.text.map((textItem: string, textIndex: number) => (
                <p key={textIndex}>{textItem}</p>
              ))}
            </div>
          );
        case "chart":
          return (
            <div key={index}>
              {item.chart.map((chartItem: any, chartIndex: number) => (
                <Chart key={chartIndex} chart={chartItem} />
              ))}
            </div>
          );
        case "vocabulary":
          return (
            <div key={index}>
              {item.vocabulary.map((vocabItem: any, vocabIndex: number) => (
                <Vocab key={vocabIndex} vocab={vocabItem} />
              ))}
            </div>
          );
        case "exercises":
          return;
        default:
          return <p key={index}>ERROR: TYPE NOT FOUND</p>;
      }
    });
  };

  const renderExercises = (
    lesson: any,
    currentExercise: number
  ): JSX.Element => {
    const exercisesFilter = lesson.filter(
      (item: any) => item.type === "exercises"
    );
    const exercises = exercisesFilter.map((item: any) => item.exercises);
    const thisExercise = exercises[0][currentExercise];
    console.log(thisExercise);

    const formatBlank = (question: string, index: number) => {
      const splitQuestion = question.split("_");
      return (
        <>
          {splitQuestion[0] + " "}
          <input
            type="text"
            value={inputValues[index]}
            onChange={(e) => handleInputChange(index, e.target.value)}
          />
          {" " + splitQuestion[1]}
        </>
      );
    };

    const renderQuestions = (questions: any) => {
      switch (thisExercise.type) {
        case "conjugate-blank":
          return thisExercise.questions.map((question: any, index: number) => (
            <li key={index}>
              {index + 1}. {formatBlank(question, index)}
            </li>
          ));
        default:
          return <p>INVALID TYPE</p>;
      }
    };

    return (
      <>
        <h4>{thisExercise.title}</h4>
        {thisExercise.instructions && <h5>{thisExercise.instructions}</h5>}
        <ol>{renderQuestions(thisExercise.questions)}</ol>
      </>
    );
  };

  const handleExerciseToggle = () => {
    console.log(currentExercise);
    setToggleExercise((prevToggleExercise) => !prevToggleExercise);
  };

  const incrementExercise = () => {
    setCurrentExercise((prevCurrentExercise) => prevCurrentExercise + 1);
  };

  const decrementExercise = () => {
    setCurrentExercise((prevCurrentExercise) => prevCurrentExercise - 1);
  };

  const returnButtonHandler = () => {
    if (currentExercise === 0) {
      handleExerciseToggle();
    } else {
      decrementExercise();
    }
  };

  const nextButtonHandler = () => {
    if (currentExercise < exerciseLength - 1) {
      incrementExercise();
    }
    // setCurrentLesson((prevCurrentLesson: number) => prevCurrentLesson + 1);
  };

  console.log(inputValues);

  return (
    <>
      {!toggleExercise && (
        <>
          {renderLesson(lesson)}
          <div className={styles.bottom}>
            <button className={styles.button}>
              <FaArrowLeft />
              Back
            </button>
            <button className={styles.button} onClick={handleExerciseToggle}>
              Exercises
              <FaArrowRight />
            </button>
          </div>
        </>
      )}
      {toggleExercise && (
        <>
          {" "}
          {renderExercises(lesson, currentExercise)}
          <div className={styles.bottom}>
            <button className={styles.button} onClick={returnButtonHandler}>
              <FaArrowLeft />
              Back
            </button>
            <button className={styles.button} onClick={nextButtonHandler}>
              Next
              <FaArrowRight />
            </button>
          </div>
        </>
      )}
    </>
  );
}

export default SingleLesson;
