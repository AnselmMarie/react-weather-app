/* Node Modules */
const uuidv1 = require('uuid/v1');
/* API content */
const API_KEY = "f9886e45ba930a3534d0e6949c21a8eb";

/**
 * @module httpModule
 * @desc store / update the local storage
 * @author Anselm Marie
 */
export let httpModule = {

    /**
     * @function fetchData
     * @desc getting the weather data
     * @author Anselm Marie
     * @memberOf localStorageModule
     * @param {object} area - data of area
     * @param {number} index - areaData
     */
    async fetchData(area, index) {

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

    },

    /**
     * @function getPromiseData
     * @desc setting up a promise to call all the rest calls
     * @author Anselm Marie
     * @memberOf localStorageModule
     * @param {object} areaData - areaData
     */
    getPromiseData(areaData) {

        const dataLength = areaData.length;
        let allPromises = [];

        for (let loop = 0; loop < dataLength; loop++) {
            allPromises.push( this.fetchData(areaData[loop], areaData[loop].key) )
        }

        return Promise.all(allPromises);

    },

    /**
     * @function getWeather
     * @desc setting up a promise to call all the rest calls
     * @author Anselm Marie
     * @memberOf localStorageModule
     * @param {object} area - data of area
     */
    async getData(area) {
        return await this.fetchData(area, uuidv1());
    }

};
