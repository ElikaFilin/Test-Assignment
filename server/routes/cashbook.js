import express from 'express'
import { createCashbook,getEmployeeCashbooks, getCashbook, getLeadCashbooks, getSpecificDateCashbook, getIncomeAndExpenses, getPaymentsStat, getCashbooks, deleteCashbook, deleteWholeCollection } from '../controllers/cashbook.js'
import { verifyEmployee, verifyManager, verifyToken } from '../middleware/auth.js'

const router = express.Router()

router.get('/get/single/:cashbookId', verifyToken, verifyEmployee, getCashbook)
router.get('/get/all', verifyToken, verifyEmployee, getCashbooks)
router.get('/get/employee', verifyToken, verifyEmployee, getEmployeeCashbooks)
router.get('/get/lead', verifyToken, verifyEmployee, getLeadCashbooks)
router.get('/get/date/:date', verifyToken, verifyEmployee, getSpecificDateCashbook)
router.get('/get/income_and_expenses', getIncomeAndExpenses)
router.get('/get/payments', verifyToken, verifyEmployee, getPaymentsStat)

router.post('/create', verifyToken, verifyEmployee, createCashbook)

router.delete('/delete/:cashbookId', verifyToken, verifyEmployee, deleteCashbook)
router.delete('/delete-whole-collection', verifyToken, verifyEmployee, deleteWholeCollection)

export default router