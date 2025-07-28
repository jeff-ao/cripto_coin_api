import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <div className="text-center sm:text-left">
          <h1 className="text-4xl font-bold mb-4">Cripto Coin API</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            Plataforma para acompanhamento de criptomoedas
          </p>
        </div>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <Link href="/login">
            <Button className="w-full sm:w-auto">Fazer Login</Button>
          </Link>
          <Link href="/cadastro">
            <Button variant="outline" className="w-full sm:w-auto">
              Cadastrar-se
            </Button>
          </Link>
        </div>

        <div className="flex gap-4 items-center flex-col sm:flex-row"></div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <p className="text-sm text-gray-500">
          © 2025 Cripto Coin API - Plataforma de Criptomoedas
        </p>
      </footer>
    </div>
  );
}
