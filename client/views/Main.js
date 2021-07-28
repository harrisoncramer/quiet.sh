import { useHistory } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Button } from "../components/PrimaryButton/PrimaryButton";
import theme from "../styles/theme";

const Main = () => {
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState("");
  const history = useHistory();

  const handleLogOut = () => {
    fetch("/api/user/logout")
      .then(() => {
        history.push("/");
      })
      .catch((error) => {
        alert("Failure to log out!");
      });
  };

  // Fetch user information upon initial render.
  // Then pass this down to child components
  useEffect(() => {
    fetch("/api/user/info")
      .then((response) => response.json())
      .then((data) => {
        setUsername(data.login);
        setAvatar(data.avatar_url);
      })
      .catch((err) => {
        console.log("COULD NOT FETCH USER INFO", err);
      });
  }, []);

  return (
    <div>
      <p>Welcome, @{username} </p>
      <img src={avatar} />
      <Button
        onClick={handleLogOut}
        normal={theme.colors.main}
        light={theme.colors.lightMain}
      >
        Log Out
      </Button>
    </div>
  );
};

export default Main;
