class City {
	constructor(id, name, temperature, wcondition, time, tz) {
		this.id = id;
		this.name = name;
		this.temperature = temperature;
		this.wcondition = wtype(wcondition);
		this.time = time * 1000;
		this.tz = tz * 1000;
	}
}

const wtype = (wcondition) => {
	switch (wcondition) {
		case "01d":
			return "day-sunny";
		case "01n":
			return "night-clear";
		case "02d":
			return "day-cloudy";
		case "02n":
			return "night-alt-cloudy";
		case "03d":
		case "03n":
			return "cloudy";
		case "04d":
		case "04n":
			return "cloudy";
		case "09d":
		case "09n":
			return "rains";
		case "10d":
			return "day-rain";
		case "10n":
			return "night-alt-rain";
		case "11d":
		case "11n":
			return "lightning";
		case "13d":
		case "13n":
			return "snowflake";
		case "50d":
		case "50n":
			return "fog";
		default:
			break;
	}
};

export default City;
