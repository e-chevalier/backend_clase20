import logger from "../../../utils/winston/winston_config.js"
class Registration {

    async getRegistration() {
        try {

            return { status: "OK" }
            
        } catch (error) {
            logger.error(error)
        }
    }

    async postRegistration(req) {
        try {

            let response = { status: 'OK' }
            return response

        } catch (error) {
            logger.error(error)
        }
    }

}

export let registrationService = new Registration()