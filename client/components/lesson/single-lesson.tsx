import React from "react";
import Chart from "./chart";
import Vocab from "./vocab";

function SingleLesson({ lesson }: any) {
  console.log(lesson);
  const renderLesson = (lesson: any) => {
    return lesson.map((item: any, index: number) => {
      if (item.type === "title") {
        return <h1 key={index}>{item.text}</h1>;
      }
      if (item.type === "grammar") {
        return (
          <div key={index}>
            {item.text.map((textItem: string, textIndex: number) => (
              <p key={textIndex}>{textItem}</p>
            ))}
          </div>
        );
      }
      if (item.type === "chart") {
        return (
          <div key={index}>
            {item.chart.map((chartItem: any, chartIndex: number) => (
              <Chart key={chartIndex} chart={chartItem} />
            ))}
          </div>
        );
      }
      if (item.type === "vocabulary") {
        return (
          <div key={index}>
            {item.vocabulary.map((vocabItem: any, vocabIndex: number) => (
              <Vocab key={vocabIndex} vocab={vocabItem} />
            ))}
          </div>
        );
      }
    });
  };

  return <>{renderLesson(lesson)}</>;
}

export default SingleLesson;
