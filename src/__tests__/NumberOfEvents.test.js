import { render } from "@testing-library/react";
import NumberOfEvents from "../components/NumberOfEvents";
import userEvent from "@testing-library/user-event";

describe('<NumberOfEvents /> component', () => {
    let numberOfEventsComponent;

    beforeEach(() => {
        numberOfEventsComponent = render(<NumberOfEvents setCurrentNOE={() => { }} />);
    })

    test('has an element with "textbox" role', () => {
        expect(numberOfEventsComponent.queryByRole('textbox')).toBeInTheDocument();
    })

    test('textbox has default value of 32', () => {
        expect(numberOfEventsComponent.queryByRole('textbox')).toHaveValue('32')
    })

    test('textbox value changes to 10 according to user input', async () => {
        const user = userEvent.setup();
        const numEventsTextbox = numberOfEventsComponent.queryByRole('textbox');
        await user.type(numEventsTextbox, '{backspace}{backspace}10');
        expect(numberOfEventsComponent.queryByRole('textbox')).toHaveValue('10');
    })
})