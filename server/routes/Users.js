import express from 'express';
import {register, login, getUsers, updateUser, deleteUser} from '../controllers/Users.js';
import {createEvent, getEvents, updateEvent, deleteEvent} from '../controllers/Events.js';
import {createEventDetail, getEventDetails, updateEventDetail, deleteEventDetail} from '../controllers/EventDetails.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();


router.post('/login', login);
router.post('/register', register);
router.get('/', getUsers);
router.put('/:userId', updateUser)
router.delete('/:userId', deleteUser)

//events
router.get('/:userId/events', getEvents);
router.post('/:userId/events', createEvent);
router.put('/:userId/events/:eventId', updateEvent);
router.delete('/:userId/events/:eventId', deleteEvent);

//event details
router.get('/:userId/events/:eventId/detail', getEventDetails);
router.post('/:userId/events/:eventId/detail', createEventDetail);
router.put('/:userId/events/:eventId/detail/:eventDetailId', updateEventDetail);
router.delete('/:userId/events/:eventId/detail/:eventDetailId', deleteEventDetail);




router.get('/token',verifyToken, (req,res) => {
    res.status(200).json({access_token})
})

export default router