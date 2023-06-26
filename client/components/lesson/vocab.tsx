import React from "react";

function Vocab({ vocab }: any) {
  return (
    <table>
      <thead>
        <tr>
          <th>{vocab.title}</th>
        </tr>
      </thead>
      <tbody>
        {vocab.chart.map((item: string, index: number) => {
          const splitItem = item.split(":")
          return (
            <tr key={index}>
              <td><strong>{splitItem[0]}</strong></td>
              <td>{splitItem[1]}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default Vocab;
