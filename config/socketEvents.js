import { Server as IOServer } from 'socket.io'
import { normalize, schema } from "normalizr"
import DaoFactory from '../daos/DaoFactory.js'
import logger from '../utils/winston/winston_config.js'
import MessagesRepo from '../repository/MessagesRepo.js'

/**
 *  Regular expression for check email
 */

const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i



/**
 * Normalizr Schemas 
 * 
 */

const authorSchema = new schema.Entity('author')

const messageSchema = new schema.Entity('message', {
    author: authorSchema
})

const messagesSchema = new schema.Entity('messages', {
    messages: [messageSchema]
})


export const serverSocketsEvents = async (httpsServer, container_type) => {

    const io = new IOServer(httpsServer)
    const daoFactory = new DaoFactory()
    const { productsMemory, productsContainer, messagesMemory, messagesContainer } = await daoFactory.init(container_type)
    const messageRepo = new MessagesRepo(messagesMemory, messagesContainer)


    io.on('connection', (socket) => {
        // Emit all Products and Messages on connection.

        (async () => {
            io.sockets.emit('products', await productsContainer.getAll())
            let messagesOriginal = (await messageRepo.getAll()).map(m => m.data) 
            let messagesNormalized = normalize({ id: 'messages', messages: messagesOriginal }, messagesSchema)
            io.sockets.emit('messages', messagesNormalized)
            logger.info('¡Nuevo cliente conectado! PID: ' + process.pid)  // - Pedido 1
        })()

        socket.on('newProduct', (prod) => {

            if (Object.keys(prod).length !== 0 && !Object.values(prod).includes('')) {

                (async () => {
                    await productsContainer.save(prod)
                    await productsMemory.save(prod)
                    io.sockets.emit('products', await productsContainer.getAll())
                })()

            }
        })

        socket.on('newMessage', (data) => {

            if (Object.keys(data).length !== 0 && re.test(data.author.id) && !Object.values(data.author).includes('') && data.text !== '') {
                (async () => {
                    await messageRepo.save(data)
                    let messagesOriginal = (await messageRepo.getAll()).map(m => m.data)
                    let messagesNormalized = normalize({ id: 'messages', messages: messagesOriginal }, messagesSchema)
                    io.sockets.emit('messages', messagesNormalized)
                    logger.info('¡NUEVO MENSAJE EMITIDO A TODOS LOS SOCKETS! PID: ' + process.pid)  // - Pedido 1
                })()
            }
        })

    })

    return io
}