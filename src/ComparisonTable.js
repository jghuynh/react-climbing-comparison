import { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";

function ComparisonTable({climbersList}) {
  // Ensure climber1 is an array before calling map
  if (!Array.isArray(climbersList)) {
    return null;
  }
  // console.log(`Climbers List: ${climbersList}`)
  // const [climber1, setclimber1] = useState([]);

  // useEffect(() => {
  //   fetch("/climbers-partial.json")
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }
  //       return response.json();
  //     })
  //     .then((climber1) => setclimber1(climber1))
  //     .catch((error) =>
  //       console.error(
  //         "There has been a problem with your fetch operation:",
  //         error
  //       )
  //     );
  // }, []);
  // const jsonObject = [
  //   {
  //     climber: "Janja GARNBRET",
  //     nation: "SLO",
  //     profileUrl: "https://www.ifsc-climbing.org/athlete/1147/janja-garnbret",
  //     gender: "women",
  //     age: "25",
  //     association: "Alpine Association of Slovenia",
  //     profileImage:
  //       "https://www.ifsc-climbing.org/_next/image?url=https%3A%2F%2Fifsc.results.info%2Fathletes%2F1147%2Fphoto&w=384&q=75",
  //     boulder: {
  //       rank: "1",
  //       points: "4805.0",
  //     },
  //     lead: {
  //       rank: "1",
  //       points: "5610.0",
  //     },
  //     "boulder-lead": {
  //       rank: "1",
  //       points: "7000.0",
  //     },
  //   },
  //   {
  //     climber: "Ai MORI",
  //     nation: "JPN",
  //     profileUrl: "https://www.ifsc-climbing.org/athlete/2380/ai-mori",
  //     gender: "women",
  //     age: "20",
  //     association: "Japan Mountaineering & Sport Climbing Association",
  //     profileImage:
  //       "https://www.ifsc-climbing.org/_next/image?url=https%3A%2F%2Fifsc.results.info%2Fathletes%2F2380%2Fphoto&w=384&q=75",
  //     lead: {
  //       rank: "2",
  //       points: "4610.0",
  //     },
  //     "boulder-lead": {
  //       rank: "3",
  //       points: "4535.0",
  //     },
  //     boulder: {
  //       rank: "15",
  //       points: "1535.0",
  //     },
  //   },
  // ];
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
