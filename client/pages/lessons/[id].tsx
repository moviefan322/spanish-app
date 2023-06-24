import React, { useEffect, useState } from "react";
import SingleLesson from "@/components/lesson/single-lesson";

function UnitPage({ id }: { id: string }) {
  const [unit, setUnit] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentLesson, setCurrentLesson] = useState<any>(0);

  useEffect(() => {
    const fetchUnit = async () => {
      const res = await fetch(`http://localhost:3001/lessons/${id}`);
      const data = await res.json();
      setUnit(JSON.parse(data));
      setLoading(false);
    };

    fetchUnit();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  console.log(unit.lessons[0]);

  return (
    <>
      {" "}
      <h2>
        Unit {id}: {unit.title}
      </h2>
      <br />
      <SingleLesson
        lesson={unit.lessons[currentLesson]}
        setCurrentLesson={setCurrentLesson}
        currentLesson={currentLesson}
      />
    </>
  );
}

export async function getServerSideProps(ctx: any) {
  const { id } = ctx.query;
  return {
    props: {
      id,
    },
  };
}

export default UnitPage;
