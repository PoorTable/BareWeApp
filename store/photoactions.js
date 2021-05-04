import FileViewer from "react-native-file-viewer";
import { Platform } from "react-native";
import City from "../models/City";
import * as Network from "expo-network";
import { Notifications } from "react-native-notifications";
import { IsPlatformIOS } from "../services/PlatformController";

export const SET_PHOTOURI = "SET_PHOTOURI";

export const setPhotoUri = (uri) => {
	return async (dispatch) => {
		dispatch({ type: SET_PHOTOURI, uri: uri });
	};
};
