import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import ViewCars from "./pages/ViewCars/ViewCars";
import AddCar from "./pages/AddCar/AddCar";
import AppLayout from "./ui/AppLayout";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <ViewCars />,
      },
      {
        path: "/add",
        element: <AddCar />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
