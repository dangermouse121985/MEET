import { loadFeature, defineFeature } from "jest-cucumber";
import { render } from "@testing-library/react";
import App from "../App";
import { within, waitFor } from "@testing-library/react";
import { getEvents } from "../api";
import userEvent from "@testing-library/user-event";

const feature = loadFeature('./src/features/filterEventsByCity.feature')

defineFeature(feature, test => {
    test('When user hasn’t searched for a city, show upcoming events from all cities', ({ given, when, then }) => {
        let AppComponent;
        given('the user has opened the events app', () => {
            AppComponent = render(<App />);
        });


        when('they haven\'t entered or searched for a specific city', () => {

        });

        then('the app should display upcoming events from all cities', async () => {
            const AppDOM = AppComponent.container.firstChild;
            const EventListDOM = AppDOM.querySelector('#event-list');

            await waitFor(() => {
                const EventListItems = within(EventListDOM).queryAllByRole('listitem');
                expect(EventListItems.length).toBe(32);
            })
        });
    });

    test('User should see a list of suggestions when they search for a city.', ({ given, when, then }) => {
        let AppComponent;
        given('the main page is open', () => {
            AppComponent = render(<App />);
        });

        let CitySerchDOM;
        when('user starts typing in the city textbox', async () => {
            const user = userEvent.setup();
            const AppDOM = AppComponent.container.firstChild;
            CitySerchDOM = AppDOM.querySelector('#city-search');
            const citySearchInput = within(CitySerchDOM).queryByRole('textbox');
            await user.type(citySearchInput, "Berlin")
        });

        then('the user should recieve a list of cities (suggestions) that match what they’ve typed', () => {
            const suggestionListItems = within(CitySerchDOM).queryAllByRole('listitem');
            expect(suggestionListItems).toHaveLength(2);
        });
    });

    let AppComponent;
    let AppDOM;
    let CitySerchDOM;
    let citySearchInput;
    test('User can select a city from the suggested list.', ({ given, and, when, then }) => {
        given('user was typing “Berlin” in the city textbox', async () => {
            AppComponent = render(<App />);
            const user = userEvent.setup();
            AppDOM = AppComponent.container.firstChild;
            CitySerchDOM = AppDOM.querySelector('#city-search');
            citySearchInput = within(CitySerchDOM).queryByRole('textbox');
            await user.type(citySearchInput, "Berlin");
        });

        let suggestionListItems;
        and('the list of suggested cities is showing', () => {
            suggestionListItems = within(CitySerchDOM).queryAllByRole('listitem');
            expect(suggestionListItems).toHaveLength(2);
        });

        when('the user selects a city (e.g., “Berlin, Germany”) from the list', async () => {
            const user = userEvent.setup();
            await user.click(suggestionListItems[0]);
        });

        then('their city should be changed to that city (i.e., “Berlin, Germany”)', () => {
            expect(citySearchInput.value).toBe('Berlin, Germany');
        });

        and('the user should receive a list of upcoming events in that city', async () => {
            const EventListDOM = AppDOM.querySelector('#event-list');
            const EventListItems = within(EventListDOM).queryAllByRole('listitem');
            const allEvents = await getEvents();

            //filtering the list of all events down to events located in Germany
            // citySearchInput.value should haev teh value "Berlin Germany" at this point
            const berlinEvents = allEvents.filter(event => event.location === citySearchInput.value)
            expect(EventListItems).toHaveLength(berlinEvents.length);
        });
    });
});