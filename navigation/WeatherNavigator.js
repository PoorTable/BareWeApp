import { AntDesign, Ionicons } from "@expo/vector-icons";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import {
	CardStyleInterpolators,
	createStackNavigator,
} from "@react-navigation/stack";
import moment from "moment";
import React from "react";
import Config from "react-native-config";
import { useSelector } from "react-redux";
import CitiesPresenter, {
	screenOptions as CitiesScreenOptions,
} from "../screens/Cities/CitiesPresenter";
import DailyPresenter, {
	screenOptions as DailyScreenOptions,
} from "../screens/Daily/DailyPresenter";
import HourlyPresenter from "../screens/Hourly/HourlyPresenter";
import HourlyYesterday from "../screens/HourlyYesterday";
import PhotoPresenter from "../screens/Photo/PhotoPresenter";
import SelectedCityScreen, {
	screenOptions as SelectedCityScreenOptions,
} from "../screens/SelectedCityScreen";
import { IsPlatformIOS } from "../services/PlatformController";
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
				cardStyleInterpolator: !IsPlatformIOS()
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
				cardStyleInterpolator: !IsPlatformIOS()
					? CardStyleInterpolators.forFadeFromBottomAndroid
					: CardStyleInterpolators.forVerticalIOS,
			}}
		>
			<DS.Screen
				name="Daily"
				component={DailyPresenter}
				options={DailyScreenOptions}
			/>
			<DS.Screen name="Photo" component={PhotoPresenter} />
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
	const tit = useSelector((state) => state.dailyhoutly.City.name);
	const City = useSelector((state) => state.dailyhoutly.dt);
	const date = moment(City).format("MMMM, Do");
	return (
		<HS.Navigator>
			<HS.Screen
				name="Hourly"
				component={HourlyTopTab}
				options={{
					title: tit + " - " + date,
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
			activeColor={Config.ACTIVE_BOTTOM_BAR}
			inactiveColor={Config.INNACTIVE_BOTTOM_BAR}
			barStyle={{ backgroundColor: Config.BACKGROUND_BAR_STYLE }}
			labelStyle={{ fontSize: 12, width: "33%" }}
			screenOptions={{
				unmountOnBlur: true,
			}}
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
				screenOptions={{
					unmountOnBlur: true,
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
				screenOptions={{
					unmountOnBlur: true,
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
				screenOptions={{
					unmountOnBlur: true,
				}}
			/>
		</BottomTab.Navigator>
	);
};
