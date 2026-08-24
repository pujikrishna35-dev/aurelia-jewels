import { Request, Response } from 'express';
import { leadService } from '../services/lead.service';

export const getDashboardStats = (req: Request, res: Response) => {
  const stats = leadService.getDashboardStats();
  return res.json({ success: true, data: stats });
};
