import { Request, Response } from 'express';
import { signupService, loginService } from '../services/userService';

export const signup = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await signupService(email, password);
    res.status(201).json(user);
  } catch (error: any) {
    res.status(400).json({ error: error.message || 'Erro ao cadastrar usuário.' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await loginService(email, password);
    res.status(200).json(user);
  } catch (error: any) {
    let message = 'Erro ao autenticar usuário.';
    if (error.message === 'Usuário não encontrado') message = 'Usuário não encontrado. Verifique o email.';
    if (error.message === 'Senha incorreta') message = 'Senha incorreta. Tente novamente.';
    res.status(401).json({ error: message });
  }
};
