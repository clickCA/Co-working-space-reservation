const Reservation = require("../models/Reservation");
const CoworkingSpace = require("../models/CoworkingSpace");

//@desc     Get all reservations
//@route    GET /api/v1/reservations
//@access   Private
exports.getReservations = async (req, res, next) => {
  let query;
  //General users can only see their own reservations!
  if (req.user.role !== "admin") {
    query = Reservation.find({ user: req.user.id }).populate({
      path: "coworkingSpace",
      select: "name address tel",
    });
  } else {
    query = Reservation.find().populate({
      path: "coworkingSpace",
      select: "name address tel",
    });
  }
  try {
    const reservations = await query;
    res
      .status(200)
      .json({ success: true, count: reservations.length, data: reservations });
  } catch (err) {
    console.log(err.stack);
    return res
      .status(500)
      .json({ success: false, message: "Cannot find Reservation" });
  }
};

//@desc     Get single reservation
//@route    GET /api/v1/reservations/:id
//@access   Public
exports.getReservation = async (req, res, next) => {
  try {
    const reservation = await Reservation.findById(req.params.id).populate({
      path: "coworkingSpace",
      select: "name address tel",
    });

    if (!reservation) {
      return res.status(404).json({
        success: false,
        message: `No reservation with the id of ${req.params.id}`,
      });
    }
    res.status(200).json({ success: true, data: reservation });
  } catch (err) {
    console.log(err.stack);
    return res
      .status(500)
      .json({ success: false, message: "Cannot find Reservation" });
  }
};

//@desc     Add a reservation
//@route    POST /api/v1/reservations
//@access   Private
exports.addReservation = async (req, res, next) => {
  try {
    // Check if the date is in a valid format
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(req.body.reservationDate)) {
      return res.status(400).json({
        success: false,
        message: "Invalid date format. Please use the format YYYY-MM-DD",
      });
    }

    const coworkingspace = await CoworkingSpace.findById(req.body.coworkingSpace);

    if (!coworkingspace) {
      return res.status(404).json({
        success: false,
        message: `No CoworkingSpace with the id of ${req.body.coworkingSpaceId}`,
      });
    }
    //Check for existing reservation
    const existingReservation = await Reservation.find({ user: req.body.user });
    //If the user is not an admin, they can only create 3 reservations.
    if (existingReservation.length >= 3 && req.user.role !== "admin") {
      return res.status(400).json({
        success: false,
        message: `The user with ID ${req.user.id} has already made 3 reservations`,
      });
    }

    
    const reservation = await Reservation.create(req.body);
    res.status(201).json({
      success: true,
      data: reservation,
    });
  } catch (err) {
    console.log(err.stack);
    return res
      .status(500)
      .json({ success: false, message: "Cannot add Reservation" });
  }
};

//@desc     Update single reservation
//@route    PUT /api/v1/reservations/:id
//@access   Private
exports.updateReservation = async (req, res, next) => {
  try {
    var reservation = await Reservation.findById(req.params.id);

    if (!reservation) {
      return res
        .status(404)
        .json({ success: false, message: `No reservation with id ${req.params.id}` });
    }

    //Make sure user is reservation owner
    if (
      reservation.user.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(401).json({
        success: false,
        message: `User ${req.user.id} is not authorized to update this reservation`,
      });
    }

    reservation = await Reservation.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, data: reservation });
  } catch (err) {
    console.log(err.stack);
    return res
      .status(500)
      .json({ success: false, message: "Cannot update Reservation" });
  }
};

//@desc     Delete reservation
//@route    DELETE /api/v1/reservations/:id
//@access   Private
exports.deleteReservation = async (req, res, next) => {
  try {
    const reservation = await Reservation.findById(req.params.id);

    if (!reservation) {
      return res
        .status(404)
        .json({ success: false, message: `No reservation with id ${req.params.id}` });
    }

    //Make sure user is reservation owner
    if (
      reservation.user.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(401).json({
        success: false,
        message: `User ${req.user.id} is not authorized to delete this reservation`,
      });
    }

    await reservation.remove();

    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    console.log(err.stack);
    return res
      .status(500)
      .json({ success: false, message: "Cannot delete Reservation" });
  }
};
