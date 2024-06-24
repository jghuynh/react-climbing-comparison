function Climber({
  // name,
  age,
  gender,
  nation,
  boulder,
  lead,
  boulderLead,
  speed,
}) {
  return (
    <div>
      {/* <h3>Name: {name}</h3> */}
      <p>Age: {age}</p>
      <p>Gender: {gender}</p>
      {/* https://github.com/danalloway/react-country-flag */}
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
