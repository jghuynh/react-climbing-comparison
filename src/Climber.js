// Displays the climber's stats in a cleaner method
import ReactCountryFlag from "react-country-flag";

/**
 * Displays the climber's stats, in a cleaner method
 *
 * @param {int} age the athlete's age
 * @param {string} gender the athlete's gender
 * @param {string} nation the athlete's nationality, ISO-style
 * @param {object} boulder the athlete's boulder points and rank
 * @param {object} lead the athlete's lead points and rank
 * @param {object} boulderLead the athlete's boulder-lead points and rank
 * @param {object} speed the athlete's speed points and rank
 * @return {ReactNode} the Climber's stats
 *
 * @returns
 */

function Climber({ age, gender, nation, boulder, lead, boulderLead, speed }) {
  return (
    <div>
      {/* <h3>Name: {name}</h3> */}
      <p>Age: {age}</p>
      <p>Gender: {gender}</p>
      {/* https://github.com/danalloway/react-country-flag */}
      <ReactCountryFlag
        className="emojiFlag"
        countryCode={nation}
        svg
        style={{
          fontSize: "2em",
          lineHeight: "2em",
        }}
        aria-label={nation}
      />
      <p>Nationality: {nation}</p>
      {boulder && (
        <>
          <h6>Boulder</h6>
          <p>Rank: {boulder.rank}</p>
          <p>Points: {boulder.points}</p>
        </>
      )}
      {lead && (
        <>
          <h6>Lead</h6>
          <p>Rank: {lead.rank}</p>
          <p>Points: {lead.points}</p>
        </>
      )}

      {boulderLead && (
        <>
          <h6>Boulder-Lead</h6>
          <p>Rank: {boulderLead.rank}</p>
          <p>Points: {boulderLead.points}</p>
        </>
      )}
      {speed && (
        <>
          <h6>Speed</h6>
          <p>Rank: {speed.rank}</p>
          <p>Points: {speed.points}</p>
        </>
      )}
    </div>
  );
}

export default Climber;
