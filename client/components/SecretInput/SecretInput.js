import React, { useState } from "react";
import styled from "styled-components";
import { SmallButton } from "../PrimaryButton/PrimaryButton";
import theme from "../../styles/theme";

const SecretInput = ({ handleAddSecret, handleClearSecrets }) => {
  const [text, setText] = useState("");

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmitSecret = (secret) => {
    if (text !== "") {
      setText("");
      handleAddSecret(secret);
    }
  };

  return (
    <div>
      <StyledSearchBar
        value={text}
        onChange={handleChange}
        background={theme.colors.mainBackground}
        placeholder={"Filter..."}
      />
      <SmallButton
        normal={theme.colors.mainBackground}
        light={"black"}
        color={"white"}
        onClick={() => handleSubmitSecret(text)}
      >
        Queue
      </SmallButton>
      <span style={{ padding: ".25em" }} />
      <SmallButton
        normal={theme.colors.mainBackground}
        light={"black"}
        color={"white"}
        onClick={handleClearSecrets}
      >
        Clear
      </SmallButton>
    </div>
  );
};

const StyledSearchBar = styled.input`
  color: white;
  padding: 0.4em;
  border: 1px solid black;
  outline: none;
  background: ${(props) => props.background};
  margin-right: 0.5em;
`;

export default SecretInput;
