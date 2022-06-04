import { dataProducts as products } from '../../config/mockups_data.js'
import FirestoreDatabaseConnection from './FirestoreDatabaseConnection.js'
import logger from '../winston/winston_config.js'


const uploadToFirestore = () => {

    const db_collectionProducts = FirestoreDatabaseConnection.clientFirestore.collection('products')

    products.forEach( prod => db_collectionProducts
        .add(prod)
        .then(data => logger.info(data.id))
        .catch(err => logger.error(err))
        .finally()
    )

}

export default uploadToFirestore