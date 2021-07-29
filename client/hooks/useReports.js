import { useEffect, useState } from "react";

const useReports = () => {
  const [reports, setReports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const deleteReport = ({ report_id, user_id }) => {
    setIsLoading(true);
    fetch("/api/reports", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ report_id, user_id }),
    })
      .then((response) => response.json())
      .then((reports) => {
        setIsError(false);
        setReports(reports);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("COULD NOT DELETE REPORT", err);
        setIsError(true);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    setIsLoading(true);
    fetch("/api/reports/")
      .then((response) => response.json())
      .then((reports) => {
        setIsError(false);
        setReports(reports);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("COULD NOT FETCH REPORTS", err);
        setIsError(true);
        setIsLoading(false);
      });
  }, [setIsError, setIsLoading, setReports]);

  return { reports, isLoading, isError, deleteReport };
};

export default useReports;
