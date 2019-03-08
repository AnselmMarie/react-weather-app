/* App States */
export default () => {
    return {
        inputs: {
            city: '',
            country: '',
        },
        errors: {
            cityError: null,
            countryError: null,
            serverError: null,
        },
        otherStates: {
            weatherData: [],
            showModal: false,
        }
    }
};
