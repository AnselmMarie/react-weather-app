/* Node Modules */
import React from 'react';
/* Modules */
import {localStorageModule} from "../modules/local.storage.module";
/* Components */
import CloseButtonComponent from './close.button.component';

/**
 * @function removeItem
 * @desc removing the item from the weather and area state. updating the local storage.
 * @author Anselm Marie
 */
const removeItem = (thisScreen, item) => {

    const areaData = [...thisScreen.state.areaData];
    const weatherData = [...thisScreen.state.weatherData];

    const areaResults = areaData.filter((el) => item.key !== el.key);
    const weatherResults = weatherData.filter((el) => item.key !== el.key);

    thisScreen.setState({
        weatherData: weatherResults,
        areaData: areaResults,
    });

    localStorageModule.setLocalStorage(areaResults);

};

/**
 * @function imageIcon
 * @desc determine what image is being used
 * @author Anselm Marie
 * @param {string} weatherMain - weather.main content
 * @return {object}
 */
const imageIcon = (weatherMain) => {

    let icon = '';

    switch(weatherMain) {
        case 'Thunderstorm':
            icon = require('../assets/images/icons/thunderstorm.png');
            break;
        case 'Drizzle':
        case 'Mist':
        case 'Rain':
            icon = require('../assets/images/icons/raining.png');
            break;
        case 'Snow':
            icon = require('../assets/images/icons/snow.png');
            break;
        case 'Atmosphere':
            icon = require('../assets/images/icons/atmosphere.png');
            break;
        case 'Clear':
            icon = require('../assets/images/icons/sunny.png');
            break;
        case 'Clouds':
            icon = require('../assets/images/icons/clouds.png');
            break;
        default:
    }

    return icon;

};

/**
 * @function roundNum
 * @desc round out numbers
 * @author Anselm Marie
 * @return {number}
 */
const roundNum = (temp) => {
    return Math.round(temp);
};

/**
 * @function dayOrNight
 * @desc checking if the area in day or night
 * @author Anselm Marie
 * @param {string} icon - weather icon response
 * @return {object}
 */
const dayOrNight = (icon) => {

    let newIcon;

    if (icon.indexOf('d') > -1) {
        newIcon = 'weather-widget-day';
    } else {
        newIcon = 'weather-widget-night';
    }

    return newIcon;

};

/**
 * @function WeatherWidgetComponent
 * @desc renders each weather widget
 * @author Anselm Marie
 */
export default (props) => {
    const item = props.data;

    return(
        <li className={`widget-card ${dayOrNight(item.icon)}`}>
            <CloseButtonComponent closeButton={() => removeItem(props.screen, item)} />

            {item.weatherMain &&  <img alt={item.weatherMain} className="weather-widget-image" src={imageIcon(item.weatherMain)} />}

            {item.temperature && <p className="weather-widget-temp">{roundNum(item.temperature)}<sup className="weather-widget-degree">º</sup></p>}

            {item.description && <p className="weather-widget-description">{item.description}</p>}

            {item.city && item.country && <p className="weather-widget-area">{item.city} {'//'} {item.country}</p>}
        </li>
    )
}
