import { Client } from "discord.js";
import logger from "../logger"

export class Bot {
    private client: Client;
    private commandPrefix: String;
    private token: String

    constructor(commandPrefix: String) {
        logger.info("Creating a Discord client...");
        this.client = new Client({ intents: []});
        this.commandPrefix = commandPrefix;
        this.token = this.loadToken()

        this.client.once("ready", this.ready.bind(this));
    }

    private loadToken(): String {
        const discordToken = process.env.DISCORD_TOKEN;
        try {
            if (discordToken === undefined) {
                throw new Error("DISCORD_TOKEN is not set");
            }
            return discordToken;
        } catch (error) {
            logger.error(error);
            process.exit(1);
        }
    }

    private ready() {
         logger.info("Discord bot ready!");
    }

    public start(): void {
        this.client.login(this.token.toString());
    }

    public listen() {
        // TODO: Login to Discord
    }
}

export default Bot
