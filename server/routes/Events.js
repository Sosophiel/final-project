import express from 'express';
import {createEvent, deleteEvent} from '../controllers/Events.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();


router.post('/:userId', createEvent)
router.delete('/:eventId', deleteEvent);

export default router