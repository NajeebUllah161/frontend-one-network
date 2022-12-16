import "./register.scss";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { register } from "../../redux/actions/userActions";
import { useNavigate } from "react-router-dom";

const Register = () => {
  // hooks
  const navigate = useNavigate();
  const [validationError, setValidationError] = useState(false);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { loading, data, error, message } = useSelector((state) => state.auth);

  useEffect(() => {
    if (data) {
      toast.success(message);
      dispatch({ type: "clearSignupData" });
      dispatch({ type: "clearSignupMessage" });
      navigate("/login");
    }
    if (error) {
      toast.error(message);
      dispatch({ type: "clearSignupError" });
      dispatch({ type: "clearSignupMessage" });
    }
  }, [dispatch, data, error, message]);

  //functions

  const registerHandler = (e) => {
    e.preventDefault();

    dispatch(register(userName, email, password));
    console.log("Registered");
  };
  return (
    <section className="register">
      <div>
        <div className="container">
          <form onSubmit={registerHandler}>
            <div
              style={{
                height: "120px",
                width: "120px",
                borderRadius: 1000,
                marginBottom: 40,
                marginTop: -120,
                padding: 10,
                textAlign: "center",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <p
                style={{
                  color: "black",
                  fontWeight: "bold",
                  fontSize: 18,
                }}
              >
                One Network
              </p>
            </div>
            <input
              type="text"
              placeholder="username"
              onChange={(e) => setUserName(e.target.value)}
            />
            <input
              type="email"
              placeholder="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button style={{ borderRadius: 10 }} type="submit">
              Register
            </button>
            {validationError && <span>Wrong email or password!</span>}
          </form>
          <p
            style={{
              justifyContent: "space-between",
              display: "flex",
              marginLeft: 16,
              marginRight: 16,
              marginTop: 8,
            }}
          >
            Already Registered ?
            <span>
              <Link style={{ color: "#900", marginLeft: 4 }} to="/login">
                Login
              </Link>
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Register;
