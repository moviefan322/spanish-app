import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Chart from "./chart";
import Vocab from "./vocab";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import styles from "./single-lesson.module.css";

function SingleLesson({ lesson = [], nextLesson, unit }: any) {
  const [currentExercise, setCurrentExercise] = useState(0);
  const [toggleExercise, setToggleExercise] = useState(false);
  const [loading, setLoading] = useState(true);
  const [exerciseLength, setExerciseLength] = useState(0);
  const [inputValues, setInputValues] = useState<any>([]);
  const [inputCorrect, setInputCorrect] = useState<any>([]);
  const [answerStyle, setAnswerStyle] = useState<any>([]);
  const [score, setScore] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [revealAnswers, setRevealAnswers] = useState(false);
  const [thisExercise, setThisExercise] = useState<any>(null);

  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    const exercisesFilter = lesson.filter(
      (item: any) => item.type === "exercises"
    );
    const exercises = exercisesFilter.map((item: any) => item.exercises);
    setThisExercise(exercises[0][currentExercise]);
    setLoading(false);
  }, [currentExercise, nextLesson]);

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

  useEffect(() => {
    const renderScore = () => {
      const correctAnswers = inputCorrect.filter(
        (item: boolean) => item === true
      );
      const score = Math.floor(
        (correctAnswers.length / inputCorrect.length) * 100
      );
      setScore(score);
    };
    renderScore();
  }, [inputCorrect]);

  const resetInputState = () => {
    setInputValues([]);
    setInputCorrect([]);
    setAnswerStyle([]);
    setSubmitted(false);
    setRevealAnswers(false);
  };

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
              {item.grammar.map(
                (
                  textItem: { text: string[]; examples: string[] },
                  textIndex: number
                ) => (
                  <div key={textIndex}>
                    {textItem.text.map(
                      (paragraph: string, paragraphIndex: number) => (
                        <p key={paragraphIndex}>{paragraph}</p>
                      )
                    )}
                    {textItem.examples.length > 0 && (
                      <ul>
                        {textItem.examples.map(
                          (example: string, exampleIndex: number) => (
                            <li key={exampleIndex}>{example}</li>
                          )
                        )}
                      </ul>
                    )}
                  </div>
                )
              )}
            </div>
          );
        case "chart":
          return (
            <div key={index} className={styles.chartContainer}>
              {item.chart.map((chartItem: any, chartIndex: number) => (
                <Chart key={chartIndex} chart={chartItem} />
              ))}
            </div>
          );
        case "vocabulary":
          return (
            <div key={index} className={styles.chartContainer}>
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

  const renderExercises = (lesson: any, currentExercise: number) => {
    const formatBlank = (question: string, index: number) => {
      const splitQuestion = question.split("_");
      return (
        <>
          {splitQuestion[0] + " "}
          {!revealAnswers ? (
            <input
              type="text"
              value={inputValues[index]}
              onChange={(e) => handleInputChange(index, e.target.value)}
              style={{ border: answerStyle[index] }}
            />
          ) : (
            <span>
              <strong>{thisExercise.answers[index]}</strong>
            </span>
          )}
          {" " + splitQuestion[1]}
        </>
      );
    };

    const checkAnswers = () => {
      setSubmitted(true);

      inputValues.forEach((inputValue: string, index: number) => {
        if (!thisExercise.answers) {
          setInputCorrect((prevInputCorrect: boolean[]) => {
            const newInputCorrect = [...prevInputCorrect];
            newInputCorrect[index] = true;
            return newInputCorrect;
          });
          return;
        }
        if (inputValue === thisExercise.answers[index].trim()) {
          setAnswerStyle((prevAnswerStyle: string[]) => {
            const newAnswerStyle = [...prevAnswerStyle];
            newAnswerStyle[index] = "2px solid green";
            return newAnswerStyle;
          });
          setInputCorrect((prevInputCorrect: boolean[]) => {
            const newInputCorrect = [...prevInputCorrect];
            newInputCorrect[index] = true;
            return newInputCorrect;
          });
        } else {
          setAnswerStyle((prevAnswerStyle: string[]) => {
            const newAnswerStyle = [...prevAnswerStyle];
            newAnswerStyle[index] = "2px solid red";
            return newAnswerStyle;
          });
          setInputCorrect((prevInputCorrect: boolean[]) => {
            const newInputCorrect = [...prevInputCorrect];
            newInputCorrect[index] = false;
            return newInputCorrect;
          });
        }
      });
    };

    const revealAnswersHandler = () => {
      setRevealAnswers(true);
    };

    const renderQuestions = (questions: any) => {
      switch (thisExercise.type) {
        case "conjugate-blank":
          return (
            <>
              {thisExercise.questions.map((question: any, index: number) => (
                <>
                  <li key={index}>{formatBlank(question, index)}</li>
                  <hr />
                  <br />
                </>
              ))}
            </>
          );
        case "translate":
          return (
            <>
              {thisExercise.questions.map((question: any, index: number) => (
                <>
                  <li key={index}>{question}</li>
                  <textarea
                    value={inputValues[index]}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                    style={{ border: answerStyle[index] }}
                    key={`input${index}`}
                  />
                  <br />
                </>
              ))}
            </>
          );
        case "true-false":
          return (
            <>
              {thisExercise.questions.map((question: any, index: number) => (
                <li key={index}>
                  {question}
                  <br />
                  <input
                    type="radio"
                    id={`true${index}`}
                    name={`answer${index}`}
                    value="V"
                    checked={inputValues[index] === "true"}
                    onChange={() => handleInputChange(index, "true")}
                  />
                  <label htmlFor={`true${index}`}>Verdadero</label>
                  <input
                    type="radio"
                    id={`false${index}`}
                    name={`answer${index}`}
                    value="F"
                    checked={inputValues[index] === "false"}
                    onChange={() => handleInputChange(index, "false")}
                  />
                  <label htmlFor={`false${index}`}>Falso</label>
                  <br />
                </li>
              ))}
            </>
          );
        case "open-ended-TF":
          return (
            <>
              {thisExercise.questions.map((question: any, index: number) => (
                <li key={index}>
                  {question}
                  <br />
                  <input
                    type="radio"
                    id={`true${index}`}
                    name={`answer${index}`}
                    value="true"
                    checked={inputValues[index] === "true"}
                    onChange={() => handleInputChange(index, "true")}
                  />
                  <label htmlFor={`true${index}`}>Verdadero</label>
                  <input
                    type="radio"
                    id={`false${index}`}
                    name={`answer${index}`}
                    value="false"
                    checked={inputValues[index] === "false"}
                    onChange={() => handleInputChange(index, "false")}
                  />
                  <label htmlFor={`false${index}`}>Falso</label>
                  <br />
                </li>
              ))}
            </>
          );
        case "open-ended":
          return (
            <>
              {thisExercise.questions.map((question: any, index: number) => (
                <>
                  <li key={index}>{question}</li>
                  <textarea
                    value={inputValues[index]}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                    style={{ border: answerStyle[index] }}
                    key={`input${index}`}
                  />
                  <br />
                </>
              ))}
            </>
          );

        default:
          return <p>INVALID TYPE</p>;
      }
    };

    return (
      <>
        <h4>{thisExercise.title}</h4>
        <br />
        {thisExercise.instructions && <h5>{thisExercise.instructions}</h5>}
        <br />
        <ol>{renderQuestions(thisExercise.questions)}</ol>
        {!submitted && thisExercise.answers && !revealAnswers && (
          <button className={styles.buttonRed} onClick={checkAnswers}>
            Check Answers
          </button>
        )}
        {submitted && !revealAnswers && (
          <button className={styles.buttonGray} onClick={revealAnswersHandler}>
            Reveal Answers
          </button>
        )}
        {submitted && revealAnswers && (
          <button className={styles.buttonGreen} onClick={resetInputState}>
            Try Again?
          </button>
        )}

        {score > -1 && <p>Your Score: {score}%</p>}
      </>
    );
  };

  const handleExerciseToggle = () => {
    setToggleExercise((prevToggleExercise) => !prevToggleExercise);
  };

  const incrementExercise = () => {
    setCurrentExercise((prevCurrentExercise) => prevCurrentExercise + 1);
    resetInputState();
  };

  const decrementExercise = () => {
    setCurrentExercise((prevCurrentExercise) => prevCurrentExercise - 1);
    resetInputState();
  };

  const returnButtonHandler = () => {
    if (currentExercise === 0) {
      resetInputState();
      handleExerciseToggle();
    } else {
      resetInputState();
      decrementExercise();
    }
  };

  const navigateToPreviousLesson = () => {
    if (nextLesson === 1) {
      return router.push(`/`);
    }
    router.push(`/lessons/${unit}-${nextLesson - 1}`);
  };

  const nextButtonHandler = () => {
    if (currentExercise < exerciseLength - 1) {
      return incrementExercise();
    }
    if (currentExercise === exerciseLength - 1) {
      setToggleExercise((prevToggleExercise) => !prevToggleExercise);
      router.push(`/lessons/${unit}-${nextLesson + 1}`);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  console.log(thisExercise);

  return (
    <>
      {!toggleExercise && (
        <div className={styles.lesson}>
          {renderLesson(lesson)}
          <div className={styles.bottom}>
            <button
              className={styles.button}
              onClick={navigateToPreviousLesson}
            >
              <FaArrowLeft />
              Back
            </button>
            <button className={styles.button} onClick={handleExerciseToggle}>
              Exercises
              <FaArrowRight />
            </button>
          </div>
        </div>
      )}
      {toggleExercise && (
        <div className={styles.exercises}>
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
        </div>
      )}
    </>
  );
}

export default SingleLesson;
