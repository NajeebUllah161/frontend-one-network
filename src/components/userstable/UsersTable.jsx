import "./userstable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { usersColumn } from "../../datatablesource";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const CustomersTable = () => {
  const [users, setUsers] = useState([]);
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
        let usersArr = responseJson.user.users;
        let i = 1;
        let list = [];
        usersArr.forEach((usersDoc) => {
          let birth_date = usersDoc.birth_date.toString();
          birth_date = birth_date.substring(0, birth_date.indexOf("T"));
          console.log(birth_date);
          list.push({
            id: i++,
            ...usersDoc,
            birth_date: birth_date,
          });
        });
        setUsers(list);
        console.log(list);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDelete = (userId) => {
    console.log(userId);
    deleteVehicle(userId);
  };

  const deleteVehicle = async (userId) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    fetch(`http://localhost:4000/api/v1/user/${userId}`, {
      method: "DELETE",
      headers: myHeaders,
      credentials: "include",
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson.message);
        toast.success(responseJson.message);
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
              to="/users/update"
              state={{
                userId: params.row._id,
                full_name: params.row.full_name,
                email: params.row.email,
                nick_name: params.row.nick_name,
                birth_date: params.row.birth_date,
                gender: params.row.gender,
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
        Users
        <Link to="/users/new" className="link">
          Add User
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={users}
        columns={usersColumn.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default CustomersTable;
