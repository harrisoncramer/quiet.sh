import React, { useState } from "react";
import CenterWrapper from "../components/CenterWrapper/CenterWrapper";
import Loader from "react-loader-spinner";
import theme from "../styles/theme";
import useReports from "../hooks/useReports";
import dayjs from "dayjs";
import styled from "styled-components";
import Indicator from "../components/Indicator/Indicator";
import { Button } from "../components/PrimaryButton/PrimaryButton";

const Report = ({
  is_exposed,
  html_url,
  full_name,
  number_of_secrets,
  exposed_count,
  is_gitleaks,
  time_of_execution,
}) => {
  const [showDetails, setShowDetails] = useState(false);

  const handleDeleteReport = () => {
    // fetch to /reports/delete
  };

  return (
    <ReportItem>
      <TitleDiv>
        <div>
          Repo: <a href={html_url}>{full_name}</a>
        </div>
        <SettingsWrapper>
          <Indicator isPassed={!is_exposed} />
          <Button
            color={"white"}
            normal={theme.colors.mainBackground}
            light={"black"}
            onClick={() => setShowDetails(!showDetails)}
          >
            {!showDetails ? "Show Details" : "Hide Details"}
          </Button>
          <Button
            color={"white"}
            normal={theme.colors.warning}
            light={theme.colors.warningDark}
            onClick={handleDeleteReport}
          >
            Delete
          </Button>
        </SettingsWrapper>
      </TitleDiv>
      <Content>
        <div> Secrets Checked: {number_of_secrets}</div>
        <div>Files with Exposed Secrets: {exposed_count}</div>
        <div>{is_gitleaks}</div>
        <div>
          Executed: {dayjs(time_of_execution).format("h:mm A -- MM/DD/YYYY")}
        </div>
      </Content>
      {showDetails && (
        <ReportDetailsWrapper>
          {!is_exposed && (
            <div>
              There were no secrets exposed on this check. Feel free to delete
              this report.
            </div>
          )}
        </ReportDetailsWrapper>
      )}
    </ReportItem>
  );
};

const ReportDetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const TitleDiv = styled.div`
  background: #0f0f0f;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 5px 5px 0px 0px;
  border-bottom: none;
  padding: 1em;
`;

const Content = styled.div`
  padding: 1em;
`;
const ReportItem = styled.div`
  border-radius: 5px 5px 0px 0px;
  border: 1px solid rgba(0, 0, 0, 0.5);
  border-top: none;
  font-family: "Open Sans";
  position: relative;
  display: flex;
  flex-direction: column;
  background: #202020;
`;

const ReportWrapper = styled.div`
  display: flex;
  padding: 1em;
  flex-direction: column;
  gap: 1em;
  margin: 0 auto;
  max-width: 960px;
`;

const SettingsWrapper = styled.div`
  display: flex;
  gap: 0.5em;
  justify-content: flex-end;
  align-items: center;
  button {
    margin-right: 0.5em;
  }
`;

const Reports = () => {
  const { isLoading, isError, reports } = useReports();
  console.log(reports);
  return !isLoading ? (
    <>
      {reports.length > 0 && (
        <ReportWrapper>
          <h2>Reports</h2>
          {reports.map((report, i) => {
            return <Report key={i} {...report} />;
          })}
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
