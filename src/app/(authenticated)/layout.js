import { Inter } from 'next/font/google';
import Provider from "../../app/Provider";
import { Aside } from "../../components/Aside";
import { Header } from "../../components/Header";
import "./globals.css";

export const metadata = {
  title: "Boletim Saúde - Itaberá",
  description: "Boletim de atendimentos médicos de Itaberá SP",
  manifest: "/manifest.json"
};

const inter = Inter({ subsets: ['latin'] })

export default function LayoutBase({ children }) {
  return (
    <html lang="pt-br" className={inter.className}>
      <body>
        <Provider>
          <div className='flex flex-row w-screen'>
            <Aside/>
            <div className="flex flex-col w-full ml-64">
              <Header/>
              {children}
            </div>
          </div>
        </Provider>
      </body>
    </html>
  );
}
