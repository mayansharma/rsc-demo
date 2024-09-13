import React, { use } from "react";
import "./styles";
import { hydrateRoot } from "react-dom/client";
import { createFromFetch } from "react-server-dom-webpack/client";

window.process = {};

const content = createFromFetch(fetch("/rsc"));

const Application = () => {
  return use(content);
};

const container = document.getElementById("app");
hydrateRoot(container, <Application />);
