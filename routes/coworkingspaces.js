const express = require("express");
const appointmentRouter = require("./reservations");
const { protect, authorize } = require("../middleware/auth");

/**
 * @swagger
 * tags:
 *  name: CoworkingSpaces
 *  description: The coworking spaces managing API
 */
/**
 * @swagger
 * /coworkingspaces:
 *  get:
 *    summary: Returns the list of all the coworking spaces
 *    tags: [CoworkingSpaces]
 *    responses:
 *      200:
 *        description: The list of the coworking spaces
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/CoworkingSpace'
 */
/**
 * @swagger
 * /coworkingspaces/{id}:
 *  get:
 *    summary: Get the coworking space by id
 *    tags: [CoworkingSpaces]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The coworking space id
 *    responses:
 *      200:
 *        description: The coworking space description by id
 *        contents:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CoworkingSpace'
 *      404:
 *        description: The coworking space was not found
 */
/**
 * @swagger
 * /coworkingspaces:
 *   post:
 *     summary: Create a new coworking space
 *     tags: [CoworkingSpaces]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CoworkingSpace'
 *     responses:
 *       201:
 *         description: The coworking space was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CoworkingSpace'
 *       500:
 *         description: Some server error
 */
/**
 * @swagger
 * /coworkingspaces/{id}:
 *  put:
 *    summary: Update the coworking space by the id
 *    tags: [CoworkingSpaces]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The coworking space id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/CoworkingSpace'
 *    responses:
 *      200:
 *        description: The coworking space was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CoworkingSpace'
 *      404:
 *        description: The coworking space was not found
 *      500:
 *        description: Some error happened
 */
/**
 * @swagger
 * /coworkingspaces/{id}:
 *    delete:
 *      summary: Remove the coworking space by id
 *      tags: [CoworkingSpaces]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: The coworking space id
 *
 *    responses:
 *      200:
 *        description: The coworking space was deleted
 *      404:
 *        description: The coworking space was not found
 */

const {
  getCoworkingSpaces,
  getCoworkingSpace,
  createCoworkingSpace,
  updateCoworkingSpace,
  deleteCoworkingSpace,
} = require("../controllers/coworkingspaces");
//Include other resource routers

const router = express.Router({ mergeParams: true });

//Re-route into other resource routers
router.use("/:coworkingSpaceId/appointments", appointmentRouter);

router
  .route("/")
  .get(getCoworkingSpaces)
  .post(protect, authorize("admin"), createCoworkingSpace);


router
  .route("/:id")
  .get(getCoworkingSpace)
  .put(protect, authorize("admin"), updateCoworkingSpace)
  .delete(protect, authorize("admin"), deleteCoworkingSpace);

module.exports = router;
