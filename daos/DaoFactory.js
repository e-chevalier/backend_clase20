import logger from '../utils/winston/winston_config.js';
import MessagesDaoFile from './messages/MessagesDaoFile.js';
import MessagesDaoFireStore from './messages/MessagesDaoStore.js';
import MessagesDaoMemory from './messages/MessagesDaoMemory.js';
import MessagesDaoMongoDB from './messages/MessagesDaoMongoDB.js';


class DaoFactory {


    constructor(data){

        // DAO MEMORY DEFAULT
        const { default: ProductsDaoMemory } = await import('./products/ProductsDaoMemory.js')
        const { default: MessagesDaoMemory } = await import('./messages/MessagesDaoMemory.js')

        logger.info("PRODUCTS - Initializing container for Mysql")
        // KNEX Config
        const { config_db } = await import('../config/databaseKnex.js')
        const { default: ProductsDaoKnex } = await import('./products/ProductsDaoKnex.js')
        // PRODUCTS DAO KNEX MYSQL 
        const productsContainer = new ProductsDaoKnex(config_db.mysql)
        await productsContainer.createTableProducts() 
        // PRODUCTS DAO MEMORY
        const productsMemory = new ProductsDaoMemory(await productsContainer.getAll())

        // // MONOGODB ATLAS CONNECTION
        // const { connectMongodbAtlas } = await import('../utils/mongodbAtlas/MongoDatabase.js')
        // // Connnect to dabase
        // await connectMongodbAtlas()


        if ( data.type_entity.toUpperCase() === 'message'.toUpperCase()) {
            //file, firestore, mongodb

            if ( data.type_connection.toUpperCase() === 'file'.toUpperCase() ) {

                logger.info("MESSAGES - Initializing container for File")
                const { default: MessagesDaoFile } = await import('./messages/MessagesDaoFile.js')

                // MESSAGES DAO FILE
                const messagesContainer = new MessagesDaoFile()

                // PRODUCTS DAO MEMORY
                const messagesMemory = new MessagesDaoMemory(await messagesContainer.getAll())

                return { productsContainer, productsMemory, messagesContainer, messagesMemory }

            }

        }

        if (data.type_entity.toUpperCase() === 'products'.toUpperCase()) {

        }


    }






}