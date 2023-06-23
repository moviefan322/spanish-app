import React, { useEffect, useState } from "react";

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

  console.log(unit.lessons[0].title);

  // console.log("unit", unit.lessons[currentLesson].title);

  return (
    <>
      {" "}
      <h1>Welcome to Unit {id}</h1>
      <h2>{unit.lessons[currentLesson].title}</h2>
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
