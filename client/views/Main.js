import { useHistory } from "react-router-dom";
import React, { useState } from "react";
import Header from "../components/Header/Header";
import styled from "styled-components";
import Card from "../components/Card/Card";
import theme from "../styles/theme";
import Loader from "../components/Loader/Loader";
import CenterWrapper from "../components/CenterWrapper/CenterWrapper";
import SearchBar from "../components/Searchbar/Searchbar";
import useUserGithubInfo from "../hooks/useUserGithubInfo";

const Main = () => {
  const { username, repos, isLoading, isError, avatar } = useUserGithubInfo();
  const [filter, setFilter] = useState("");
  const history = useHistory();

  const handleCheckSecrets = ({ repo, secrets }) => {
    console.log(secrets, repo);
  };

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
              return (
                <Card
                  key={repo.id}
                  repo={repo}
                  handleCheckSecrets={handleCheckSecrets}
                />
              );
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
