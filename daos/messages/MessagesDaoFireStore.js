import { ContenedorFireStore } from "../../containers/ContenedorFireStore.js"
import FirestoreDatabaseConnection from "../../utils/firestore/FirestoreDatabaseConnection.js"

class MessagesDaoFireStore extends ContenedorFireStore {

    constructor(){
        super(FirestoreDatabaseConnection.clientFirestore, 'messages')
    }


}

export default MessagesDaoFireStore