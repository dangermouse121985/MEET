// src/__tests__App.test.js

import { render } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';
import { getEvents } from '../api';
import { within, waitFor } from '@testing-library/react';

describe('<App /> component', () => {
    let AppDOM;
    beforeEach(() => {
        AppDOM = render(<App />).container.firstChild;
    })

    test('renders list of events', () => {
        expect(AppDOM.querySelector('#event-list')).toBeInTheDocument();
    });

    test('render CitySearch', () => {
        expect(AppDOM.querySelector('#city-search')).toBeInTheDocument();
    });

    test('render number of events', () => {
        expect(AppDOM.querySelector('#number-of-events')).toBeInTheDocument();
    })
});

describe('<App /> integration', () => {
    let AppDOM;
    beforeEach(() => {
        AppDOM = render(<App />).container.firstChild;
    })

    test('renders a list of events match the city selected by the user', async () => {
        const user = userEvent.setup();

        const CitySerchDOM = AppDOM.querySelector('#city-search');
        const CitySearchInput = within(CitySerchDOM).queryByRole('textbox');

        await user.type(CitySearchInput, "Berlin");
        const berlinGermnaySuggestionItem = within(CitySerchDOM).queryByText('Berlin, Germany');
        await user.click(berlinGermnaySuggestionItem);

        const EventListDom = AppDOM.querySelector('#event-list');
        const allRenderedEventItems = within(EventListDom).queryAllByRole('listitem');

        const allEvents = await getEvents();
        const berlinEvents = allEvents.filter(
            event => event.location === 'Berlin, Germany'
        );

        expect(allRenderedEventItems.length).toBe(berlinEvents.length);
        allRenderedEventItems.forEach(event => {
            expect(event.textContent).toContain("Berlin, Germany");
        })
    })


    test('Render corrent number of events based on user input', async () => {
        const user = userEvent.setup();
        const numEventsTextbox = AppDOM.querySelector('#number-of-events');
        await user.type(numEventsTextbox, '{backspace}{backspace}10');

        const EventListDom = AppDOM.querySelector('#event-list');

        await waitFor(() => {
            const allRenderedEventItems = within(EventListDom).queryAllByRole('listitem');
            expect(allRenderedEventItems.length).toBe(10);
        })
    })
})