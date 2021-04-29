import React, { useEffect, useState, useCallback } from "react";
import { StyleSheet, Alert } from "react-native";
import { BottomTabs } from "./navigation/WeatherNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { useDispatch } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import * as SplashScreen from "expo-splash-screen";
import { Notifications } from "react-native-notifications";

import weatherreducer from "./store/weatherreducer";
import dailyhoutlyreducer from "./store/dailyhourlyreducer";
import * as weatherActions from "./store/weatheractions";

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
		(notification) => {
			console.log(
				`Notification received in foreground: ${notification.title} : ${notification.body}`
			);
			completion({ alert: false, sound: false, badge: false });
		}
	);

	Notifications.events().registerNotificationOpened((notification) => {
		console.log(`Notification opened: ${notification.payload}`);
		completion();
	});
	useEffect(() => {
		async function prepare() {
			try {
				await SplashScreen.preventAutoHideAsync();
				await dispatch(weatherActions.fetchCities());

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
