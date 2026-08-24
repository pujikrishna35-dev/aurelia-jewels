"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const otp_controller_1 = require("../controllers/otp.controller");
const router = (0, express_1.Router)();
router.post('/otp/send', (req, res) => otp_controller_1.otpController.sendOtp(req, res));
router.post('/otp/verify', (req, res) => otp_controller_1.otpController.verifyOtp(req, res));
exports.default = router;
