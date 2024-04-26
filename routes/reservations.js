const express = require("express");
const { protect, authorize } = require("../middleware/auth");

const {
  getReservations,
  getReservation,
  addReservation,
  updateReservation,
  deleteReservation,
} = require("../controllers/reservations");

const router = express.Router({ mergeParams: true });



/**
 * @swagger
 * components:
 *  schemas:
 *   Reservation:
 *    type: object
 *   required:
 *    - reservationDate
 *    - user
 *    - coworkingSpace
 *   properties:
 *    reservationDate:
 *      type: string
 *      format: date
 *      description: The date of the reservation
 *    user:
 *      type: string
 *      description: The userId making the reservation
 *      example: 661b715521a3ed83468ea579
 *    coworkingSpace:
 *      type: string
 *      description: The coworking space id being reserved
 *      example: 661b715521a3ed83468ea579
 *   createdAt:
 *      type: string
 *      format: date
 *      description: The date the reservation was created
 *  example:
 *   reservationDate: 2021-06-01
 *  user: 5d
 * coworkingSpace: 5d
 */
      
/**
 * @swagger
 * tags:
 *   name: Reservations
 *   description: API endpoints for managing reservations
 */

router
  .route("/")
  .get(protect, getReservations)
  .post(protect, authorize("user", "admin"), addReservation);

/**
 * @swagger
 * /reservations/{id}:
 *   get:
 *     summary: Get a reservation by ID
 *     tags: [Reservations]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *   put:
 *     summary: Update a reservation
 *     tags: [Reservations]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *   delete:
 *     summary: Delete a reservation
 *     tags: [Reservations]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 */


router
  .route("/:id")
  .get(protect, getReservation)
  .put(protect, authorize("user", "admin"), updateReservation)
  .delete(protect, authorize("user", "admin"), deleteReservation);

module.exports = router;
