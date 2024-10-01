import React from "react";

const ClientComponent = React.lazy(() => import("../ClientComponent"));
const ClientComponent2 = React.lazy(() => import("../ClientComponent2"));

function Home() {
  return (
    <div>
      Home
      <React.Suspense fallback="client1 fallback">
        <ClientComponent />
      </React.Suspense>
      <React.Suspense fallback="client2 fallback">
        <ClientComponent2 />
      </React.Suspense>
    </div>
  );
}

Home.serverSideFunction = () => {
  return new Promise((resolve) => resolve());
};

export default Home;
