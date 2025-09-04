import express from 'express';
import Task from '../models/Task.js';
import verifyToken from '../middleware/verifyToken.js';
import { AddTask, AllTasks, DeleteTask, UpdateTask } from '../controllers/task.controller.js';

const router = express.Router();
router.use(verifyToken);

router.get('/all-tasks', verifyToken, AllTasks);

router.post('/',verifyToken, AddTask);

// update task
router.put('/:id', verifyToken, UpdateTask);

// delete task
router.delete('/:id', verifyToken, DeleteTask);

export default router;