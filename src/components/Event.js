// src/compontent/Events.js

import { useState } from "react";

const Event = ({ event }) => {
    const [showDetails, setShowDetails] = useState(false);

    const toggleDetails = () => {
        setShowDetails(!showDetails)
    }

    return (
        <li className="event">
            <h2 className="event-summary">{event.summary}</h2>
            <h3 className="event-location">{event.location}</h3>
            <h3 className="event-time">{event.start.dateTime}</h3>
            {showDetails ? (
                <>
                    <p className="event-details" role='event-details'>{event.description}</p>
                    <button className="hide-details" onClick={toggleDetails} role="hide-details">Hide Details</button>
                </>
            ) :
                <button className="show-details" onClick={toggleDetails} role="show-details">Show Details</button>}


        </li>
    );
}

export default Event;