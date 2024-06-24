import Climber from "./Climber";
import Card from "react-bootstrap/Card";


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