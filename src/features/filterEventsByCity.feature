Feature: Filter Events By City
    Scenario: When user hasn’t searched for a city, show upcoming events from all cities
        Given the user has opened the events app
        When they haven't entered or searched for a specific city
        Then the app should display upcoming events from all cities

     Scenario: User should see a list of suggestions when they search for a city.
        Given the main page is open
        When user starts typing in the city textbox
        Then the user should recieve a list of cities (suggestions) that match what they’ve typed
 
 Scenario: User can select a city from the suggested list.
        Given user was typing “Berlin” in the city textbox
        And the list of suggested cities is showing
        When the user selects a city (e.g., “Berlin, Germany”) from the list
        Then their city should be changed to that city (i.e., “Berlin, Germany”)
        And the user should receive a list of upcoming events in that city