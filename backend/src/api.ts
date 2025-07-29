import "reflect-metadata";
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import "dotenv/config";
import morgan from "morgan";
import userRoutes from "./routes/userRoutes";
import trackingRoutes from "./routes/trackingRoutes";

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use("/user", userRoutes);
app.use("/tracking", trackingRoutes);

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "API rodando!" });
});

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
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
}

export default app;
