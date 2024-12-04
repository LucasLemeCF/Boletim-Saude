import { Inter } from 'next/font/google';
import Provider from "../../app/Provider";
import { SideBar } from './SideBar';
import "./globals.css";

const inter = Inter({ subsets: ['latin'] })

export default function LayoutBase({ children }) {
  return (
    <html lang="pt-br" className={inter.className}>
      <title>Boletim Saúde - Itaberá</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content="Boletim de atendimentos médicos de Itaberá SP"/>
      <link rel="manifest" href="manifest.json"></link>
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
