"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const branch_controller_1 = require("../controllers/branch.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
// Public – anyone can fetch branches (used on public website map)
router.get('/', branch_controller_1.getBranches);
// Admin-protected – create, update, delete
router.post('/', auth_middleware_1.authenticateAdmin, branch_controller_1.createBranch);
router.put('/:id', auth_middleware_1.authenticateAdmin, branch_controller_1.updateBranch);
router.delete('/:id', auth_middleware_1.authenticateAdmin, branch_controller_1.deleteBranch);
exports.default = router;
