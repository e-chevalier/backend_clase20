import logger from '../winston/winston_config.js';
import { initializeApp, applicationDefault, cert } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
import { config_firestore } from '../../config/firestore.js'
class FirestoreDatabaseConnection {
    static clientFirestore;

    constructor(){

        const GOOGLE_APPLICATION_CREDENTIALS  = config_firestore.google_application_credentials
        
        if (FirestoreDatabaseConnection.clientFirestore) {
            //logger.info(Database.client)
            this.clientFirestore = FirestoreDatabaseConnection.clientFirestore;
            logger.info('Firestore connected - currently connected !!')
        } else {

            initializeApp({
                credential: applicationDefault()
            });

            FirestoreDatabaseConnection.clientFirestore = getFirestore()
            this.clientFirestore = FirestoreDatabaseConnection.clientFirestore
            logger.info('Firestore connected - first time!!')
        }
    }
}

export default new FirestoreDatabaseConnection()