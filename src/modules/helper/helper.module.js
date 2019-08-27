/* Modules */
import {fetchData} from '../http.calls/http.module';
/*  Modules */
const uuidv1 = require('uuid/v1');

/**
 * @function getPromiseData
 * @desc setting up a promise to call all the rest calls
 * @author Anselm Marie
 * @param {object} areaData - areaData
 */
export const getPromiseData = (areaData) => {

    const dataLength = areaData.length;
    let allPromises = [];

    for (let loop = 0; loop < dataLength; loop++) {
        allPromises.push( fetchData(areaData[loop], areaData[loop].key) )
    }

    return Promise.all(allPromises);

};

/**
 * @function getData
 * @desc setting up a promise to call all the rest calls
 * @author Anselm Marie
 * @param {object} area - data of area
 */
export const getData = async (area) => {
    return await fetchData(area, uuidv1());
};
