# Meet App

## Intro

The meet app is a serverless, progressive web app (PWA) built with React using test-driven development. It will allow user to view Events and their details by specific cities. The application will use the Google Calendar API to fetch upcoming events.

## Table of Contents

1. [Design Criteria](#design-criteria)
   1. [Feature 1: Filter Events By City](#feature-1-filter-events-by-city)
      1. [User Story](#user-story-1)
      2. [Scenario 1: When user hasn’t searched for a city, show upcoming events from all cities](#scenario-1-when-user-hasn’t-searched-for-a-city-show-upcoming-events-from-all-cities)
      3. [Scenario 2: User should see a list of suggestions when they search for a city](#scenario-2-user-should-see-a-list-of-suggestions-when-they-search-for-a-city)
      4. [Scenario 3: User can select a city from the suggested list](#scenario-3-user-can-select-a-city-from-the-suggested-list)
   2. [Feature 2: Show/Hide Event Details](#feature-2-showhide-event-details)
      1. [User Story](#user-story-2)
      2. [Scenario 1: An event element is collapsed by default](#scenario-1-an-event-element-is-collapsed-by-default)
      3. [Scenario 2: User can expand an event to see details](#scenario-2-user-can-expand-an-event-to-see-details)
      4. [Scenario 3: User can collapse an event to hide details](#scenario-3-user-can-collapse-an-event-to-hide-details)
   3. [Feature 3: Specify Number of Events](#feature-3-specify-number-of-events)
      1. [User Story](#user-story-3)
      2. [Scenario 1: When user hasn’t specified a number, 32 events are shown by default](#scenario-1-when-user-hasn’t-specified-a-number-32-events-are-shown-by-default)
      3. [Scenario 2: User can change the number of events displayed](#scenario-2-user-can-change-the-number-of-events-displayed)
   4. [Feature 4: Use the App When Offline](#feature-4-use-the-app-when-offline)
      1. [User Story](#user-story-4)
      2. [Scenario 1: Show cached data when there’s no internet connection](#scenario-1-show-cached-data-when-there’s-no-internet-connection)
      3. [Scenario 2: Show error when user changes search settings (city, number of events)](#scenario-2-show-error-when-user-changes-search-settings-city-number-of-events)
   5. [Feature 5: Add an App Shortcut to the Home Screen](#feature-5-add-an-app-shortcut-to-the-home-screen)
      1. [User Story](#user-story-5)
      2. [Scenario 1: User can install the meet app as a shortcut on their device home screen](#scenario-1-user-can-install-the-meet-app-as-a-shortcut-on-their-device-home-screen)
   6. [Feature 6: Display Charts Visualizing Event Details](#feature-6-display-charts-visualizing-event-details)
      1. [User Story](#user-story-6)
      2. [Scenario 1: Show a chart with the number of upcoming events in each city](#scenario-1-show-a-chart-with-the-number-of-upcoming-events-in-each-city)
2. [Serverless Functionality](#serverless-functionality)

---

## Design Criteria

### Feature 1: Filter Events By City

#### User Story

    As an event attendee,
    I should be able to filter events by city,
    So that I can easily find and view upcoming events in a specific location.

#### Scenario 1: When user hasn’t searched for a city, show upcoming events from all cities

    Given the user has opened the events app
    When they haven't entered or searched for a specific city
    Then the app should display upcoming events from all cities

#### Scenario 2: User should see a list of suggestions when they search for a city.

    Given the main page is open
    When user starts typing in the city textbox
    Then the user should recieve a list of cities (suggestions) that match what they’ve typed

#### Scenario 3: User can select a city from the suggested list.

    Given user was typing “Berlin” in the city textbox
    And the list of suggested cities is showing
    When the user selects a city (e.g., “Berlin, Germany”) from the list
    Then their city should be changed to that city (i.e., “Berlin, Germany”)
    And the user should receive a list of upcoming events in that city

### Feature 2: Show/Hide Event Details

#### User Story

    As an event attendee,
    I should be able to toggle the visibility of event details,
    So that I can easily control the level of information displayed and focus on relevant details.

#### Scenario 1: An event element is collapsed by default

    Given the user opens the events app
    When they view the details of an event
    Then the event details should be collapsed

#### Scenario 2: User can expand an event to see details

    Given the user has opened the events app
    When they choose to expand the details of an event
    Then the event details should be visible

#### Scenario 3: User can collapse an event to hide details

    Given the user has opened the events app
    And the details of an event are visible
    When they choose to collapse the details of the event
    Then the event details should be hidden

### Feature 3: Specify Number of Events

#### User Story

    As an event attendee,
    I should be able to customize the number of events displayed,
    So that I can control the amount of information shown, tailoring it to my preferences.

#### Scenario 1: When user hasn’t specified a number, 32 events are shown by default

    Given the user has opened the events app
    When they view the list of events
    Then 32 events should be displayed by default

#### Scenario 2: User can change the number of events displayed

    Given the user has opened the events app
    When they choose to customize the number of events displayed
    And they specify a new number, such as 20
    Then the list of events should display a maximum of 20 events

### Feature 4: Use the App When Offline

#### User Story

    As an event attendee,
    I should be able to access the app and view cached data when offline,
    So that I can still browse and check event information even without an internet connection.

#### Scenario 1: Show cached data when there’s no internet connection

    Given the user has previously accessed the events app with an internet connection
    And the app has cached data
    When the user tries to access the app without an internet connection
    Then the app should display the cached data

#### Scenario 2: Show error when user changes search settings (city, number of events)

    Given the user has opened the events app
    And the app is currently offline
    When the user attempts to change search settings, such as the city or number of events
    Then the app should display an error indicating the need for an internet connection

### Feature 5: Add an App Shortcut to the Home Screen

#### User Story

    As a user of the app,
    I should be able to add a shortcut to the home screen,
    So that I can quickly access the web app without navigating through the browser.

#### Scenario 1: User can install the meet app as a shortcut on their device home screen

    Given the user has opened the meet app in a web browser
    When they access the browser's menu or settings
    And they choose to add the app to the home screen
    Then a shortcut for the meet app should be added to the device home screen

### Feature 6: Display Charts Visualizing Event Details

#### User Story

    As an event organizer or attendee,
    I should be able to view charts visualizing event details,
    So that I can gain insights into the distribution of upcoming events across different cities.

#### Scenario 1: Show a chart with the number of upcoming events in each city

    Given the user has opened the events app
    When they navigate to the charts section
    Then a chart displaying the number of upcoming events in each city should be shown

## Serverless Functionality

The Meet app uses serverless functions to handle user authorization and provides the access tokens to the user. Use of serverless prevents us from having to maintain an entire server just to provide access tokens. In addition fewer resources will be needed (and lower costs) in the event that we need to scale for a larger number of users.
