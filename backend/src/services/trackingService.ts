import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createTrackingService = async (email: string, coinSymbol: string, intervalMin: number) => {
  const coin = await prisma.coin.findUnique({ where: { symbol: coinSymbol } });
  if (!coin) throw new Error('Moeda não encontrada');
  const tracking = await prisma.tracking.create({
    data: {
      email,
      coinId: coin.id,
      intervalMin
    }
  });
  return {
    id: tracking.id,
    email: tracking.email,
    coinSymbol,
    intervalMin: tracking.intervalMin,
    createdAt: tracking.createdAt
  };
};
