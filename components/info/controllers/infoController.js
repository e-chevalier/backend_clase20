import { infoService } from '../services/infoService.js'
import logger from '../../../utils/winston/winston_config.js'

class Info {

    async getInfo(req, res, next) {
        try {
            let { verbose } = req.query

            let {status, info} = verbose? await infoService.getInfoWithLog() : await infoService.getInfoWithoutLog()
            res.render('info', { info: info })

        } catch (error) {
            logger.error(error)
        }

    }

}

export let infoController = new Info()
