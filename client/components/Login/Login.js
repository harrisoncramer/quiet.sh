import React from "react";

const Login = () => {
  return (
    <div className="login">
      <p>Please Login</p>
      <p>
        <a
          href={`https://github.com/login/oauth/authorize?client_id=c22f8f7f7ebf39d02794`}
        >
          Login
        </a>
      </p>
    </div>
  );
};

export default Login;
