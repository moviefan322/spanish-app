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
        {vocab.list.map((item: { [key: string]: string }, index: number) => {
          return (
            <tr key={index}>
              {Object.entries(item).map(([key, value]) => (
                <React.Fragment key={key}>
                  <td>{key}</td>
                  <td>{value}</td>
                </React.Fragment>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default Vocab;
