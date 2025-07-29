"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function DashboardPage() {
  const [user, setUser] = useState<string | null>(null);
  const [formData, setFormData] = useState({ criptomoeda: "", tempo: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  //   useEffect(() => {
  //     const token = localStorage.getItem("token");
  //     if (!token) {
  //       router.push("/login");
  //     } else {
  //       setUser("Usuário logado");
  //     }
  //   }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      criptomoeda: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await axios.post("/api/cripto-dados", {
        criptomoeda: formData.criptomoeda,
        tempo: parseInt(formData.tempo),
      });

      setSuccess(`Relatório da ${formData.criptomoeda} será enviado!`);
      console.log("Dados recebidos:", response.data);
    } catch (error: any) {
      setError(
        error.response?.data?.message || "Erro ao buscar dados da criptomoeda."
      );
    } finally {
      setLoading(false);
    }
  };

  //if (!user) return <div className="p-4">Carregando...</div>;

  return (
    <div className="min-h-screen bg-muted dark:bg-background p-6">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground">
            Dashboard
          </h1>
          <Button onClick={handleLogout} variant="ghost">
            Sair
          </Button>
        </div>

        {/* Card principal */}
        <Card className="shadow-xl border border-border">
          <CardHeader className="text-center space-y-1">
            <CardTitle className="text-2xl font-semibold">
              Monitorar Criptomoeda
            </CardTitle>
            <CardDescription>
              Selecione uma moeda e um intervalo de tempo para monitoramento.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Criptomoeda */}
              <div className="space-y-2">
                <Label htmlFor="criptomoeda" className="text-sm font-medium">
                  Criptomoeda
                </Label>
                <Select
                  required
                  onValueChange={handleSelectChange}
                  value={formData.criptomoeda}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Escolha uma criptomoeda" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bitcoin">Bitcoin (BTC)</SelectItem>
                    <SelectItem value="ethereum">Ethereum (ETH)</SelectItem>
                    <SelectItem value="ripple">XRP</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Tempo */}
              <div className="space-y-2">
                <Label htmlFor="tempo" className="text-sm font-medium">
                  Tempo (em minutos)
                </Label>
                <Input
                  id="tempo"
                  name="tempo"
                  type="number"
                  min="1"
                  value={formData.tempo}
                  onChange={handleInputChange}
                  placeholder="Ex: 5"
                  required
                  className="w-full"
                />
              </div>

              {/* Mensagens */}
              {error && (
                <div className="bg-red-100 text-red-700 p-3 rounded-md border border-red-300 text-sm">
                  {error}
                </div>
              )}
              {success && (
                <div className="bg-green-100 text-green-700 p-3 rounded-md border border-green-300 text-sm">
                  {success}
                </div>
              )}

              {/* Botão */}
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Consultando..." : "Buscar dados e agendar envio"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
