import { Suspense } from "react";
import { lazy } from "react";
import Spinner from "./Spinner";
// const Card = lazy(() => import("./Card"));
const Home = lazy(() => import("./Home"));

const App = () => {
  return (
    <div>
      <Suspense fallback={<Spinner />}>
        <Home />
      </Suspense>
    </div>
  );
};

export default App;
