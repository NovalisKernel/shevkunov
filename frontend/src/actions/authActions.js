import axios from "axios";
import { GET_ERRORS, SET_CURRENT_USER } from "./actionTypes";
import setAuthToken from "../helpers/setAuthToken";
import jwt_decode from "jwt-decode";

export const registerUser = (user, history) => dispatch => {
	axios
		.post("/api/auth/register", user)
		.then(res => {
			const { verifyToken } = res.data;
			console.log(verifyToken);
			localStorage.setItem("verifyToken", verifyToken);
			setAuthToken(verifyToken);
			history.push("/confirmation");
		})
		.catch(err => {
			console.log(err);
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			});
		});
};

export const loginUser = user => dispatch => {
	axios
		.post("/api/auth/login", user)
		.then(res => {
			const { token } = res.data;
			localStorage.setItem("jwtToken", token);
			setAuthToken(token);
			const decoded = jwt_decode(token);
			dispatch(setCurrentUser(decoded));
		})
		.catch(err => {
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			});
		});
};

export const verifyUser = confirmationCode => dispatch => {
	const token = localStorage.getItem("verifyToken");
	setAuthToken(token);
	axios.post("/api/auth/confirmation", confirmationCode).catch(err => {
		dispatch({
			type: GET_ERRORS,
			payload: err.response.data
		});
	});
};

export const logoutUser = history => dispatch => {
	localStorage.removeItem("jwtToken");
	setAuthToken(false);
	dispatch(setCurrentUser({}));
	history.push("/login");
};

export const setCurrentUser = decoded => {
	return {
		type: SET_CURRENT_USER,
		payload: decoded
	};
};
