import Climber from "./Climber";

function Card({
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
    <div>
      <Climber
        name={name}
        age={age}
        gender={gender}
        nation={nation}
        boulder={boulder}
        lead={lead}
        boulderLead={boulderLead}
        speed={speed}
      />
    </div>
  );
}

export default Card;
