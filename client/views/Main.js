import { useHistory } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Header from "../components/Header/Header";
import styled from "styled-components";
import Card from "../components/Card/Card";

const Main = () => {
  const [username, setUsername] = useState("");
  // const [trackingRepos, setTrackingRepos] = useState([]);
  const [repos, setRepos] = useState([]);
  const [avatar, setAvatar] = useState("");
  const history = useHistory();

  // Fetch user information upon initial render.
  // Then pass this down to child components
  useEffect(() => {
    fetch("/api/user/info")
      .then((response) => response.json())
      .then(({ userInfo, repos }) => {
        setUsername(userInfo.login);
        setAvatar(userInfo.avatar_url);
        setRepos(repos);
      })
      .catch((err) => {
        console.log("COULD NOT FETCH USER INFO AND REPOS", err);
      });
  }, []);

  return (
    <div>
      <Header username={username} avatar_url={avatar} history={history} />
      <MainWrapper>
        {repos.length === 0 && <h3>You have no repositories in Github.</h3>}
        {repos.map((repo) => {
          return <Card key={repo.id} repo={repo} />;
        })}
      </MainWrapper>
    </div>
  );
};

const MainWrapper = styled.main`
  margin: 0 auto;
  max-width: 960px;
  display: grid;
  gap: 1.3em;
  grid-template-columns: repeat(auto-fit, minmax(330px, 1fr));
`;

export default Main;
