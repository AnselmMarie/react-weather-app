/* Modules */
import {getData, getPromiseData} from './helper.module';
import {fetchData} from '../http.calls/http.module';

jest.mock('./http.module', (area, index) => ({
    fetchData: jest.fn( (area, index) => ({
        key: index,
        city: area.city,
        country: area.country,
        temperature: '60',
        humidity: '99%',
        weatherMain: 'snow',
        icon: 'icon',
        description: 'This is a description',
    }))
}));

beforeEach(() => {
    jest.clearAllMocks();
});

describe('helper module test', () => {

    test('test a single weather call', async () => {

        await getData({city: 'atlanta', country: 'US'});
        expect(fetchData).toHaveBeenCalledTimes(1);

    });

    test('test multiple weather calls', async () => {

        await getPromiseData([
            {city: 'atlanta', country: 'US'},
            {city: 'atlanta', country: 'US'},
            {city: 'atlanta', country: 'US'}
        ]);
        expect(fetchData).toHaveBeenCalledTimes(3);

    });

});
