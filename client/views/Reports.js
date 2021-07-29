import React from "react";
import { useHistory } from "react-router-dom";
import useUserGithubInfo from "../hooks/useUserGithubInfo";
import Header from "../components/Header/Header";
import CenterWrapper from "../components/CenterWrapper/CenterWrapper";
import Loader from "react-loader-spinner";
import theme from "../styles/theme";

const Reports = () => {
  const { username, avatar, isError, isLoading } = useUserGithubInfo(); // Wasteful...
  const history = useHistory();
  return !isLoading ? (
    <>
      <Header
        username={username}
        avatar_url={avatar}
        history={history}
        isError={isError}
      />
      <div>Hello, this is the reports page.</div>
    </>
  ) : (
    <CenterWrapper>
      <Loader color={theme.colors.main} />
    </CenterWrapper>
  );
};

export default Reports;
