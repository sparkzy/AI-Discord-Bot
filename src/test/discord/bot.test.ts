/* eslint-disable @typescript-eslint/no-explicit-any */

// Third party imports
import { expect } from "chai";
import sinon from "sinon";
import { Client, GatewayIntentBits, Message, User } from "discord.js";

// Local imports
import { Bot } from "../../discord/bot";
import EventRegistry from "../../discord/events/eventRegistry";
import MessageEvent from "../../discord/events/message";
import ReactionEvent from "../../discord/events/reaction";

// Test utilities
import { createCustomLogger } from "../utils/testHelper";
import { Logger } from "winston";
import { intents } from "../../discord/intents";

/**
 * @file This contains file fields and/or functions for the Bot Unit tests.
 *
 * @module Test
 *
 * Unit tests for the Bot class.
 * These tests use the Mocha test framework and the Chai assertion library. They also use Sinon.JS for test doubles (stubs).
 * The Bot class depends on the discord.js Client class and the EventRegistry class. These dependencies are replaced with stubs in the tests.
 * Each test checks that a particular method of the Bot class calls the expected methods of the Client and EventRegistry classes with the correct arguments.
 *
 * @author Bobby McGetrick
 */
describe("Bot", () => {
    const originalNodeEnv = process.env.NODE_ENV;

    let bot: Bot;
    let logger: Logger;
    let clientStub: sinon.SinonStubbedInstance<Client>;
    let eventRegistryStub: sinon.SinonStubbedInstance<EventRegistry>;

    let messageCreateEventHandleStub: sinon.SinonStub;
    let messageReactionAddEventHandleStub: sinon.SinonStub;
    let listenStub: sinon.SinonStub;
    let loggerErrorStub: sinon.SinonStub;

    /**
     * Before each test, create a new Bot and stubs for the dependencies.
     */
    beforeEach(() => {
        const token = "discordToken";
        process.env.DISCORD_TOKEN = token;
        clientStub = sinon.createStubInstance(Client);
        eventRegistryStub = sinon.createStubInstance(EventRegistry);
        bot = new Bot(clientStub, eventRegistryStub);
        logger = createCustomLogger();

        clientStub.login.returns(Promise.resolve("Logged in"));
        messageCreateEventHandleStub = sinon.stub(MessageEvent.prototype, "handle");
        messageReactionAddEventHandleStub = sinon.stub(ReactionEvent.prototype, "handle");
        listenStub = sinon.stub(bot as any, "listen");
        loggerErrorStub = sinon.stub(logger, "error");
    });

    /**
     * After each test, restore the original methods of the dependencies.
     */
    afterEach(() => {
        sinon.restore();
        process.env.DISCORD_TOKEN = originalNodeEnv;
    });

    /**
     * Test that the start method of the Bot class calls the login method of the Client class with the correct token.
     */
    it("should start the bot", () => {
        const token = "discordToken";
        process.env.DISCORD_TOKEN = token;
        bot.start();
        expect(clientStub.login.calledWith(token)).to.be.true;
    });

    /**
     * Test that the constructor of the Bot class calls the registerEvent method of the EventRegistry class twice.
     */
    it("should register events", () => {
        expect(eventRegistryStub.registerEvent.calledTwice).to.be.true;
    });

    /**
     * Test that the listen method of the Bot class calls the on method of the Client class twice: once for "messageCreate" and once for "messageReactionAdd".
     */
    it("should listen to messages", async () => {    
        bot = new Bot(clientStub, eventRegistryStub);
        await bot.start();
    
        expect(clientStub.on.calledTwice).to.be.true;
        expect(clientStub.on.firstCall.calledWith("messageCreate")).to.be.true;
        expect(clientStub.on.secondCall.calledWith("messageReactionAdd")).to.be.true;
    });

    /**
     * Test that the loadToken function will throw an error if the DISCORD_TOKEN environment variable is not set.
     */
    it("should throw an error if DISCORD_TOKEN environment variable is not set", () => {
        delete process.env.DISCORD_TOKEN;
        const botAny = bot as any;
        const result = botAny.loadToken();
        expect(result).to.equal("");
    });

    /**
     * Test that the ready function will call listen when ready.
     */
    it("should log info and call listen when ready", () => {
        (bot as any).ready();
        expect(listenStub.calledOnce).to.be.true;
    });

    /*
     * Test that the listen function will attach messageCreate event handler.
     */
    it("should log info and attach messageCreate event handler", async () => {
        const message = sinon.createStubInstance(Message);
        const event = new MessageEvent();
        eventRegistryStub.getEvent.withArgs("messageCreate").returns(event);
        clientStub.on.withArgs("messageCreate").yields(message);

        bot = new Bot(clientStub, eventRegistryStub);
        await bot.start();

        expect(clientStub.on.calledWith("messageCreate")).to.be.true;
        expect(eventRegistryStub.getEvent.calledWith("messageCreate")).to.be.true;
        expect(messageCreateEventHandleStub.calledOnceWith(message)).to.be.true;
    });
    
    /*
     * Test that the listen function will attach messageReactionAdd event handler.
     */
    it("should log info and attach messageReactionAdd event handler", async () => {
        const message = sinon.createStubInstance(Message);
        const user = sinon.createStubInstance(User);
        const event = new ReactionEvent();
        eventRegistryStub.getEvent.withArgs("messageReactionAdd").returns(event);
        clientStub.on.withArgs("messageReactionAdd").yields(message, user);

        bot = new Bot(clientStub, eventRegistryStub);
        await bot.start();

        expect(clientStub.on.calledWith("messageReactionAdd")).to.be.true;
        expect(eventRegistryStub.getEvent.calledWith("messageReactionAdd")).to.be.true;
        expect(messageReactionAddEventHandleStub.calledOnceWith(message, user)).to.be.true;
    });

    /*
     * Test that the listen function will log an error when message event is not found.
     */
    it("should log an error when message event is not found", async () => {
        const message = sinon.createStubInstance(Message);
        
        clientStub.on.withArgs("messageCreate").yields(message);
        eventRegistryStub.getEvent.withArgs("messageCreate").returns(undefined);
        clientStub.login.returns(Promise.resolve("Logged in"));
    
        bot = new Bot(clientStub, eventRegistryStub);
        logger = bot.logger;
        loggerErrorStub = sinon.stub(logger, "error");

        await bot.start();

        expect(loggerErrorStub.calledOnceWith("Message event not found")).to.be.true;
    });

    /*
     * Test that the listen function will log an error when reaction event is not found.
     */
    it("should log an error when reaction event is not found", async () => {
        const message = sinon.createStubInstance(Message);
        const user = sinon.createStubInstance(User);
        
        clientStub.on.withArgs("messageReactionAdd").yields(message, user);
        eventRegistryStub.getEvent.withArgs("messageReactionAdd").returns(undefined);
        clientStub.login.returns(Promise.resolve("Logged in"));
    
        bot = new Bot(clientStub, eventRegistryStub);
        logger = bot.logger;
        loggerErrorStub = sinon.stub(logger, "error");

        await bot.start();

        expect(loggerErrorStub.calledOnceWith("Reaction event not found")).to.be.true;
    });

    /**
     * Test that the Bot constructor correctly initializes a new Client instance with the correct intents and a new EventRegistry instance when no arguments are provided.
     */
    it("should initialize new Client and EventRegistry instances when no arguments are provided", () => {
        const intentMap = new Map<string, number>();
        intentMap.set("Guilds", 1);
        intentMap.set("GuildMembers", 2);
        intentMap.set("GuildEmojisAndStickers", 8);
        intentMap.set("GuildIntegrations", 16);
        intentMap.set("GuildWebhooks", 32);
        intentMap.set("GuildInvites", 64);
        intentMap.set("GuildVoiceStates", 128);
        intentMap.set("GuildPresences", 256);
        intentMap.set("GuildMessages", 512);
        intentMap.set("GuildMessageReactions", 1024);
        intentMap.set("GuildMessageTyping", 2048);
        intentMap.set("DirectMessages", 4096);
        intentMap.set("DirectMessageReactions", 8192);
        intentMap.set("DirectMessageTyping", 16384);
        intentMap.set("MessageContent", 32768);

        const bot = new Bot();
        const intentValues = (bot as any).client.options.intents.toArray().map((intent: string) => intentMap.get(intent));

        expect((bot as any).client).to.be.instanceOf(Client);
        expect(intentValues).to.deep.equal(intents);
        expect((bot as any).eventRegistry).to.be.instanceOf(EventRegistry);
    });
    
});
