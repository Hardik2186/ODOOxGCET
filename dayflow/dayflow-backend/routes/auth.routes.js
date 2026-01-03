const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const upload = require('../middleware/upload.middleware');

// Register can accept multipart/form-data (logo)
router.post('/register', upload.single('logo'), authController.register);
router.post('/login', authController.login);
router.get('/verify-email', authController.verifyEmail);
module.exports = router;
