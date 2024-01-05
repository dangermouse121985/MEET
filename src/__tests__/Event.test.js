import { render } from "@testing-library/react";
import Event from "../components/Event";
import userEvent from "@testing-library/user-event";
import { getEvents } from "../api";

describe('<Event /> Components', () => {

    let EventComponent;
    let allEvents;

    beforeEach(async () => {
        allEvents = await getEvents();
        EventComponent = render(<Event event={allEvents[0]} />);
    })

    test('Renders an Event with Summary', () => {
        expect(EventComponent.getByText(allEvents[0].summary));
    })

    test('Renders an Event with Location', () => {
        expect(EventComponent.getByText(allEvents[0].location))
    })

    test(`Renders an Event with Event's Start Time`, () => {
        expect(EventComponent.getByText(allEvents[0].start.dateTime))
    })

    test('Renders an Event with a "Show Details" Button', () => {
        let showDetailsButton = EventComponent.queryByRole('show-details');
        expect(showDetailsButton).toBeInTheDocument();
        expect(showDetailsButton).toHaveClass('show-details');
    })

    test('Event Details should be hidden by default', () => {
        const details = EventComponent.queryByRole('event-details');
        const hideDetailsButton = EventComponent.queryByRole('hide-details');
        expect(details).not.toBeInTheDocument();
        expect(hideDetailsButton).not.toBeInTheDocument();
    })

    test('Shows the details section when the user clicks on the "show Details" button', async () => {
        const user = userEvent.setup();
        const showDetailsButton = EventComponent.queryByRole('show-details');
        await user.click(showDetailsButton);
        const eventDetails = EventComponent.queryByRole('event-details');
        const hideDetailsButton = EventComponent.queryByRole('hide-details');
        expect(showDetailsButton).not.toBeInTheDocument();
        expect(eventDetails).toBeInTheDocument();
        expect(hideDetailsButton).toBeInTheDocument();
    })

    test('hides the details section when the user clicks on the "hide details" button', async () => {
        const user = userEvent.setup();
        const showDetailsButton = EventComponent.queryByRole('show-details');
        await user.click(showDetailsButton);
        const eventDetails = EventComponent.queryByRole('hide-details');
        const hideDetailsButton = EventComponent.queryByRole('hide-details');
        await user.click(hideDetailsButton);
        expect(eventDetails).not.toBeInTheDocument();
    })
})