const { Reservation, User, Provider } = require('../models');

const createReservation = async (senderId, receiverId, date) => {
  try {
    const sender = await User.findByPk(senderId);
    const receiver = await Provider.findByPk(receiverId);

    if (!sender || !receiver) {
      throw new Error('Sender or Receiver not found');
    }

    const reservation = await Reservation.create({
      sender: senderId,
      receiver: receiverId,
      date,
    });

    return reservation;
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteReservation = async (reservationId) => {
  try {
    const reservation = await Reservation.findByPk(reservationId);

    if (!reservation) {
      throw new Error('Reservation not found');
    }

    await reservation.destroy();
    return { message: 'Reservation deleted successfully' };
  } catch (error) {
    throw new Error(error.message);
  }
};

const findReservationsByUserId = async (userId) => {
  try {
    const reservations = await Reservation.findAll({
      where: {
        [Op.or]: [{ sender: userId }, { receiver: userId }],
      },
      include: [
        { model: User, as: 'senderUser' },
        { model: Provider, as: 'receiverProvider' },
      ],
    });

    return reservations;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  createReservation,
  deleteReservation,
  findReservationsByUserId,
};
