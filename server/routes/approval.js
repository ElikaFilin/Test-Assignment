import express from 'express'

import { getApproval, getApprovals,   createVoucherApproval,  createRefundApproval,  deleteApproval, deleteWholeCollection, acceptVoucherApproval, rejectVoucherApproval } from '../controllers/approval.js'
import { verifyToken, verifyEmployee, verifyManager } from '../middleware/auth.js'
const router = express.Router()

router.get('/get/single/:approvalId', getApproval)
router.get('/get/all', getApprovals)


router.post('/create/voucher', verifyToken, verifyEmployee, createVoucherApproval)
router.post('/accept/voucher/:approvalId', verifyToken, verifyManager, acceptVoucherApproval)
router.post('/reject/voucher/:approvalId', verifyToken, verifyManager, rejectVoucherApproval)

router.post('/create/refund', verifyToken, verifyEmployee, createRefundApproval)

router.delete('/delete/:approvalId', verifyToken, verifyEmployee, deleteApproval)
router.delete('/delete-whole-collection', deleteWholeCollection)

export default router