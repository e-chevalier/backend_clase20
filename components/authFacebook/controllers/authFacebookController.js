import { authFacebookService } from '../services/authFacebookService.js'
import logger from '../../../utils/winston/winston_config.js'

class AuthFacebook {
    async redirect(req, res, next) {
        try {
            let response = await authFacebookService.redirect()
            logger.info(req.user)
            res.redirect('/api/main')
            
        } catch (error) {
            logger.error(error)
        }

    }

}

export let authFacebookController = new AuthFacebook()
