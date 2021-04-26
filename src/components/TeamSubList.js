import React from "react";

const TeamSubList = ({ parentTeamSubscribers, parentCallback }) => {
  const removeMember = (i) => {
    parentCallback(i);
  };

  return (
    <div className="TeamSubList">
      <h4 className="team-title">Team Subscribers list</h4>
      {parentTeamSubscribers.map((person, i) => (
        <div className="member" key={i}>
          <img className="pic" src={person.photo_small}></img>
          <div className="info">{person.name}</div>
          <img className="admin-icon" src={person.is_admin? '../../admin.svg': '../../no-admin.svg'} ></img>
          <img className="x-icon" src='../../x-icon.svg' onClick={() => removeMember(i)}></img>
        </div>
      ))}
    </div>
  );
};

export default TeamSubList;
