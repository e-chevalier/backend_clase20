import { ContenedorFireStore } from "../../containers/ContenedorFireStore.js"
import FirestoreDatabaseConnection from "../../utils/firestore/FirestoreDatabaseConnection.js"

class ProductsDaoFireStore extends ContenedorFireStore {

    constructor(){
        super(FirestoreDatabaseConnection.clientFirestore, 'products')
    }

}

export default ProductsDaoFireStore