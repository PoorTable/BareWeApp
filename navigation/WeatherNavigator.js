import { AntDesign, Ionicons } from "@expo/vector-icons";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import {
	CardStyleInterpolators,
	createStackNavigator,
} from "@react-navigation/stack";
import moment from "moment";
import React from "react";
import { Platform } from "react-native";
import { useSelector } from "react-redux";
import CitiesPresenter, {
	screenOptions as CitiesScreenOptions,
} from "../screens/Cities/CitiesPresenter";
import DailyPresenter, {
	screenOptions as DailyScreenOptions,
} from "../screens/Daily/DailyPresenter";
import HourlyPresenter from "../screens/Hourly/HourlyPresenter";
import HourlyYesterday from "../screens/HourlyYesterday";
import SelectedCityScreen, {
	screenOptions as SelectedCityScreenOptions,
} from "../screens/SelectedCityScreen";

const WeatherStack = createStackNavigator();

export const WS = () => {
	return (
		<WeatherStack.Navigator
			screenOptions={{
				gestureEnabled: true,
				gestureResponseDistance: {
					horizontal: 200,
				},
				gestureDirection: "vertical-inverted",
				cardStyleInterpolator:
					Platform.OS === "Android"
						? CardStyleInterpolators.forFadeFromBottomAndroid
						: CardStyleInterpolators.forVerticalIOS,
			}}
		>
			<WeatherStack.Screen
				name="Cities"
				component={CitiesPresenter}
				options={CitiesScreenOptions}
			/>
			<WeatherStack.Screen
				name="SelectedCity"
				component={SelectedCityScreen}
				options={SelectedCityScreenOptions}
			/>
		</WeatherStack.Navigator>
	);
};

const DS = createStackNavigator();
export const DailyStack = () => {
	return (
		<DS.Navigator
			screenOptions={{
				gestureEnabled: true,
				gestureResponseDistance: {
					horizontal: 200,
				},
				gestureDirection: "vertical-inverted",
				cardStyleInterpolator:
					Platform.OS === "Android"
						? CardStyleInterpolators.forFadeFromBottomAndroid
						: CardStyleInterpolators.forVerticalIOS,
			}}
		>
			<DS.Screen
				name="Daily"
				component={DailyPresenter}
				options={DailyScreenOptions}
			/>
		</DS.Navigator>
	);
};

const HourlyTT = createMaterialTopTabNavigator();
export const HourlyTopTab = () => {
	return (
		<HourlyTT.Navigator initialRouteName="Today">
			<HourlyTT.Screen name="Yseterday" component={HourlyYesterday} />
			<HourlyTT.Screen name="Today" component={HourlyPresenter} />
		</HourlyTT.Navigator>
	);
};

const HS = createStackNavigator();
export const HourlyStack = () => {
	const tit = useSelector((state) => state.dailyhoutly.City);
	const City = useSelector((state) => state.dailyhoutly.dt);
	const date = moment(City).format("MMMM, Do");
	return (
		<HS.Navigator>
			<HS.Screen
				name="Hourly"
				component={HourlyTopTab}
				options={{
					title: tit.name + " " + date,
					headerTitleAlign: "left",
				}}
			/>
		</HS.Navigator>
	);
};

const BottomTab = createMaterialBottomTabNavigator();

export const BottomTabs = () => {
	return (
		<BottomTab.Navigator
			activeColor="#f0edf6"
			inactiveColor="#3e2465"
			barStyle={{ backgroundColor: "#694fad" }}
			labelStyle={{ fontSize: 12 }}
		>
			<BottomTab.Screen
				name="Cities"
				component={WS}
				options={{
					tabBarLabel: "Cities",
					tabBarIcon: ({ color }) => (
						<AntDesign name="home" size={26} color={color} />
					),
				}}
			/>
			<BottomTab.Screen
				name="Daily"
				component={DailyStack}
				options={{
					tabBarLabel: "Daily",
					tabBarIcon: ({ color }) => (
						<AntDesign name="calendar" size={26} color={color} />
					),
				}}
			/>
			<BottomTab.Screen
				name="Hourly"
				component={HourlyStack}
				options={{
					tabBarLabel: "Hourly",
					tabBarIcon: ({ color }) => (
						<Ionicons name="md-time-outline" size={26} color={color} />
					),
				}}
			/>
		</BottomTab.Navigator>
	);
};
