// src/app/layout.tsx
import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import { TaskProvider } from '@/context/TaskContext';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });
const poppins = Poppins({ weight: '700', subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'FocusFlow',
  description: 'Your personalized productivity coach',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${poppins.className}`}>
        <TaskProvider>{children}</TaskProvider>
      </body>
    </html>
  );
}