function Climber({
  name,
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
      <h3>Name: {name}</h3>
      <p>Age: {age}</p>
      <p>Gender: {gender}</p>
      <p>Nationality: {nation}</p>
      {boulder && (
        <>
          <p>Rank: {boulder.rank}</p>
          <p>Points: {boulder.points}</p>
        </>
      )}
      {lead && (
        <>
          <p>Rank: {lead.rank}</p>
          <p>Points: {lead.points}</p>
        </>
      )}

      {boulderLead && (
        <>
          <p>Rank: {boulderLead.rank}</p>
          <p>Points: {boulderLead.points}</p>
        </>
      )}
      {speed && (
        <>
          <p>Rank: {speed.rank}</p>
          <p>Points: {speed.points}</p>
        </>
      )}
    </div>
  );
}

export default Climber;