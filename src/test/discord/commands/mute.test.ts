import { expect } from "chai";
import { Message } from "discord.js";
import sinon, { SinonStub } from "sinon";
import Mute from "../../../discord/commands/mute";

/**
 * @file This contains file fields and/or functions for the Mut commadn unit tests.
 *
 * @module Test
 *
 * Unit tests for the Mute command.
 * These tests use the Mocha test framework and the Chai assertion library. They also use Sinon.JS for test doubles (stubs).
 * The Mute class depends on the discord.js Message class. This dependency is replaced with stubs in the tests.
 * Each test checks that a particular method of the Mute class calls the expected methods of the Method class with the correct arguments.
 *
 * @author Bobby McGetrick
 */
describe("Mute Command", () => {
    let mute: Mute;
    let message: Message;

    /**
     * Before each test we instantiate a new Mute command and a stubbed Message.
     */
    beforeEach(() => {
        mute = new Mute();
        message = sinon.createStubInstance(Message);
        message.content = "/mute";
    });

    /**
     * Test if the Mute command has the correct command name.
     */
    it("should have the correct command name", () => {
        expect(mute.command).to.equal("mute");
    });

    /**
     * Test if the Mute command replies with "Muting a user!" when the handle function is called.
     */
    it("shuold reply with Muting a user! when handle is called", () => {
        mute.handle(message as Message);
        expect((message.reply as SinonStub).calledWith("Muting a user!")).to.be.true;
    });

    /**
     * Test if the Mute command does not reply when the handle function is called with an incorrect command.
     */
    it("should not reply when handle is called with an incorrect command", () => {
        message.content = "/incorrectCommand";
        mute.handle(message as Message);
        expect((message.reply as SinonStub).called).to.be.false;
    });
});
