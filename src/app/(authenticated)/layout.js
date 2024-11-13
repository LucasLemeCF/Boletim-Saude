import { Inter } from 'next/font/google';
import Provider from "../../app/Provider";
import { SideBar } from './SideBar';
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
          <SideBar>
            {children}
          </SideBar>
        </Provider>
      </body>
    </html>
  );
}
