import axios from "axios";
import { server } from "../store";

export const register = (name, email, password) => async (dispatch) => {
    try {
        dispatch({ type: "signupRequest" });

        const { data } = await axios.post(
            `${server}/register`, { name, email, password },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        dispatch({ type: "signupSuccess", payload: data });

    } catch (error) {
        console.log(error);
        dispatch({ type: "signupFailure", payload: error.response.data });
    }
}

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: "loginRequest" });

        const { data } = await axios.post(
            `${server}/login`, { email, password },
            { withCredentials: true },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        dispatch({ type: "loginSuccess", payload: data });

    } catch (error) {
        dispatch({ type: "loginFailure", payload: error.response.data });
    }
}

