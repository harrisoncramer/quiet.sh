import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import theme from "../../styles/theme";

import { Link } from "react-router-dom";

const Dropdown = ({
  isDropdownActive: isActive,
  setIsDropdownActive: setIsActive,
  children,
}) => {
  const dropdownRef = useRef(null);

  const pageClickEvent = (e) => {
    if (dropdownRef && dropdownRef.current === null) return;
    if (!dropdownRef.current.contains(e.target)) {
      setIsActive(!isActive);
    }
  };

  useEffect(() => {
    // If the item is active (ie open) then listen for clicks
    if (isActive) {
      window.addEventListener("click", pageClickEvent);
    }

    // Clean up
    return () => {
      window.removeEventListener("click", pageClickEvent);
    };
  }, [isActive]);

  return (
    <StyledMenuContainer>
      {children}
      <StyledNav
        ref={dropdownRef}
        className={"menu"}
        isActive={isActive}
        hoverColor={theme.colors.secondaryBackground}
      >
        <ul>
          <li>
            <Link to="/">Check Repos</Link>
          </li>
          <li>
            <Link to="/reports">Reports</Link>
          </li>
        </ul>
      </StyledNav>
    </StyledMenuContainer>
  );
};

export default Dropdown;

const StyledMenuContainer = styled.div`
  position: relative;
`;

const StyledNav = styled.nav`
  z-index: 1000;
  position: absolute;
  top: 75px;
  left: 0;
  width: 300px;
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.3);
  opacity: 0;
  visibility: hidden;
  transform: translateY(-20px);
  transition: opacity 0.2s ease, transform 0.2s ease, visibility 0.2s;

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    border-bottom: 1px solid ${(props) => props.hoverColor};
    background: black;
    &:hover {
      background: ${(props) => props.hoverColor};
    }
  }

  li a {
    color: white;
    font-size: 1em;
    padding: 15px 20px;
    display: block;
  }

  ${({ isActive }) =>
    isActive &&
    `
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    `}
`;
