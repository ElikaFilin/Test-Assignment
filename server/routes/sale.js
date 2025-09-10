import express from 'express'
import { createSale, getSale, getEmployeeSales, getSales, getLeadSales, updateSale, deleteSale, deleteWholeCollection } from '../controllers/sale.js'
import { verifyEmployee, verifyToken } from '../middleware/auth.js'

const router = express.Router()

router.get('/get/single/:saleId', verifyToken, verifyEmployee, getSale)
router.get('/get/all', verifyToken, verifyEmployee, getSales)
router.get('/get/employee', verifyToken, verifyEmployee, getEmployeeSales)
router.get('/get/lead', verifyToken, verifyEmployee, getLeadSales)

router.post('/create', verifyToken, verifyEmployee, createSale)

router.put('/update/:saleId', verifyToken, verifyEmployee, updateSale)

router.delete('/delete/:saleId', verifyToken, verifyEmployee, deleteSale)
router.delete('/delete-whole-collection', deleteWholeCollection)

export default router