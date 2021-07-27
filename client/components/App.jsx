import React from "react";

const App = () => {
  const handleRequestToBackend = () => {
    fetch("/api/test")
      .then(response => response.json())
      .then(data => console.log(data))
  }

  return (
    <div className='main'>
      Hello there!
      <button onClick={handleRequestToBackend}>Click Me</button>
    </div>
  )
}

export default App;

