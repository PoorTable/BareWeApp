import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	ActivityIndicator,
	Dimensions,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Fontisto } from "@expo/vector-icons";

const CityBox = (props) => {
	const [dimensions, setDimensions] = useState(
		Dimensions.get("window").height / 4
	);
	const onChange = () => {
		if (Dimensions.get("window").height < Dimensions.get("window").width) {
			setDimensions(Dimensions.get("window").height / 3);
		} else {
			setDimensions(Dimensions.get("window").height / 4);
		}
	};
	useEffect(() => {
		Dimensions.addEventListener("change", onChange);
		return () => {
			Dimensions.removeEventListener("change", onChange);
		};
	});

	return (
		<TouchableOpacity
			style={{
				height: dimensions,
				flex: 1,
				margin: 15,
				borderWidth: 2,
				borderRadius: 5,
			}}
			onPress={props.onClick}
		>
			{props.isRefresh ? (
				<View style={styles.centred}>
					<ActivityIndicator size="large" color="#0000ff" />
				</View>
			) : (
				<View
					style={{
						flex: 1,
						justifyContent: "space-around",
					}}
				>
					<Text style={styles.CitiBoxName}>{props.cityName}</Text>
					<Fontisto
						style={styles.CityIcon}
						name={props.wicon}
						size={35}
						color="black"
					/>
					<Text style={styles.temperature}>
						{Math.round(props.temp) > 0 ? "+" : ""}
						{Math.round(props.temp)} C
					</Text>
				</View>
			)}
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	CitiBox: {
		flex: 1,
		margin: 15,
		borderWidth: 2,
		borderRadius: 5,
	},
	CitiBoxName: {
		fontSize: 20,
		marginTop: 10,
		textAlign: "center",
		fontFamily: "Roboto-LightItalic",
		fontWeight: "bold",
	},
	CityIcon: {
		marginTop: 9,
		textAlign: "center",
	},
	temperature: {
		fontSize: 17,
		marginTop: 5,
		textAlign: "center",
		fontFamily: "Roboto-LightItalic",
		fontWeight: "bold",
	},
	centred: {
		flex: 1,
		alignItems: "center",
		alignContent: "space-between",
		justifyContent: "center",
	},
	bbox: {
		flex: 1,
		alignContent: "space-between",
	},
});

export default CityBox;
