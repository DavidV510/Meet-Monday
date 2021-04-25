/* eslint-disable no-use-before-define */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';


const BoardMembersComponent = ({parentCallback}) => { 
  
let state = {
  BoardMembers:[]
}
const BoardMembers = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: '12 Angry Men', year: 1957 },
  ];

  const onPickBoardMember = (BoardMemeber) => {
    if (!BoardMemeber){
      return 
    }
    state.BoardMembers.push(BoardMemeber)
    console.log('Board Member: ' + BoardMemeber)
    parentCallback(BoardMemeber);
    
  }

  return (
    <Autocomplete
      onChange={(event, value) => {
       onPickBoardMember(value)
      }}
      options={BoardMembers}
      getOptionLabel={(option) => option.title}
      renderInput = {(params) => 
      <TextField {...params} 
      placeholder="Enter name or email" variant="outlined" />
     }
    />
  );
}
export default BoardMembersComponent
