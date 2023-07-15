const express = require('express');

const instrumentController = require('./../controllers/instrument-controller');

const instrumentRouter = express.Router();

instrumentRouter.route('/')
                      .get(instrumentController.getAllInstruments)
                      .post(instrumentController.insertInstrument);
instrumentRouter.route('/:instrumentName')
                        .delete(instrumentController.deleteInstrument);
instrumentRouter.route('/:category')
                        .get(instrumentController.getCategoryInstruments);
instrumentRouter.route('/c/categories')
                    .get(instrumentController.getCategories);

module.exports = instrumentRouter;