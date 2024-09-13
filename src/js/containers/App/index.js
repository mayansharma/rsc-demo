import React from "react";
// import { Outlet } from "@tata1mg/router";

const App = ({ children }) => {
  if (typeof window === "undefined") {
    return children;
  }
  return <>{/* <Outlet /> */}</>;
};

App.serverSideFunction = () => {
  return new Promise((resolve) => resolve());
};

export default App;
