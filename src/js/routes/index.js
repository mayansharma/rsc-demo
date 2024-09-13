import Home from "../containers/Home/Home";
import Test from "../containers/Test/Test";

const routes = [
  {
    path: "/",
    end: true,
    component: Home,
  },
  {
    path: "/test",
    end: true,
    component: Test,
  },
];

export default routes;
