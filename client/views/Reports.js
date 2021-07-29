import React from "react";
import { useHistory } from "react-router-dom";
import useUserGithubInfo from "../hooks/useUserGithubInfo";
import Header from "../components/Header/Header";
import CenterWrapper from "../components/CenterWrapper/CenterWrapper";
import Loader from "react-loader-spinner";
import theme from "../styles/theme";
import useReports from "../hooks/useReports";

// const { username, avatar, isError, isLoading } = useUserGithubInfo(); // Wasteful...
//      <Header
//        username={username}
//        avatar_url={avatar}
//        history={history}
//        isError={isError}
//      />
// const history = useHistory();

const Reports = () => {
  const { isLoading, isError, reports } = useReports();
  console.log(reports);
  return !isLoading ? (
    <>
      <div>Hello, this is the reports page.</div>
    </>
  ) : (
    <CenterWrapper>
      <Loader color={theme.colors.main} />
    </CenterWrapper>
  );
};

export default Reports;
