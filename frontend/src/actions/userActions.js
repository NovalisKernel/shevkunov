import {
	USER_GET_SUCCESS,
	GET_ERRORS,
	USER_EDIT,
	USER_EDIT_SUCCESS,
	COMPANY_EDIT,
	COMPANY_EDIT_SUCCESS
} from "./actionTypes";
import axios from "axios";

export const getProfileSuccess = profile => {
	return {
		type: USER_GET_SUCCESS,
		payload: {
			profile
		}
	};
};

export const getCurrentProfile = () => dispatch => {
	axios
		.get("/api/auth/current")
		.then(response => {
			if (response.status !== 401) {
				console.log("profile success");
				dispatch(getProfileSuccess(response.data));
			} else {
			}
		})
		.catch(err => {
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			});
		});
};

export const saveUserChanges = newProfile => dispatch => {
	dispatch({
		type: USER_EDIT
	});
	axios
		.put("/api/users/edit", newProfile)
		.then(response => {
			dispatch({
				type: USER_EDIT_SUCCESS
			});
			dispatch(getCurrentProfile);
		})
		.catch(err => {
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			});
		});
};

export const saveCompanyChanges = newProfile => dispatch => {
	dispatch({
		type: COMPANY_EDIT
	});
	axios
		.put("/api/companies/edit", newProfile)
		.then(response => {
			dispatch({
				type: COMPANY_EDIT_SUCCESS
			});
			dispatch(getCurrentProfile);
		})
		.catch(err => {
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			});
		});
};
