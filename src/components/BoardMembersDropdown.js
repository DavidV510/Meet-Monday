import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';


const BoardMembersComponent = ({parentCallback, members}) => { 
  

  const onPickBoardMember = (BoardMemeber) => {
    if (!BoardMemeber){
      return 
    }
    parentCallback(BoardMemeber);
  }

  return (
    <Autocomplete
      onChange={(event, value) => {
       onPickBoardMember(value)
      }}
      options={members}
      getOptionLabel={(option) => option.name}
      renderInput = {(params) => 
      <TextField {...params} 
      placeholder="Enter name or email" variant="outlined" />
     }
    />
  );
}
export default BoardMembersComponent
