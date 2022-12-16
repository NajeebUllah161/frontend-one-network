import "./updateuser.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import { useState } from "react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

const UpdateUser = ({ title = "Update User Information" }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const options = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
  ];

  const [userId, setUserId] = useState(location.state.userId);
  const [fullName, setFullName] = useState(location.state.full_name);
  const [email, setEmail] = useState(location.state.email);
  const [nickName, setNickName] = useState(location.state.nick_name);
  const [birthDate, setBirthDate] = useState(location.state.birth_date);
  const [gender, setGender] = useState(location.state.gender);

  const handleAdd = async (e) => {
    e.preventDefault();

    updateUser();

    try {
    } catch (err) {
      console.log(err);
    }
  };

  const updateUser = async () => {
    const myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json");

    fetch(`http://localhost:4000/api/v1/user/${userId}`, {
      method: "PUT",
      credentials: "include",
      body: JSON.stringify({
        full_name: fullName,
        email: email,
        nick_name: nickName,
        birth_date: birthDate,
        gender: gender,
      }),
      headers: myHeaders,
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        toast.success(responseJson.message);
        navigate("/users");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div className="updateuser">
      <Sidebar />
      <div className="newContainer">
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form onSubmit={handleAdd}>
              <div className="formInput">
                <label>Full Name : </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Enter Fullname"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
                <label>Email : </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label>Nickname : </label>
                <input
                  id="nickname"
                  type="text"
                  placeholder="Enter Nickname"
                  value={nickName}
                  onChange={(e) => setNickName(e.target.value)}
                />
                <label>Birthdate : </label>
                <input
                  id="birthdate"
                  type="date"
                  placeholder="Enter Birthdate"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                />
              </div>
              <button
                style={{ position: "absolute", bottom: 10, right: 10 }}
                type="submit"
              >
                Update User
              </button>
            </form>
            <label>Gender : </label>
            <Dropdown
              className="dropdown"
              options={options}
              onChange={setGender}
              value={gender}
              placeholder="Select an option"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateUser;
