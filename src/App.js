import { useState, useEffect } from "react";
import Postcard from "./Postcard";
import ComparisonTable from "./ComparisonTable";
import Fuse from "fuse.js";

/**
 * An app that displays all registed ISFC climbers' statistics and lets
 * users compare them in a comparison table
 *
 * @returns {ReactNode} The whole app
 */
function App() {
  const [data, setData] = useState([]);
  const [result1, setResult1] = useState({});
  const [result2, setResult2] = useState({});
  const [climbersList, setClimbersList] = useState([]);
  const [input1, setInput1] = useState("Ai Mori");
  const [input2, setInput2] = useState("Chaehyun SEO");
  const [query1, updateQuery1] = useState("Ai Mori");
  const [query2, updateQuery2] = useState("Chaehyun SEO");

  /**
   * Reads the climbers information from a JSON file
   */
  useEffect(() => {
    fetch("/climbers.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
      })
      .catch((error) =>
        console.error(
          "Oops! There has been a problem with your fetch operation:",
          error
        )
      );
  }, []);

  /**
   * Adds search functionality (Fuse) to search for climbers based on user input
   *
   */
  useEffect(() => {
    if (data.length > 0) {
      const options = {
        includeScore: true,
        threshold: 0.3,
        keys: ["climber", "nation"],
      };

      const fuse = new Fuse(data, options);
      const searchResult1 = fuse.search(query1).map((result) => result.item)[0];
      const searchResult2 = fuse.search(query2).map((result) => result.item)[0];

      setResult1(searchResult1);
      setResult2(searchResult2);

      setClimbersList([searchResult1, searchResult2]);
    }
  }, [query1, query2, data]);

  /**
   * Sets the state input variable for Climber 1 as the user's query
   * @param {*} e the current, or the user input query
   */
  function onSearch1(e) {
    setInput1(e.currentTarget.value);
  }

  /**
   * Sets the state input variable for Climber 2 as the user's query
   * @param {} e the current event, or the user input query
   */
  function onSearch2(e) {
    setInput2(e.currentTarget.value);
  }

  /**
   * When the user hits Enter, website will update the state query variable.
   * The query variable will be inputted into the search function
   * @param {} e the current event
   */
  function handleKeyDown1(e) {
    if (e.key === "Enter") {
      updateQuery1(input1);
    }
  }

  /**
   * When the user hits Enter, website will update the state query variable.
   * The query variable will be inputted into the search function
   * @param {*} e the event
   */
  function handleKeyDown2(e) {
    if (e.key === "Enter") {
      updateQuery2(input2);
    }
  }

  return (
    <div className="App">
      <h1 class="center">Comparing IFSC Climbers</h1>
      <h3>Climber 1</h3>
      <input
        type="text"
        value={input1}
        onChange={onSearch1}
        onKeyDown={handleKeyDown1}
      />

      <h3>Climber 2</h3>
      <input
        type="text"
        value={input2}
        onChange={onSearch2}
        onKeyDown={handleKeyDown2}
      />
      <ComparisonTable climbersList={climbersList} />

      <div
        className="d-flex flex-row align-items-center
                        justify-content-center vh-50 margin-auto flex-wrap"
      >
        {data.map((climberObject, index) => (
          <Postcard
            key={index}
            name={climberObject.climber}
            age={climberObject.age}
            gender={climberObject.gender}
            nation={climberObject.nation}
            boulder={climberObject.boulder}
            lead={climberObject.lead}
            speed={climberObject.speed}
            boulderLead={climberObject["boulder-lead"]}
            profileUrl={climberObject.profileUrl}
            profileImage={climberObject.profileImage}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
