import express from 'express'
import { createSociety, getSociety, getSocieties, updateSociety, deleteSociety, deleteWholeCollection, searchSociety, filterSociety } from '../controllers/society.js'
import { verifyEmployee, verifyManager, verifyToken } from '../middleware/auth.js'

const router = express.Router()

router.get('/get/single/:societyId', verifyToken, getSociety)
router.get('/get/all', verifyToken, verifyEmployee, getSocieties)
router.get('/search', verifyToken, verifyEmployee, searchSociety)
router.get('/filter', verifyToken, verifyEmployee, filterSociety)

router.post('/create', verifyToken, verifyManager, createSociety)

router.put('/update/:societyId', verifyToken, verifyManager, updateSociety)

router.delete('/delete/:societyId', verifyToken, verifyManager, deleteSociety)
router.delete('/delete-whole-collection', deleteWholeCollection)

export default router