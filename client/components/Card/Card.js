import React from "react";
import styled from "styled-components";
import { LinkAsButton } from "../PrimaryButton/PrimaryButton";
import theme from "../../styles/theme";

const Card = ({ repo }) => {
  console.log(repo);
  return (
    <StyledSection>
      <div>
        <StyledP>Title: {repo.name}</StyledP>
        {repo.description && <StyledP>Description: {repo.description}</StyledP>}
        <StyledP>ID: {repo.id}</StyledP>
      </div>
      <div>
        <LinkAsButton
          href={repo.html_url}
          normal={theme.colors.main}
          light={theme.colors.lightMain}
        >
          Visit
        </LinkAsButton>
      </div>
    </StyledSection>
  );
};

const StyledP = styled.p`
  margin: 0px;
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
