import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export const signupService = async (email: string, password: string) => {
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) throw new Error('Email já cadastrado');
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { email, password: hashedPassword }
  });
  return { id: user.id, email: user.email };
};

export const loginService = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error('Usuário não encontrado');
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error('Senha incorreta');
  return { id: user.id, email: user.email };
};
