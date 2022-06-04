import { fork } from 'child_process'
import getInfo from '../../../utils/js/getInfo.js'
import logger from '../../..//utils/winston/winston_config.js'

class Info {

    async getInfoWithoutLog() {
        try {

            let info = await getInfo()
            return { status: "OK", info: info }

        } catch (error) {
            logger.error(error)
        }
    }

    async getInfoWithLog() {
        try {

            let info = await getInfo()
            console.log(info)
            return { status: "OK", info: info }

        } catch (error) {
            logger.error(error)
        }
    }

}

export let infoService = new Info()