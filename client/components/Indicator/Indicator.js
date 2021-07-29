import React from "react";
import styled from "styled-components";

const Indicator = ({ isPassed }) => {
  if (isPassed) return <StyledIndicatorIcon>✅ </StyledIndicatorIcon>;
  if (!isPassed) return <StyledIndicatorIcon>❌ </StyledIndicatorIcon>;
  return <></>;
};

const StyledIndicatorIcon = styled.div`
  position: absolute;
  right: 1em;
  top: 1em;
`;

export default Indicator;
