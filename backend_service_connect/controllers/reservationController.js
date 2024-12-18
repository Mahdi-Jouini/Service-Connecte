const db = require('../models/');

const {User, Provider } = require('../models');


exports.createReservation = async (req, res) => {

    const sender = req.user.id
    const { receiver, date } = req.body;
    console.log(date);
    
    if (!sender || !receiver || !date) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newReservation = await db.Reservation.create({ sender, receiver, date });
    res.status(201).json(newReservation);

};

exports.getAllReservations = async (req, res) => {
  try {
    const { status } = req.query; // Get the status from query params
    const whereClause = status ? { status } : {};

    const reservations = await db.Reservation.findAll({
      where: whereClause,
      include: [
        { model: db.User, as: 'senderUser', attributes: ['name', 'surname', 'email', 'phone', 'photo', 'location'],},
        { model: Provider, as: 'receiverProvider' },
      ],
    });
    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving reservations', error });
  }
};

// Get a single reservation by ID
exports.getReservationById = async (req, res) => {
  try {
    const { id } = req.params;
    const reservation = await db.Reservation.findByPk(id, {
      include: [
        { model: User, as: 'senderUser' },
        { model: Provider, as: 'receiverProvider' }
      ]
    });

    if (!reservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }

    res.status(200).json(reservation);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving reservation', error });
  }
};

// Update reservation status
exports.updateReservationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['en attente', 'rejeté', 'approuvé'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    const reservation = await db.Reservation.findByPk(id);
    if (!reservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }

    reservation.status = status;
    await reservation.save();

    res.status(200).json(reservation);
  } catch (error) {
    res.status(500).json({ message: 'Error updating reservation', error });
  }
};

// Delete a reservation
exports.deleteReservation = async (req, res) => {
  try {
    const { id } = req.params;

    const reservation = await db.Reservation.findByPk(id);
    if (!reservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }

    await reservation.destroy();
    res.status(200).json({ message: 'Reservation deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting reservation', error });
  }
};
