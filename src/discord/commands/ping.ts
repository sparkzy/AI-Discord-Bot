import logger from "../../logger"
import { Message } from 'discord.js';

class Ping {
    command: string;

    constructor() {
        this.command = "ping";
    }

    handle(message: Message): void {
        if (message.content.trim() === `/${this.command}`) {
            message.reply('Pong!');
        }
    }
}

export default Ping;