import "./sidebar.scss";
import Car from "@mui/icons-material/TimeToLeave";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="top">
      <Link
          to="/vehicles"
          style={{
            textDecoration: "none",
          }}
        >
          <img
            style={{
              height: "40px",
              borderRadius: 20,
              marginRight: 8,
            }}
            src={require("../../assets/logo.png")}
            alt={"1212"}
          />
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">LISTS</p>
          <Link to="/vehicles" style={{ textDecoration: "none" }}>
            <li>
              <Car className="icon" />
              <span>Vehicles</span>
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
