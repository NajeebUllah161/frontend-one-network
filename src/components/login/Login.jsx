import "./login.scss";
import { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { login } from "../../redux/actions/userActions";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
  // hooks
  const [validationError, setValidationError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatchold = useDispatch();
  const { loading, data, error, message } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const { dispatch } = useContext(AuthContext);

  useEffect(() => {
    if (data) {
      toast.success(message);
      dispatchold({ type: "clearLoginData" });
      dispatchold({ type: "clearLoginMessage" });
      const user = data;
      dispatch({ type: "LOGIN", payload: user });
      navigate("/users");
      console.log(user);
    }
    if (error) {
      toast.error(message);
      dispatchold({ type: "clearLoginError" });
      dispatchold({ type: "clearLoginMessage" });
    }
  }, [dispatchold, data, error, message]);

  //functions

  const handleLogin = (e) => {
    e.preventDefault();

    dispatchold(login(email, password));
    console.log("Logged In");
  };

  return (
    <section className="login">
      <div>
        <div className="container">
          <form onSubmit={handleLogin}>
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
              Login
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
            Not Registered Yet ?
            <span>
              <Link style={{ color: "#900", marginLeft: 4 }} to="/register">
                Register
              </Link>
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
