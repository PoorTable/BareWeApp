import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import Config from "react-native-config";

const PhotoView = (props) => {
	const { TakePhoto, fileuri } = props;
	return (
		<TouchableOpacity onPress={TakePhoto} style={styles.placeItem}>
			<Image style={styles.image} source={{ uri: fileuri }} />
			<Text onPress={TakePhoto}>No Photo</Text>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	placeItem: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	image: {
		width: 150,
		height: 150,
		borderRadius: 75,
		backgroundColor: "#ccc",
		borderColor: Config.PRIMARY_COLOR,
		borderWidth: 1,
	},
});

export default PhotoView;
