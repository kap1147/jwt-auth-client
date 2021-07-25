import React, { useCallback, useEffect,useState } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../../api';
import LogoIcon from '../svgs/LogoIcon.component';
// MUI stuff
import {
  Button,
  Grid,
  Link,
  makeStyles,
  Paper,
  TextField,
  Typography
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flex: 1,
    height: "80vh",
    alignContent: "center",
    [theme.breakpoints.up("sm")]: {
      justifyContent: "center"
    }
  },
  signin: {
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "50%",
      justifyContent: "center"
    },
    [theme.breakpoints.up("lg")]: {
      width: "30%",
      justifyContent: "center"
    }
  },
  card: {
    padding: "40px 20px"
  },
  header: {
    textAlign: 'center',
  },
  body: {},
  button: {
    marginTop: "10px"
  },
  register: {
    marginTop: "10px"
  },
  link: {
    "&:hover": {
      cursor: "pointer"
    }
  },
  google: {
    padding: "15px 0",
    display: "flex",
    justifyContent: "center"
  },
  google__button: {
    padding: "6px 16px",
    border: "1px solid #8a8a8a99",
    borderRadius: "3px",
    fontWeight: 600,
    lineHeight: 1.75,
    width: "25%",
    "&:hover": {
      cursor: "pointer"
    }
  }
}));

let initialValues = {
  email: "",
  password: ""
};

let initialErrors = {
  email: [],
  password: []
};


export default function SigninPage() {
  const classes = useStyles();
  const [errors, setErrors] = useState(initialValues);
  const [serverErrors, setServerErrors] = useState(initialErrors);
  const [values, setValues] = useState(initialErrors);
  const [isDisabled, setIsDisabled] = useState(true);
  let history = useHistory();

  const getErrors = useCallback(() => {
    return errors;
  }, [errors]);

  const serverHasErrors = useCallback(() => {
    if (serverErrors.email.length !== 0 || serverErrors.password.length !== 0) {
      
    };
  },[serverErrors]);

  const formIsValid = useCallback(() => {
    if (errors.email.length === 0 && errors.password.length === 0) return true;
    return false;
  }, [errors]);

  const formIsBlank = useCallback(() => {
    if (values.email.length === 0 || values.password.length === 0) return true;
    return false;
  }, [values]);

  // disable if form has errors
  useEffect(() => {
    if (!formIsValid() || formIsBlank()) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [formIsBlank, formIsValid]);

  // clean input
  function handleChange(e) {
    setValues({...values, [e.target.id]: e.target.value });
    let staticErrors = [];
    let newErrors = [];
    if (e.target.value.length === 0) {
      newErrors.push({ id: 0, msg: `${e.target.id} can not be blank!` });
      if (staticErrors.length !== 0)
        staticErrors = staticErrors.filter((err) => err.id !== 1);
    } else {
      // field is not blank, remove from static array if present
      if (staticErrors.length !== 0)
        staticErrors = staticErrors.filter((err) => err.id !== 0);
    }
    // v
    if (e.target.id === "email" && e.target.value.length !== 0 && serverErrors.email.length !== 0) {
      serverErrors.email.forEach(err => {
        if (err.id === 2 && err.email === e.target.value) { 
            newErrors.push(err)
        };
      })
    } 
    // validate email is correct syntax
    if (e.target.id === "email" && e.target.value.length !== 0) {
      let re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      if (!re.exec(values.email)) {
        newErrors.push({ id: 1, msg: "Email is invalid!" });
      } 
      if (staticErrors.length !== 0)
        staticErrors = staticErrors.filter((err) => err.id !== 1);
    }
    setErrors({...errors, [e.target.id]: newErrors})
  }

  async function handleClick(event) {
    event.preventDefault();
    if (formIsValid() && !formIsBlank()) {
      let res = await api.login(values);
      if (res.status === 200) {
        console.log('success: ', res.data)
      } else {
        let data = res.response.data;
        console.log('error response: ', data);
        if (data) {
	  setServerErrors({...serverErrors, [data.type]: [data.payload]})
          setErrors({...errors, [data.type]: [data.payload]});
        };
      }
    } else {
      console.log("data is dirty (<");
    }
    setValues((prev) => ({ ...prev, password: "" }));
  }
  return (
    <Grid container className={classes.root}>
      <Paper className={classes.signin}>
        <Grid className={classes.card}>
          <Grid className={classes.header}>
            <LogoIcon className={classes.icon}/>
            <Typography variant="h4" color="primary" align="center">
              Sign in with
            </Typography>
          </Grid>
          <Grid className={classes.body}>
            <Grid className={classes.google}>
              <button
                onClick={() =>
                  window.open(
                    "https://aa-solutions.tech/api/auth/google",
                    "_self"
                  )
                }
                className={classes.google__button}
              >
                Google
              </button>
            </Grid>
            <Typography align="center" variant="h5" color="primary">
              Or
            </Typography>
	    <form>
            <TextField
              autoComplete="off"
              error={(errors.email.length !== 0) ? true : false}
              id="email"
              value={values.email}
              onChange={handleChange}
              label="Email"
              className={classes.textField}
              helperText={
                (errors.email.length !== 0)
                  ? errors.email.map((err) => err.msg)
                  : "We'll never share your email."
              }
              margin="normal"
              variant="outlined"
              fullWidth
            />
            <Typography variant="subtitle2" align="right">
              <Link className={classes.link}>Forgot password</Link>
            </Typography>
            <TextField
              error={(errors.password.length !== 0 || serverErrors.password.length !== 0) ? true : false}
              id="password"
              label="Password"
              className={classes.textField}
              value={values.password}
              onChange={handleChange}
              helperText={
                (errors.password.length !== 0)
                  ? [errors.password].map((err) => err.msg)
                  : null
              }
              margin="normal"
              variant="outlined"
              type="password"
              fullWidth
            />
            <Button
              onClick={handleClick}
              type="submit"
              fullWidth
              className={classes.button}
              variant="contained"
              color="primary"
              disabled={isDisabled}
            >
              Sign in
            </Button>
	  </form>
            <Typography
              className={classes.register}
              variant="body2"
              align="right"
            >
              Don't have an account? Register{" "}
              <Link
                className={classes.link}
                onClick={() => history.push("/signup")}
              >
                here
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
}
