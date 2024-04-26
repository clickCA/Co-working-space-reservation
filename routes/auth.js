const express = require("express");
const { register, login, logout, getMe } = require("../controllers/auth");

const router = express.Router();

const { protect } = require("../middleware/auth");
/**
 * @swagger
 * /auth/me:
 *   get:
 *     summary: Get current user
 *     description: Get the details of the currently logged in user.
 *     tags:
 *       - auth
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /auth/logout:
 *   get:
 *     summary: Logout user
 *     description: Logout the currently logged in user.
 *     tags:
 *       - auth
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: User login
 *     description: Login a user with email and password.
 *     tags:
 *       - auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               email: s@gmail.com
 *               password: 5465464ads
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: User registration
 *     description: Register a new user.
 *     tags:
 *       - auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               name:
 *                 type: string
 *               password:
 *                 type: string
 *               telephone:
 *                 type: string
 *               role:
 *                 type: string
 *             example:
 *               email: s@gmail.com
 *               name: p
 *               password: 5465464ads
 *               telephone: 092-253-0275
 *               role: admin
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 */
router.post("/register", register);
router.post("/login", login);
router.get("/me", protect, getMe);
router.get("/logout", logout);

module.exports = router;
