import ProductsDaoFaker from '../../../daos/products/ProductsDaoFaker.js'
import logger from '../../../utils/winston/winston_config.js'

const productsDaoFaker = new ProductsDaoFaker()

class ViewProductsFaker {

    async getViewProductsFaker() {

        try {

            productsDaoFaker.createProductsFaker()
            let response = await productsDaoFaker.getAll()
            return { status: "OK", data: response }

        } catch (error) {
            logger.error(error)
        }
    }
}

export let viewProductsFakerService = new ViewProductsFaker()