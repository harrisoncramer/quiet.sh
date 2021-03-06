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
  deleteReport,
  report_id,
  user_id,
}) => {
  const [showDetails, setShowDetails] = useState(false);
  const [details, setDetails] = useState([]);

  // Make a fetch to the backend to get all the exposures associated with this particular report.
  const handleShowDetails = (e) => {
    if (!showDetails) {
      fetch("/api/exposures", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id, report_id }),
      })
        .then((response) => response.json())
        .then((data) => {
          setDetails(data);
          setShowDetails(true);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setShowDetails(false);
    }
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
            normal={theme.colors.secondaryBackground}
            light={"black"}
            onClick={handleShowDetails}
          >
            {!showDetails ? "Show Details" : "Hide Details"}
          </Button>
          <Button
            color={"white"}
            normal={theme.colors.warning}
            light={theme.colors.warningDark}
            onClick={() => deleteReport({ report_id, user_id })}
          >
            Delete
          </Button>
        </SettingsWrapper>
      </TitleDiv>
      <Content>
        <div> Secrets Checked: {number_of_secrets}</div>
        <div>Total vulnerabilities: {exposed_count}</div>
        <div>{is_gitleaks}</div>
        <div>
          Executed: {dayjs(time_of_execution).format("h:mm A -- MM/DD/YYYY")}
        </div>
      </Content>
      {showDetails && (
        <ReportDetailsWrapper>
          {!is_exposed ? (
            <div>
              There were no secrets exposed on this check. Feel free to delete
              this report.
            </div>
          ) : (
            <ul>
              {details.map(({ url }, i) => {
                const fileName = url.substring(url.lastIndexOf("/") + 1);
                return (
                  <StyledExposure key={i}>
                    <a href={url}>{fileName}</a>
                  </StyledExposure>
                );
              })}
            </ul>
          )}
        </ReportDetailsWrapper>
      )}
    </ReportItem>
  );
};

const StyledExposure = styled.li`
  color: white;
  a {
    display: list-item;
    max-width: 80%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
const ReportDetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1em;
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
  max-width: 1500px;
  margin: 0 auto;
  display: flex;
  padding: 1em;
  flex-direction: column;
  gap: 1em;
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
  const { isLoading, isError, reports, deleteReport } = useReports();

  return !isLoading ? (
    <ReportWrapper>
      <h1>Reports</h1>
      {isError ? (
        <div>An error occured fetching your reports.</div>
      ) : (
        reports.length > 0 &&
        reports.map((report, i) => {
          return <Report key={i} {...report} deleteReport={deleteReport} />;
        })
      )}
    </ReportWrapper>
  ) : (
    <CenterWrapper>
      <Loader color={theme.colors.main} />
    </CenterWrapper>
  );
};

export default Reports;
