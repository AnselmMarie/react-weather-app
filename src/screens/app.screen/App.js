/* Node Modules */
import React, {Component} from 'react';
/* Modules */
import {localStorageModule} from "../../modules/local.storage.module";
import {httpModule} from "../../modules/http.module";
/* Components */
import HeaderComponent from '../../components/header.component';
import FooterComponent from '../../components/footer.component';
import WeatherComponent from '../../components/weather.component';
import ModalComponent from '../../components/modal.component';
/* Screen Content */
import {states} from './app.states';
/* Styles */
import './app.css';

class App extends Component {

    /**
     * @property state
     * @desc this will determine if the modal will be shown
     * @author Anselm Marie
     * @memberOf App
     */
    constructor(props) {
        super(props);
        this.state = Object.assign({}, states.errors, states.otherStates);
        localStorageModule.getLocalStorage = localStorageModule.getLocalStorage.bind(this);
        localStorageModule.setLocalStorage = localStorageModule.setLocalStorage.bind(this);
    }

    /**
     * @function componentDidMount
     * @desc runs functions after the component mounts
     * @author Anselm Marie
     * @memberOf App
     */
    componentDidMount() {
        this.initAreaData(localStorageModule.getLocalStorage());
    }

    /**
     * @function initAreaData
     * @desc updates the
     * @author Anselm Marie
     * @memberOf App
     * @param {array} areaData - areaData response
     */
    initAreaData = async(areaData) => {

        if (!areaData || (areaData && areaData.length === 0)) {
            return;
        }

        const data = await httpModule.getPromiseData(areaData);

        if (data && data.length !== 0) {
            this.setState({
                weatherData: data
            });
        }

    };

    /**
     * @function getWeather
     * @desc request weather data based on the params given
     * @author Anselm Marie
     * @memberOf App
     * @param {string} city - city entered
     * @param {string} country - country entered
     * @return {string}
     */
    getWeather = async (city, country) => {

        this.setState(states.errors);

        const data = await httpModule.getData({city: city, country: country});

        if (!data || (data && data.cod)) {
            this.setState({
                serverError: data ? data.message : 'Internal Error Message'
            });
        } else {
            this.setWeatherData(data);
        }

    };

    /**
     * @function setWeatherData
     * @desc updating the weather data and area data
     * @author Anselm Marie
     * @memberOf App
     * @param {object} data - weather data response
     */
    setWeatherData = (data) => {

        let weatherData = [...this.state.weatherData];
        let areaData = [...this.state.areaData];

        weatherData.push(data);

        areaData.push({
            key: data.key,
            city: data.city,
            country: data.country,
        });

        this.setState({
            weatherData: weatherData,
        });

        localStorageModule.setLocalStorage(areaData);

    };

    /**
     * @function toggleModal
     * @desc toggles the state of the modal
     * @author Anselm Marie
     * @memberOf App
     */
    toggleModal = () => {
        this.setState({showModal: !this.state.showModal});
    };

    /**
     * @function render
     * @desc rendering elements of the component
     * @author Anselm Marie
     * @memberOf App
     */
    render() {
        return (
            <React.Fragment>
                <HeaderComponent
                    showModal={this.toggleModal} />

                {this.state.serverError && <div>{this.state.serverError}</div>}

                <WeatherComponent
                    screen={this}
                    data={this.state.weatherData} />

                <FooterComponent />

                <ModalComponent
                    getWeather={this.getWeather}
                    closeModal={this.toggleModal}
                    showModal={this.state.showModal}
                    {...this.props} />

            </React.Fragment>
        );
    }

}

export default App;
