import { defineFeature, loadFeature } from "jest-cucumber";
import EventList from "../components/EventList";
import App from "../App";
import { render, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NumberOfEvents from "../components/NumberOfEvents";

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature')

defineFeature(feature, test => {
    test('When user hasn’t specified a number, 32 events are shown by default', ({ given, when, then }) => {
        let AppComponent;
        given('the user has opened the events app', () => {
            AppComponent = render(<App />);
        });

        when('they view the list of events', () => {

        });

        then('32 events should be displayed by default', async () => {
            const AppDOM = AppComponent.container.firstChild;
            const EventListDOM = AppDOM.querySelector('#event-list');
            await waitFor(() => {
                const EventListItems = within(EventListDOM).queryAllByRole('listitem');
                expect(EventListItems.length).toBe(32);
            })
        });
    });

    test('User can change the number of events displayed', ({ given, when, and, then }) => {
        let AppComponent;
        let numberOfEventsComponent;
        given('the user has opened the events app', () => {
            AppComponent = render(<App />)
            numberOfEventsComponent = render(<NumberOfEvents setCurrentNOE={() => { }} />)
        });

        when('they choose to customize the number of events displayed', () => {

        });

        and('they specify a new number, such as 20', async () => {
            const user = userEvent.setup();
            const AppDOM = AppComponent.container.firstChild;
            const numEventsTexbox = AppDOM.querySelector('#number-of-events');
            await user.type(numEventsTexbox, '{backspace}{backspace}20');
        });

        then('the list of events should display a maximum of 20 events', async () => {
            const AppDOM = AppComponent.container.firstChild;
            const EventListDOM = AppDOM.querySelector('#event-list');
            await waitFor(() => {
                const EventListItems = within(EventListDOM).queryAllByRole('listitem');
                expect(EventListItems.length).toBe(20);
            })
        });
    });
})