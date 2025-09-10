import express from 'express'
import logger from "notifications-layer"

import { getNotification, getNotifications,  createRequestNotification, deleteNotification, deleteWholeCollection } from '../controllers/notification.js'

const router = express.Router()
logger()

router.get('/get/single/:notificationId', getNotification)
router.get('/get/all', getNotifications)

router.post('/create/request', createRequestNotification)

router.delete('/delete/:notificationId', deleteNotification)
router.delete('/delete/whole-collection', deleteWholeCollection)

export default router