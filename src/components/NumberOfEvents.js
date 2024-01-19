const NumberOfEvents = ({ setCurrentNOE }) => {

    const handleInputChanged = (event) => {
        const value = event.target.value;
        setCurrentNOE(value);
    }

    return (
        <input id="number-of-events" type="textbox" inputMode="numeric" defaultValue='32' onChange={handleInputChanged}></input>
    )
}

export default NumberOfEvents;