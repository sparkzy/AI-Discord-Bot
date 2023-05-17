/**
 * @file This file contains fields and/or functions for the Redis messaging queue.
 *
 * Implements the IMessageQueue interface.
 * Configures and creates a messaging queue using Redis.
 *
 * @author Bobbyt McGetrick
 */
import { promisify } from "util";
import { RedisClientType, createClient } from "redis";
import IMessageQueue from "./iMessageQueue";

class RedisMessageQueue implements IMessageQueue {
    private client: RedisClientType;

    constructor() {
        this.client = createClient();
    }

    async publish(channel: string, message: string): Promise<void> {
        const publishAsync = promisify(this.client.publish).bind(this.client);
        await publishAsync(channel, message);
    }

    async subscribe(channel: string, callback: (message: string) => void): Promise<void> {
        this.client.on("message", (redisChannel, message) => {
            if (redisChannel === channel) {
                callback(message);
            }
        });

        const subscribeAsync = promisify(this.client.subscribe).bind(this.client);
        await subscribeAsync(channel);
    }
}

export default RedisMessageQueue;
