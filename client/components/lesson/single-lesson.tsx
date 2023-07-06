import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
// @ts-ignore
import Chart from "./chart";
// @ts-ignore
import Vocab from "./vocab";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import Stats from "../../types/Stats";
import { setNewData } from "../../features/auth/authSlice";
import { updateScore, postScore } from "../../features/auth/authActions";
import Spinner from "../spinner/spinner";
// @ts-ignore
import MatchingExercise from "./matching";
import styles from "./single-lesson.module.css";
import { Lesson } from "../../types/Unit";

interface SingleLessonProps {
  lesson: Lesson[];
  nextLesson: number;
  unit: number;
  lessonCount: number;
}

function SingleLesson({
  lesson = [],
  nextLesson,
  unit,
  lessonCount,
}: SingleLessonProps): JSX.Element {
  const [currentExercise, setCurrentExercise] = useState(0);
  const [toggleExercise, setToggleExercise] = useState(false);
  const [loading, setLoading] = useState(true);
  const [exerciseLength, setExerciseLength] = useState(0);
  const [inputValues, setInputValues] = useState<string[]>([]);
  const [inputCorrect, setInputCorrect] = useState<any>([]);
  const [answerStyle, setAnswerStyle] = useState<any>([]);
  const [score, setScore] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [revealAnswers, setRevealAnswers] = useState(false);
  const [thisExercise, setThisExercise] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [matchingInput, setMatchingInput] = useState<string[]>([]);

  const state = useSelector((state: any) => state.auth);
  let userId: number | null = null;
  if (state.isLoggedIn) {
    userId = state.user.id;
  }

  const router = useRouter();
  const dispatch = useDispatch<any>();

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
  }, [lesson]);

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
    setError(null);
  };

  const handleInputChange = (index: number, value: string) => {
    setInputValues((prevInputValues: string[]) => {
      const newInputValues = [...prevInputValues];
      newInputValues[index] = value;
      return newInputValues;
    });
  };

  const submitScore = async () => {
    console.log("submitting");
    // get total correct answers
    let score;
    if (thisExercise.type === "matching") {
      score = matchingInput.filter(
        (item: string, index: number) => item === thisExercise.answers[index]
      ).length;
    } else {
      score = inputValues.filter(
        (item: string, index: number) =>
          item.trim().toLowerCase() ===
          thisExercise.answers[index].trim().toLowerCase()
      ).length;
    }
    //get max score
    const outOf = thisExercise.answers.length;
    const formatExerciseId = (currentExercise: number) => {
      return parseInt(`${unit}${nextLesson}${currentExercise}`);
    };
    const lessonId = formatExerciseId(currentExercise);

    if (
      state.stats &&
      state.stats.some((stat: Stats) => stat.lessonId === lessonId)
    ) {
      console.log("updating");
      const { id } = state.stats.filter(
        (stat: Stats) => stat.lessonId === lessonId
      )[0];

      const updateScoreData = {
        id: Number(id),
        lessonId: Number(lessonId),
        score: Number(score),
        outOf: Number(outOf),
        userId: Number(userId),
      };

      console.log(updateScoreData);

      dispatch(updateScore(updateScoreData));
      dispatch(setNewData(true));
    } else {
      const postScoreData = {
        lessonId: Number(lessonId),
        score: Number(score),
        outOf: Number(outOf),
        userId: Number(userId),
      };

      console.log(postScoreData);

      dispatch(postScore(postScoreData));
      dispatch(setNewData(true));
    }
  };

  const renderLesson = (lesson: Lesson[]) => {
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
              <br />
              <hr />
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

  const formatBlank = (question: string, index: number) => {
    const splitQuestion = question.split("_");
    const inputValue = inputValues[index] || ""; // Add a conditional check for undefined value

    return (
      <>
        {splitQuestion[0] + " "}
        {!revealAnswers ? (
          <input
            type="text"
            value={inputValue}
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
    if (thisExercise.type === "matching") {
      matchingInput.forEach((input: string, index: number) => {
        if (input === thisExercise.answers[index]) {
          console.log("correct");
          setAnswerStyle((prevAnswerStyle: string[]) => {
            const newAnswerStyle = [...prevAnswerStyle];
            newAnswerStyle[index] = "3px solid green";
            return newAnswerStyle;
          });
          setInputCorrect((prevInputCorrect: boolean[]) => {
            const newInputCorrect = [...prevInputCorrect];
            newInputCorrect[index] = true;
            return newInputCorrect;
          });
        } else {
          console.log("incorrect");
          setAnswerStyle((prevAnswerStyle: string[]) => {
            const newAnswerStyle = [...prevAnswerStyle];
            newAnswerStyle[index] = "3px solid red";
            return newAnswerStyle;
          });
          setInputCorrect((prevInputCorrect: boolean[]) => {
            const newInputCorrect = [...prevInputCorrect];
            newInputCorrect[index] = false;
            return newInputCorrect;
          });
        }
      });
      setSubmitted(true);
      setError(null);
      console.log(answerStyle);
      return;
    }

    if (inputValues.length !== thisExercise.answers.length) {
      setError("Please answer all questions");
      return;
    }
    setSubmitted(true);
    setError(null);

    inputValues.forEach((inputValue: string, index: number) => {
      if (!thisExercise.answers) {
        setInputCorrect((prevInputCorrect: boolean[]) => {
          const newInputCorrect = [...prevInputCorrect];
          newInputCorrect[index] = true;
          return newInputCorrect;
        });
        return;
      }
      if (
        inputValue.trim().toLowerCase() ===
        thisExercise.answers[index].trim().toLowerCase()
      ) {
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

  const renderQuestions = (questions: any) => {
    switch (thisExercise.type) {
      case "conjugate-blank":
        return (
          <>
            {thisExercise.questions.map((question: any, index: number) => (
              <React.Fragment key={`fragment${index}`}>
                <li key={`li${index}`}>{formatBlank(question, index)}</li>
                <hr key={`hr${index}`} />
                <br key={`br${index}`} />
              </React.Fragment>
            ))}
          </>
        );
      case "translate":
        return (
          <>
            {thisExercise.questions.map((question: any, index: number) => (
              <React.Fragment key={`frag${index}`}>
                <li key={`li${index}`}>{question}</li>
                {!revealAnswers ? (
                  <textarea
                    value={inputValues[index]}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                    style={{ border: answerStyle[index] }}
                    key={`input${index}`}
                  />
                ) : (
                  <span>
                    <strong>{thisExercise.answers[index]}</strong>
                  </span>
                )}

                <br key={`br${index}`} />
                <hr key={`hr${index}`} />
              </React.Fragment>
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
                {!revealAnswers ? (
                  <React.Fragment key={`frag${index}`}>
                    {" "}
                    <input
                      type="radio"
                      id={`V${index}`}
                      name={`answer${index}`}
                      value="V"
                      checked={inputValues[index] === "V"}
                      onChange={() => handleInputChange(index, "V")}
                      key={`VV${index}`}
                    />
                    <label key={`Vlabel${index}`} htmlFor={`true${index}`}>
                      Verdadero
                    </label>
                    <br />
                    <input
                      type="radio"
                      id={`F${index}`}
                      name={`answer${index}`}
                      value="F"
                      checked={inputValues[index] === "F"}
                      onChange={() => handleInputChange(index, "F")}
                      key={`FF${index}`}
                    />
                    <label key={`Flabel${index}`} htmlFor={`false${index}`}>
                      Falso
                    </label>
                  </React.Fragment>
                ) : (
                  <span key={`span${index}`}>
                    <strong key={`strong${index}`}>
                      {thisExercise.answers[index]}
                    </strong>
                  </span>
                )}
                <hr key={`hr${index}`} />
                <br key={`br${index}`} />
              </li>
            ))}
          </>
        );
      case "open-ended-TF":
        return (
          <>
            {thisExercise.questions.map((question: any, index: number) => (
              <li key={`li${index}`}>
                {question}
                <br key={`br${index}`} />
                <input
                  type="radio"
                  id={`true${index}`}
                  name={`answer${index}`}
                  value="true"
                  checked={inputValues[index] === "true"}
                  onChange={() => handleInputChange(index, "true")}
                  key={`input${index}`}
                />
                <label htmlFor={`true${index}`}>Verdadero</label>
                <br key={`br2${index}`} />
                <input
                  type="radio"
                  id={`false${index}`}
                  name={`answer${index}`}
                  value="false"
                  checked={inputValues[index] === "false"}
                  onChange={() => handleInputChange(index, "false")}
                  key={`inpu2t${index}`}
                />
                <label key={`label2${index}`} htmlFor={`false${index}`}>
                  Falso
                </label>
                <br key={`brr${index}`} />
                <hr key={`hr${index}`} />
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

      case "conjugate-plain":
        return (
          <>
            {thisExercise.questions.map((question: any, index: number) => (
              <React.Fragment key={index}>
                <li key={`li${index}`}>
                  {question} -{" "}
                  {!revealAnswers ? (
                    <input
                      value={inputValues[index]}
                      onChange={(e) => handleInputChange(index, e.target.value)}
                      style={{ border: answerStyle[index] }}
                      key={`input${index}`}
                    />
                  ) : (
                    <span key={`span${index}`}>
                      <strong key={`strong${index}`}>
                        {thisExercise.answers[index]}
                      </strong>
                    </span>
                  )}
                </li>
                <br key={`br${index}`} />
                <hr key={`hr${index}`} />
              </React.Fragment>
            ))}
          </>
        );
      case "matching":
        return (
          <MatchingExercise
            thisExercise={thisExercise}
            revealAnswers={revealAnswers}
            setMatchingInput={setMatchingInput}
            answerStyle={answerStyle}
          />
        );

      default:
        return <p>INVALID TYPE</p>;
    }
  };

  const revealAnswersHandler = () => {
    setRevealAnswers(true);
  };

  const renderExercises = (lesson: any, currentExercise: number) => {
    if (!thisExercise) {
      return <Spinner />;
    }

    const handleCheckAnswers = () => {
      checkAnswers();
      if (state.isLoggedIn) {
        submitScore();
      }
    };

    return (
      <>
        {thisExercise.title && <h4>{thisExercise.title}</h4>}
        <br />
        {thisExercise.instructions && <h5>{thisExercise.instructions}</h5>}
        <br />
        <ol>{renderQuestions(thisExercise.questions)}</ol>
        {error && <strong className={styles.error}>{error}</strong>}
        {!submitted && thisExercise.answers && !revealAnswers && (
          <button className={styles.buttonRed} onClick={handleCheckAnswers}>
            Submit Answers
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
    if (
      nextLesson + 1 > lessonCount &&
      currentExercise === exerciseLength - 1
    ) {
      return router.push(`/`);
    }
    if (currentExercise < exerciseLength - 1) {
      return incrementExercise();
    }
    if (currentExercise === exerciseLength - 1) {
      setLoading(true);
      resetInputState();
      setCurrentExercise(0);
      setToggleExercise((prevToggleExercise) => !prevToggleExercise);
      router.push(`/lessons/${unit}-${nextLesson + 1}`);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

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
          <div className={styles.exerciseCard}>
            {renderExercises(lesson, currentExercise)}
          </div>
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
