import React, { useState } from "react";
import styled from "styled-components";
import {
  LinkAsButton,
  Button,
  SmallButton,
} from "../PrimaryButton/PrimaryButton";
import theme from "../../styles/theme";
import SecretInput from "../SecretInput/SecretInput";
import Indicator from "../Indicator/Indicator";

const Card = ({ repo }) => {
  const [popdown, setPopdown] = useState(false);
  const [secrets, setSecrets] = useState([]);

  const handleShowPopDown = () => {
    setPopdown(!popdown);
  };

  return (
    <StyledSection>
      <Indicator isPassed={true} count={4} />
      <div>
        <h2>{repo.name}</h2>
        {repo.description && <StyledP>{repo.description}</StyledP>}
        <ItalicP>ID: {repo.id}</ItalicP>
      </div>
      <StyledButtonWrapper>
        <LinkAsButton
          href={repo.html_url}
          normal={theme.colors.mainBackground}
          light={"black"}
          color={"white"}
        >
          Visit
        </LinkAsButton>
        <Button
          normal={theme.colors.mainBackground}
          light={"black"}
          color={"white"}
          onClick={handleShowPopDown}
        >
          {popdown ? "Hide" : "Show"}
        </Button>
      </StyledButtonWrapper>
      {popdown && <Popdown secrets={secrets} setSecrets={setSecrets} />}
    </StyledSection>
  );
};

const Popdown = ({ setSecrets, secrets }) => {
  const handleAddSecret = (secret) => {
    setSecrets([...secrets, secret]);
  };

  const handleClearSecrets = () => {
    setSecrets([]);
  };

  return (
    <SecretWrapper>
      <SecretInput
        handleAddSecret={handleAddSecret}
        handleClearSecrets={handleClearSecrets}
      />
      <SmallButton
        normal={secrets.length > 0 ? theme.colors.secondary : "grey"}
        light={secrets.length > 0 ? theme.colors.secondaryLight : "grey"}
        disabled={secrets.length === 0}
      >
        {secrets.length > 0 ? `Check ${secrets.length}!` : "No secrets."}
      </SmallButton>
    </SecretWrapper>
  );
};

const SecretWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledP = styled.p`
  margin: 0px;
`;

const ItalicP = styled.p`
  font-style: italic;
`;

const StyledButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StyledSection = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 2em;
  padding: 1em;
  background: #202020;
`;

export default Card;
