import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

//components
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Vehicles from "./pages/vehicles/Vehicles";
import AddVehicle from "./pages/addvehicle/AddVehicle";
import UpdateVehicle from "./pages/updatevehicle/UpdateVehicle";

//styles
import "./styles/app.scss";


function App() {

  const { currentUser } = useContext(AuthContext)

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  };
  return (
    <div>
      <Router>
        {/* <Header /> */}
        <Routes>
          <Route path="/" >
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
            <Route index element={
              <RequireAuth>
                <Vehicles />
              </RequireAuth>} />
            <Route path="vehicles">
              <Route
                index
                element={
                  <RequireAuth>
                    <Vehicles />
                  </RequireAuth>
                }
              />
              <Route
                path="new"
                element={
                  <RequireAuth>
                    <AddVehicle />
                  </RequireAuth>
                }
              />
              <Route
                path="update"
                element={
                  <RequireAuth>
                    <UpdateVehicle />
                  </RequireAuth>
                }
              />
            </Route>
          </Route>

        </Routes>
        {/* <Footer /> */}
        <Toaster />
      </Router>
    </div>
  );
}

export default App;
