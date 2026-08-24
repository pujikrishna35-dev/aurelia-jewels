"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const followup_controller_1 = require("../controllers/followup.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
router.get('/follow-ups', auth_middleware_1.authenticateAdmin, followup_controller_1.getFollowUps);
exports.default = router;
