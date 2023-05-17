import { MessageReaction, User } from "discord.js";
import createLogger from "../../logger";
import IEvent from "./IEvent";

/**
 * @file This contains file fields and/or functions for the Reaction event.
 *
 * @module Discord
 *
 * Class ReactionEvent represents a bot event that triggers when a message is received by the bot.
 * It implements the IEvent interface.
 *
 * @author Bobby McGetrick
 */
const logger = createLogger(module);
class ReactionEvent implements IEvent {
    name = "messageReactionAdd";

    /**
     * Handles the reaction event.
     * @todo implement the reaction event
     *
     * @param param description
     * @returns description
     */
    handle(reaction: MessageReaction, user: User | undefined) {
        return;
        // logger.info(`Reaction received: ${reaction.emoji} from user: ${user?.username}`);
    }
}

export default ReactionEvent;