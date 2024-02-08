const NumberOfEvents = ({ setCurrentNOE, setErrorAlert }) => {

    const handleInputChanged = (event) => {
        const value = event.target.value;


        let errorText;
        if (value <= 0) {
            errorText = "The listed number of events must be greater than 0.";
        } else if (isNaN(value)) {
            errorText = "The value you entered is not a number. Acceptable input includes any number greater than 0."
        } else {
            errorText = "";
            setCurrentNOE(value);
        }
        setErrorAlert(errorText);
    }

    return (
        <>
            <label for='number-of-events'>Number of Events</label><br></br>
            <input id="number-of-events" type="textbox" inputMode="numeric" defaultValue='32' onChange={handleInputChanged}></input>
        </>
    )
}

export default NumberOfEvents;