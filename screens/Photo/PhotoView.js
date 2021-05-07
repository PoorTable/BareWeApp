import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import Config from "react-native-config";
import { BottomSheet, ListItem } from "react-native-elements";

const PhotoView = (props) => {
	const {
		TakePhoto,
		fileuri,
		isVisible,
		setIsVisible,
		TakeFromGallery,
	} = props;
	console.log(fileuri);
	const List = [
		{ title: "Take a photo", onPress: () => TakePhoto() },
		{ title: "Take from gallery", onPress: () => TakeFromGallery() },
		{
			title: "Cancel",
			containerStyle: { backgroundColor: "red" },
			titleStyle: { color: "white" },
			onPress: () => setIsVisible(false),
		},
	];
	return (
		<View style={styles.placeItem}>
			<TouchableOpacity onPress={() => setIsVisible(true)}>
				<Image
					style={styles.image}
					source={{
						uri: fileuri,
					}}
				/>

				<BottomSheet
					isVisible={isVisible}
					containerStyle={{ backgroundColor: "rgba(0.5, 0.25, 0, 0.0)" }}
				>
					{List.map((l, i) => (
						<ListItem
							key={i}
							containerStyle={l.containerStyle}
							onPress={l.onPress}
						>
							<ListItem.Content>
								<ListItem.Title style={l.titleStyle}>{l.title}</ListItem.Title>
							</ListItem.Content>
						</ListItem>
					))}
				</BottomSheet>
			</TouchableOpacity>
		</View>
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
		borderWidth: 2,
	},
});

export default PhotoView;
