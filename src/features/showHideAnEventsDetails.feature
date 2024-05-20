Feature: Show/Hide An Events Details
    Scenario: An event element is collapsed by default
        Given the user opens the events app
        When they view the details of an event
        Then the event details should be collapsed

    Scenario: User can expand an event to see details
        Given the user has opened the events app
        When they choose to expand the details of an event
        Then the event details should be visible

    Scenario: User can collapse an event to hide details
        Given the user has opened the events app
        And the details of an event are visible
        When they choose to collapse the details of the event
        Then the event details should be hidden
