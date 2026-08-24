"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const analytics_controller_1 = require("../controllers/analytics.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
// GET is protected so only logged-in CRM users can see pipeline graphs
router.get('/stats', auth_middleware_1.authenticateAdmin, analytics_controller_1.getAnalyticsStats);
exports.default = router;
