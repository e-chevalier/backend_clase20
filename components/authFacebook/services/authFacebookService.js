import logger from "../../../utils/winston/winston_config.js"
class AuthFacebook {

    async redirect() {
        try {
            logger.info(`test`)
            // LOGIC HERE

            return { status: "OK" }
        } catch (error) {
            logger.error(error)
        }
    }

}

export let authFacebookService = new AuthFacebook()