/* API content */
const API_KEY = "f9886e45ba930a3534d0e6949c21a8eb";

/**
 * @function fetchData
 * @desc getting the weather data
 * @author Anselm Marie
 * @param {object} area - data of area
 * @param {number} index - areaData
 */
export const fetchData = async (area, index) => {

    const results = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${area.city},${area.country}&APPID=${API_KEY}&units=Imperial`);
    const data = await results.json();

    if (!data || (data && data.cod !== 200)) {
        return data;

    } else {
        return {
            key: index,
            temperature: data.main.temp,
            city: data.name,
            country: data.sys.country,
            humidity: data.main.humidity,
            weatherMain: data.weather[0].main,
            icon: data.weather[0].icon,
            description: data.weather[0].description,
        }

    }

};