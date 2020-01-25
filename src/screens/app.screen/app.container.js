/* Node Modules */
import React, {Component} from 'react';
/* Modules */
import {getLocalStorage, setLocalStorage} from "../../data.store/local.storage.module";
import {getPromiseData, getData} from "../../modules/helper/helper.module";
/* Components */
import HeaderComponent from '../../components/header/header.component';
import FooterComponent from '../../components/footer/footer.component';
import WeatherComponent from '../../components/weather/weather.component';
import ModalComponent from '../../components/modal/modal.component';
/* Screen Content */
import {errorReset, otherStates} from './app.states';

class AppContainer extends Component {

    /**
     * @prop {object} state
     * @desc state data
     * @author Anselm Marie
     * @memberOf AppContainer
     */
    state = {
        ...errorReset,
        ...otherStates
    };

    getLocalStorage = getLocalStorage.bind(this);

    // /**
    //  * @function constructor
    //  * @desc create a local state to store information
    //  * @author Anselm Marie
    //  * @memberOf AppContainer
    //  */
    // constructor(props) {
    //     super(props);
    //     this.getLocalStorage = getLocalStorage.bind(this);
    // }

    /**
     * @function componentDidMount
     * @desc runs functions after the component mounts
     * @author Anselm Marie
     * @memberOf AppContainer
     */
    componentDidMount() {
        this.initAreaData(this.getLocalStorage());
    }

    /**
     * @function initAreaData
     * @desc updates the
     * @author Anselm Marie
     * @memberOf AppContainer
     * @param {array} areaData - areaData response
     */
    initAreaData = async (areaData) => {

        if (areaData || (areaData && areaData.length !== 0)) {

            const data = await getPromiseData(areaData);

            if (data && data.length !== 0) {
                this.setState({
                    weatherData: data,
                });
            }

        }

        this.setState({
            initLoading: false,
        });

    };

    /**
     * @function getWeather
     * @desc request weather data based on the params given
     * @author Anselm Marie
     * @memberOf AppContainer
     * @param {string} city - city entered
     * @param {string} country - country entered
     * @return {string}
     */
    getWeather = async (city, country) => {

        this.setState(errorReset);

        const data = await getData({city: city, country: country});

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
     * @memberOf AppContainer
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
            areaData: areaData,
            weatherData: weatherData,
        });

        setLocalStorage(areaData);

    };

    /**
     * @function toggleModal
     * @desc toggles the state of the modal
     * @author Anselm Marie
     * @memberOf AppContainer
     */
    toggleModal = () => {
        this.setState({showModal: !this.state.showModal});
    };

    /**
     * @function render
     * @desc rendering elements of the component
     * @author Anselm Marie
     * @memberOf AppContainer
     */
    render() {

        if (this.state.initLoading) {
            return <div className="loading">loading...</div>;
        }

        return (
            <React.Fragment>
                <HeaderComponent
                    showModal={this.toggleModal}/>

                {this.state.serverError &&
                <div className="container-fluid">
                    <div className="row">

                        <div className="error col">Error - {this.state.serverError}</div>

                    </div>
                </div>}

                <WeatherComponent
                    screen={this}
                    data={this.state.weatherData}/>

                <FooterComponent/>

                <ModalComponent
                    getWeather={this.getWeather}
                    closeModal={this.toggleModal}
                    showModal={this.state.showModal}
                    {...this.props} />

            </React.Fragment>
        );

    }

}

export default AppContainer;
