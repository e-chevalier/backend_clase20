import logger from '../utils/winston/winston_config.js';
class DaoFactory {

    async init(container_type) {
        // container_type=[file, firestore, mongodb] for messages

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

        // MONOGODB ATLAS CONNECTION  ( for localstrategy and message if required.)
        const { default: MongoDatabaseConnection } = await import('../utils/mongodbAtlas/MongoDatabaseConnection.js')

        // DAOs MESSAGE 
        //file, firestore, mongodb
        if (container_type.toUpperCase() === 'file'.toUpperCase()) {

            logger.info("MESSAGES - Initializing container for File")
            const { default: MessagesDaoFile } = await import('./messages/MessagesDaoFile.js')
            // MESSAGES DAO FILE
            const messagesContainer = new MessagesDaoFile()
            // PRODUCTS DAO MEMORY
            const messagesMemory = new MessagesDaoMemory(await messagesContainer.getAll())
            return { productsContainer, productsMemory, messagesContainer, messagesMemory }

        }

        if (container_type.toUpperCase() === 'firestore'.toUpperCase()) {
            logger.info("MESSAGES - Initializing container for Firestore")
            const { default: MessagesDaoFireStore } = await import('./messages/MessagesDaoFireStore.js')
            // MESSAGES DAO FIRESTORE
            const messagesContainer = new MessagesDaoFireStore()
            const messagesMemory = new MessagesDaoMemory(await messagesContainer.getAll())
            return { productsContainer, productsMemory, messagesContainer, messagesMemory }
        }

        if (container_type.toUpperCase() === 'mongodb'.toUpperCase()) {
            logger.info("MESSAGES - Initializing container for MongoDB Atlas")
            // MONOGODB ATLAS CONNECTION already established for localstrategy
            const { default: MessagesDaoMongoDB } = await import('./messages/MessagesDaoMongoDB.js')
            // MESSAGES DAO MONGODB
            const messagesContainer = new MessagesDaoMongoDB()
            // PRODUCTS DAO MEMORY
            const messagesMemory = new MessagesDaoMemory(await messagesContainer.getAll())

            return { productsContainer, productsMemory, messagesContainer, messagesMemory }
        }

    }

}


export default DaoFactory;