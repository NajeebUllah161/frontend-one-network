import "./adduser.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import { useEffect, useState } from "react";
import "react-dropdown/style.css";
import toast from "react-hot-toast";
import Dropdown from "react-dropdown";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AddUser = ({ title = "Add new User" }) => {
  const navigate = useNavigate();

  const options = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
  ];

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [nickName, setNickName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState("");

  useEffect(() => {}, []);

  const handleAdd = async (e) => {
    e.preventDefault();

    if (fullName && email && nickName && birthDate && gender) {
      addUser();
    }else{
      toast.error("All fields required");
      return;
    }

    try {
    } catch (err) {
      console.log(err);
    }
  };

  const addUser = async () => {
    const myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json");

    fetch("http://localhost:4000/api/v1/addUser", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({
        full_name: fullName,
        email: email,
        nick_name: nickName,
        birth_date: birthDate,
        gender: gender.value,
      }),
      headers: myHeaders,
    })
      .then((response) => response.json())
      .then((responseJson) => {
        toast.success(responseJson.message);
        navigate("/users");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div className="newuser">
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
                  id="fullname"
                  type="text"
                  placeholder="Enter Full Name"
                  onChange={(e) => setFullName(e.target.value)}
                />
                <label>Email : </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label>Nickname : </label>
                <input
                  id="nickname"
                  type="text"
                  placeholder="Enter Nickname"
                  onChange={(e) => setNickName(e.target.value)}
                />
                <label>Birthdate : </label>
                <input
                  id="birthday"
                  type="date"
                  placeholder="Enter Birthday"
                  onChange={(e) => setBirthDate(e.target.value)}
                />
              </div>
              <button
                style={{ position: "absolute", bottom: 10, right: 10 }}
                type="submit"
              >
                Add User
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

export default AddUser;
