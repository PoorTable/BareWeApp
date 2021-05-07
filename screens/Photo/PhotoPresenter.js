import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useState } from "react";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import { useDispatch, useSelector } from "react-redux";
import * as photoactions from "../../store/photoactions";
import PhotoView from "./PhotoView";

const PhotoPresenter = (props) => {
	const fileuri = useSelector((state) => state.photo.photoURI);
	const [isVisible, setIsVisible] = useState(false);
	const dispatch = useDispatch();
	useEffect(() => {
		(async () => {
			if (Platform.OS !== "web") {
				const {
					status,
				} = await ImagePicker.requestMediaLibraryPermissionsAsync();
				const CStatus = await ImagePicker.requestCameraPermissionsAsync();
				console.log(CStatus);
				if (!CStatus.granted || status !== "granted") {
					alert("Sorry, we need camera roll permissions to make this work!");
				}
			}
			var RNFS = require("react-native-fs");
			let path = RNFS.DocumentDirectoryPath + "/phot2.png";
			let exists = await RNFS.exists(path);
			console.log(exists);
			if (exists) {
				dispatch(photoactions.setPhotoUri("file://" + path));
			} else {
				dispatch(photoactions.setPhotoUri(""));
			}
		})();
	}, []);

	const SavePhoto = async (Response) => {
		if (Response.didCancel) {
		} else {
			var RNFS = require("react-native-fs");
			let path = Response.uri;
			let toFile = RNFS.DocumentDirectoryPath + "/phot2.png";
			dispatch(photoactions.setPhotoUri(path));
			console.log(path);
			console.log(toFile);
			let exists = await RNFS.exists(toFile);
			console.log(exists);
			if (exists) {
				await RNFS.unlink(toFile).then(await RNFS.copyFile(path, toFile));
			} else {
				RNFS.copyFile(path, toFile);
			}
		}
	};

	const TakePhoto = async (Response) => {
		let options = {
			mediaType: "photo",
			quality: 1,
			cameraType: "front",
		};
		launchCamera(options, SavePhoto);
	};

	const TakeFromGallery = async () => {
		let options = {
			mediaType: "photo",
		};
		launchImageLibrary(options, SavePhoto);
	};

	return (
		<PhotoView
			TakePhoto={TakePhoto}
			fileuri={fileuri}
			isVisible={isVisible}
			setIsVisible={setIsVisible}
			TakeFromGallery={TakeFromGallery}
		/>
	);
};

export default PhotoPresenter;
