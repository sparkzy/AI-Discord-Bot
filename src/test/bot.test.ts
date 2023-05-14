import { expect } from "chai";
import sinon from "sinon";
import { Client } from "discord.js";
import logger from "../logger";
import Bot from "../discord/bot";

describe("Bot", () => {
    let bot: Bot;
    let clientStub: sinon.SinonStubbedInstance<Client>;

    beforeEach(() => {
        clientStub = sinon.createStubInstance(Client);
        sinon.stub(logger, "info");
        process.env.DISCORD_TOKEN = "test-token";
        bot = new Bot();
    });

    afterEach(() => {
        sinon.restore();
        delete process.env.DISCORD_TOKEN;
    });

    it("should instantiate a Bot", () => {
        expect(bot).to.be.instanceOf(Bot);
    });

    it("should call logger.info when starting the bot", () => {
        bot.start();
        expect(logger.info).to.have.been.called;
    });

    // Add more tests...
});
