import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import LogoIcon from './svgs/LogoIcon.component'
// MUI stuff
import { Button, Grid, IconButton, makeStyles, Paper, Typography } from "@material-ui/core";
import DehazeIcon from '@material-ui/icons/Dehaze';

const useStyles = makeStyles((theme) => ({
  root: {
    flex: 1,
    display: "flex",
    height: "75px",
    width: "100vw",
    alignItems: "center",
    padding: '0px 15px',
    borderBottom: '1px solid #6b75ea',
    borderRadius: '0px',
    [theme.breakpoints.up('sm')]: {
      justifyContent: "center",
    }
  },
  links:{
    display: "none",
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
      flexWrap: "wrap",
      alignItems: 'center',
    }
  },
  logo: {
    display: 'flex',
    minWidth: "175px",
    justifyContent: 'center'
  },
  logo__text: {
    alignSelf: 'center'
  },
  icon: {
    maxWidth: '35px',
    maxWidth: '35px',
    paddingRight: '3px',	
  },
  button: {
    fontWeight: 600,
    "&:hover": {
      color: theme.palette.secondary.main
    }
  },
  mobile__button: {
    borderRadius: '0px',
    "&:hover": {
      color: 'white',
      background: theme.palette.secondary.main
    },
  },
  button__special: {
    "&:hover": {
      color: 'white',
      background: theme.palette.secondary.main
    },
    "&:last-child": {
      marginLeft: '5px',
      borderRadius: '4px'
    },
  },
  mobile: {
    display: "flex",
    flexDirection: "row-reverse",
    position: "relative",
    flex: 1,
    [theme.breakpoints.up('sm')]: {
      display: "none",
    }
  },
  mobile__dropdown: {
    width: '100%',
    opacity: 1,
    transition: 'opacity 1s',
    [theme.breakpoints.up('sm')]: {
      display: "none",
    }
  },
  mobile__links: {
    display: 'flex',
    flexDirection: 'column',
  },
  spinOn: {
    transform: "rotate(-90deg)",
    transition: "transform 0.5s"
  },
  spinOff: {
    transform: "rotate(0deg)",
    transition: "transform 0.5s"
  },
  hide: {
    opacity: 0,
    height: 0,
    transition: 'opacity 1s',
  },
}));

export default function Navbar() {
  const classes = useStyles();
  let history = useHistory()
  const [mobileIsOpen, setMobileIsOpen] = useState(false)

  return (
    <header >
      <Paper className={classes.root}>
        <Grid className={classes.logo}>
          <LogoIcon className={classes.icon} /> 
          <Typography
            className={classes.logo__text}
            variant="h6"
            color="primary"
          >
           A&A Solutions
          </Typography>
        </Grid>
        <Grid className={classes.links}>
          <Button className={classes.button} color="primary">
            About
          </Button>
          <Button className={classes.button} color="primary">
            Security
          </Button>
          <Button className={classes.button} color="primary">
            Features
          </Button>
          <Button className={classes.button} color="primary">
            Clients
          </Button>
          <Button onClick={() => history.push('/signin')} variant="outlined" className={classes.button__special} color="primary">
            Sing in
	  </Button>
          <Button onClick={() => history.push('/signup')} variant="contained" className={classes.button__special} color="primary">
            Sign up
          </Button>
        </Grid>
	<Grid className={classes.mobile}>
          <IconButton edge="end" onClick={() => setMobileIsOpen(!mobileIsOpen)}>
            <DehazeIcon className={ mobileIsOpen ? classes.spinOn : classes.spinOff } fontSize='large'/>
          </IconButton>
        </Grid>
      </Paper>
        { mobileIsOpen && (
      <Grid className={mobileIsOpen ? classes.mobile__dropdown : classes.hide}>
        <Paper className={classes.mobile__links}>
          <Button className={classes.button} color="primary">
            About
          </Button>
          <Button className={classes.button} color="primary">
            Security
          </Button>
          <Button className={classes.button} color="primary">
            Features
          </Button>
          <Button className={classes.button} color="primary">
            Clients
          </Button>
          <Grid></Grid>
          <Button onClick={() => history.push('/signin')} variant="outlined" className={classes.mobile__button} color="primary">
            sign in
          </Button>
          <Button onClick={() => history.push('/signup')} variant="contained" className={classes.mobile__button} color="primary">
            Sign up
          </Button>
        </Paper>
      </Grid>)}
    </header>
  );
}
