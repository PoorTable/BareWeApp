import React, { useEffect, useRef, useState } from "react";
import { Alert, Dimensions } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as weatherActions from "../../store/weatheractions";
import CitiesView from "./CitiesView";

export default function CitiesScreen({ navigation }) {
	useEffect(() => {
		const unsubscribe = navigation
			.dangerouslyGetParent()
			.addListener("tabPress", (e) => {
				e.preventDefault();
				pTRHandler();
				navigation.navigate("Cities");
			});
		return unsubscribe;
	}, [navigation]);

	const [flatListColumns, setFlatListColumns] = useState(2);
	const [searchText, setSeacrhText] = useState("");
	const [isEmpty, setIsEmpty] = useState(false);
	const [isRefreshing, setIsRefreshing] = useState(false);
	const dispatch = useDispatch();
	const Cities = useSelector((state) => state.weather.cities);
	var Citiy = useSelector((state) => state.weather.city);
	const loading = useSelector((state) => state.weather.isLoading);

	const onOrientationChange = () => {
		setFlatListColumns(Dimensions.get("window").width > 600 ? 3 : 2);
	};
	Dimensions.addEventListener("change", onOrientationChange);

	const timerRef = useRef(null);
	const changeTextHandler = (text) => {
		setSeacrhText(text);
	};

	const ClearText = () => {
		dispatch(weatherActions.setIsLoaded(false));
		setSeacrhText("");
		Citiy = null;
	};

	function isSymbols(input) {
		return input.replace(/\[.,?:;$!@#$%^&*()+_~`±§]*/g, "").length < 1;
	}

	function isNullOrWhitespace(input) {
		if (typeof input === "undefined" || input == null) return true;
		if (!isSymbols(input)) {
			if (!input.replace(/\s/g, "").length < 1) {
				return input.replace(/\d/g, "").length < 1;
			}
		}
	}

	useEffect(() => {
		setIsEmpty(searchText === "" ? false : true);

		if (!isNullOrWhitespace(searchText)) {
			clearTimeout(timerRef.current);
			timerRef.current = setTimeout(async () => {
				try {
					setSeacrhText(searchText.trim());
					await dispatch(weatherActions.fetchCity(searchText));
				} catch (error) {
					Alert.alert("Error", "Something went wrong during network call", [
						{ text: "Okay" },
					]);
				}
				Citiy = console.log(Citiy);
			}, 500);
			if (searchText.length < 2) {
				clearTimeout(timerRef.current);
			}
			if (isNullOrWhitespace(searchText)) {
				clearTimeout(timerRef.current);
			}
		} else {
			clearTimeout(timerRef.current);
		}
	}, [searchText]);

	const pTRHandler = async () => {
		try {
			await dispatch(weatherActions.fetchCities());
		} catch (error) {
			Alert.alert("Error", "Something went wrong during network call", [
				{ text: "Okay" },
			]);
		} finally {
		}
	};

	const SelectCityHandler = async (City) => {
		navigation.navigate("SelectedCity", { City: City });
	};

	return (
		<CitiesView
			pTRHandler={pTRHandler}
			SelectCityHandler={SelectCityHandler}
			ClearText={ClearText}
			Cities={Cities}
			Citiy={Citiy}
			loading={loading}
			searchText={searchText}
			isRefreshing={isRefreshing}
			changeTextHandler={changeTextHandler}
			isEmpty={isEmpty}
			flatListColumns={flatListColumns}
		/>
	);
}
export const screenOptions = (navData) => {
	return {
		headerShown: false,
	};
};
