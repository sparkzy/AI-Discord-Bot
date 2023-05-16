import { expect } from "chai";
import path from "path";
import sinon from "sinon";
import winston from "winston";
import createLogger from "../../src/logger";
import { createCustomLogger } from "./utils/testHelper";

/**
 * @file This contains file fields and/or functions for the Logger Unit tests.
 *
 * Unit tests for the Logger.
 * These tests use the Mocha test framework and the Chai assertion library. They also use Sinon.JS for test doubles (stubs).
 * Each test checks a condition of the environment variable 'NODE_ENV' and verifies whether the logger's transport
 * configuration behaves as expected under that condition.
 *
 * @author Bobby McGetrick
 */
describe("Logger", () => {

    /**
     * Before each test, do nothing.
     */
    beforeEach(() => {
        // Do nothing
    });

    /**
     * After each test, the stub is restored and the 'NODE_ENV' environment variable is deleted.
     */
    afterEach(() => {
        // addStub.restore();
        sinon.restore;
        delete process.env.NODE_ENV;
    });

    /**
     * Test to check if a console transport is added when NODE_ENV is not set to 'production'.
     */
    it("adds console transport when NODE_ENV is not production", () => {
        process.env.NODE_ENV = "test";
        const customLogger = createCustomLogger();
        const hasConsoleTransport = customLogger.transports.some(
            (transport) => transport instanceof winston.transports.Console
        );
        expect(hasConsoleTransport).to.be.true;
    });

    /**
     * Test to check if a console transport is not added when NODE_ENV is set to 'production'.
     */
    it("does not add console transport when NODE_ENV is production", () => {
        process.env.NODE_ENV = "production";
        const customLogger = createCustomLogger();
        const hasConsoleTransport = customLogger.transports.some(
            (transport) => transport instanceof winston.transports.Console
        );
        expect(hasConsoleTransport).to.be.false;
    });
});
