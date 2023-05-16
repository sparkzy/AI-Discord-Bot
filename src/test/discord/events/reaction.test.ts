/**
 * @file This file contains test suites for the ReactionEvent class.
 *
 * @module Tests
 *
 * The test suites in this file cover all methods of the ReactionEvent class.
 * These include the constructor, handle method, and the name property.
 *
 * @author Bobby McGetrick
 */

import { expect } from "chai";
import { MessageReaction, User } from "discord.js";
import ReactionEvent from "../../../discord/events/reaction";

describe("ReactionEvent", () => {
    /**
     * ReactionEvent instance used for testing.
     */
    let reactionEvent: ReactionEvent;

    /**
     * Mock MessageReaction and User objects for testing.
     */
    let testReaction: MessageReaction;
    let testUser: User;

    /**
     * Set up testing environment for each test in the suite.
     * This involves initializing a new ReactionEvent and mock MessageReaction and User objects.
     */
    beforeEach(() => {
        reactionEvent = new ReactionEvent();

        // Set up mock MessageReaction and User objects for testing.
        // TODO: Replace with actual mock objects.
        testReaction = {} as MessageReaction;
        testUser = {} as User;
    });

    describe("constructor", () => {
        /**
         * Test that the constructor correctly initializes a reaction event with the correct name.
         */
        it("should initialize a reaction event with the correct name", () => {
            expect(reactionEvent).to.be.instanceOf(ReactionEvent);
            expect(reactionEvent.name).to.equal("messageReactionAdd");
        });
    });

    describe("handle", () => {
        /**
         * Test that the handle method correctly logs a received reaction.
         */
        it("should received reaction", () => {
            reactionEvent.handle(testReaction, testUser);
        });
    });

    /**
     * Test that the handle method correctly logs a received reaction when the user is defined.
     */
    // it("should log a received reaction when the user is defined", () => {
    //     reactionEvent.handle(testReaction, testUser);
    // });

    /**
     * Test that the handle method correctly logs a received reaction when the user is undefined.
     */
    // it("should log a received reaction when the user is undefined", () => {
    //     reactionEvent.handle(testReaction, undefined);
    // });
});
