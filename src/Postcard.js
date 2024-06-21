import { CardBody, CardText } from "react-bootstrap";
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
}) {
  return (
    <div
      
    >
      <Card style={{ width: "13rem", padding: "1.5rem" }}>
        <Card.Title>{name}</Card.Title>
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
