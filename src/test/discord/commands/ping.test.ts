import { expect } from "chai";
import { Message } from "discord.js";
import sinon, { SinonStub } from "sinon";
import Ping from "../../../discord/commands/ping";

/**
 * @file This contains file fields and/or functions for the Ping command Unit tests.
 *
 * @module Test
 *
 * Unit tests for the Ping command.
 * These tests use the Mocha test framework and the Chai assertion library. They also use Sinon.JS for test doubles (stubs).
 * The Ping class depends on the discord.js Message class. This dependency is replaced with stubs in the tests.
 * Each test checks that a particular method of the Ping class calls the expected methods of the Method class with the correct arguments.
 *
 * @author Bobby McGetrick
 */
describe("Ping Command", () => {
    /**
     * Instance of the Ping command to be used in the tests.
     */
    let ping: Ping;

    /**
     * Stub of the Message class from discord.js.
     */
    let message: Message;

    /**
     * Before each test, a new instance of the Ping command and a stubbed Message are created.
     * The content of the message is set to "/ping".
     */
    beforeEach(() => {
        ping = new Ping();
        message = sinon.createStubInstance(Message);
        message.content = "/ping";
    });

    /**
     * Test to check if the Ping command has the correct command name.
     */
    it("shuold have the correct command name", () => {
        expect(ping.command).to.equal("ping");
    });

    /**
     * Test to check if the Ping command replies with "Pong!" when the handle function is called with a message.
     */
    it("shuold reply with Pong! when handle is called", () => {
        ping.handle(message as Message);
        expect((message.reply as SinonStub).calledWith("Pong!")).to.be.true;
    });

    /**
     * Test if the ping command does not reply when the handle function is called with an incorrect command.
     */
    it("should not reply when handle is called with an incorrect command", () => {
        message.content = "/incorrectCommand";
        ping.handle(message as Message);
        expect((message.reply as SinonStub).called).to.be.false;
    });
});
