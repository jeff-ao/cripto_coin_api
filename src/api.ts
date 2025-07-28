import 'reflect-metadata';
import express from "express";
import cors from "cors";
import 'dotenv/config';
import morgan from 'morgan';
import userRoutes from './routes/userRoutes'

const app = express();

app.use(cors());

app.use(express.json());
app.use(morgan('dev'));
app.use('/user', userRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'API rodando!' });
});

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err);
  res.status(500).json({ error: 'Erro interno do servidor' });
});

app.listen(3333, () => {
  console.log("Servidor rodando na porta 3333");
});

export default app;
