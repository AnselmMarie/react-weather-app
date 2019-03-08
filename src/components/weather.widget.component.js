/* Node Modules */
import React from 'react';
/* Modules */
import {localStorageModule} from "../modules/local.storage.module";

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
    });

    localStorageModule.setLocalStorage(areaResults);

};

/**
 * @function WeatherWidgetComponent
 * @desc renders each weather widget
 * @author Anselm Marie
 */
export default (props) => {
    const item = props.data;

    return(
        <li>
            <div className="close-button" onClick={() => removeItem(props.screen, item)}>X</div>
            {item.icon &&  <p className="weather__value">{item.icon}</p>}

            {item.temperature && <p className="weather__value">{item.temperature}</p>}

            {item.description && <p className="weather__value">{item.description}</p>}

            {item.city && item.country && <p>{item.city} {'//'} {item.country}</p>}
        </li>
    )
}
