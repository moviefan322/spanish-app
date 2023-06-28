import React from "react";
import { useSelector } from "react-redux";

function Flashcards() {
  const { flashcards } = useSelector((state: any) => state.user);
  return (
    <>
      <h1>FLASHCARDS</h1>
    </>
  );
}

export default Flashcards;
