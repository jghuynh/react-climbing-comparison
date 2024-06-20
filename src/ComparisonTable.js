import { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";

function ComparisonTable({ climbersList }) {
  // Ensure climber1 is an array before calling map
  if (!Array.isArray(climbersList)) {
    return null;
  }

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Athlete</th>
          <th>Age</th>
          <th>Nationality</th>
          <th>Boulder</th>
          <th>Lead</th>
          <th>Boulder-Lead</th>
          <th>Speed</th>
        </tr>
      </thead>
      <tbody>
        {climbersList.map((climberObject, i) => {
          return (
            <tr key={i}>
              <td>{climberObject.climber}</td>
              <td>{climberObject.age}</td>
              <td>{climberObject.nation}</td>
              <td>
                {climberObject.boulder && (
                  <>
                    {/* Boulder */}
                    <p>Rank: {climberObject.boulder.rank}</p>
                    <p>Points: {climberObject.boulder.points}</p>
                  </>
                )}{" "}
              </td>

              {/* Lead */}
              <td>
                {climberObject.lead && (
                  <>
                    <p>Rank: {climberObject.lead.rank}</p>
                    <p>Points: {climberObject.lead.points}</p>
                  </>
                )}
              </td>
              {/* Boulder Lead */}

              <td>
                {climberObject["boulder-lead"] && (
                  <>
                    <p>Rank: {climberObject["boulder-lead"].rank}</p>
                    <p>Points: {climberObject["boulder-lead"].points}</p>
                  </>
                )}
              </td>

              {/* Speed */}
              <td>
                {climberObject.speed && (
                  <>
                    <h4>Speed</h4>
                    <p>Rank: {climberObject.speed.rank}</p>
                    <p>Points: {climberObject.speed.points}</p>
                  </>
                )}{" "}
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}

export default ComparisonTable;
