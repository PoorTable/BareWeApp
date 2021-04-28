import React from "react";
import {
	SafeAreaView,
	StyleSheet,
	View,
	ImageBackground,
	FlatList,
} from "react-native";
import moment from "moment";

import CityLine from "../../components/CityLine";
import ModalActivityIndcator from "../../components/ModalActivityIndicator";
import NoData from "../../components/NoData";

const DailyView = (props) => {
	const { ps, isLoading, pTRHandler, Cities, getPerm } = props;
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
					<NoData onPress={getPerm} />
				)}
			</ImageBackground>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	fl: {
		flex: 1,
		marginBottom: 15,
	},
	Name: {
		paddingVertical: 5,
		fontSize: 20,
		fontFamily: "Roboto-LightItalic",
		fontWeight: "bold",
		color: "black",
	},
	text: {
		color: "#fff",
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
