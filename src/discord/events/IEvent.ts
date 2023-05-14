import { Message, User } from "discord.js";

/**
 * Interface IEvent represents expected fields and functions of a bot event. 
 */
interface IEvent {
    name: string;
    handle: (message: Message, user?: User) => void;
  }
  
export default IEvent;