import { useHistory } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Header from "../components/Header/Header";
import styled from "styled-components";

const Main = () => {
  const [username, setUsername] = useState("");
  const [cards, setCards] = useState([]);
  const [avatar, setAvatar] = useState("");
  const history = useHistory();

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

  useEffect(() => {
    fetch(`/api/cards`)
      .then((response) => response.json())
      .then((data) => {
        setCards(data.cards);
      });
  }, []);

  return (
    <div>
      <Header username={username} avatar_url={avatar} history={history} />
      <MainWrapper>
        {cards.length === 0 && <h3>You are not watching any repositories.</h3>}
      </MainWrapper>
    </div>
  );
};

const MainWrapper = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default Main;
