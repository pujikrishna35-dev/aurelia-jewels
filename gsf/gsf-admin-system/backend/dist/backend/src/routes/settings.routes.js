"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const settings_controller_1 = require("../controllers/settings.controller");
const router = (0, express_1.Router)();
router.get('/settings', (req, res) => settings_controller_1.settingsController.getSettings(req, res));
router.patch('/settings', (req, res) => settings_controller_1.settingsController.updateSettings(req, res));
exports.default = router;
