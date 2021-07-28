import { useHistory } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Header from "../components/Header/Header";
import styled from "styled-components";
import Card from "../components/Card/Card";
import theme from "../styles/theme";
import Loader from "../components/Loader/Loader";
import CenterWrapper from "../components/CenterWrapper/CenterWrapper";
import SearchBar from "../components/Searchbar/Searchbar";

const Main = () => {
  const [username, setUsername] = useState("");
  // const [trackingRepos, setTrackingRepos] = useState([]);
  const [repos, setRepos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [filter, setFilter] = useState("");
  const [avatar, setAvatar] = useState("");
  const history = useHistory();

  // Fetch user information upon initial render.
  // Then pass this down to child components
  useEffect(() => {
    fetch("/api/user/info")
      .then((response) => response.json())
      .then(({ userInfo, repos }) => {
        setIsError(false);
        setUsername(userInfo.login);
        setAvatar(userInfo.avatar_url);
        setRepos(repos);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("COULD NOT FETCH USER INFO AND REPOS", err);
        setIsError(true);
        setIsLoading(false);
      });
  }, []);

  return !isLoading ? (
    <div>
      <Header
        username={username}
        avatar_url={avatar}
        history={history}
        isError={isError}
      />
      <MainWrapper>
        {!isError && <SearchBar response={setFilter} />}
        <div className="grid">
          {repos.length === 0 && !isError && (
            <h3>You have no repositories in Github.</h3>
          )}
          {repos
            .filter(
              (repo) =>
                filter.length <= 2 ||
                repo.name?.includes(filter) ||
                repo.description?.includes(filter)
            )
            .map((repo) => {
              return <Card key={repo.id} repo={repo} />;
            })}
          {isError && (
            <h3>
              Something went wrong. Your Github token may be expired. Please log
              out and log back in.
            </h3>
          )}
        </div>
      </MainWrapper>
    </div>
  ) : (
    <div>
      <CenterWrapper>
        <Loader color={theme.colors.main} />
      </CenterWrapper>
    </div>
  );
};

const MainWrapper = styled.main`
  margin: 0 auto;
  max-width: 960px;
  .grid {
    display: grid;
    gap: 1.3em;
    grid-template-columns: repeat(auto-fit, minmax(330px, 1fr));
  }
`;

export default Main;
