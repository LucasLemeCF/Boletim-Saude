import { Inter } from 'next/font/google';
import "./globals.css";

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br" className={inter.className}>
      <title>Boletim Saúde - Itaberá</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content="Boletim de atendimentos médicos de Itaberá SP"/>
      <link rel="manifest" href="manifest.json"></link>
      <body className="bg-gradient-to-tl from-[#337B5B] to-[#4EB486] w-screen h-screen flex items-center justify-center">
        {children}
        <a className="fixed bottom-0 left-0 align-start m-1 text-white" href="https://www.linkedin.com/in/lucas-leme/">Linkedin: /lucas-leme</a>
      </body>
    </html>
  );
}
