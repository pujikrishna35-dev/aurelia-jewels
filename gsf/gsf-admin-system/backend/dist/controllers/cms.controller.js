"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCmsByKey = exports.getCmsByKey = void 0;
const database_1 = require("../config/database");
const getCmsByKey = (req, res) => {
    const { key } = req.params;
    if (!key) {
        return res.status(400).json({ success: false, message: 'CMS key is required.' });
    }
    const data = database_1.cmsStore[key] || null;
    return res.json({ success: true, key, data });
};
exports.getCmsByKey = getCmsByKey;
const updateCmsByKey = (req, res) => {
    const { key } = req.params;
    const { data } = req.body;
    if (!key) {
        return res.status(400).json({ success: false, message: 'CMS key is required.' });
    }
    if (data === undefined) {
        return res.status(400).json({ success: false, message: 'CMS data is required.' });
    }
    database_1.cmsStore[key] = data;
    (0, database_1.saveDatabase)();
    return res.json({
        success: true,
        message: `CMS category "${key}" updated successfully.`,
        data: database_1.cmsStore[key]
    });
};
exports.updateCmsByKey = updateCmsByKey;
