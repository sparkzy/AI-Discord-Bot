/**
 * @file This contains file fields and/or functions for the IEvent.
 *
 * @module Disco
 *
 * Interface IEvent represents expected fields and functions of a bot event.
 *
 * @author Bobby McGetrick
 */
interface IEvent {
    name: string;
    // eslint-disable-next-line @typescript-eslint/ban-types
    handle: Function;
  }
  
export default IEvent;