"use client";
import React, { useState } from "react";

const ClientComponent = () => {
  const [counter, setCounter] = useState(0);
  return <div onClick={() => setCounter(counter + 1)}>Count: {counter}</div>;
};

export default ClientComponent;
