import React, { useState } from "react";
import styled from "styled-components";
import theme from "../../styles/theme";

const SearchBar = ({ response }) => {
  const [text, setText] = useState("");

  const handleChange = (e) => {
    setText(e.target.value);
    response(e.target.value);
  };

  return (
    <StyledSearchBar
      type="text"
      value={text}
      onChange={handleChange}
      background={theme.colors.secondaryBackground}
      placeholder={"Filter..."}
    />
  );
};

const StyledSearchBar = styled.input`
  color: white;
  padding: 0.4em;
  border: 1px solid black;
  outline: none;
  background: ${(props) => props.background};
  margin-bottom: 1em;
`;

export default SearchBar;
