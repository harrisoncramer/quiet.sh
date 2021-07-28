import React, { useState } from "react";
import styled from "styled-components";
import theme from "../styles/theme";
import { LinkAsButton } from "../components/PrimaryButton/PrimaryButton";
import Loader from "../components/Loader/Loader";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleLoginAttempt = (e) => {
    setIsLoading(true);
  };

  return !isLoading ? (
    <StyledWrapper className="login">
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
    </StyledWrapper>
  ) : (
    <StyledWrapper>
      <Loader color={theme.colors.main} />
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  margin-bottom: 20em;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;

  h1 {
    margin-bottom: 0px;
  }

  h4 {
    margin-top: 1em;
  }
`;

export default Login;
