# Meet App

## Table of Contents

1. [Intro](#intro)
2. [Design Criteria](#design-criteria)
   - [Feature 1: Filter Events By City](#feature-1-filter-events-by-city)
   - [Feature 2: Show/Hide Event Details](#feature-2-showhide-event-details)
   - [Feature 3: Specify Number of Events](#feature-3-specify-number-of-events)
   - [Feature 4: Use the App When Offline](#feature-4-use-the-app-when-offline)
   - [Feature 5: Add an App Shortcut to the Home Screen](#feature-5-add-an-app-shortcut-to-the-home-screen)
   - [Feature 6: Display Charts Visualizing Event Details](#feature-6-display-charts-visualizing-event-details)
3. [Serverless Functionality](#serverless-functionality)
4. [Installation Instructions](#installation-instructions)
   - [Prerequisites](#prerequisites)
   - [Installation Steps](#installation-steps)

## Intro

The meet app is a serverless, progressive web app (PWA) built with React using test-driven development. The app allows user to view events and their details by specific cities. The application will use the Google Calendar API to fetch upcoming events.

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

The Meet app will use serverless functions to handle user authorization and provide the access tokens to the user. Use of serverless prevents us from having to maintain an entire server just to provide access tokens. In addition fewer resources will be needed (and lower costs) in the event that we need to scale for a larger number of users.

## Installation Instructions

### Prerequisites

- Node.js (version 12 or higher)
- npm (version 6 or higher)

### Installation Steps

1. **Clone the Repository**

   ```bash
   git clone https://github.com/dangermouse121985/Meet
   cd meet-app
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Create an Oauth Consumer**
   - Navigate to https://console.developers.google.com/ and create an account if you do not already have one
   - Create a project
   - Enable Google Calendar API in the project you just created
   - Set up your credentials
     - Select Google Calendar API and User data when prompted for "Which API are you using"
     - In the OAuth Consent screen, enter the following:
       - App Name: Meet
       - User Support email: Your Gmail Address
       - App logo (not necessary but you may be required to verify the app if you choose to add one)
       - Developer contact information (your gmail address)
     - In the scopes screen, enable ".../auth/calendar.events.public.readonly"
     - On the OAuth Client ID screen, enter the following
       - Application type: Web application
       - Name: Meet App
       - Authorized JavaScript origins: https://YOURGITHUBNAME.github.io (Your hosted app’s domain - rplace "YOURGITHUBNAME" with your GitHub account name)
       - Authorized redirect URLs: https://YOURGITHUBNAME.github.io/meet/ (Your app’s URI - replace "YOURGITHUBNAME" with your GitHub account name)
     - Download your credentials. They will be used in step 5
   - Add test users
     - Enter at lease one gmail address

4. **Setup AWS Lambda**
   - In the terminal and within the root directory of the Meet App
     Create a new serverless service/project using aws-nodejs
     ```
     npm install -g serverless # -g flag stands for globally
     ```
     Jump into the newly created directory
     ```
     cd auth-server
     ```
     Then create a package.json
     ```
     npm init
     ```
   - Navigate to https://aws.amazon.com/console/ and create an account if you have not already done so
   - Click on your username and select Security credentials from the dropdown
   - Select Access Keys then click Create New Access Key
   - Download the file and save it in a secury location (You woun't be able to do this again later)
   - in the terminal, configure your new AWS credentials for Serverless.
     ```
     serverless config credentials --provider aws --key ACCESS_KEY_ID --secret SECRET_ACCESS_KEY
     ```
   
   5. **Create `config.json` File**
      Create a `config.json` file in the auth-server directory of the project and add the following (ensure you ):
   
      ```config.json
      {
           "CLIENT_ID": "your_google_calendar_client-id",
           "CLIENT_SECRET": "your_google_calendar_client_secret",
           "CALENDAR_ID": "fullstackwebdev@careerfoundry.com"
      }
   
      ```

6. **Run the App Locally**

   ```bash
   npm start
   ```

7. **Run Tests**
   To run all tests:

   ```bash
   npm test
   ```

8. **Build for Production**

   ```bash
   npm run build
   ```

9. **Deploy to GitHub Pages**
   If you would like to deploy this app to Github ensure your `homepage` field in `package.json` is set to `https://your-username.github.io/meet-app`.

   ```bash
   npm run deploy
   ```

   This will deploy the app to GitHub Pages. Your app should now be accessible at `https://your-username.github.io/meet-app`.

**This file was created using the help of ChatGPT**
