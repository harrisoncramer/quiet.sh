import React, { useState } from "react";
import theme from "../styles/theme";
import { LinkAsButton } from "../components/PrimaryButton/PrimaryButton";
import Loader from "../components/Loader/Loader";
import CenterWrapper from "../components/CenterWrapper/CenterWrapper";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleLoginAttempt = () => {
    setIsLoading(true);
  };

  return !isLoading ? (
    <CenterWrapper className="login">
      <h1>Quiet.sh</h1>
      <h4>
        The secure, fast, and open-source repository monitoring tool that lets
        you stay in control of your secrets.
      </h4>
      <p>
        <LinkAsButton
          href={`https://github.com/login/oauth/authorize?client_id=c22f8f7f7ebf39d02794`}
          normal={theme.colors.main}
          light={theme.colors.lightMain}
          onClick={handleLoginAttempt}
        >
          Login with Github
        </LinkAsButton>
      </p>
    </CenterWrapper>
  ) : (
    <CenterWrapper>
      <Loader color={theme.colors.main} />
    </CenterWrapper>
  );
};

export default Login;
