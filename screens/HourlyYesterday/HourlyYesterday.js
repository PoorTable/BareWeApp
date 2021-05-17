import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import moment from "moment";
import {
	Alert,
	Button,
	Platform,
	Text,
	PermissionsAndroid,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as dailyhourlyactions from "../../store/dailyhourlyactions";
import HourlyYesterdayView from "./HourlyYesterdayView";
import { IsPlatformIOS } from "../../services/PlatformController";
import { useNetInfo } from "@react-native-community/netinfo";

const HourlyYesterday = ({ navigation }) => {
	const netInfo = useNetInfo();
	const [location, setLocation] = useState(null);
	const [ps, setPs] = useState(false);
	const [isLoading, setisLoading] = useState(false);
	const [isVisible, setIsVisible] = useState(false);
	const dispatch = useDispatch();
	const Cities = useSelector((state) => state.dailyhoutly.Yesterday);
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
			setisLoading(false);
			return;
		} finally {
			setisLoading(false);
		}
	};

	const date = moment(Date.now() - 86400000).format("MMMM, Do");
	useEffect(async () => {
		const unsubscribe = navigation.addListener("focus", async () => {
			var loca = await Location.getCurrentPositionAsync({});
			console.log(loca.coords.latitude);
			try {
				await dispatch(
					dailyhourlyactions.getYesterday(
						loca.coords.latitude,
						loca.coords.longitude
					)
				);
				setisLoading(false);
			} catch (error) {
				Alert.alert("Error", "Something went wrong during network call", [
					{ text: "Okay" },
				]);
			} finally {
				setisLoading(false);
			}
			dispatch(dailyhourlyactions.SetDate(1));
			navigation.dangerouslyGetParent().setOptions({
				headerRight: () => (
					<Button
						onPress={() =>
							!IsPlatformIOS()
								? setIsVisible(true)
								: dispatch(dailyhourlyactions.openFile)
						}
						title="File"
						color="#ded"
						style={{ marginVertical: 50 }}
					/>
				),
			});
		});

		return unsubscribe;
	}, [navigation]);

	const pTRHandler = async () => {
		getLoc();
	};

	useEffect(() => {
		let f = async () => {
			try {
				const granted = await PermissionsAndroid.request(
					PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
					{
						title: "Cool Photo App Camera Permission",
						message: "Cool Photo App needs access to your Storage ",
						buttonNeutral: "Ask Me Later",
						buttonNegative: "Cancel",
						buttonPositive: "OK",
					}
				);
				if (granted === PermissionsAndroid.RESULTS.GRANTED) {
					console.log("You can use the Storage");
				} else {
					console.log("Storage permission denied");
				}
			} catch (err) {
				console.warn(err);
			}
			await getPermStatus();
			await getLoc();
		};
		f();
	}, [dispatch]);

	const openFile = () => {
		dispatch(dailyhourlyactions.openFile);
	};
	const downloadFile = () => {
		dispatch(dailyhourlyactions.downloadFile);
	};

	return (
		<HourlyYesterdayView
			location={location}
			ps={ps}
			isLoading={isLoading}
			pTRHandler={pTRHandler}
			getLoc={getLoc}
			Cities={Cities}
			Cities1={Cities1}
			getPerm={getPerm}
			isVisible={isVisible}
			setIsVisible={setIsVisible}
			openFile={openFile}
			downloadFile={downloadFile}
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

export default HourlyYesterday;
