import React from 'react';
import Navbar from '../Navbar.component';
//MUI stuf
import { Grid } from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    flex: 1,
  }
}));

export default function HomePage(){
  const classes = useStyles();

  return (
    <Grid>
      <Navbar />
      <Grid>
        hello
      </Grid>
    </Grid>
  );
};
