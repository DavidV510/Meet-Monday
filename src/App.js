import React, { useEffect, useState } from 'react';
import './App.css';
import mondaySdk from 'monday-sdk-js';
import 'monday-ui-react-core/dist/main.css';
//Explore more Monday React Components here: https://style.monday.com/
import AttentionBox from 'monday-ui-react-core/dist/AttentionBox.js';
import number from 'monday-ui-react-core';
// import ExpandCollapse from 'monday-ui-react-core/dist/ExpandCollapse'
//import ExpandCollapseComponent from 'monday-ui-react-core/src/components/ExpandCollapse/ExpandCollapse.jsx'
import Icon from 'monday-ui-react-core/dist/Icon';
import Robot from 'monday-ui-react-core';
import DatePick from './components/DatePick/DatePick';

const monday = mondaySdk();

const obj = [
  // Board view context
  {
    boardViewId: 19324,
    boardIds: [3423243],
    mode: 'fullScreen', // or "split"
    theme: 'light', // or "dark"
  },

  // Dashboard widget context
  {
    widgetId: 54236,
    boardIds: [3423243, 943728],
    theme: 'light', // or "dark"
  },

  // Item view context
  {
    boardId: 12345,
    itemId: 123456,
  },
];

function App() {
  const [date, setDate] = useState(new Date());
  const [settings, setSettings] = useState({});
  const [userId, setUserId] = useState('');

  useEffect(() => {
    monday.listen('context', (res) => {
      const context = res.data;
      console.log('context!', context);
      const userId = context.userId ? context.user.id : false;
      // this.setState({ userId, context });
      setUserId(context);
    });
  }, []);

  // getBoardData() {
  //   let query = 'query { boards (limit:5) {name id} }';

  //   let query =
  //     'query { \
  //       boards(ids: 1005854484) { \
  //         name \
  //         subscribers { \
  //           name \
  //           email \
  //           photo_thumb \
  //         } \
  //       } \
  //     }';

  //   fetch('https://api.monday.com/v2', {
  //     method: 'post',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Authorization: process.env.MONDAY_API_KEY,
  //     },
  //     body: JSON.stringify({
  //       query: query,
  //     }),
  //   })
  //     .then((res) => res.json())
  //     .then((res) => console.log(JSON.stringify(res, null, 2)));

  //   monday.api(query).then((res) => {
  //     console.log(res);
  //   });
  // }

  return (
    <div className='App' style={{ background: settings.background }}>
      <AttentionBox
        title={settings.attentionBoxTitle || 'Hello monday.apps'}
        text={
          settings.attentionBoxMessage ||
          "You should be nfo that appears here using the fields you've set up previously in the View settings :) "
        }
        type={settings.attentionBoxType || 'success'}
      />
      {/* {JSON.stringify(userId)} */}

      <DatePick date={date} setDate={(newDate) => setDate(newDate)}></DatePick>
    </div>
  );
}

export default App;
