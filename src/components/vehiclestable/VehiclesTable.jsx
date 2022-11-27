import "./vehiclestable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { vehiclesColumn } from "../../datatablesource";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const CustomersTable = () => {
  const [vehicles, setVehicles] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    loadUser();
  }, [reload]);

  const loadUser = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    fetch(`http://localhost:4000/api/v1/profile`, {
      method: "GET",
      headers: myHeaders,
      credentials: "include",
    })
      .then((response) => response.json())
      .then((responseJson) => {
        let vehiclesArr = responseJson.user.vehicles;
        let i = 1;
        let list = [];
        vehiclesArr.forEach((vehiclesDoc) => {
          list.push({
            id: i++,
            ...vehiclesDoc,
          });
        });
        setVehicles(list);
        console.log(list);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDelete = (vehicleId) => {
    console.log(vehicleId);
    deleteVehicle(vehicleId);
  };

  const deleteVehicle = async (vehicleId) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    fetch(`http://localhost:4000/api/v1/vehicle/${vehicleId}`, {
      method: "DELETE",
      headers: myHeaders,
      credentials: "include",
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        setReload(true);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link
              to="/vehicles/update"
              state={{
                vehicleId: params.row._id,
                vehicle_type: params.row.vehicle_type,
                name: params.row.name,
                color: params.row.color,
                model: params.row.model,
                make: params.row.make,
                reg_number: params.row.reg_number,
                chassis_number: params.row.chassis_number,
              }}
              style={{ textDecoration: "none" }}
            >
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={(e) => handleDelete(params.row._id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <div className="datatable">
      <div
        style={{ color: "rgba(156, 0, 60)", fontWeight: "bold" }}
        className="datatableTitle"
      >
        Vehicles Table
        <Link to="/vehicles/new" className="link">
          Add Vehicle
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={vehicles}
        columns={vehiclesColumn.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default CustomersTable;
