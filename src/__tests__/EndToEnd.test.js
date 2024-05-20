import { waitFor } from "@testing-library/react";
import puppeteer from "puppeteer"
import { getEvents } from "../api";

describe('show/hide an event details', () => {
    let browser;
    let page;
    beforeAll(async () => {
        browser = await puppeteer.launch(/* {
            headless: false,
            slowMo: 250,
            timeout: 0
        } */);

        page = await browser.newPage();
        await page.goto('http://localhost:3000');
        await page.waitForSelector('.event');
    })

    afterAll(() => {
        browser.close();
    })

    test('An event element is collapsed by default', async () => {
        const eventDetails = await page.$('.event .event-details');
        expect(eventDetails).toBeNull();
    });

    test('user can expand an event to see its details', async () => {
        await page.click('.event .show-details');

        const eventDetails = await page.$('.event .event-details');
        expect(eventDetails).toBeDefined();
    });

    test('User can collapse an event to hide details', async () => {
        await page.click('.event .hide-details');
        const eventDetails = await page.$('.event .event-details');
        expect(eventDetails).toBeNull();
    })
});

describe('Filter Events by City', () => {
    let browser;
    let page;
    beforeAll(async () => {
        browser = await puppeteer.launch({
            headless: false,
            slowMo: 250,
            timeout: 0
        });

        page = await browser.newPage();
        await page.goto('http://localhost:3000');
        await page.waitForSelector('.event');
    })

    test('When user hasn’t searched for a city, show upcoming events from all cities', async () => {
        const eventsCount = await page.$$eval('.event', events => events.length);
        expect(eventsCount).toBe(32);
    });

    test('User should see a list of suggestions when they search for a city.', async () => {
        await page.type('.city', 'Berlin');
        const filterCount = await page.$$eval('.suggestions > li', filters => filters.length);
        expect(filterCount).toBe(2);
    });

    test('User can select a city from the suggested list.', async () => {
        await page.click('.suggestions > li');
        const allEvents = await getEvents();
        const berlinEvents = allEvents.filter(event => event.location === 'Berlin, Germany');
        const eventsCount = await page.$$eval('.event', events => events.length);
        expect(eventsCount).toBe(berlinEvents.length);
    });
})