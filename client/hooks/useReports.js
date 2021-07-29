import { useEffect, useState } from "react";

const useReports = () => {
  const [reports, setReports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    fetch("/api/reports/")
      .then((response) => response.json())
      .then((reports) => {
        setIsError(false);
        setReports(reports);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("COULD NOT FETCH USER INFO AND REPOS", err);
        setIsError(true);
        setIsLoading(false);
      });
  }, [setIsError, setIsLoading, setReports]);

  return { reports, isLoading, isError };
};

export default useReports;
