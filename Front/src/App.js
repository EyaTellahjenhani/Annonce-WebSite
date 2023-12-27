import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Notfound from "./pages/Notfound";
import Listing from "./pages/Listing";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <Notfound />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "signup",
    element: <SignUp />,
  },
  {
    path: "forgotpassword",
    element: <ForgotPassword />,
  },
  {
    path: "resetpassword/:token",
    element: <ResetPassword />,
  },
  {
    path: "listing/:id",
    element: <Listing />,
  },
]);

function App() {
  return (
<RouterProvider router={router} />
  );
}

export default App;
