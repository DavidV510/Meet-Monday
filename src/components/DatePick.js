import React from 'react';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import Box from '@material-ui/core/Box';
import CalendarPicker from '@material-ui/lab/CalendarPicker';

class DatePick extends React.Component {
  constructor(props) {
    super(props); 
  } 

  render() {
    return (
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'start',
            flexDirection: 'row',
            '& > div': { margin: 2 },
          }}
        >
          <CalendarPicker
            allowKeyboardControl={false}
            date={this.props.date}
            onChange={(newDate) => this.props.setDate(newDate)}
          />
        </Box>
      </LocalizationProvider>
    );
  }
}
export default DatePick;
