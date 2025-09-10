import express from 'express'
import { createDeduction, getDeductions, deleteDeduction, updateDeduction } from '../controllers/deduction.js'
import { verifyEmployee, verifyManager, verifySuperAdmin, verifyToken } from '../middleware/auth.js'

const router = express.Router()

router.get('/get/single/:deductionId', verifyToken, verifyEmployee, getDeductions, verifyManager)
router.get('/get/all', verifyToken, verifySuperAdmin, getDeductions, verifyManager)

router.post('/create', createDeduction)

router.put('/update/:deductionId', verifyToken, verifyManager, verifySuperAdmin, updateDeduction)

router.delete('/delete/:deductionId', verifyToken, verifyManager, verifySuperAdmin, deleteDeduction)

export default router