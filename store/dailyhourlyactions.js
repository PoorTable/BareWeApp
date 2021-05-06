import FileViewer from "react-native-file-viewer";
import { Platform } from "react-native";
import City from "../models/City";
import * as Network from "expo-network";
import { Notifications } from "react-native-notifications";
import { IsPlatformIOS } from "../services/PlatformController";

export const SET_DH = "SET_DH";
export const GET_CITY_NAME = "SET_CITY_NAME";
export const GET_YESTERDAY = "GET_YESTERDAY";
export const SELECT_DAY = "SELECT_DAY";
export const SET_DATE = "SET_DATE";
export const NERROR = "NERROR";

const apik = "2ecc8cdc74d9e8fdb6f53505f378ea75";

export const selectDay = (index) => {
	return async (dispatch) => {
		dispatch({ type: SELECT_DAY, Day: "Today" });
	};
};

export const downloadFile = () => {
	var RNFS = require("react-native-fs");

	var path = RNFS.DocumentDirectoryPath + "/datas1.json";
	let toFile = RNFS.DownloadDirectoryPath + "/datas1.json";
	console.log(path);
	RNFS.copyFile(path, toFile).then(
		Notifications.postLocalNotification({
			body: "File with yesterday forecast succesfully donwloaded",
			title: "File Downloaded",
			sound: "chime.aiff",
			category: "SOME_CATEGORY",
			link: "localNotificationLink",
			fireDate: new Date(),
		})
	);
	return async (dispatch, getState) => {};
};

export const openFile = async () => {
	var RNFS = require("react-native-fs");
	var path = !IsPlatformIOS()
		? RNFS.DocumentDirectoryPath + "/datas1.json"
		: RNFS.DocumentDirectoryPath + "/datas1.json";
	let exists = await RNFS.exists(path);
	console.log(path);
	if (exists) {
		FileViewer.open(path, {
			showOpenWithDialog: true,
			showAppsSuggestions: true,
		}).then(() => {
			if (IsPlatformIOS) {
				Notifications.postLocalNotification({
					body: "File with yesterday forecast succesfully donwloaded",
					title: "File Downloaded",
					sound: "chime.aiff",
					category: "SOME_CATEGORY",
					link: "localNotificationLink",
					fireDate: new Date(),
				});
			}
		});
	}
	return async (dispatch, getState) => {};
};

