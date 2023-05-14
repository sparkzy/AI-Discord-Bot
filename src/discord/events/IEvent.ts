/**
 * Interface IEvent represents expected fields and functions of a bot event. 
 */
interface IEvent {
    name: string;
    handle: Function;
  }
  
  export default IEvent;