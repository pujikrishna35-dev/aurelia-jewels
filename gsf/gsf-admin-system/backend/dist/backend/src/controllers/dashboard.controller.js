"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDashboardStats = void 0;
const lead_service_1 = require("../services/lead.service");
const getDashboardStats = (req, res) => {
    const stats = lead_service_1.leadService.getDashboardStats();
    return res.json({ success: true, data: stats });
};
exports.getDashboardStats = getDashboardStats;