export const getYesterday = (lat, lon) => {
	return async (dispatch, getState) => {
		var RNFS = require("react-native-fs");
		var path = !IsPlatformIOS()
			? RNFS.DocumentDirectoryPath + "/datas1.json"
			: RNFS.DocumentDirectoryPath + "/datas1.json";
		let exists = await RNFS.exists(path);
		console.log(path);
		if (exists) {
			let a = await RNFS.readFile(path);
			let JSONFormatted = JSON.parse(a);
			console.log(new Date(JSONFormatted.current.dt * 1000).getDate());
			console.log(new Date(Date.now() - 86400000).getDate());
			if (
				new Date(JSONFormatted.current.dt * 1000).getDate() ==
				new Date(Date.now() - 86400000).getDate()
			) {
				const Hourly = JSONFormatted.hourly;
				const loadedYesterday = [];
				Hourly.forEach((element) => {
					loadedYesterday.push(
						new City(
							Math.random().toString(),
							1,
							element.temp,
							element.weather[0].icon,
							element.dt - 10800
						)
					);
				});
				const dt = Hourly[0].dt * 1000;
				dispatch({ type: SET_DATE, dt: dt });
				dispatch({ type: GET_YESTERDAY, Yesterday: loadedYesterday });
			} else {
				if ((await Network.getNetworkStateAsync()).type !== "NONE") {
					dispatch({ type: NERROR, errorState: false });
					let date = Math.floor((Date.now() - 86400000) / 1000);
					console.log(date);
					const response = await fetch(
						`http://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${lat}&lon=${lon}&dt=${date}&units=metric&appid=${apik}`
					);

					if (!response.ok) {
						throw new Error("Something went wrong!");
					}

					const resData = await response.json();

					const Hourly = resData.hourly;
					const loadedYesterday = [];
					Hourly.forEach((element) => {
						loadedYesterday.push(
							new City(
								Math.random().toString(),
								1,
								element.temp,
								element.weather[0].icon,
								element.dt - 10800
							)
						);
					});
					try {
						await RNFS.writeFile(path, JSON.stringify(resData));
						console.log("succes");
					} catch (err) {
						console.log(err);
					}
					const dt = Hourly[0].dt * 1000;
					dispatch({ type: SET_DATE, dt: dt });
					dispatch({ type: GET_YESTERDAY, Yesterday: loadedYesterday });
				} else {
					dispatch({ type: NERROR, errorState: true });
				}
			}
		} else {
			if ((await Network.getNetworkStateAsync()).type !== "NONE") {
				dispatch({ type: NERROR, errorState: false });
				let date = Math.floor((Date.now() - 86400000) / 1000);
				console.log(date);
				const response = await fetch(
					`http://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${lat}&lon=${lon}&dt=${date}&units=metric&appid=${apik}`
				);

				if (!response.ok) {
					throw new Error("Something went wrong!");
				}

				const resData = await response.json();

				const Hourly = resData.hourly;
				const loadedYesterday = [];
				Hourly.forEach((element) => {
					loadedYesterday.push(
						new City(
							Math.random().toString(),
							1,
							element.temp,
							element.weather[0].icon,
							element.dt - 10800
						)
					);
				});
				try {
					await RNFS.writeFile(path, JSON.stringify(resData));
					console.log("succes");
				} catch (err) {
					console.log(err);
				}
				const dt = Hourly[0].dt * 1000;
				dispatch({ type: SET_DATE, dt: dt });
				dispatch({ type: GET_YESTERDAY, Yesterday: loadedYesterday });
			} else {
				dispatch({ type: NERROR, errorState: true });
			}
		}
	};
};

export const getCityName = (lat, lon) => {
	return async (dispatch, getState) => {
		const response = await fetch(
			`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apik}`
		);

		if (!response.ok) {
			throw new Error("Something went wrong!");
		}
		console.log(response.status);
		const resData = await response.json();

		const loadedCity = new City(
			+resData.id,
			resData.name,
			resData.main.temp,
			resData.weather[0].icon,
			resData.dt
		);
		const dt = loadedCity.time;
		console.log(loadedCity);
		dispatch({ type: SET_DATE, dt: dt });
		dispatch({ type: GET_CITY_NAME, City: loadedCity });
	};
};

export const SetDate = (ind) => {
	return async (dispatch, getState) => {
		let dt = ind === 1 ? Date.now() - 86400000 : Date.now();
		dispatch({ type: SET_DATE, dt: dt });
	};
};

export const selectDH = (lat, lon) => {
	return async (dispatch, getState) => {
		const response = await fetch(
			`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,alerts&units=metric&appid=${apik}`
		);

		if (!response.ok) {
			throw new Error("Something went wrong!");
		}
		console.log(response.json);
		const resData = await response.json();
		const Hourly = resData.hourly.slice(0, 24);
		const loadedHourly = [];
		Hourly.forEach((element) => {
			if (
				new Date(element.dt * 1000).getDate() === new Date(Date.now()).getDate()
			) {
				loadedHourly.push(
					new City(
						Math.random().toString(),
						1,
						element.temp,
						element.weather[0].icon,
						element.dt
					)
				);
			}
		});
		const Daily = resData.daily;
		const loaded = [];

		Daily.forEach((element) => {
			loaded.push(
				new City(
					Math.random().toString(),
					1,
					element.temp,
					element.weather[0].icon,
					element.dt
				)
			);
		});

		dispatch({ type: SET_DH, Daily: loaded, Hourly: loadedHourly });
	};
};
