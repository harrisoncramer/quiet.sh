import React from "react";

const App = () => {
  const handleRequestToBackend = () => {
    fetch("/api/test")
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  return (
    <>
      <button onClick={handleRequestToBackend}>Click Me</button>
      <div className="main">
        Hello there!
        <a
          href={`https://github.com/login/oauth/authorize?client_id=c22f8f7f7ebf39d02794`}
        >
          Login
        </a>
      </div>
    </>
  );
};

export default App;
