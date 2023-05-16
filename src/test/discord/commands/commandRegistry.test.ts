import { expect } from "chai";
import { Message } from "discord.js";
import sinon, { SinonStub } from "sinon";
import CommandRegistry from "../../../discord/commands/commandRegistry";
import Ping from "../../../discord/commands/ping";
import ICommand from "../../../discord/commands/ICommand";

/**
 * @file This contains file fields and/or functions for the CommandRegistry unit tests.
 *
 * Unit tests for the CommandRegistry.
 * These tests use the Mocha test framework and the Chai assertion library. They also use Sinon.JS for test doubles (stubs).
 * The CommandRegistry class depends on the discord.js Message class. This dependency is replaced with stubs in the tests.
 * Each test checks that a particular method of the Ban class calls the expected methods of the Method class with the correct arguments.
 *
 * @author Bobby McGetrick
 */
describe("CommandRegistry", () => {
    const commandPrefix = process.env.COMMAND_PREFIX || "/";
    let commandRegistry: CommandRegistry;
    let command: sinon.SinonStubbedInstance<Ping>;
    let message: sinon.SinonStubbedInstance<Message>;
    const commandName = "ping";

    /**
     * Before each test we instantiate a new Ban command and a stubbed Message.
     */
    beforeEach(() => {
        commandRegistry = new CommandRegistry();
        command = sinon.createStubInstance(Ping);
        command.command = commandName;
        message = sinon.createStubInstance(Message);
        message.content = commandPrefix + commandName;
    });

    /**
     * After each test, restore the original methods of the dependencies.
     */
    afterEach(() => {
        sinon.restore();
    });

    /**
     * Test if the command is register in teh commandRegistry and then executred by the commandRegistry.
     */
    it("should register and execute a command", () => {
        commandRegistry.registerCommand(command);
        commandRegistry.executeCommand(message as Message);
        expect((command.handle as SinonStub).calledOnceWith(message)).to.be.true;
    });

    /**
     * Test if the commandRegistry does not execute a command if it is not registered.
     */
    it("should not execute a command if it is not registered", () => {
        commandRegistry.executeCommand(message as Message);
        expect((command.handle as SinonStub).notCalled).to.be.true;
    });

    /**
     * Test if the commandRegistry does not execute a command if the message content does not begin with the command prefix.
     */
    it("should not execute a command when the command prefix is removed", () => {
        message.content = "ping";
        commandRegistry.registerCommand(command);
        commandRegistry.executeCommand(message as Message);
        expect((command.handle as SinonStub).calledOnceWith(message)).to.be.false;
    });

    /**
     * Test if the commandRegistry does not execute a command if the message content does not begin with the command prefix.
     */
    it("should not call handle when command is undefined", () => {
        const message = sinon.createStubInstance(Message);
        message.content = "/undefinedCommand";
        const commandStub = sinon.createStubInstance(Ping);
    
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const anyCommandRegistry = commandRegistry as any;
        anyCommandRegistry.commands = new Map<string, ICommand | undefined>();
        anyCommandRegistry.commands.set("undefinedCommand", undefined);
        anyCommandRegistry.executeCommand(message as Message);

        expect(commandStub.handle.called).to.be.false;
    });
    
    
});
