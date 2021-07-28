import React from "react";
import styled from "styled-components";
import theme from "../styles/theme";
import PrimaryButton from "../components/PrimaryButton/PrimaryButton";

const Login = () => {
  return (
    <StyledWrapper className="login">
      <h1>Quiet.sh</h1>
      <h4>
        The secure, fast, and open-source repository monitoring tool that lets
        you stay in control of your secrets.
      </h4>
      <p>
        <PrimaryButton
          href={`https://github.com/login/oauth/authorize?client_id=c22f8f7f7ebf39d02794`}
          normal={theme.colors.blue}
          light={theme.colors.lightblue}
        >
          Login with Github
        </PrimaryButton>
      </p>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: flex;
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

  p {
    margin-bottom: 20em;
  }
`;

export default Login;
