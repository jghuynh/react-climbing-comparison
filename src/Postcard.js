/**
 * A Postcard React component that displays a climber's statistics
 */
import Climber from "./Climber";
import Card from "react-bootstrap/Card";

/**
 * Displays a climber's statistics
 *
 * @param {string} name the name of the athletes
 * @param {int} age the athlete's age
 * @param {string} gender the athlete's gender: male or female (no nonbinary--sorry!)
 * @param {string} nation the athlete's nation; country of citizenship
 * @param {object} boulder the athlete's boulder points and ranking
 * @param {object} lead the athlete's lead points and ranking
 * @param {object} speed the athlete's speed points and ranking
 * @param {object} boulderLead the athlete's boulder-lead points and ranking
 * @param {string} profileUrl the URL (string-form) to the athlete's profile page
 * @param {string} profileIMage the URL (string-form) to the athlete's profile image
 * @returns {ReactNode} the Postcard of basic athlete's statistics information
 */
function Postcard({
  name,
  age,
  gender,
  nation,
  boulder,
  lead,
  speed,
  boulderLead,
  profileUrl,
  profileImage,
}) {
  return (
    <div>
      <Card style={{ width: "13rem", padding: "1.5rem" }}>
        <Card.Title>
          <a href={profileUrl} target="_blank">
            {name}
          </a>
        </Card.Title>
        <Card.Img src={profileImage} variant="top"></Card.Img>
        <Climber
          age={age}
          gender={gender}
          nation={nation}
          boulder={boulder}
          lead={lead}
          boulderLead={boulderLead}
          speed={speed}
        />
      </Card>
    </div>
  );
}

export default Postcard;
