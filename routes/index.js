import { viewOneApi } from '../components/viewOne/index.js'
import { viewProductsFakerApi } from '../components/viewProductsFaker/index.js'
import { loginApi } from '../components/login/index.js'
import { logoutApi } from '../components/logout/index.js'
import { registrationApi } from "../components/registration/index.js"
import { authFacebookApi } from "../components/authFacebook/index.js"
import { failureApi } from "../components/failure/index.js"
import { infoApi } from '../components/info/index.js'
import { randomsApi } from '../components/randoms/index.js'
import logger from '../utils/winston/winston_config.js'
import loggerMethodAndURLs from '../utils/middleware/loggerMethodAndURLs.js'

export const serverRoutes = ( app, passport ) => {

    app.use(loggerMethodAndURLs)

    infoApi(app)
    randomsApi(app)
    authFacebookApi(app, passport)
    registrationApi(app, passport)
    loginApi(app, passport)
    logoutApi(app)
    failureApi(app)
    viewOneApi(app)
    viewProductsFakerApi(app)

    app.get("/", (req, res, next) => {
        //res.send("Todo ok")
        res.redirect('/api/login')
    })
    
    /**
    * Undefined endpoint
    */
    app.all('*', (req, res, next) => {
        logger.warn(`Invalid resource - METHOD: ${req.method} - Resource: ${req.protocol + '://' + req.get('host') + req.originalUrl}`)
        //res.json({ error: -2, descripcion: `Ruta ${req.url} método ${req.method} no implementada.` })
        res.redirect('/api/failure?status_code=404')
    })
}