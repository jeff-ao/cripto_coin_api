import "reflect-metadata";
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import "dotenv/config";
import morgan from "morgan";
import nodemailer from "nodemailer";
import fetch from "node-fetch";
import * as cron from "node-cron";

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "API rodando!" });
});

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const tarefas: cron.ScheduledTask[] = [];

const enviarCotacao = async (req: Request, res: Response) => {
  const { email, moeda, intervalo } = req.body;

  if (!email || !moeda || !intervalo) {
    return res.status(400).json({ error: "Informe email, moeda e intervalo" });
  }

  const intervaloNum = Number(intervalo);
  if (isNaN(intervaloNum) || intervaloNum <= 0 || intervaloNum > 59) {
    return res
      .status(400)
      .json({ error: "Intervalo deve ser número entre 1 e 59" });
  }

  const cronExp = `*/${intervaloNum} * * * *`;

  const tarefa = cron.schedule(cronExp, async () => {
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${moeda}&vs_currencies=brl`,
      );
      const data = await response.json();
      const preco = data.result?.last;

      if (!preco) {
        console.log(`Não encontrou preço para ${moeda}`);
        return;
      }

      await transporter.sendMail({
        from: `"${process.env.EMAIL_FROM_NAME || "Cotação Cripto"}" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: `Cotação Atual de ${moeda}`,
        html: `<p>O valor atual de ${moeda} é <strong>R$ ${preco}</strong></p>`,
      });

      console.log(`E-mail enviado para ${email}: ${moeda} = R$ ${preco}`);
    } catch (err: any) {
      console.error("Erro ao enviar e-mail:", err.message || err);
    }
  });

  tarefa.start();

  tarefas.push(tarefa);

  return res.json({ status: "Agendamento criado com sucesso" });
};

app.post("/enviar-cotacao", enviarCotacao);

app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    console.error(err);
    res.status(500).json({ error: "Erro interno do servidor" });
  },
);

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

export default app;
