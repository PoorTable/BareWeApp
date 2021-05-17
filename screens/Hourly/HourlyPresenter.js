import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Alert, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as dailyhourlyactions from "../../store/dailyhourlyactions";
import HourlyView from "./HourlyView";
import { useNetInfo } from "@react-native-community/netinfo";

const HourlyPresenter = ({ navigation }) => {
	const netInfo = useNetInfo();
	const [location, setLocation] = useState(null);
	const [ps, setPs] = useState(false);
	const [isLoading, setisLoading] = useState(false);
	const dispatch = useDispatch();
	const SelectedCity = useSelector((state) => state.dailyhoutly.City);
	const Cities = useSelector((state) => state.dailyhoutly.Hourly);
	const SelectedDay = useSelector((state) => state.dailyhoutly.SelectedDay);
	const [np, setNp] = useState(false);
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
		const unsubscribe = navigation.addListener("focus", () => {
			dispatch(dailyhourlyactions.SetDate(0));
			console.log(SelectedCity.name);
			navigation.dangerouslyGetParent().setOptions({
				headerRight: () => <Text> </Text>,
			});
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
			Cities1 = [];
			console.log(Cities1);
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
			console.log(SelectedDay);
			if (SelectedDay === "Today") {
				await dispatch(
					dailyhourlyactions.selectDH(
						loca.coords.latitude,
						loca.coords.longitude
					)
				);
			} else {
				await dispatch(
					dailyhourlyactions.getYesterday(
						loca.coords.latitude,
						loca.coords.longitude
					)
				);
			}

			setisLoading(false);
		} catch (error) {
			setNp(true);
			Alert.alert("Error", "Something went wrong during network call", [
				{ text: "Okay" },
			]);
		} finally {
			setNp(true);
			setisLoading(false);
		}
	};

	const pTRHandler = async () => {
		getLoc();
	};

	useEffect(() => {
		let f = async () => {
			await getPermStatus();
			await getLoc();
		};
		f();
	}, []);

	const openFile = () => {
		dispatch(dailyhourlyactions.openFile);
	};
	const downloadFile = () => {
		dispatch(dailyhourlyactions.downloadFile);
	};

	return (
		<HourlyView
			location={location}
			ps={ps}
			isLoading={isLoading}
			pTRHandler={pTRHandler}
			getLoc={getLoc}
			Cities={Cities}
			Cities1={Cities1}
			getPerm={getPerm}
			np={np}
			downloadFile={downloadFile}
			openFile={openFile}
			netInfo={netInfo}
		/>
	);
};

export const screenOptions = (navData) => {
	const tit = useSelector((state) => state.dailyhoutly.CityName);
	const date = moment(new Date()).format("MMMM, Do");
	return {
		title: tit + " -1 " + date,
		headerTitleAlign: "left",
	};
};

export default HourlyPresenter;
