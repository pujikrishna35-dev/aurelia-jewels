"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cms_controller_1 = require("../controllers/cms.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
// GET is public so the main website can fetch content dynamically
router.get('/:key', cms_controller_1.getCmsByKey);
// PUT is protected so only authenticated admins can save edits
router.put('/:key', auth_middleware_1.authenticateAdmin, cms_controller_1.updateCmsByKey);
exports.default = router;
