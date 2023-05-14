import IEvent from './IEvent';
import { Message, User } from 'discord.js';
import logger from "../../logger"

/**
 * Class ReactionEvent represents a bot event that triggers when a message is received by the bot. 
 * It implements the IEvent interface.
 */
class ReactionEvent implements IEvent {
  name = 'messageReactionAdd';

  handle(message: Message, user: User) {
    logger.info(`Reaction received: ${message.content} from user: ${user.username}`);
    // TODO: handle the reaction event
  }
}

export default ReactionEvent;