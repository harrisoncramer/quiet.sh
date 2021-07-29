import { useEffect, useState } from "react";

const userInfoCache = {}; // Setup cache...

const useUserGithubInfo = () => {
  const [username, setUsername] = useState("");
  const [repos, setRepos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    // If the cache already has values, skip the get request.
    if (
      userInfoCache.repos &&
      userInfoCache.login &&
      userInfoCache.avatar_url
    ) {
      setUsername(userInfoCache.login);
      setAvatar(userInfoCache.avatar_url);
      setRepos(userInfoCache.repos);
      setIsLoading(false);
    } else {
      fetch("/api/user/info")
        .then((response) => response.json())
        .then(({ userInfo, repos }) => {
          setIsError(false);
          // Set username
          userInfoCache.login = userInfo.login;
          setUsername(userInfo.login);
          // Set avatar img
          userInfoCache.avatar_url = userInfo.avatar_url;
          setAvatar(userInfo.avatar_url);
          // Set repos
          userInfoCache.repos = repos;
          setRepos(repos);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log("COULD NOT FETCH USER INFO AND REPOS", err);
          setIsError(true);
          setIsLoading(false);
        });
    }
  }, [setIsError, setIsLoading, setUsername, setAvatar, setRepos]);

  return { username, repos, isLoading, isError, avatar };
};

export default useUserGithubInfo;
