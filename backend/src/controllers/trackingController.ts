import { Request, Response } from 'express';
import { createTrackingService } from '../services/trackingService';

export const createTracking = async (req: Request, res: Response) => {
  try {
    const { email, coinSymbol, intervalMin } = req.body;
    const tracking = await createTrackingService(email, coinSymbol, intervalMin);
    res.status(201).json(tracking);
  } catch (error: any) {
    res.status(400).json({ error: error.message || 'Erro ao cadastrar acompanhamento.' });
  }
};
