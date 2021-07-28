import React, { useState } from "react";
import styled from "styled-components";

const SearchBar = ({ setFilter }) => {
  const [text, setText] = useState("");

  const handleChange = (e) => {
    setText(e.target.value);
    setFilter(e.target.value);
  };

  return (
    <SearchBarWrapper>
      <input type="text" value={text} onChange={handleChange} />
    </SearchBarWrapper>
  );
};

const SearchBarWrapper = styled.div``;

export default SearchBar;
