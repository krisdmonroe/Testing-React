import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import StarWarsCharacters from './StarWarsCharacters';
import { getData as mockGetData } from '../api';

jest.mock('../api');
   

const initialData = {
    previous: 'text',
    next: 'text',
    results: 
    [{
        name:'Bob', url:'www.bob.com'}, 
        {name:'2', url:'2'},
        {name:'3', url:'3'} 
    ] 
}

const nextData = {
    previous: 'text',
    next: 'text',
    results: 
    [{
        name:'NEXT_NAME', url:'www.cob.com'}, 
        {name:'4', url:'4'},
        {name:'5', url:'5'} 
    ] 
}

const prevData = {
    previous: 'text',
    next: 'text',
    results: 
    [{
        name:'PREVIOUS_NAME', url:'www.sob.com'}, 
        {name:'6', url:'6'},
        {name:'7', url:'7'} 
    ] 
}

test('api works', async () => {
    mockGetData.mockResolvedValue(initialData)
    const { getByText } = render(<StarWarsCharacters />)
    await wait(() => getByText(/Bob/i));
    getByText('Bob')

    expect(mockGetData).toHaveBeenCalledWith('https://swapi.co/api/people');
   
})

test("Next Renders New Data", async () => {
    mockGetData.mockResolvedValue(initialData);
    
    const { getByText } = render(<StarWarsCharacters />);
    const nextButton = getByText(/Next/i);
    mockGetData.mockResolvedValue(nextData);
    await wait(() => fireEvent.click(nextButton));
    await wait(() => expect(getByText('NEXT_NAME')));
  });

  test("Previous Renders New Data", async () => {
    mockGetData.mockResolvedValue(initialData);
    
    const { getByText } = render(<StarWarsCharacters />);
    const previousButton = getByText(/Previous/i);
    mockGetData.mockResolvedValue(prevData);
    await wait(() => fireEvent.click(previousButton));
    await wait(() => expect(getByText('PREVIOUS_NAME')));
  });