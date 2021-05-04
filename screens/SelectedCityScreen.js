import { Fontisto } from "@expo/vector-icons";
import moment from "moment";
import React from "react";
import { ImageBackground, SafeAreaView, StyleSheet, Text } from "react-native";
import Config from "react-native-config";

const SelectedCityScreen = (props) => {
	let x = new Date();
	var currentTimeZoneOffset = x.getTimezoneOffset() * 60 * 1000;

	const date = moment(
		new Date(
			props.route.params.City.time +
				currentTimeZoneOffset +
				props.route.params.City.tz
		)
	).format("MMMM, Do");
	const time = moment(
		new Date(
			props.route.params.City.time +
				currentTimeZoneOffset +
				props.route.params.City.tz
		)
	).format("LT");

	return (
		<SafeAreaView style={styles.container}>
			<ImageBackground
				source={{
					uri: Config.BACKGROUND,
				}}
				style={styles.container}
			>
				<Text style={styles.time}>{date}</Text>
				<Text style={styles.time}>{time}</Text>
				<Fontisto
					style={styles.WeatherIcon}
					name={props.route.params.City.wcondition}
					size={100}
					color="black"
				/>
				<Text style={styles.time}>
					{Math.round(props.route.params.City.temperature) > 0 ? "+" : ""}
					{Math.round(props.route.params.City.temperature)} C
				</Text>
			</ImageBackground>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
	},
	time: {
		fontSize: 18,
		fontFamily: "Roboto-LightItalic",
		fontWeight: "bold",
		color: "black",
	},
	WeatherIcon: {
		marginVertical: 20,
	},
});

export const screenOptions = (navData) => {
	return {
		headerTitle: navData.route.params.City.name,
		headerTitleAlign: "center",
	};
};
export default SelectedCityScreen;
