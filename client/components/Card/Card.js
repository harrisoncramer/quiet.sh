import React from "react";
import styled from "styled-components";
import { LinkAsButton, Button } from "../PrimaryButton/PrimaryButton";
import theme from "../../styles/theme";

const Card = ({ repo }) => {
  return (
    <StyledSection>
      <div>
        <h3>{repo.name}</h3>
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
        >
          Secrets
        </Button>
      </StyledButtonWrapper>
    </StyledSection>
  );
};

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
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 2em;
  padding: 1em;
  background: #202020;
`;

export default Card;
