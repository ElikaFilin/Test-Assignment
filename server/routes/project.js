import express from 'express'
import { createProject, getProject, getProjects, updateProject, deleteProject, deleteWholeCollection, searchProject, filterProject } from '../controllers/project.js'
import { verifyEmployee, verifyManager, verifyToken } from '../middleware/auth.js'

const router = express.Router()

router.get('/get/single/:projectId', verifyToken, getProject)
router.get('/get/all', getProjects)
router.get('/search', verifyToken, verifyEmployee, searchProject)
router.get('/filter', verifyToken, verifyEmployee, filterProject)

router.post('/create', verifyToken, verifyManager, createProject)

router.put('/update/:projectId', verifyToken, verifyManager, updateProject)

router.delete('/delete/:projectId', verifyToken, verifyManager, deleteProject)
router.delete('/delete-whole-collection', deleteWholeCollection)

export default router