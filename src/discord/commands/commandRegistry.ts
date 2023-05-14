import { Message } from 'discord.js';
import ICommand from './ICommand';

/**
 * Class CommandRegistry is used to register and execute bot commands.
 * It stores commands in a Map, allowing for fast access and execution.
 */
class CommandRegistry {
  private commands: Map<string, ICommand>;

  /**
   * CommandRegistry constructor.
   * Initializes the commands Map.
   */
  constructor() {
    this.commands = new Map();
  }

  /**
   * Registers a command to the registry.
   * @param command - An object that implements the ICommand interface.
   */
  registerCommand(command: ICommand): void {
    this.commands.set(command.command, command);
  }

  /**
   * Executes a command based on a received message.
   * If the command is registered, it calls the command's handle method with the message.
   * @param message - The received message.
   */
  executeCommand(message: Message): void {
    const command = message.content.split(' ')[0].substring(1);  // Remove the leading slash
    if (this.commands.has(command)) {
      this.commands.get(command)!.handle(message);
    }
  }
}

export default CommandRegistry;
