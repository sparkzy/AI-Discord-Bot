import { expect } from "chai";
import { Message } from "discord.js";
import sinon, { SinonStub } from "sinon";
import Kick from "../../../discord/commands/kick";

/**
 * @file This contains file fields and/or functions for the Kick command unit tests.
 *
 * @module Test
 *
 * Unit tests for the Kick command.
 * These tests use the Mocha test framework and the Chai assertion library. They also use Sinon.JS for test doubles (stubs).
 * The Kick class depends on the discord.js Message class. This dependency is replaced with stubs in the tests.
 * Each test checks that a particular method of the Kick class calls the expected methods of the Method class with the correct arguments.
 *
 * @author Bobby McGetrick
 */
describe("Kick Command", () => {
    let kick: Kick;
    let message: Message;

    /**
     * Before each test we instantiate a new Kick command and a stubbed Message.
     */
    beforeEach(() => {
        kick = new Kick();
        message = sinon.createStubInstance(Message);
        message.content = "/kick";
    });

    /**
     * After each test, restore the original methods of the dependencies.
     */
    afterEach(() => {
        sinon.restore();
    });

    /**
     * Test if the Kick command has the correct command name.
     */
    it("shoul have the correct command name", () => {
        expect(kick.command).to.equal("kick");
    });

    /**
     * Test if the Kick command replies with "Kicking a user!" when the handle function is called.
     */
    it("should reply with Kicking a user! when handle is called", () => {
        kick.handle(message as Message);
        expect((message.reply as SinonStub).calledWith("Kicking a user!")).to.be.true;
    });

    /**
     * Test if the Kick command does not reply if the message content does not begin with the command prefix.
     */
    it("should not reply if the message content does not begin with the command prefix", () => {
        message.content = "kick";
        kick.handle(message as Message);
        expect((message.reply as SinonStub).calledWith("Kicking a user!")).to.be.false;
    });
});
