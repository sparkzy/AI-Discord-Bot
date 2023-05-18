/**
 * @file This file defines the interface for the MessageQueue.
 *
 * Defines the requirements for any MessageQueue implementation.
 *
 * @author Bobbyt McGetrick
 */
interface IMessageQueue {
    publish(channel: string, message: string): Promise<void>;
    subscribe(channel: string, callback: (message: string) => void): Promise<void>;
}

export default IMessageQueue;
