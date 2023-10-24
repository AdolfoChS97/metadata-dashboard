import Home from "./page"
import { Inter } from 'next/font/google'
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Home />
      </body>
    </html>
  )
}
