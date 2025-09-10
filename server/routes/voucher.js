import express from 'express'
import { createVoucher, getVoucher, getVouchers,getEmployeeVouchers, deleteVoucher, deleteWholeCollection } from '../controllers/voucher.js'
import { verifyEmployee, verifyManager, verifyToken } from '../middleware/auth.js'

const router = express.Router()

router.get('/get/single/:voucherId', verifyToken, verifyEmployee, getVoucher)
router.get('/get/employee', verifyToken, verifyEmployee, getEmployeeVouchers)
router.get('/get/all', verifyToken, verifyEmployee, getVouchers)

router.post('/create', verifyToken, verifyEmployee, createVoucher)

router.delete('/delete/:voucherId', verifyToken, verifyEmployee, deleteVoucher)
router.delete('/delete-whole-collection', verifyToken, verifyEmployee, deleteWholeCollection)

export default router