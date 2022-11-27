import "./vehicles.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import VehiclesTable from "../../components/vehiclestable/VehiclesTable";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

const Vehicles = () => {
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);

  const logoutHandler = () => {
    console.log("Logged out");
    logout();
  };

  const logout = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    fetch(`http://localhost:4000/api/v1/logout`, {
      method: "GET",
      headers: myHeaders,
      credentials: "include",
    })
      .then((response) => response.json())
      .then((responseJson) => {
        toast.success("Logged out Successfully");
        dispatch({ type: "LOGOUT" });
        navigate("/login");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <div className="datatableTitle" style={{ position: "relative" }}>
          <span style={{ fontWeight: "bold" }}>RopStam |</span>
          Car Show Room
          <span
            className="logout"
            onClick={logoutHandler}
            style={{
              right: 0,
              position: "absolute",
              marginRight: 8,
              fontSize: 16,
              color: "white",
              backgroundColor: "rgba(156, 0, 60)",
              padding: 10,
              borderRadius: 20,
            }}
          >
            Logout
          </span>
        </div>
        <VehiclesTable />
      </div>
    </div>
  );
};

export default Vehicles;
