import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "../PrimaryButton/PrimaryButton";
import styled from "styled-components";
import theme from "../../styles/theme";
import Dropdown from "../Dropdown/Dropdown";
import useUserGithubInfo from "../../hooks/useUserGithubInfo";

const Header = ({ children }) => {
  const { username, avatar, isError } = useUserGithubInfo();
  const history = useHistory();
  const [isDropdownActive, setIsDropdownActive] = useState(false);
  const handleLogOut = () => {
    fetch("/api/user/logout")
      .then(() => {
        history.push("/");
      })
      .catch((error) => {
        console.log(error);
        alert(
          "Failure to log out! Please manually clear your cookies for this site if they haven't already been cleared."
        );
      });
  };

  const handleGoToReports = () => {
    history.push("/reports");
  };

  return (
    <>
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
                <img src={avatar} style={{ width: "50px" }} />
                <StyledParagraph>{username}</StyledParagraph>
              </div>
            )}
          </StyledUserWrapper>
        </Dropdown>
        <Button
          onClick={handleLogOut}
          normal={theme.colors.secondaryBackground}
          light={theme.colors.lightMain}
          color={"white"}
        >
          Log Out
        </Button>
      </StyledHeader>
      {children}
    </>
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
