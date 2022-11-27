import "./updatevehicle.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import { useEffect, useState } from "react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

const AddVehicle = (props, { title = "Update Vehicle Information" }) => {
  const options = [
    { value: "car", label: "Car" },
    { value: "bus", label: "Bus" },
    { value: "rv", label: "RV" },
    { value: "suv", label: "SUV" },
    { value: "hatchback", label: "Hatchback" },
  ];
  const location = useLocation();
  const navigate = useNavigate();

  const [vehicleId, setVehicleId] = useState(location.state.vehicleId);
  const [vehicleType, setVehicleType] = useState(location.state.vehicle_type);
  const [vehicleName, setVehicleName] = useState(location.state.name);
  const [vehicleColor, setVehicleColor] = useState(location.state.color);
  const [vehicleModel, setVehicleModel] = useState(location.state.model);
  const [vehicleMake, setVehicleMake] = useState(location.state.make);
  const [vehicleRegNumber, setVehicleRegNumber] = useState(
    location.state.reg_number
  );
  const [vehicleChassisNumber, setVehicleChassisNumber] = useState(
    location.state.chassis_number
  );

  const handleAdd = async (e) => {
    e.preventDefault();

    updateVehicle();

    try {
    } catch (err) {
      console.log(err);
    }
  };

  const updateVehicle = async () => {
    const myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json");

    fetch(`http://localhost:4000/api/v1/vehicle/${vehicleId}`, {
      method: "PUT",
      credentials: "include",
      body: JSON.stringify({
        vehicle_type: vehicleType,
        name: vehicleName,
        color: vehicleColor,
        model: vehicleModel,
        make: vehicleMake,
        reg_number: vehicleRegNumber,
        chassis_number: vehicleChassisNumber,
      }),
      headers: myHeaders,
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        toast.success(responseJson.message);
        navigate("/vehicles");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div className="updatevehicle">
      <Sidebar />
      <div className="newContainer">
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <label>Vehicle Type : </label>
            <Dropdown
              className="dropdown"
              options={options}
              onChange={(e) => setVehicleType(e.value)}
              value={vehicleType}
              placeholder="Select an option"
            />
            <form onSubmit={handleAdd}>
              <div className="formInput">
                <label>Vehicle Name : </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Enter Vehicle name"
                  value={vehicleName}
                  onChange={(e) => setVehicleName(e.target.value)}
                />
                <label>Vehicle Color : </label>
                <input
                  id="color"
                  type="text"
                  placeholder="Enter vehicle Color"
                  value={vehicleColor}
                  onChange={(e) => setVehicleColor(e.target.value)}
                />
                <label>Vehicle Model : </label>
                <input
                  id="model"
                  type="number"
                  placeholder="Enter vehicle Model"
                  value={vehicleModel}
                  onChange={(e) => setVehicleModel(e.target.value)}
                />
                <label>Vehicle Make : </label>
                <input
                  id="make"
                  type="text"
                  placeholder="Enter vehicle Make"
                  value={vehicleMake}
                  onChange={(e) => setVehicleMake(e.target.value)}
                />
                <label>Vehicle Registration Number : </label>
                <input
                  id="make"
                  type="number"
                  placeholder="Enter vehicle Registeration Number"
                  value={vehicleRegNumber}
                  onChange={(e) => setVehicleRegNumber(e.target.value)}
                />
                <label>Vehicle Chassis Number : </label>
                <input
                  id="make"
                  type="number"
                  placeholder="Enter vehicle Chassis Number"
                  value={vehicleChassisNumber}
                  onChange={(e) => setVehicleChassisNumber(e.target.value)}
                />
              </div>
              <button type="submit">Update Vehicle</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddVehicle;
