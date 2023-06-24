import React from "react";

function Chart({ chart }: any) {
  return (
    <table>
      <thead>
        <tr>
          <th>{chart.title}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          {chart.chart.map((item: any, index: number) => {
            return <td key={index}>{item}</td>
          })}
        </tr>
      </tbody>
    </table>
  );
}

export default Chart;
