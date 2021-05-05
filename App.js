import { NavigationContainer } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect, useState } from "react";
import { Linking, StyleSheet, Text, View, Vibration } from "react-native";
import { Notifications } from "react-native-notifications";
import UserInactivity from "react-native-user-inactivity";
import { Provider, useDispatch } from "react-redux";
import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import ReduxThunk from "redux-thunk";
import { BottomTabs } from "./navigation/WeatherNavigator";
import {
	DeterminatePlatform,
	IsPlatformIOS,
} from "./services/PlatformController";
import dailyhoutlyreducer from "./store/dailyhourlyreducer";
import photoreducer from "./store/photoreducer";
import * as weatherActions from "./store/weatheractions";
import weatherreducer from "./store/weatherreducer";

const rootReducer = combineReducers({
	weather: weatherreducer,
	dailyhoutly: dailyhoutlyreducer,
	photo: photoreducer,
});

const store = createStore(
	rootReducer,
	composeWithDevTools(applyMiddleware(ReduxThunk))
);

const AppWrapper = () => {
	return (
		<Provider store={store}>
			<App />
		</Provider>
	);
};

const App = () => {
	const dispatch = useDispatch();

	Notifications.events().registerNotificationReceivedForeground(
		(notification, completion) => {
			completion({ alert: true, sound: true, badge: false });
			console.log(
				`Notification received in foreground: ${notification.title} : ${notification.body}`
			);
		}
	);

	Notifications.events().registerNotificationOpened(
		(notification, completion) => {
			completion(
				() => {
					if (IsPlatformIOS()) {
						Linking.openURL("calshow:");
					} else {
						Linking.openURL("content://com.android.calendar/time/");
					}
				}
				// IsPlatformIOS() ? null : dispatch(dailyhourlyactions.openFile())
			);
			if (IsPlatformIOS()) {
				Linking.openURL("calshow:");
			} else {
				Linking.openURL("content://com.android.calendar/time/");
			}

			console.log(`Notification opened: ${notification.payload}`);
		}
	);

	useEffect(() => {
		async function prepare() {
			try {
				await SplashScreen.preventAutoHideAsync();
				await dispatch(weatherActions.fetchCities());
				Notifications.registerRemoteNotifications();
				DeterminatePlatform();
				await new Promise((resolve) => setTimeout(resolve, 2000));
			} catch (e) {
				console.warn(e);
			} finally {
				await SplashScreen.hideAsync();
			}
		}

		prepare();
	}, [dispatch]);

	const [active, setActive] = useState(true);
	const [timer, setTimer] = useState(60000);
	return (
		<Provider store={store}>
			{active ? (
				<UserInactivity
					isActive={active}
					timeForInactivity={timer}
					onAction={(isActive) => {
						setActive(isActive);
						console.log("s");
					}}
					skipKeyboard={false}
					style={{ flex: 1 }}
				>
					<NavigationContainer>
						<BottomTabs />
					</NavigationContainer>
				</UserInactivity>
			) : (
				<View style={styles.container1}>
					<Text>You have been innactive for 60 seconds</Text>
					<Text>Please restart the app</Text>
				</View>
			)}
		</Provider>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
	container1: {
		flex: 1,
		backgroundColor: "#fff000",
		alignItems: "center",
		justifyContent: "center",
	},
});

export default AppWrapper;
