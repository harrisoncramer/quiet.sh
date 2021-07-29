import React from "react";
import { useHistory } from "react-router-dom";
import useUserGithubInfo from "../hooks/useUserGithubInfo";
import Header from "../components/Header/Header";
import CenterWrapper from "../components/CenterWrapper/CenterWrapper";
import Loader from "react-loader-spinner";
import theme from "../styles/theme";
import useReports from "../hooks/useReports";
import dayjs from "dayjs";
import styled from "styled-components";

const ReportsDisplay = ({ reports }) => {
  console.log("REPORTS ARE: ", reports);
  return reports.map((report, i) => {
    const {
      exposed_count,
      full_name,
      html_url,
      is_exposed,
      is_gitleaks,
      number_of_secrets,
      time_of_execution,
    } = report;

    return (
      <ReportItem key={i}>
        <div>
          Repo: <a href={html_url}>{full_name}</a>
        </div>
        <div> Secrets Checked: {number_of_secrets}</div>
        <div>Files with Exposed Secrets: {exposed_count}</div>
        <div>{is_gitleaks}</div>
        <div>
          Executed: {dayjs(time_of_execution).format("h:mm A -- MM/DD/YYYY")}
        </div>
      </ReportItem>
    );
  });
};

const ReportItem = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 1em;
  background: #202020;
`;

const ReportWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
  margin: 0 auto;
  max-width: 960px;
`;

const Reports = () => {
  const { isLoading, isError, reports } = useReports();
  return !isLoading ? (
    <>
      {reports.length > 0 && (
        <ReportWrapper>
          <h2>Reports</h2>
          <ReportsDisplay reports={reports} />
        </ReportWrapper>
      )}
    </>
  ) : (
    <CenterWrapper>
      <Loader color={theme.colors.main} />
    </CenterWrapper>
  );
};

export default Reports;
