import React, { useState } from "react";
import styled from "styled-components";
import {
  LinkAsButton,
  Button,
  SmallButton,
} from "../PrimaryButton/PrimaryButton";
import theme from "../../styles/theme";
import SecretInput from "../SecretInput/SecretInput";
// import Indicator from "../Indicator/Indicator";

const Card = ({ repo, handleCheckSecrets }) => {
  const [popdown, setPopdown] = useState(false);
  const [secrets, setSecrets] = useState([]);

  const handleShowPopDown = () => {
    setPopdown(!popdown);
  };

  return (
    <StyledSection>
      <div>
        <h3>
          <a href={repo.html_url} style={{ textDecoration: "underline" }}>
            {repo.name}
          </a>
        </h3>
        {repo.description && <StyledP>{repo.description}</StyledP>}
        <ItalicP>ID: {repo.id}</ItalicP>
      </div>
      <StyledButtonWrapper>
        <Button
          normal={theme.colors.mainBackground}
          light={"black"}
          color={"white"}
          onClick={handleShowPopDown}
        >
          {popdown ? "Hide" : "Check For Secrets"}
        </Button>
      </StyledButtonWrapper>
      {popdown && (
        <Popdown
          secrets={secrets}
          setSecrets={setSecrets}
          repo={repo}
          handleCheckSecrets={handleCheckSecrets}
        />
      )}
    </StyledSection>
  );
};

const Popdown = ({ setSecrets, secrets, handleCheckSecrets, repo }) => {
  const handleAddSecret = (secret) => {
    setSecrets([...secrets, secret]);
  };

  const handleClearSecrets = () => {
    setSecrets([]);
  };

  const handleSmallButtonClick = () => {
    handleCheckSecrets({ secrets, repo });
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
        onClick={handleSmallButtonClick}
      >
        {secrets.length > 0 ? `Check ${secrets.length}!` : "Queue empty."}
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
