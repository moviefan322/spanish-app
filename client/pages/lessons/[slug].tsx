import React, { useEffect, useState } from "react";
import SingleLesson from "@/components/lesson/single-lesson";

function UnitPage({ id, lesson }: { id: string; lesson: string }) {
  const [unit, setUnit] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

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
        lesson={unit.lessons[lesson]}
        unit={id}
        nextLesson={lesson + 1}
        lessonCount={unit.lessons.length}
      />
    </>
  );
}

export async function getServerSideProps(ctx: any) {
  const { slug } = ctx.query;
  const slugArray = slug.split("-");
  const id = slugArray[0];
  const lesson = slugArray[1] - 1;
  return {
    props: {
      id,
      lesson,
    },
  };
}

export default UnitPage;
