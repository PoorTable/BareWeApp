import moment from "moment";
import React from "react";
import {
	FlatList,
	ImageBackground,
	SafeAreaView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	Image,
} from "react-native";
import Config from "react-native-config";
import CityLine from "../../components/CityLine";
import ModalActivityIndcator from "../../components/ModalActivityIndicator";
import NoData from "../../components/NoData";
import { FAB } from "react-native-elements";

const DailyView = (props) => {
	const { ps, isLoading, pTRHandler, Cities, getPerm, PhotoHandler, netInfo } =
		props;
	return (
		<SafeAreaView style={styles.fl}>
			<ImageBackground
				source={{
					uri: Config.BACKGROUND,
				}}
				style={{ flex: 1 }}
			>
				{!netInfo.isInternetReachable ? (
					<View style={styles.container}>
						<View style={styles.centred}>
							<Image source={require("../../assets/NoData.png")} />
							<Text style={styles.Name}>Cannot get an update</Text>

							<Text style={styles.descr}>
								Please check your connection to the internet
							</Text>
						</View>
					</View>
				) : isLoading ? (
					<ModalActivityIndcator show={true} />
				) : ps ? (
					<View>
						<View style={styles.sr}>
							<FlatList
								data={Cities}
								renderItem={(itemData) => (
									<CityLine
										name={moment(new Date(itemData.item.time)).format(
											"MMMM, Do"
										)}
										temp={itemData.item.temperature.day}
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
					</View>
				) : (
					<View style={styles.container}>
						<NoData onPress={getPerm} />
					</View>
				)}
				<FAB title="Photos" placement="left" onPress={PhotoHandler} />
			</ImageBackground>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	fl: {
		flex: 1,
	},
	Name: {
		paddingVertical: 5,
		fontSize: 20,
		fontFamily: "Roboto-LightItalic",
		fontWeight: "bold",
		color: "black",
	},
	text: {
		fontSize: 16,
		fontFamily: "Roboto-LightItalic",
		fontWeight: "bold",
		color: "black",
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

export default DailyView;
