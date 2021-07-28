import React from "react";
import styled from "styled-components";

const Indicator = ({ isPassed, isFailed, count }) => {
  if (isPassed) return <StyledIndicatorIcon>✅ x {count}</StyledIndicatorIcon>;
  if (isFailed) return <StyledIndicatorIcon>❌ x {count}</StyledIndicatorIcon>;
  return <></>;
};

const StyledIndicatorIcon = styled.div`
  font-family: "Lato";
  position: absolute;
  right: 1em;
  top: 1em;
`;

export default Indicator;
