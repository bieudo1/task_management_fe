import * as React from 'react';
import { styled } from '@mui/material/styles';
import {Box,Typography,Grid,Slider} from '@mui/material';


export default function ScrollBar() {
  const [value, setValue] = React.useState(0);

  const handleSliderChange = (newValue) => {
    setValue(newValue);
  };


  return (
    <Box sx = {{padding:"10px"}}>
      <Grid container spacing={1} alignItems="center"sx={{ width: 200 }}>
        <Grid item xs>
          <Slider
            size="small"
            value={typeof value === 'number' ? value : 0}
            onClick={handleSliderChange}
            aria-labelledby="input-slider"
          />
        </Grid>
        <Grid item>
          <Typography>{value}%</Typography>
        </Grid>
      </Grid>
    </Box>
  );
}
