const fetchData = jest.fn( (area, index) => ({
    key: index,
    city: area.city,
    country: area.country,
    temperature: '60',
    humidity: '99%',
    weatherMain: 'snow',
    icon: 'icon',
    description: 'This is a description',
}));

describe('http module test', () => {

    test('test fetch data', () => {

        const ii =  fetchData({city: 'atlanta', country: 'US'}, 1);
        expect(ii).toMatchObject({
            key: 1,
            city: 'atlanta',
            country: 'US',
            temperature: '60',
            humidity: '99%',
            weatherMain: 'snow',
            icon: 'icon',
            description: 'This is a description',
        });

    });

});
