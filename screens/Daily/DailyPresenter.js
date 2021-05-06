import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import React, { useEffect, useState } from "react";
import { Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as dailyhourlyactions from "../../store/dailyhourlyactions";
import DailyView from "./DailyView";

export default function DailyPresenter({ navigation }) {
	const [location, setLocation] = useState(null);
	const [ps, setPs] = useState(false);
	const [isLoading, setisLoading] = useState(false);
	const dispatch = useDispatch();
	const Cities = useSelector((state) => state.dailyhoutly.Daily);
	var Cities1 = Cities;
	const getPerm = async () => {
		const { status, permissions } = await Permissions.askAsync(
			Permissions.LOCATION
		);
		if (status === "granted") {
			setPs(true);
			getLoc();
		} else {
			setPs(false);
		}
	};

	const getPermStatus = async () => {
		const { status, expires, permissions } = await Permissions.getAsync(
			Permissions.LOCATION
		);
		console.log(status);
		console.log(ps);
		if (status === "granted") {
			setPs(true);
			getLoc();
		}
	};

	useEffect(() => {
		const unsubscribe = navigation
			.dangerouslyGetParent()
			.addListener("tabPress", (e) => {
				e.preventDefault();
				getPermStatus();
				navigation.navigate("Daily");
			});

		return unsubscribe;
	}, [navigation]);

	const getLoc = async () => {
		setisLoading(true);
		try {
			var loca = await Location.getCurrentPositionAsync({});
			setLocation(loca);
		} catch {
			setPs(false);
			setisLoading(false);
			return;
		}
		try {
			await dispatch(
				dailyhourlyactions.getCityName(
					loca.coords.latitude,
					loca.coords.longitude
				)
			);
			await dispatch(
				dailyhourlyactions.selectDH(loca.coords.latitude, loca.coords.longitude)
			);
			setisLoading(false);
			return;
		} catch (error) {
			Alert.alert("Error", "Something went wrong during network call", [
				{ text: "Okay" },
			]);
		} finally {
			setisLoading(false);
		}
	};

	const pTRHandler = async () => {
		getLoc();
	};

	useEffect(() => {
		let f = async () => {
			await getPermStatus();
			getLoc();
		};

		f();
	}, [navigation]);

	PhotoHandler = () => {
		navigation.navigate("Photo");
	};

	return (
		<DailyView
			ps={ps}
			isLoading={isLoading}
			pTRHandler={pTRHandler}
			Cities={Cities}
			getPerm={getPerm}
			PhotoHandler={PhotoHandler}
		/>
	);
}

export const screenOptions = (navData) => {
	const tit = useSelector((state) => state.dailyhoutly.City.name);
	return {
		title: tit,
		headerTitleAlign: "left",
	};
};
