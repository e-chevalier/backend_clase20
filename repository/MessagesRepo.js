import Message from "./Message.js";

class MessagesRepo{

    constructor(messagesMemory, messagesContainer){
        this.messagesMemory = messagesMemory,
        this.messagesContainer = messagesContainer
    }

    async getAll(){
        let messagesOriginal = await this.messagesContainer.getAll()
        return messagesOriginal.map(msj => new Message(msj))
    }

    async save(message) {
        await this.messagesMemory.save(message)
        await this.messagesContainer.save(message)
    }

}

export default MessagesRepo