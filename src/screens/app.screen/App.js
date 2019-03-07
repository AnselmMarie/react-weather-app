/* Node Modules */
import React, { Component } from 'react';
/* Components */
import TitleComponent from '../../components/title.component';
import FormComponent from '../../components/form.component';
import WeatherComponent from '../../components/weather.component';
/* Styles */
import './App.css';

const API_KEY = "f9886e45ba930a3534d0e6949c21a8eb";

const states = {
  temperature: null,
  city: null,
  humidity: null,
  description: null,
  error: null,
};

class App extends Component {

  state = states;

  onError = (errText) => {
    this.setState({
      error: errText,
    });
  };

  getWeather = async(e) => {

    e.preventDefault();

    this.setState(states);

    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;

    if (!city && !country) {
      this.onError('Please enter the city and country.');
      return;
    }

    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&APPID=${API_KEY}`);
    const data = await api_call.json();

    if (!data || (data && data.cod !== 200)) {
      this.onError(data ? data.message : 'Internal Error Message');
      return;
    }

    this.setState({
      temperature: data.main.temp,
      city: data.name,
      country: data.sys.country,
      humidity: data.main.humidity,
      description: data.weather[0].description,
    });

  };

  render() {
    return (
        <div>

          <div className="wrapper">
            <div className="main">
                <div className="row">

                  <div className="col-xs-5 title-container">
                    <TitleComponent />
                  </div>

                  <div className="col-xs-7 form-container">
                    <FormComponent
                      getWeather={this.getWeather} />

                    <WeatherComponent
                      temperature={this.state.temperature}
                      city={this.state.city}
                      country={this.state.country}
                      humidity={this.state.humidity}
                      description={this.state.description}
                      error={this.state.error} />
                  </div>

                </div>
              </div>
          </div>

        </div>
    );
  }

}

export default App;
