import logger from '../../../utils/winston/winston_config.js'
import { viewProductsFakerService } from '../services/viewProductsFakerService.js'

class ViewProductsFaker {

    async getViewProductsFaker(req, res, next) {

        try {

            let response = await viewProductsFakerService.getViewProductsFaker()
            const fakeApi = () => response.data
            res.render('main_faker', { productos: fakeApi(), isEmpty: fakeApi().length ? false : true })

        } catch (error) {
            logger.error(error)
        }
    }
}

export let viewProductsFakerController = new ViewProductsFaker()
