import "./sidebar.scss";
import Car from "@mui/icons-material/SupervisedUserCircle";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="top">
      <Link
          to="/users"
          style={{
            textDecoration: "none",
          }}
        >
          <img
            style={{
              height: "40px",
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
          <Link to="/users" style={{ textDecoration: "none" }}>
            <li>
              <Car className="icon" />
              <span>Users</span>
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
