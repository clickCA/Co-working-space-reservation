
/**
 * @swagger
 * components:
 *  schemas:
 *   Reservation:
*      type: object
*      required:
*        - reservationDate
*        - user
*        - coworkingSpace
*      properties:
*        reservationDate:
*          type: string
*          format: date
*          description: The date of the reservation
*        user:
*          type: string
*          description: The user making the reservation
*          example: 661b715521a3ed83468ea579
*        coworkingSpace:
*          type: string
*          description: The coworking space being reserved
*          example: 661b715521a3ed83468ea579
*        createdAt:
*          type: string
*          format: date
*          description: The date the reservation was created
*      example:
*        reservationDate: 2021-06-01
*        user: 661b715521a3ed83468ea579
*        coworkingSpace: 662b4e52b2d1dc12fd194d00
 */
      
/**
 * @swagger
 * tags:
 *   name: Reservations
 *   description: API endpoints for managing reservations
 */


/**
 * @swagger
 * /reservations:
 *   get:
 *     summary: Get all reservations
 *     tags: [Reservations]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Reservation'
 *   post:
 *     summary: Create a new reservation
 *     tags: [Reservations]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Reservation'
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reservation'
 * /reservations/{id}:
 *   get:
 *     summary: Get a reservation by ID
 *     tags: [Reservations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Reservation ID
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reservation'
 *   put:
 *     summary: Update a reservation
 *     tags: [Reservations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Reservation ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Reservation'
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reservation'
 *   delete:
 *     summary: Delete a reservation
 *     tags: [Reservations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Reservation ID
 *     responses:
 *       204:
 *         description: No Content
 */


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



router
  .route("/")
  .get(protect, getReservations)
  .post(protect, authorize("user", "admin"), addReservation);


router
  .route("/:id")
  .get(protect, getReservation)
  .put(protect, authorize("user", "admin"), updateReservation)
  .delete(protect, authorize("user", "admin"), deleteReservation);

module.exports = router;
