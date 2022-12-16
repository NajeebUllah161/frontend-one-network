import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

//components
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Users from "./pages/users/Users";
import AddUser from "./pages/adduser/AddUser";
import UpdateUser from "./pages/updateuser/UpdateUser";

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
        {/* Nested Routes */}
        <Routes>
          <Route path="/" >
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
            <Route index element={
              <RequireAuth>
                <Users />
              </RequireAuth>} />
            <Route path="users">
              <Route
                index
                element={
                  <RequireAuth>
                    <Users />
                  </RequireAuth>
                }
              />
              <Route
                path="new"
                element={
                  <RequireAuth>
                    <AddUser />
                  </RequireAuth>
                }
              />
              <Route
                path="update"
                element={
                  <RequireAuth>
                    <UpdateUser />
                  </RequireAuth>
                }
              />
            </Route>
          </Route>
        </Routes>
        <Toaster />
      </Router>
    </div>
  );
}

export default App;
