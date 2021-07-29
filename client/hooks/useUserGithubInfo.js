import { useEffect, useState } from "react";

const useUserGithubInfo = () => {
  const [username, setUsername] = useState("");
  const [repos, setRepos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [avatar, setAvatar] = useState("");

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
  }, [setIsError, setIsLoading, setUsername, setAvatar, setRepos]);

  return { username, repos, isLoading, isError, avatar };
};

export default useUserGithubInfo;
