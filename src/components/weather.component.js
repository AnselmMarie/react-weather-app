/* Node Modules */
import React from 'react';
/* Components */
import WeatherWidgetComponent from './weather.widget.component';

/**
 * @function WeatherComponent
 * @desc renders the weather widgets
 * @author Anselm Marie
 */
export default (props) => {

    const widgetItems = props.data.map((item) => <WeatherWidgetComponent screen={props.screen} key={item.key} data={item}/>);

    return (
      <section className="weather-widget-container">
          <ul>{widgetItems}</ul>
      </section>
    );

}
