import { expect } from "chai";
import sinon, { SinonStub, SinonStubbedInstance } from "sinon";
import { Message, User } from "discord.js";
import MessageEvent from "../../../discord/events/message";
import CommandRegistry from "../../../discord/commands/commandRegistry";

/**
 * @file This contains file fields and/or functions for the Message event unit tests.
 *
 * @module Test
 *
 * Unit tests for the Message event.
 * These tests use the Mocha test framework and the Chai assertion library. They also use Sinon.JS for test doubles (stubs).
 * The MessageEvent class depends on the discord.js Message class. This dependency is replaced with stubs in the tests.
 * Each test checks that a particular method of the MessageEvent class calls the expected methods of the Message class with the correct arguments.
 *
 * @author Bobby McGetrick
 */
describe("MessageEvent", () => {
    let messageEvent: MessageEvent;
    let message: SinonStubbedInstance<Message>;
    let user: SinonStubbedInstance<User>;
    let commandRegistryStub: SinonStub;

    /**
     * Before each test, initializes the MessageEvent instance and 
     * stubs the necessary dependencies.
     */
    beforeEach(() => {
        messageEvent = new MessageEvent();
        message = sinon.createStubInstance(Message);
        user = sinon.createStubInstance(User);
        user.bot = false;
        message.author = user;
        message.content = "testContent";
        commandRegistryStub = sinon.stub(CommandRegistry.prototype, "executeCommand");
    });

    /**
     * After each test, restores all stubs.
     */
    afterEach(() => {
        sinon.restore();
    });

    /**
     * Test case for the event name.
     * It should return "messageCreate".
     */
    it("has the correct event name", () => {
        expect(messageEvent.name).to.equal("messageCreate");
    });

    /**
     * Test case for the handle method when a message from a bot is received.
     * The method should not execute any command.
     */
    it("does not execute any command if the message is from a bot", () => {
        message.author.bot = true;
        messageEvent.handle(message as Message);
        expect(commandRegistryStub.called).to.be.false;
    });

    /**
     * Test case for the handle method when a message starting with the command prefix is received.
     * The method should execute the corresponding command.
     */
    it("executes the command if the message starts with the command prefix", () => {
        message.author.bot = false;
        message.content = "/ping";
        messageEvent.handle(message as Message);
        expect(commandRegistryStub.calledOnceWith(message)).to.be.true;
    });

    /**
     * Test case for the handle method when a message not starting with the command prefix is received.
     * The method should not execute any command.
     */
    it("does not execute any command if the message does not start with the command prefix", () => {
        message.author.bot = false;
        message.content = "ping";
        messageEvent.handle(message as Message);
        expect(commandRegistryStub.called).to.be.false;
    });
});
