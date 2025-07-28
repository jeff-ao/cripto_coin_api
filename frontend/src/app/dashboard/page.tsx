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
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const [user, setUser] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Verificar se há token ou dados do usuário
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    } else {
      setUser("Usuário logado"); // Aqui você pode buscar os dados do usuário
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  if (!user) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <Button onClick={handleLogout} variant="outline">
            Sair
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Bem-vindo!</CardTitle>
              <CardDescription>Você está logado no sistema</CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Aqui você pode gerenciar suas criptomoedas e acompanhar o
                mercado.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Carteira</CardTitle>
              <CardDescription>Suas criptomoedas</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Funcionalidade em desenvolvimento...</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Mercado</CardTitle>
              <CardDescription>Preços atuais</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Funcionalidade em desenvolvimento...</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
