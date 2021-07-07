import React from 'react';
import api from "./api";

export default function DisplayUser() {
  const [user, setUser] = React.useState(null);
  async function handleClick(e) {
    e.preventDefault();
    let res = await api.getUser();
    console.log(res.data);
    setUser(res.data);
  };
  const displayMarkup = user 
	? <p>{user.email}</p>
	: <button onClick={handleClick}>Load User</button>

  return displayMarkup;
};
