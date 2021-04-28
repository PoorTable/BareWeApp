import { Fontisto } from "@expo/vector-icons";
import moment from "moment";
import React from "react";
import { ImageBackground, SafeAreaView, StyleSheet, Text } from "react-native";

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
					uri:
						"https://t4.ftcdn.net/jpg/03/25/68/63/360_F_325686385_7xPlV6ZN5HMj15QJ9LRr8gOsk2nyP4pM.jpg",
				}}
				style={{ flex: 1 }}
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
