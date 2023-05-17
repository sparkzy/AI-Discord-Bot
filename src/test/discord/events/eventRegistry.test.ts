import { expect } from "chai";
import sinon from "sinon";
import EventRegistry from "../../../discord/events/eventRegistry";
import IEvent from "../../../discord/events/IEvent";

/**
 * @file This file contains test suites for the EventRegistry class.
 *
 * @module Test
 *
 * This set of test suites covers all methods of the EventRegistry class,
 * including the constructor, registerEvent, and getEvent methods.
 *
 * @author Bobby McGetrick
 */
describe("EventRegistry", () => {
    /**
     * EventRegistry instance used for testing.
     */
    let eventRegistry: EventRegistry;

    /**
     * Mock event that implements IEvent interface for testing.
     */
    let testEvent: IEvent;

    /**
     * Sinon stub for the 'handle' function of the testEvent.
     */
    let handleStub: sinon.SinonStub;

    /**
     * Set up the testing environment before each test in the suite.
     * This includes initializing a new EventRegistry and a mock event,
     * and setting up a Sinon stub for the 'handle' function of the mock event.
     */
    beforeEach(() => {
        eventRegistry = new EventRegistry();

        handleStub = sinon.stub();

        testEvent = {
            name: "testEvent",
            handle: handleStub
        };
    });

    /**
     * Reset the Sinon stub after each test to ensure a clean environment for the next test.
     */
    afterEach(() => {
        handleStub.reset();
    });

    /**
     * Test suite for the constructor of the EventRegistry class.
     */
    describe("constructor", () => {
        /**
         * Test that the constructor correctly initializes an empty event registry.
         */
        it("should initialize an empty event registry", () => {
            expect(eventRegistry).to.be.instanceOf(EventRegistry);
            expect((eventRegistry as any).events.size).to.equal(0);
        });
    });

    /**
     * Test suite for the registerEvent method of the EventRegistry class.
     */
    describe("registerEvent", () => {
        /**
         * Test that the registerEvent method correctly registers an event.
         */
        it("should register an event", () => {
            eventRegistry.registerEvent(testEvent);
            expect((eventRegistry as any).events.get(testEvent.name)).to.equal(testEvent);
        });
    });

    /**
     * Test suite for the getEvent method of the EventRegistry class.
     */
    describe("getEvent", () => {
        /**
         * Test that the getEvent method correctly returns a registered event.
         */
        it("should return an event if it is registered", () => {
            eventRegistry.registerEvent(testEvent);
            expect(eventRegistry.getEvent(testEvent.name)).to.equal(testEvent);
        });

        /**
         * Test that the getEvent method correctly returns undefined for a non-registered event.
         */
        it("should return undefined if an event is not registered", () => {
            expect(eventRegistry.getEvent("nonExistentEvent")).to.be.undefined;
        });
    });
});
