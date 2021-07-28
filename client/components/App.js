import { useHistory } from "react-router-dom";
import React, { useEffect } from "react";

const App = () => {
  const history = useHistory();
  const handleRequestToBackend = () => {
    fetch("/api/user/info")
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  const handleLogOut = () => {
    fetch("/api/user/logout")
      .then(() => {
        history.push("/");
      })
      .catch((error) => {
        alert("Failure to log out!");
      });
  };

  useEffect(() => {
    const data = "";
  }, []);

  return (
    <div>
      <p>Welcome to the App</p>
      <button onClick={handleRequestToBackend}>Get user data</button>
      <button onClick={handleLogOut}>Log Out</button>
    </div>
  );
};

export default App;
