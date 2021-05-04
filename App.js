import React, { useEffect, useState, useCallback } from "react";
import { StyleSheet, Alert, Platform, Linking } from "react-native";
import { BottomTabs } from "./navigation/WeatherNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { useDispatch } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import * as SplashScreen from "expo-splash-screen";
import { Notifications } from "react-native-notifications";
import {
	DeterminatePlatform,
	IsPlatformIOS,
} from "./services/PlatformController";

import weatherreducer from "./store/weatherreducer";
import dailyhoutlyreducer from "./store/dailyhourlyreducer";
import * as weatherActions from "./store/weatheractions";
import * as dailyhourlyactions from "./store/dailyhourlyactions";

const rootReducer = combineReducers({
	weather: weatherreducer,
	dailyhoutly: dailyhoutlyreducer,
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

	Notifications.registerRemoteNotifications();

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

	return (
		<Provider store={store}>
			<NavigationContainer>
				<BottomTabs />
			</NavigationContainer>
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
});

export default AppWrapper;
