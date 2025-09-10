import express from "express";
import { getTranscript, createtranscript, deleteTranscript, getTranscripts, updateTranscript } from "../controllers/transcript.js";
import { verifyEmployee, verifyManager, verifySuperAdmin, verifyToken } from '../middleware/auth.js'

const router = express.Router()

router.get('/get/single/:transcriptId', verifyToken, verifyEmployee, getTranscript, verifyManager)
router.get('/get/all', verifyToken, verifySuperAdmin, getTranscripts, verifyManager)

router.post('/create', verifyToken, verifyManager, verifySuperAdmin, createtranscript)

router.put('/update/:transcriptId', verifyToken, verifyManager, verifySuperAdmin, updateTranscript)

router.delete('/delete/:transcriptId', deleteTranscript)

export default router