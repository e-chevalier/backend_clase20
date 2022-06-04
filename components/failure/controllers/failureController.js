import { failureService } from '../services/failureService.js'
import logger from '../../../utils/winston/winston_config.js'

class Failure {
    async getFailure(req, res, next) {
        try {
            let {status, message} = await failureService.getFailure(req)

            res.render('failure', { message_status: message })

        } catch (error) {
            logger.error(error)
        }

    }

}

export let failureController = new Failure()
