import styled from "styled-components";

export const LinkAsButton = styled.a`
  font-family: "Lato";
  text-decoration: none;
  background-color: ${(props) => props.normal};
  font-size: 1em;
  color: ${(props) => props.color ?? "black"};
  padding: 0.6em 0.8em;
  &:hover {
    background-color: ${(props) => props.light};
    cursor: pointer;
  }
`;

export const Button = styled.button`
  font-family: "Lato";
  text-decoration: none;
  background: ${(props) => props.normal};
  font-size: 1em;
  border: none;
  color: ${(props) => props.color ?? "black"};
  padding: 0.6em 0.8em;
  &:hover {
    background-color: ${(props) => props.light};
    cursor: pointer;
  }
`;
