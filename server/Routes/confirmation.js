const express = require('express');
const router = express.Router();
const confirmationController = require('../Controllers/confirmationController.js');

// Email Confirmation
router.post("/verify/:token", async (req, res) => {
    confirmationController.confirmationPost(req,res);
})

router.post ("/resend", async (req, res) => {
    confirmationController.resendTokenPost(req,res);
})

router.put ("/reset/:token", async (req, res) => {
    confirmationController.resetPut(req,res);
})

router.post ("/reset", async (req, res) => {
    confirmationController.sendResetPost(req,res);
})


module.exports = router;