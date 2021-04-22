import React from "react";
import "./App.css";
import mondaySdk from "monday-sdk-js";
import "monday-ui-react-core/dist/main.css"
//Explore more Monday React Components here: https://style.monday.com/
import AttentionBox from "monday-ui-react-core/dist/AttentionBox.js"
import number from 'monday-ui-react-core'
import ExpandCollapse from 'monday-ui-react-core/dist/ExpandCollapse'
//import ExpandCollapseComponent from 'monday-ui-react-core/src/components/ExpandCollapse/ExpandCollapse.jsx'
import Icon from 'monday-ui-react-core/dist/Icon'
import Robot from 'monday-ui-react-core'
import BoardMembers from './BoardMembers'

const monday = mondaySdk();

const obj = [
  // Board view context
  {
    "boardViewId": 19324,
    "boardIds": [3423243],
    "mode": "fullScreen", // or "split"
    "theme": "light"  // or "dark"
  },

  // Dashboard widget context
  {
    "widgetId": 54236,
    "boardIds": [3423243, 943728],
    "theme": "light"  // or "dark"
  },

  // Item view context 
  {
      "boardId" : 12345,
      "itemId" : 123456
  }
]


class App extends React.Component {
  constructor(props) {
    super(props);

    // Default state
    this.state = {
      settings: {},
      name: "",
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
    return (
      
      <div
        className="App"
        style={{ background: this.state.settings.background }}
      >
     <AttentionBox 
     title = {this.state.settings.attentionBoxTitle || "Hello monday.apps"}
     text={this.state.settings.attentionBoxMessage || "You should be nfo that appears here using the fields you've set up previously in the View settings :) "}
     type={this.state.settings.attentionBoxType || "success"}
/>
{JSON.stringify(this.state.boardData, null, 2)}
    
  </div>
      
      
      

      
    );
  }
}

export default App;
