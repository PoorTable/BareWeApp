import { SET_PHOTOURI } from "./photoactions";

const initialState = {
	photoURI: null,
};

export default (state = initialState, action) => {
	switch (action.type) {
		case SET_PHOTOURI:
			return {
				photoURI: action.uri,
			};
		default:
			return state;
	}
};
