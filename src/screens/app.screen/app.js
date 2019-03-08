/* Node Modules */
import React, {Component} from 'react';
/* Components */
import HeaderComponent from '../../components/header.component';
import FooterComponent from '../../components/footer.component';
import WeatherComponent from '../../components/weather.component';
import ModalComponent from '../../components/modal.component';
/* Screen Content */
import states from './app.states';
/* Styles */
import './app.css';

const API_KEY = "f9886e45ba930a3534d0e6949c21a8eb";

class App extends Component {

    /**
     * @property state
     * @desc this will determine if the modal will be shown
     * @author Anselm Marie
     * @memberOf App
     */
    state = Object.assign({}, states.input, states.error, states.otherStates);

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
     * @function modalShown
     * @desc this will determine if the modal will be shown
     * @author Anselm Marie
     * @memberOf ModalComponent
     * @return {string}
     */
    getWeather = async (city, country) => {

        // this.setState(states);
        //
        // const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&APPID=${API_KEY}`);
        // const data = await api_call.json();
        //
        // if (!data || (data && data.cod !== 200)) {
        //     this.onError(data ? data.message : 'Internal Error Message');
        //     return;
        // }
        //
        // this.setState({
        //     temperature: data.main.temp,
        //     city: data.name,
        //     country: data.sys.country,
        //     humidity: data.main.humidity,
        //     description: data.weather[0].description,
        // });

    };

    render() {
        return (
            <React.Fragment>
                <HeaderComponent
                    showModal={this.toggleModal} />

                <WeatherComponent
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
