import React from "react";
import "./App.css";
import mondaySdk from "monday-sdk-js";
import "monday-ui-react-core/dist/main.css"
import BoardMembersComponent from './components/BoardMembersDropdown'
import Locations from './components/LocationDropdown'
import TeamSubList from './components/TeamSubList'

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

let ArrayTeam=[]
class App extends React.Component {
  
  constructor(props) {
    super(props);

    // Default state
    this.state = {
      settings: {},
      name: "",
      teamSubscribers:{}
    };

     
  }

  componentDidMount() {
    // TODO: set up event listeners
    monday.listen("context", res => {
      this.setState({context: res.data});
      console.log(res.data);
      monday.api(`query ($boardIds: [Int]) { boards (ids:$boardIds) { name items(limit:1) { name column_values { title text } } } }`,
        { variables: {boardId: this.state.context.boardIds} }
      )
      .then(res => {
        this.setState({boardData: res.data});
      });
    })
    monday.listen("itemIds", (res) => {
      console.log(res.data );
      this.setState({boardData: res.data});
      // [12345, 12346, 12347]
    });
  }

 

  
  render() {
    let handleCallback = (teamSubscriberFromChild) =>{
      ArrayTeam.push(teamSubscriberFromChild)
      this.setState({teamSubscribers : ArrayTeam})
    } 
    return (
      
      <div
        className="App"
        style={{ background: this.state.settings.background }}
      >
     
      {JSON.stringify(this.state.boardData, null, 2)}
    
      <div className="DropDowns">
      <BoardMembersComponent className="InputDrop" parentCallback = {handleCallback}></BoardMembersComponent>
      <Locations className="InputDrop"></Locations>
      </div>
      
      {console.log('App members: ' + this.state.teamSubscribers)}
      <TeamSubList className="TeamSubList" parentTeamSubscribers = {this.state.teamSubscribers} ></TeamSubList>
     
  </div>
      
      
      

      
    );
  }
}

export default App;
