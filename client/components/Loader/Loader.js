import React from "react";
import LoaderSpinner from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const Loader = ({ color }) => {
  return (
    <LoaderSpinner type="BallTriangle" color={color} height={100} width={100} />
  );
};

export default Loader;
