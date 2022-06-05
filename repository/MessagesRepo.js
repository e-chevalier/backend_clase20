import Message from "./Message.js";

class MessagesRepo{

    constructor(messagesMemory, messagesContainer){
        this.messagesMemory = messagesMemory,
        this.messagesContainer = messagesContainer
    }

    async getAll(){
        let messagesOriginal = await this.messagesContainer.getAll()
        console.log(messagesOriginal)
        return messagesOriginal.map(msj => new Message(msj))
    }


}

export default MessagesRepo