"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFollowUps = void 0;
const lead_service_1 = require("../services/lead.service");
const getFollowUps = (req, res) => {
    const followUps = lead_service_1.leadService.getAllFollowUps();
    const todayStr = new Date().toISOString().split('T')[0];
    const today = followUps.filter(f => f.date === todayStr);
    const upcoming = followUps.filter(f => f.date > todayStr);
    const overdue = followUps.filter(f => f.date < todayStr && f.status === 'Pending');
    return res.json({
        success: true,
        data: {
            all: followUps,
            today,
            upcoming,
            overdue
        }
    });
};
exports.getFollowUps = getFollowUps;
