import React from "react";
import styled from "styled-components";
import { LinkAsButton } from "../PrimaryButton/PrimaryButton";

const Card = ({ repo }) => {
  return (
    <StyledSection>
      <StyledP>Title: {repo.name}</StyledP>
      <StyledP>Description: {repo.description}</StyledP>
      <StyledP>ID: {repo.id}</StyledP>
      <LinkAsButton url={repo.html_url} />
    </StyledSection>
  );
};

const StyledP = styled.p`
  margin: 0px;
`;

const StyledSection = styled.section`
  padding: 1em;
  border: 1px solid red;
  background: "grey";
`;

export default Card;
