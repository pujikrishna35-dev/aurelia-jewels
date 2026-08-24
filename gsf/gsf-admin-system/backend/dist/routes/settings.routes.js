"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const settings_controller_1 = require("../controllers/settings.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
// Previously fully public — anyone could read or overwrite admin
// notification settings with no login at all.
router.get('/settings', auth_middleware_1.authenticateAdmin, (req, res) => settings_controller_1.settingsController.getSettings(req, res));
router.patch('/settings', auth_middleware_1.authenticateAdmin, (req, res) => settings_controller_1.settingsController.updateSettings(req, res));
exports.default = router;
