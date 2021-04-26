import React, { useEffect, useState } from "react";
import "./App.css";
import mondaySdk from "monday-sdk-js";
import "monday-ui-react-core/dist/main.css";
import BoardMembersComponent from "./components/BoardMembersDropdown";
import Locations from "./components/LocationDropdown";
import TeamSubList from "./components/TeamSubList";
import DatePick from "./components/DatePick";

const monday = mondaySdk();

function App() {
  const [date, setDate] = useState(new Date());
  const [settings, setSettings] = useState({});
  const [taskName, setTaskName] = useState("");
  const [teamMembers, setTeamMembers] = useState([]);
  const [selectedTeamMembers, setSelectedTeamMembers] = useState([]);

  useEffect(() => {
    monday.listen("context", (res) => {
      const context = res.data;
      if (context.itemIds) {
        const boardId = context.boardIds[0];
        const taskId = context.itemIds[0];
        // get and set task info
        monday.api(`query {items (ids: [${taskId}]) {name}}`).then((res) => {
          setTaskName(res.data.items[0].name);
        });
        // get and set board members
        monday
          .api(
            ` query {boards (ids: ${boardId}) {subscribers {email name photo_original, photo_small} }}`
          )
          .then((res) => {
            setTeamMembers(res.data.boards[0].subscribers);
          });
      }
    });
  }, []);

  let handleAddMember = (teamSubscriberFromChild) => {
    const isFound = selectedTeamMembers.some((mem) => {
      if (mem.name === teamSubscriberFromChild.name) return true;
    });
    if (isFound) return;
    let arr = [...selectedTeamMembers];
    arr.push(teamSubscriberFromChild);
    setSelectedTeamMembers(arr);
  };

    let handleRemoveMember = (teamSubscriberFromChild) => {
      let arr = [...selectedTeamMembers];
      arr.splice(teamSubscriberFromChild, 1);
      setSelectedTeamMembers(arr);
    };


  return (
    <div className="App" style={{ background: settings.background }}>
      <DatePick date={date} setDate={(newDate) => setDate(newDate)}></DatePick>

      <div className="DropDowns">
        <BoardMembersComponent
          className="InputDrop"
          parentCallback={handleAddMember}
          members={teamMembers}
          selectedMembers={selectedTeamMembers}
        ></BoardMembersComponent>
        {/* <Locations className="InputDrop"></Locations> */}
      </div>
 
      <TeamSubList
        className="TeamSubList"
        parentCallback={handleRemoveMember}
        parentTeamSubscribers={selectedTeamMembers}
      ></TeamSubList>
    </div>
  );
}
export default App;
