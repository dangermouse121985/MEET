import { defineFeature, loadFeature } from "jest-cucumber";
import { getEvents } from "../api";
import Event from "../components/Event";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, test => {
    test('An event element is collapsed by default', ({ given, when, then }) => {
        let EventComponent;
        let allEvents;
        given('the user opens the events app', async () => {
            allEvents = await getEvents();
            EventComponent = render(<Event event={allEvents[0]} />);
        });

        when('they view the details of an event', () => {

        });

        then('the event details should be collapsed', () => {
            const details = EventComponent.queryByRole('event-details');
            const hideDetailsButton = EventComponent.queryByRole('hide-details');
            expect(hideDetailsButton).not.toBeInTheDocument();
            expect(details).not.toBeInTheDocument();
        });
    });

    test('User can expand an event to see details', ({ given, when, then }) => {
        let EventComponent;
        let allEvents;
        given('the user has opened the events app', async () => {
            allEvents = await getEvents();
            EventComponent = render(<Event event={allEvents[0]} />)
        });

        when('they choose to expand the details of an event', async () => {
            const user = userEvent.setup();
            const showDetailsButton = EventComponent.queryByRole('show-details');
            await user.click(showDetailsButton);
        });

        then('the event details should be visible', () => {
            const eventDetails = EventComponent.queryByRole('event-details')
            const hideDetailsButton = EventComponent.queryByRole('hide-details');
            const showDetailsButton = EventComponent.queryByRole('show-details');
            expect(eventDetails).toBeInTheDocument();
            expect(hideDetailsButton).toBeInTheDocument();
            expect(showDetailsButton).not.toBeInTheDocument();
        });
    });

    test('User can collapse an event to hide details', ({ given, and, when, then }) => {
        let EventComponent;
        let allEvents;
        given('the user has opened the events app', async () => {
            allEvents = await getEvents();
            EventComponent = render(<Event event={allEvents[0]} />);
        });

        and('the details of an event are visible', async () => {
            const user = userEvent.setup();
            const showDetailsButton = EventComponent.queryByRole('show-details')
            await user.click(showDetailsButton);
        });

        when('they choose to collapse the details of the event', async () => {
            const user = userEvent.setup();
            const hideDetailsButton = EventComponent.queryByRole('hide-details');
            await user.click(hideDetailsButton);
        });

        then('the event details should be hidden', () => {
            const EventDetails = EventComponent.queryByRole('event-details');
            expect(EventDetails).not.toBeInTheDocument();
        });
    });
})