import "./addvehicle.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import { useEffect, useState } from "react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import toast from "react-hot-toast";

const AddVehicle = ({ title = "Add new Vehicle" }) => {
  const options = [
    { value: "car", label: "Car" },
    { value: "bus", label: "Bus" },
    { value: "rv", label: "RV" },
    { value: "suv", label: "SUV" },
    { value: "hatchback", label: "Hatchback" },
  ];

  const [vehicleType, setVehicleType] = useState("");
  const [vehicleName, setVehicleName] = useState("");
  const [vehicleColor, setVehicleColor] = useState("");
  const [vehicleModel, setVehicleModel] = useState(0);
  const [vehicleMake, setVehicleMake] = useState("");
  const [vehicleRegNumber, setVehicleRegNumber] = useState(0);
  const [vehicleChassisNumber, setVehicleChassisNumber] = useState("");

  useEffect(() => {}, []);

  const handleAdd = async (e) => {
    e.preventDefault();

    addVehicle();

    try {
    } catch (err) {
      console.log(err);
    }
  };

  const addVehicle = async () => {
    const myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json");

    fetch("http://localhost:4000/api/v1/addVehicle", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({
        vehicle_type: vehicleType.value,
        name: vehicleName.target.value,
        color: vehicleColor.target.value,
        model: vehicleModel.target.value,
        make: vehicleMake.target.value,
        reg_number: vehicleRegNumber.target.value,
        chassis_number: vehicleChassisNumber.target.value,
      }),
      headers: myHeaders,
    })
      .then((response) => response.json())
      .then((responseJson) => {
        toast.success(responseJson.message);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div className="newvehicle">
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
              onChange={setVehicleType}
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
                  onChange={setVehicleName}
                />
                <label>Vehicle Color : </label>
                <input
                  id="color"
                  type="text"
                  placeholder="Enter vehicle Color"
                  onChange={setVehicleColor}
                />
                <label>Vehicle Model : </label>
                <input
                  id="model"
                  type="number"
                  placeholder="Enter vehicle Model"
                  onChange={setVehicleModel}
                />
                <label>Vehicle Make : </label>
                <input
                  id="make"
                  type="text"
                  placeholder="Enter vehicle Make"
                  onChange={setVehicleMake}
                />
                <label>Vehicle Registration Number : </label>
                <input
                  id="make"
                  type="number"
                  placeholder="Enter vehicle Registeration Number"
                  onChange={setVehicleRegNumber}
                />
                <label>Vehicle Chassis Number : </label>
                <input
                  id="make"
                  type="number"
                  placeholder="Enter vehicle Chassis Number"
                  onChange={setVehicleChassisNumber}
                />
              </div>
              <button type="submit">Add Vehicle</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddVehicle;
