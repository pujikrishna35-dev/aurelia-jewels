import { Request, Response } from 'express';
import { leadService } from '../services/lead.service';

export const getFollowUps = (req: Request, res: Response) => {
  const followUps = leadService.getAllFollowUps();
  
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
