// app/layout.tsx

import '../styles/globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import SessionProviderWrapper from '@/components/SessionProviderWrapper';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>Quality Management System</title>
      </head>
      <body className="mt-[60px] pt-[30px] px-[50px] h-auto overflow-auto bg-background dark:bg-dark-background">
        <SessionProviderWrapper>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}