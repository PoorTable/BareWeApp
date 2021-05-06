import City from "../models/City";

export const GET_CITIES = "GET_CITIES";
export const GET_CITY = "GET_CITY";
export const SELECT_CITY = "SELECT_CITY";
export const SET_LOADING = "SET_LOADING";
export const SET_LOADED = "SET_LOADED";

const apik = "2ecc8cdc74d9e8fdb6f53505f378ea75";

export const selectCity = (City) => {
	return { type: SELECT_CITY, City: City };
};

export const fetchCities = () => {
	return async (dispatch, getState) => {
		if (getState().weather.cities.length > 0) {
			dispatch({ type: SET_LOADING, isLoading: true });
		}
		const response = await fetch(
			`http://api.openweathermap.org/data/2.5/box/city?bbox=26,49,27,52,10&appid=${apik}`
		);

		if (!response.ok) {
			dispatch({ type: SET_LOADING, isLoading: false });
			dispatch({ type: SET_LOADED, isLoaded: true });
		}
		console.log(response.status);

		const resData = await response.json();
		const Cities = resData.list;
		const loadedCity = [];
		Cities.forEach((element) => {
			loadedCity.push(
				new City(
					+element.id,
					element.name,
					element.main.temp,
					element.weather[0].icon,
					element.dt,
					10800
				)
			);
			console.log(loadedCity);
		});

		dispatch({ type: GET_CITIES, City: loadedCity });
		dispatch({ type: SET_LOADING, isLoading: false });
		dispatch({ type: SET_LOADED, isLoaded: true });
	};
};

export const setIsLoaded = (isLoaded) => {
	return async (dispatch) => {
		dispatch({ type: SET_LOADED, isLoaded: isLoaded });
	};
};

export const fetchCity = (searchText) => {
	return async (dispatch, getState) => {
		dispatch({ type: SET_LOADED, isLoaded: true });
		dispatch({ type: SET_LOADING, isLoading: true });
		const response = await fetch(
			`https://api.openweathermap.org/data/2.5/weather?q=${searchText}&units=metric&appid=${apik}`
		);
		console.log("das");
		console.log(response.status);
		if (!response.ok) {
			var loadedCity = new City(searchText, response.message, 1, searchText, 1);
			dispatch({ type: GET_CITY, City: loadedCity });
			dispatch({ type: SET_LOADING, isLoading: false });
		} else {
			const resData = await response.json();
			var loadedCity = new City(
				resData.id,
				resData.name,
				resData.main.temp,
				resData.weather[0].icon,
				resData.dt,
				resData.timezone
			);
		}
		dispatch({ type: GET_CITY, City: loadedCity });
		dispatch({ type: SET_LOADING, isLoading: false });
		dispatch({ type: SET_LOADED, isLoaded: true });
	};
};
