import React from 'react';
// MUI stuff
import {Grid} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    flex: 1,
  },
}));

export default function SignupPage() {
  const classes = useStyles();

  return (
    <Grid>
      Signup Page
    </Grid>
  );
};
