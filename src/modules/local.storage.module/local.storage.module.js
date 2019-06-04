/**
 * @module localStorageModule
 * @desc store / update the local storage
 * @author Anselm Marie
 */
export let localStorageModule = {

    /**
     * @function getLocalStorage
     * @desc get the local storage
     * @author Anselm Marie
     * @memberOf localStorageModule
     * @return {array|null}
     */
    getLocalStorage() {
        const local = localStorage.getItem('areaData');
        if (local) {
            const data = JSON.parse(local);
            this.setState({
                areaData: data
            });

            return data;

        } else {
            return null;

        }
    },

    /**
     * @function setLocalStorage
     * @desc updating the local storage from the param given
     * @author Anselm Marie
     * @memberOf localStorageModule
     * @param {array} areaData - updated area data
     */
    setLocalStorage(areaData) {
        if (areaData) {
            localStorage.setItem('areaData', JSON.stringify(areaData));
        }
    },

};
