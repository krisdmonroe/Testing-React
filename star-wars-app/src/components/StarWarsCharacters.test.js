import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import StarWarsCharacters from './StarWarsCharacters';
import { getData as mockGetData } from '../api';


jest.mock('../api');
   

const fakeData = {
    previous: null,
    next: 'text',
    results: [
        {name:'Bob', url:'www.Bob.com'}, 
        {name:'2', url:'2'},
        {name:'3', url:'3'} ] }

test('Next and previous button test ', async () => {
    const { getByText } = render(<StarWarsCharacters />);

    getByText(/Previous/i);
    getByText(/Next/i);

    // fireEvent.click(previousButton);
    // fireEvent.event(nextButton);

});

test('api works', async () => {
    mockGetData.mockResolvedValue(fakeData)
    const { getByText } = render(<StarWarsCharacters />)

    await wait(() => getByText(/Bob/i));

    // getByText('Bob')

    expect(mockGetData).toHaveBeenCalledWith('https://swapi.co/api/people');
   
})