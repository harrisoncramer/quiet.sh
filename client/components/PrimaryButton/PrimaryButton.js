import styled from "styled-components";

const StyledLink = styled.a`
  font-family: "Lato";
  text-decoration: none;
  background-color: ${(props) => props.normal};
  font-size: 1em;
  color: black;
  padding: 0.5em 0.7em;
  border-top: 1px solid #cccccc;
  border-right: 1px solid #333333;
  border-bottom: 1px solid #333333;
  border-left: 1px solid #cccccc;
  &:hover {
    background-color: ${(props) => props.light};
  }
`;

export default StyledLink;
