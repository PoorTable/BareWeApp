import {
	GET_CITY_NAME,
	GET_YESTERDAY,
	NERROR,
	SELECT_DAY,
	SET_DATE,
	SET_DH,
} from "./dailyhourlyactions";

const initialState = {
	City: {},
	Daily: [],
	Hourly: [],
	Yesterday: [],
	SelectedDay: "Today",
	error: false,
	dt: 0,
};

export default (state = initialState, action) => {
	switch (action.type) {
		case NERROR:
			return {
				...state,
				error: action.errorState,
			};
		case SET_DATE:
			return {
				...state,
				dt: action.dt,
			};
		case SELECT_DAY:
			return {
				...state,
				SelectedDay: action.Day,
			};
		case GET_YESTERDAY:
			return {
				...state,
				Yesterday: action.Yesterday,
			};
		case SET_DH:
			return {
				...state,
				Daily: action.Daily,
				Hourly: action.Hourly,
			};
		case GET_CITY_NAME:
			return {
				...state,
				City: action.City,
			};
		default:
			return state;
	}
};
