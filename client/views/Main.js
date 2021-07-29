import React, { useState } from "react";
import styled from "styled-components";
import Card from "../components/Card/Card";
import theme from "../styles/theme";
import Loader from "../components/Loader/Loader";
import CenterWrapper from "../components/CenterWrapper/CenterWrapper";
import SearchBar from "../components/Searchbar/Searchbar";
import useUserGithubInfo from "../hooks/useUserGithubInfo";

const Main = () => {
  const { repos, isLoading, isError } = useUserGithubInfo();
  const [filter, setFilter] = useState("");

  const handleCheckSecrets = ({ repo, secrets }) => {
    fetch("/api/reports/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ repo, secrets }),
    }).catch((err) => {
      console.log(err);
    });
  };

  return !isLoading ? (
    <MainWrapper>
      {repos.length === 0 && !isError ? (
        <h3>You have no repositories in Github.</h3>
      ) : (
        <h1>Repositories</h1>
      )}
      {!isError && <SearchBar response={setFilter} />}
      <div className="grid">
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
  ) : (
    <CenterWrapper>
      <Loader color={theme.colors.main} />
    </CenterWrapper>
  );
};

const MainWrapper = styled.main`
  max-width: 1500px;
  margin: 0 auto;
  .grid {
    display: grid;
    gap: 1.3em;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  }
`;

export default Main;
