import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import PhotoView from "./PhotoView";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";

const PhotoPresenter = (props) => {
	const [fileuri, setFileuri] = useState("");
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
		})();
	}, []);

	const SavePhoto = async (Response) => {
		var RNFS = require("react-native-fs");
		var path = Response.uri;
		let toFile = RNFS.DocumentDirectoryPath + "/photo.png";
		console.log(path);
		console.log(toFile);
		RNFS.copyFile(path, toFile).then(setFileuri(toFile));
	};

	const TakePhoto = async (Response) => {
		let options = {
			mediaType: "photo",
			quality: 1,
			cameraType: "front",
		};
		launchCamera("photo", SavePhoto);
	};

	return <PhotoView TakePhoto={TakePhoto} fileuri={fileuri} />;
};

export default PhotoPresenter;
