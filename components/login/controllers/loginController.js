import { loginService } from '../services/loginService.js'
import logger from '../../../utils/winston/winston_config.js'

class Login {

    async getLogin(req, res, next) {
        try {
            let {status, retry} = await loginService.getLogin(req)

            if ( status == "LOGGEDIN" ) {
                res.redirect('/api/viewOne')
            } else {
                res.render('login', {retry: retry})
            }
            
        } catch (error) {
            logger.error(error);
        }
    }


    async postLogin(req, res, next) {
        try {
            const { user } = await loginService.postLogin(req)

            // logger.warn(req.session)
            // logger.warn(req.cookies)

            res.redirect('/api/viewOne')
            
        } catch (error) {
            logger.error(error);
        }
    }

}

export let loginController = new Login()
