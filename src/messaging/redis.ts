/**
 * @file This file contains the implementation of the RedisMessageQueue class.
 * 
 * This class encapsulates the operations of a Redis-based message queue,
 * providing methods to publish to a channel and to subscribe to a channel.
 * It implements the IMessageQueue interface.
 *
 * It includes methods to establish connections with Redis server, handle potential
 * connection errors, and logging activities. The class uses Singleton pattern, 
 * ensuring only a single instance of the queue exists.
 *
 * There are two main methods provided:
 * - `publish`: It publishes a message to a specified Redis channel.
 * - `subscribe`: It subscribes to a specified Redis channel, and executes a callback
 *   function each time a new message is received on that channel.
 *
 * @author Bobbyt McGetrick
 */

import { createClient } from "redis";
import IMessageQueue from "./iMessageQueue";
import createLogger from "../logger";

class RedisMessageQueue implements IMessageQueue {
    private static instance: RedisMessageQueue;
    private publisher: ReturnType<typeof createClient>;
    private subscriber: ReturnType<typeof createClient>;
    logger = createLogger(module);

    constructor() { 
        const url = `redis://${process.env.REDIS_HOST || "redis"}:${process.env.REDIS_PORT || "6379"}`;

        this.publisher = createClient({
            url: url
        });
        this.publisher.connect()
            .catch(err => {
                this.logger.error("Redis Publisher Connection Error:", err);
            });

        this.subscriber = createClient({
            url: url
        });
        this.subscriber.connect()
            .catch(err => {
                this.logger.error("Redis Subscriber Connection Error:", err);
            });

        this.publisher.on("error", (err) => {
            this.logger.error("Redis Publisher Error:", err);
        });
        
        this.subscriber.on("error", (err) => {
            this.logger.error("Redis Subscriber Error:", err);
        });

        this.logger.info(`Redis messaging queue running at: ${url}`); 
    }

    /**
     * Returns the instance of the RedisMessageQueue,
     * creating one if it doesn't exist.
     */
    static getInstance(): RedisMessageQueue {
        if (!RedisMessageQueue.instance) {
            RedisMessageQueue.instance = new RedisMessageQueue();
        }
        return RedisMessageQueue.instance;
    }

    /**
     * Publishes a message to a channel.
     *
     * @param {string} channel The channel to publish to.
     * @param {string} message The message to publish.
     */
    async publish(channel: string, message: string): Promise<void> {
        try {
            await this.publisher.publish(channel, message);
            this.logger.info(`Published message: ${message} to channel: ${channel}`);
        } catch (error) {
            this.logger.error("Error occurred during publishing: ", error);
        }
    }

    /**
     * Subscribes to a channel and executes a callback when a message is received.
     *
     * @param {string} channel The channel to subscribe to.
     * @param {function} callback The callback to execute when a message is received.
     */
    async subscribe(channel: string, callback: (message: string) => void): Promise<void> {
        try {
            await this.subscriber.subscribe(channel, (message) => {
                this.logger.info(`Received message: ${message} from channel: ${channel}`);
                try {
                    callback(message);
                } catch (error) {
                    this.logger.error("Error occurred during callback execution: ", error);
                }
            });
        } catch (error) {
            this.logger.error("Error occurred during subscribing: ", error);
        }
    }
}

export default RedisMessageQueue;