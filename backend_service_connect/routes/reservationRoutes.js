const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');
const verifyAuth = require('../middlewares/verifyAuth');

router.post('/', verifyAuth,reservationController.createReservation);

router.get('/', reservationController.getAllReservations);

router.get('/:id', reservationController.getReservationById);

router.put('/:id', reservationController.updateReservationStatus);

router.delete('/:id', reservationController.deleteReservation);

module.exports = router;
