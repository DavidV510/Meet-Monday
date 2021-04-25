import React from "react";
import "./App.css";
import mondaySdk from "monday-sdk-js";
import "monday-ui-react-core/dist/main.css";
import BoardMembersComponent from "./components/BoardMembersDropdown";
import Locations from "./components/LocationDropdown";
import TeamSubList from "./components/TeamSubList";

const monday = mondaySdk();

// const obj = [
//   // Board view context
//   {
//     "boardViewId": 19324,
//     "boardIds": [3423243],
//     "mode": "fullScreen", // or "split"
//     "theme": "light"  // or "dark"
//   },

//   // Dashboard widget context
//   {
//     "widgetId": 54236,
//     "boardIds": [3423243, 943728],
//     "theme": "light"  // or "dark"
//   },

//   // Item view context
//   {
//       "boardId" : 12345,
//       "itemId" : 123456
//   }
// ]

let ArrayTeam = [];
class App extends React.Component {
  constructor(props) {
    super(props);

    // Default state
    this.state = {
      settings: {},
      name: "",
      teamSubscribers: {},
      teamMembers: [],
      taskName: "",
    };
  }

  componentDidMount() {
    monday.listen("context", (res) => {
      this.setState({ context: res.data });

      if (res.data.itemIds) {
        const boardId = res.data.boardIds[0];
        const taskId = res.data.itemIds[0];
        // get task info
        monday.api(`query {items (ids: [${taskId}]) {name}}`).then((res) => {
          this.setState({ taskName: res.data.items[0].name });
        });

        // get board members
        monday.api(` query {boards (ids: ${boardId}) {subscribers {email name} }}`)
          .then((res) => {
            debugger;
            this.setState({ teamMembers: res.data.boards[0].subscribers });
          });
      }
    });

    ///////////////
    monday.listen("itemIds", (res) => {
      console.log(res.data);
      debugger
      this.setState({ boardData: res.data });
      // [12345, 12346, 12347]
    });
  }

  render() {
    let handleCallback = (teamSubscriberFromChild) => {
      ArrayTeam.push(teamSubscriberFromChild);
      debugger
      this.setState({ teamSubscribers: ArrayTeam });
    };
    return (
      <div
        className="App"
        style={{ background: this.state.settings.background }}
      >

        <div className="DropDowns">
          <BoardMembersComponent
            className="InputDrop"
            parentCallback={handleCallback}
            members={this.state.teamMembers}
          ></BoardMembersComponent>
          {/* <Locations className="InputDrop"></Locations> */}
        </div>

        <TeamSubList
          className="TeamSubList"
          parentTeamSubscribers={this.state.teamSubscribers}
        ></TeamSubList>
      </div>
    );
  }
}

export default App;
