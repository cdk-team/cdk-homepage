import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import Script from "next/script"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <title>CDK - Container Penetration Toolkit</title>
        <meta
          name="description"
          content="An open-source container penetration toolkit designed for security researchers"
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {children}
        </ThemeProvider>
        <Script id="mermaid" strategy="afterInteractive">
          {`
    document.addEventListener('DOMContentLoaded', () => {
      // Load mermaid script
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js';
      script.onload = () => {
        // Initialize mermaid after script is loaded
        window.mermaid.initialize({ 
          startOnLoad: true,
          theme: 'default',
          securityLevel: 'loose',
        });
        
        // Render the diagram
        const container = document.querySelector('.mermaid-container');
        if (container) {
          const content = container.querySelector('div').textContent.trim();
          container.innerHTML = '<div class="mermaid">' + content + '</div>';
          window.mermaid.init(undefined, '.mermaid');
        }
      };
      document.body.appendChild(script);
    });
  `}
        </Script>
      </body>
    </html>
  )
}



import './globals.css'

export const metadata = {
      generator: 'v0.dev'
    };
