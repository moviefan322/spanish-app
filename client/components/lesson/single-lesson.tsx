import React from "react";

function SingleLesson({ lesson }: any) {
  const renderLesson = (lesson: any) => {
    return lesson.map(
      (item: { type: string; text?: string }, index: number) => {
        if (item.type === "title") {
          return <h1 key={index}>{item.text}</h1>;
        }
        if (item.type === "grammar") {
          return <p key={index}>{item.text}</p>;
        }
      }
    );
  };

  return (
    <>
      <h1>{lesson[0].text}</h1>
    </>
  );
}

export default SingleLesson;
