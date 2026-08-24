import { Request, Response } from 'express';
import { cmsStore, initialBranches, saveDatabase } from '../config/database';

/** Ensure cmsStore.branches is always initialised */
const getBranchesStore = () => {
  if (!Array.isArray(cmsStore.branches)) {
    cmsStore.branches = [...initialBranches];
  }
  return cmsStore.branches as any[];
};

/**
 * GET /api/branches
 * Public – list all branch locations
 */
export const getBranches = async (req: Request, res: Response) => {
  try {
    return res.json({ success: true, data: getBranchesStore() });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: 'Failed to retrieve branches: ' + err.message });
  }
};

/**
 * POST /api/branches
 * Admin – add a new branch location
 */
export const createBranch = async (req: Request, res: Response) => {
  try {
    const { name, city, phone, rawPhone, address, timings, email, lat, lng } = req.body;

    if (!name || !city || !address) {
      return res.status(400).json({ success: false, message: 'Name, city, and address are required.' });
    }

    const id = (name as string)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');

    const branches = getBranchesStore();

    if (branches.find((b: any) => b.id === id)) {
      return res.status(409).json({ success: false, message: `A branch with id "${id}" already exists. Use a unique name.` });
    }

    const newBranch = {
      id,
      name,
      city,
      phone: phone || '',
      rawPhone: rawPhone || (phone || '').replace(/\D/g, ''),
      address,
      timings: timings || '9:30 AM - 6:30 PM',
      email: email || '',
      lat: Number(lat) || 0,
      lng: Number(lng) || 0
    };

    branches.push(newBranch);
    await saveDatabase();

    return res.status(201).json({ success: true, data: newBranch, message: `Branch "${name}" created successfully.` });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: 'Failed to create branch: ' + err.message });
  }
};

/**
 * PUT /api/branches/:id
 * Admin – update an existing branch location
 */
export const updateBranch = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const branches = getBranchesStore();
    const idx = branches.findIndex((b: any) => b.id === id);

    if (idx === -1) {
      return res.status(404).json({ success: false, message: `Branch "${id}" not found.` });
    }

    const { name, city, phone, rawPhone, address, timings, email, lat, lng } = req.body;

    branches[idx] = {
      ...branches[idx],
      name: name ?? branches[idx].name,
      city: city ?? branches[idx].city,
      phone: phone ?? branches[idx].phone,
      rawPhone: rawPhone ?? branches[idx].rawPhone,
      address: address ?? branches[idx].address,
      timings: timings ?? branches[idx].timings,
      email: email ?? branches[idx].email,
      lat: lat !== undefined ? Number(lat) : branches[idx].lat,
      lng: lng !== undefined ? Number(lng) : branches[idx].lng
    };

    await saveDatabase();

    return res.json({ success: true, data: branches[idx], message: `Branch "${branches[idx].name}" updated successfully.` });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: 'Failed to update branch: ' + err.message });
  }
};

/**
 * DELETE /api/branches/:id
 * Admin – remove a branch location
 */
export const deleteBranch = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const branches = getBranchesStore();
    const idx = branches.findIndex((b: any) => b.id === id);

    if (idx === -1) {
      return res.status(404).json({ success: false, message: `Branch "${id}" not found.` });
    }

    const [removed] = branches.splice(idx, 1);
    await saveDatabase();

    return res.json({ success: true, message: `Branch "${removed.name}" deleted successfully.` });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: 'Failed to delete branch: ' + err.message });
  }
};
