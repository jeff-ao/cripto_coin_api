import { Router, Request, Response } from 'express';
import { getCryptoPrices } from '../services/coinService';

const router = Router();

let lastPrices: any = null;

router.get('/', async (req: Request, res: Response) => {
  try {
    const prices = await getCryptoPrices();
    let diff: any = {};
    if (lastPrices) {
      for (const coin in prices) {
        if (lastPrices[coin]) {
          diff[coin] = prices[coin].brl - lastPrices[coin].brl;
        }
      }
    }
    lastPrices = prices;
    res.json({ atual: prices, anterior: lastPrices, diferenca: diff });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
