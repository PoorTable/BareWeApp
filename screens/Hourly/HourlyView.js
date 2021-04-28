import moment from "moment";
import React from "react";
import {
	FlatList,
	SafeAreaView,
	StyleSheet,
	ImageBackground,
	Text,
	View,
} from "react-native";
import CityLine from "../../components/CityLine";
import ModalActivityIndcator from "../../components/ModalActivityIndicator";
import NoData from "../../components/NoData";

const HourlyView = (props) => {
	const { ps, isLoading, pTRHandler, Cities, getPerm, np } = props;

	return (
		<SafeAreaView style={styles.fl}>
			<ImageBackground
				source={{
					uri:
						"https://t4.ftcdn.net/jpg/03/25/68/63/360_F_325686385_7xPlV6ZN5HMj15QJ9LRr8gOsk2nyP4pM.jpg",
				}}
				style={{ flex: 1 }}
			>
				{isLoading ? (
					<ModalActivityIndcator show={true} />
				) : ps ? (
					<View style={styles.sr}>
						<FlatList
							data={Cities}
							renderItem={(itemData) => (
								<CityLine
									name={moment(new Date(itemData.item.time)).format("LT")}
									temp={itemData.item.temperature}
									wicon={itemData.item.wcondition}
									DH={true}
								/>
							)}
							refreshing={isLoading}
							onRefresh={() => {
								pTRHandler();
							}}
						/>
					</View>
				) : !np ? (
					<NoData onPress={getPerm} />
				) : (
					<View style={styles.container}>
						<Image source={require("../../assets/NoData.png")} />
						<Text style={styles.Name}>Cannot get an update</Text>

						<Text style={styles.descr}>
							Please check your connection to the internet
						</Text>
					</View>
				)}
			</ImageBackground>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	centred: {
		width: "40%",
	},
	fl: {
		flex: 1,
	},
	Name: {
		paddingVertical: 5,
		fontFamily: "Roboto-LightItalic",
		fontWeight: "bold",
		color: "black",
		fontSize: 20,
	},
	text: {
		color: "#fff",
		fontSize: 16,
	},
	access: {
		backgroundColor: "#694fad",
		marginVertical: 15,
		height: 40,
		width: 120,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 5,
	},
	descr: {
		paddingVertical: 5,
	},
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	sr: {
		flex: 1,
		marginVertical: 10,
		width: "100%",
		marginStart: "5%",
	},
	header: {
		flex: 1,
		justifyContent: "flex-start",
		alignItems: "flex-start",
	},
});

export default HourlyView;
