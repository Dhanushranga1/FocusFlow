// src/app/layout.tsx
import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import { TaskProvider } from '@/context/TaskContext';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });
const poppins = Poppins({ weight: '700', subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'FocusFlow',
  description: 'Your AI-powered productivity coach',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${poppins.className} bg-gradient-to-b from-[#0B132B] to-[#1C2541] text-white flex flex-col items-center min-h-screen w-full`}> 
        <TaskProvider>
          <div className="w-full max-w-[1600px] px-12 py-16 flex flex-col items-center space-y-16">
            {children}
          </div>
        </TaskProvider>
      </body>
    </html>
  );
}
