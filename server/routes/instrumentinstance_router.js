const express = require('express');

const instrumentinstanceController = require('./../controllers/instrumentinstance-controller');

const instrumentinstanceRouter = express.Router();

instrumentinstanceRouter.route('/')
                      .get(instrumentinstanceController.getAllInstances)
                      .post(instrumentinstanceController.insertInstance);
instrumentinstanceRouter.route('/:instrumentName')
                        .get(instrumentinstanceController.getInstrumentInstance);
instrumentinstanceRouter.route('/:id')
                        .delete(instrumentinstanceController.deleteInstrumentInstance);

module.exports = instrumentinstanceRouter;