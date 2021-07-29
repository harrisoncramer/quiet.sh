import React, { useState } from "react";
import { Button } from "../PrimaryButton/PrimaryButton";
import styled from "styled-components";
import theme from "../../styles/theme";
import Dropdown from "../Dropdown/Dropdown";

const Header = ({ username, avatar_url, history, isError }) => {
  const [isDropdownActive, setIsDropdownActive] = useState(false);
  const handleLogOut = () => {
    fetch("/api/user/logout")
      .then(() => {
        history.push("/");
      })
      .catch((error) => {
        alert("Failure to log out!");
      });
  };

  const handleGoToReports = () => {
    history.push("/reports");
  };

  return (
    <StyledHeader>
      <Dropdown
        isDropdownActive={isDropdownActive}
        setIsDropdownActive={setIsDropdownActive}
        handleLogout={handleLogOut}
      >
        <StyledUserWrapper>
          {!isError && (
            <div
              style={{ display: "flex", alignItems: "center", gap: "1em" }}
              onClick={() => setIsDropdownActive(!isDropdownActive)}
            >
              <img src={avatar_url} style={{ width: "50px" }} />
              <StyledParagraph>{username}</StyledParagraph>
            </div>
          )}
        </StyledUserWrapper>
      </Dropdown>
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

const StyledUserWrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

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
