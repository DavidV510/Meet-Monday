/* eslint-disable no-use-before-define */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';


const Locations = () => { 
// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const Locations = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
  ];

  return (
    <Autocomplete
      options={Locations}
      getOptionLabel={(option) => option.title}
      renderInput={(params) => <TextField {...params} placeholder="Search Location" variant="outlined" />}
    />
  );
}
export default Locations
