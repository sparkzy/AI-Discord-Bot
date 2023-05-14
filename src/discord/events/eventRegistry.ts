import IEvent from "./IEvent";

/**
 * Class EventRegistry is used to register and execute bot events.
 * It stores events in a Map, allowing for fast access and execution.
 */
class EventRegistry {
    private events: Map<string, IEvent>;

    /**
     * CommandRegistry constructor.
     * Initializes the events Map.
     */
    constructor() {
        this.events = new Map();
    }

    /**
     * Registers a event to the registry.
     * @param event - An object that implements the ICommand interface.
     */
    registerEvent(event: IEvent): void {
        this.events.set(event.name, event);
    }

    /**
     * Executes a event based on a received message.
     * If the event is registered, it calls the event"s handle method with the message.
     * @param message - The received message.
     */
    getEvent(name: string): IEvent | undefined {
        return this.events.get(name);
    }
}

export default EventRegistry;
