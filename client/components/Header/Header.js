import React from "react";
import { Button } from "../PrimaryButton/PrimaryButton";
import styled from "styled-components";
import theme from "../../styles/theme";

const Header = ({ username, avatar_url, history, isError }) => {
  const handleLogOut = () => {
    fetch("/api/user/logout")
      .then(() => {
        history.push("/");
      })
      .catch((error) => {
        alert("Failure to log out!");
      });
  };
  return (
    <StyledHeader>
      {!isError && (
        <div style={{ display: "flex", alignItems: "center", gap: "1em" }}>
          <img src={avatar_url} style={{ width: "50px" }} />
          <StyledParagraph>{username}</StyledParagraph>
        </div>
      )}
      <Button
        onClick={handleLogOut}
        normal={theme.colors.main}
        light={theme.colors.lightMain}
      >
        Log Out
      </Button>
    </StyledHeader>
  );
};

const StyledParagraph = styled.p`
  font-family: "Lato";
  font-size: 1.3em;
`;
const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  padding: 1em;
  justify-content: space-between;
  margin-left: 1em;
  margin-right: 1em;
  gap: 1em;
`;

export default Header;
