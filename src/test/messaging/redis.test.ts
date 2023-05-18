/* eslint-disable @typescript-eslint/no-explicit-any */

// Third party imports
import { expect } from "chai";
import sinon from "sinon";
import { createClient, RedisClientType } from "redis";

// Local imports
import RedisMessageQueue from "../../messaging/redis";

// Test utilities
import { createCustomLogger } from "../utils/testHelper";
import { Logger } from "winston";

/**
 * @file This contains file fields and/or functions for the RedisMessageQueue Unit tests.
 *
 * @module Test
 *
 * Unit tests for the RedisMessageQueue class.
 * These tests use the Mocha test framework and the Chai assertion library. They also use Sinon.JS for test doubles (stubs).
 * Each test checks that a particular method of the RedisMessageQueue class calls the expected methods of the RedisClient class with the correct arguments.
 *
 * @author Bobby McGetrick
 */
describe.only("RedisMessageQueue", () => {
    let redisMessageQueue: RedisMessageQueue;
    let logger: Logger;
    let clientStub: sinon.SinonStubbedInstance<RedisClientType>;
    let loggerErrorStub: sinon.SinonStub;

    /**
     * Before each test, create a new RedisMessageQueue and stubs for the dependencies.
     */
    beforeEach(() => {
        const url = "redis://localhost:6379";
        process.env.REDIS_HOST = "localhost";
        process.env.REDIS_PORT = "6379";
        clientStub = sinon.createStubInstance(createClient().constructor as { new(): RedisClientType; });
        redisMessageQueue = RedisMessageQueue.getInstance();
        logger = createCustomLogger();

        clientStub.connect.returns(Promise.resolve());
        loggerErrorStub = sinon.stub(logger, "error");
    });

    /**
     * After each test, restore the original methods of the dependencies.
     */
    afterEach(() => {
        sinon.restore();
    });

    /**
     * Test that the publish method of the RedisMessageQueue class calls the publish method of the RedisClient class with the correct channel and message.
     */
    it("should publish a message to the channel", async () => {
        const channel = "channel";
        const message = "message";
        await redisMessageQueue.publish(channel, message);
        expect(clientStub.publish.calledWith(channel, message)).to.be.true;
    });

    /**
     * Test that the subscribe method of the RedisMessageQueue class calls the subscribe method of the RedisClient class with the correct channel.
     */
    it("should subscribe to the channel", async () => {
        const channel = "channel";
        const callback = (message: string) => {
            // Do nothing
        };
        await redisMessageQueue.subscribe(channel, callback);
        expect(clientStub.subscribe.calledWith(channel)).to.be.true;
    });

    /**
     * Test that the getInstance method of the RedisMessageQueue class returns the instance of RedisMessageQueue.
     */
    it("should return the instance of the RedisMessageQueue", () => {
        const instance = RedisMessageQueue.getInstance();
        expect(instance).to.equal(redisMessageQueue);
    });

    /**
     * Test that the constructor of the RedisMessageQueue class handles the connection error of the RedisClient class.
     */
    it("should handle RedisClient connection error", () => {
        const error = new Error();
        clientStub.connect.returns(Promise.reject(error));
        redisMessageQueue = new RedisMessageQueue();
        expect(loggerErrorStub.calledWith("Redis Publisher Connection Error:", error)).to.be.true;
        expect(loggerErrorStub.calledWith(" to trim visible output to 1000 messages.", error)).to.be.true;
        expect(loggerErrorStub.calledWith("Redis Subscriber Connection Error:", error)).to.be.true;
    });
});
