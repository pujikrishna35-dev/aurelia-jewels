import { Request, Response } from 'express';
import { cmsStore, saveDatabase } from '../config/database';

export const getCmsByKey = (req: Request, res: Response) => {
  const { key } = req.params;
  
  if (!key) {
    return res.status(400).json({ success: false, message: 'CMS key is required.' });
  }

  const data = cmsStore[key] || null;
  return res.json({ success: true, key, data });
};

export const updateCmsByKey = (req: Request, res: Response) => {
  const { key } = req.params;
  const { data } = req.body;

  if (!key) {
    return res.status(400).json({ success: false, message: 'CMS key is required.' });
  }

  if (data === undefined) {
    return res.status(400).json({ success: false, message: 'CMS data is required.' });
  }

  cmsStore[key] = data;
  saveDatabase();

  return res.json({
    success: true,
    message: `CMS category "${key}" updated successfully.`,
    data: cmsStore[key]
  });
};
