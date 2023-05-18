import Sinon from "sinon";
import IMessageQueue from "../../messaging/iMessageQueue";

class FakeMessageQueue implements IMessageQueue {
    publish = Sinon.stub().resolves();
    subscribe = Sinon.stub().resolves();
}

export default FakeMessageQueue;