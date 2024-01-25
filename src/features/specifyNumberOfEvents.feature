Feature: Specify Number of Events

    Scenario: When user hasn’t specified a number, 32 events are shown by default
        Given the user has opened the events app
        When they view the list of events
        Then 32 events should be displayed by default

    Scenario: User can change the number of events displayed
        Given the user has opened the events app
        When they choose to customize the number of events displayed
        And they specify a new number, such as 20
        Then the list of events should display a maximum of 20 events