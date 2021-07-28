import React from "react";
import styled from "styled-components";

const Login = () => {
  return (
    <StyledWrapper className="login">
      <p>Please Login</p>
      <p>
        <a
          href={`https://github.com/login/oauth/authorize?client_id=c22f8f7f7ebf39d02794`}
        >
          Login
        </a>
      </p>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export default Login;
