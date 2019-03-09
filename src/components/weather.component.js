/* Node Modules */
import React from 'react';
/* Components */
import WeatherWidgetComponent from './weather.widget.component';

/**
 * @function newWidth
 * @desc based on the amount of widgets the width of the scroll will change
 * @author Anselm Marie
 */
const newWidth = (data) => {
    return {
        width: data.length * (295 + 15)
    }
};

/**
 * @function WeatherComponent
 * @desc renders the weather widgets
 * @author Anselm Marie
 */
export default (props) => {

    const widgetItems = props.data.map((item) => <WeatherWidgetComponent screen={props.screen} key={item.key} data={item}/>);

    return (
      <section className="weather-widget-container">
          <ul style={newWidth(props.data)} className="weather-widget-list">{widgetItems}</ul>
      </section>
    );

}
