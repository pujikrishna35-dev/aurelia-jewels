"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const notification_controller_1 = require("../controllers/notification.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
// Previously fully public — anyone could read the live feed of every new
// lead (student name, destination, university) with no login at all.
router.get('/notifications', auth_middleware_1.authenticateAdmin, (req, res) => notification_controller_1.notificationController.getNotifications(req, res));
router.get('/notifications/unread-count', auth_middleware_1.authenticateAdmin, (req, res) => notification_controller_1.notificationController.getUnreadCount(req, res));
router.patch('/notifications/read-all', auth_middleware_1.authenticateAdmin, (req, res) => notification_controller_1.notificationController.markAllAsRead(req, res));
router.patch('/notifications/:id/read', auth_middleware_1.authenticateAdmin, (req, res) => notification_controller_1.notificationController.markAsRead(req, res));
exports.default = router;
