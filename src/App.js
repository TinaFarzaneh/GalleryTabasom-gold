import { RouterProvider } from "react-router-dom";
import { AllRouters } from "./routes";
import "./assets/styles/App.css";

function App() {
  return (
    <div className="background bg-cover h-screen">
      <RouterProvider router={AllRouters} />
    </div>
  );
}

export default App;
