/**
 * @function getLocalStorage
 * @desc get the local storage
 * @author Anselm Marie
 * @return {array|null}
 */
export function getLocalStorage() {
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
}

/**
 * @function setLocalStorage
 * @desc updating the local storage from the param given
 * @author Anselm Marie
 * @param {array} areaData - updated area data
 */
export const setLocalStorage = (areaData) => {
    if (areaData) {
        localStorage.setItem('areaData', JSON.stringify(areaData));
    }
};
