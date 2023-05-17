import { expect } from "chai";
import { Message } from "discord.js";
import sinon, { SinonStub } from "sinon";
import Ban from "../../../discord/commands/ban";

/**
 * @file This contains file fields and/or functions for the Ban command unit tests.
 *
 * Unit tests for the Ban command.
 * These tests use the Mocha test framework and the Chai assertion library. They also use Sinon.JS for test doubles (stubs).
 * The Ban class depends on the discord.js Message class. This dependency is replaced with stubs in the tests.
 * Each test checks that a particular method of the Ban class calls the expected methods of the Method class with the correct arguments.
 *
 * @author Bobby McGetrick
 */
describe("Ban Command", () => {
    let ban: Ban;
    let message: Message;

    /**
     * Before each test we instantiate a new Ban command and a stubbed Message.
     */
    beforeEach(() => {
        ban = new Ban();
        message = sinon.createStubInstance(Message);
        message.content = "/ban";
    });

    /**
     * After each test, restore the original methods of the dependencies.
     */
    afterEach(() => {
        sinon.restore();
    });

    /**
     * Test if the Ban command has the correct command name.
     */
    it("should have the correct command name", () => {
        expect(ban.command).to.equal("ban");
    });

    /**
     * Test if the Ban command replies with "Baning a user!" when the handle function is called.
     */
    it("should reply with Baning a user! when handle is called", () => {
        ban.handle(message as Message);
        expect((message.reply as SinonStub).calledWith("Baning a user!")).to.be.true;
    });

    /**
     * Test if the Ban command does not reply if the message content does not begin with the command prefix.
     */
    it("should not reply if the message content does not begin with the command prefix", () => {
        message.content = "ban";
        ban.handle(message as Message);
        expect((message.reply as SinonStub).calledWith("Baning a user!")).to.be.false;
    });
});
