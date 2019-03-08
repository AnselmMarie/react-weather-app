/* Node Modules */
import React, {Component} from 'react';

export default class ModalComponent extends Component {

    /**
     * @function constructor
     * @desc defining elements in the class
     * @author Anselm Marie
     * @memberOf ModalComponent
     */
    constructor(props) {
        super(props);
        this.state = {

            formError: null,
        };
    }

    /**
     * @function fieldValidation
     * @desc checking if the fields are valid before calling the API
     * @author Anselm Marie
     * @memberOf ModalComponent
     */
    fieldValidation = (e) => {

        e.preventDefault();

        this.setState({
            formError: null
        });

        const city = e.target.elements.city.value;
        const country = e.target.elements.country.value;

        if (!city || !country) {
            this.setState({
                formError: 'Please enter the city and country.'
            });
        } else {
            this.props.getWeather(city, country);
            this.props.closeModal();
        }

    };

    /**
     * @function modalShown
     * @desc this will determine if the modal will be shown
     * @author Anselm Marie
     * @memberOf ModalComponent
     * @param {boolean} showModal - true to show modal, false to not show
     * @return {string}
     */
    modalShown = (showModal) => {
        return showModal ? 'showModal' : '';
    };

    /**
     * @function closeModal
     * @desc init code to close the modal
     * @author Anselm Marie
     * @memberOf ModalComponent
     */
    closeModal = () => {
        this.props.closeModal();
    };

    /**
     * @function render
     * @desc rendering elements of the component
     * @author Anselm Marie
     * @memberOf ModalComponent
     */
    render() {
        return (

            <div className={`modal ${this.modalShown(this.props.showModal)}`} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <form onSubmit={this.fieldValidation}>

                            <div className="modal-header">
                                <h5 className="modal-title">Add Widget</h5>
                                <button onClick={this.closeModal} type="button" className="close" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>

                            <div className="modal-body">

                                {this.state.formError && <div>{this.state.formError}</div>}

                                <input type="text" name="city" placeholder="city..." />
                                <input type="text" name="country" placeholder="country..." />

                            </div>

                            <div className="modal-footer">
                                <button className="btn btn-primary">Create</button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>

        );
    }

}

// if (!city && !country) {
//     this.onError('Please enter the city and country.');
//     return;
// }
//
// const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&APPID=${API_KEY}`);
// const data = await api_call.json();
//
// if (!data || (data && data.cod !== 200)) {
//     this.onError(data ? data.message : 'Internal Error Message');
// }