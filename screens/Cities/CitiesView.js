import React from "react";
import {
	FlatList,
	Image,
	ImageBackground,
	SafeAreaView,
	StyleSheet,
	Text,
	View,
} from "react-native";
import Config from "react-native-config";
import CityBox from "../../components/CityBox";
import CityLine from "../../components/CityLine";
import HeaderInput from "../../components/HeaderInput";
import ModalActivityIndcator from "../../components/ModalActivityIndicator";

export default function CitiesScreen({ navigation, ...props }) {
	const {
		flatListColumns,
		pTRHandler,
		SelectCityHandler,
		ClearText,
		Cities,
		Citiy,
		loading,
		searchText,
		isRefreshing,
		changeTextHandler,
		isEmpty,
	} = props;

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.searchBar}>
				<HeaderInput
					value={searchText}
					onChangeText={(text) => changeTextHandler(text)}
					isEmpty={isEmpty}
					onClick={() => {
						ClearText();
					}}
				/>
			</View>
			<ImageBackground
				source={{
					uri: Config.BACKGROUND,
				}}
				style={{ flex: 1 }}
			>
				{loading ? (
					<ModalActivityIndcator show={true} />
				) : searchText === "" ? (
					<FlatList
						key={flatListColumns}
						data={Cities}
						renderItem={(itemData) => (
							<CityBox
								cityName={itemData.item.name}
								temp={itemData.item.temperature}
								wicon={itemData.item.wcondition}
								onClick={() => {
									SelectCityHandler(itemData.item);
								}}
							/>
						)}
						numColumns={2}
						refreshing={isRefreshing}
						onRefresh={() => {
							pTRHandler();
						}}
					/>
				) : Citiy.name === undefined ? (
					<View style={styles.container}>
						<View style={styles.centred}>
							<Image source={require("../../assets/NoData.png")} />
							<Text style={styles.text}>No data for {Citiy.id}</Text>
						</View>
					</View>
				) : (
					<View style={styles.container}>
						<View style={styles.sr}>
							<Text style={styles.text}>Search results</Text>
						</View>
						<View style={styles.results}>
							<CityLine
								onClick={() => {
									SelectCityHandler(Citiy);
								}}
								name={Citiy.name}
								temp={Citiy.temperature}
								wicon={Citiy.wcondition}
							/>
						</View>
					</View>
				)}
			</ImageBackground>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	centred: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	text: {
		paddingVertical: 5,
		fontSize: 20,
		fontFamily: "Roboto-LightItalic",
		fontWeight: "bold",
		color: Config.PRIMARY_COLOR,
	},
	sr: {
		marginVertical: 10,
		width: "90%",
		marginStart: "5%",
	},
	results: { alignItems: "center", justifyContent: "center" },
	searchBar: {
		marginTop: 15,
		width: "100%",
		alignItems: "center",
		justifyContent: "center",
		height: 90,
	},
	cancel: {
		display: "flex",
	},
});
