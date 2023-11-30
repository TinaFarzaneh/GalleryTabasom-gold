import { RouterProvider } from "react-router-dom";
import { AllRouters } from "./routes";
import "./App.css";

function App() {
  return (
    <>
      <RouterProvider router={AllRouters} />
    </>
  );
}

export default App;
