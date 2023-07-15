const express = require('express');

const eventController = require('./../controllers/event-controller');

const eventRouter = express.Router();

eventRouter.route('/')
                      .get(eventController.getAllEvents)
                      .post(eventController.insertEvent);
eventRouter.route('/:id')
                        .delete(eventController.deleteEvent);
eventRouter.route('/s/:status')
                        .get(eventController.getStatusEvents);
eventRouter.route('/c/:category')
                    .get(eventController.getCategoryEvents);
eventRouter.route('/i/:instrumentName')
                    .get(eventController.getInstrumentEvents);

module.exports = eventRouter;