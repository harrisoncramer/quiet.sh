import React from "react";

const Indicator = ({ isPassed }) => {
  if (isPassed) return "✅";
  if (!isPassed) return "❌";
};

export default Indicator;
