import express from 'express'

import { getEvent, getEmployeeEvents, getEvents, createEvent, updateEvent, deleteEvent, deleteWholeCollection } from '../controllers/event.js'
import { verifyEmployee, verifyToken } from '../middleware/auth.js'

const router = express.Router()

router.get('/get/single/:eventId', verifyToken, verifyEmployee, getEvent)
router.get('/get/all', verifyToken, verifyEmployee, getEvents)
router.get('/get/employee', verifyToken, verifyEmployee, getEmployeeEvents)

router.post('/create', verifyToken, verifyEmployee, createEvent)

router.put('/update/:eventId', verifyToken, verifyEmployee, updateEvent)

router.delete('/delete/:eventId', verifyToken, verifyEmployee, deleteEvent)
router.delete('/delete-whole-collection', deleteWholeCollection)

export default router