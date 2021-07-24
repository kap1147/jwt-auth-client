import React, { useState, useEffect } from "react";
import Cookies from 'js-cookie';
import api from "./api";
import DisplayUser from "./DisplayUser.component";
import { Route, Switch } from "react-router-dom";
// Pages
import HomePage from './components/pages/HomePage.component';
import SigninPage from './components/pages/SigninPage.component';
import SignupPage from './components/pages/SignupPage.component';
import SignoutPage from './components/pages/SignoutPage.component';

import AuthRoute from './components/HOCs/AuthRoute.component';

var initialState = {
    display: "hide",
    isAuthenticated: false,
    user: null,
    loading: false,
  }

const App = () => {
  const [appState, setAppState] = useState(initialState);
  const [refreshToken, setRefreshToken] = React.useState(Cookies.get('refreshToken'));
  const [accessToken, setAccessToken] = React.useState(localStorage.getItem('accessToken'));
  function handleLogin(){
    window.open("https://aa-solutions.tech/api/auth/google", "_self");
  };

  async function handleLogout(){
    try {
      await api.logout();
      setAppState(initialState);
      localStorage.removeItem('accessToken');
      window.location.reload();
    } catch (err) {
      console.error(err);
      setAppState({ ...appState, loading: false });
      alert(err.response.data.error);
    };
  };

  React.useEffect(async ()=>{
    if (refreshToken && !accessToken) {
      try {
        var res = await api.getToken();
	if (res.data.accessToken) {
          localStorage.setItem('accessToken', res.data.accessToken);
	  setAppState({...appState, isAuthenticated: true});  
	}
      } catch (err) {
        console.error(err)
	alert(err.response.data.error);
      }
    } else if (!refreshToken && accessToken) {
      localStorage.removeItem('accessToken');
      setAppState(initialState);
      window.location.reload();
    };
  },[refreshToken, accessToken]);

  React.useEffect(() => {
    if (accessToken && !appState.isAuthenticated) {
      setAppState({...appState, isAuthenticated: true});
    };
  }, [accessToken, appState]);

  const mainMarkup = appState.isAuthenticated 
		? <div>You are logged in!<DisplayUser /><button onClick={handleLogout}>logout</button></div>
		: <button onClick={handleLogin}>Google Login</button>



  return (
      <Switch>
        {/* Client app routes */}
        <Route exact path="/" component={HomePage} />
	<Route exact path="/signin" component={SigninPage} />
	<Route exact path="/signup" component={SignupPage} />
        <AuthRoute exact path="/signout" component={SignoutPage} isAuthenticated={appState.isAuthenticated} />
      </Switch>
  );
};

export default App;
