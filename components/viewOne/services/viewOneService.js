import logger from "../../../utils/winston/winston_config.js";
class ViewOne {

    async getViewOne(req) {
        try {

            if (req.isAuthenticated()) {

                if (req.session.counter) {
                    req.session.counter++
                } else {
                    req.session.counter = 1
                }

            } 
                        
            //logger.info(req.user)
            return { status: "OK", data: {...req.user, counter: req.session.counter} }
        } catch (error) {
            logger.error(error);
        }
    }

}

export let viewOneService = new ViewOne()