// src/app/page.tsx
import Chat from '@/components/Chat';
import TaskInput from '@/components/TaskInput';
import PomodoroClock from '@/components/PomodoroClock';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AnimatedContainer from '@/components/AnimatedContainer';
import { Inter, Poppins } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });
const poppins = Poppins({ weight: '700', subsets: ['latin'] });

export default function Home() {
  return (
    <div className="min-h-screen p-8 bg-gradient-to-b from-[#E0F7FA] to-[#B2EBF2]">
      {/* Hero Section */}
      <AnimatedContainer>
        <div className="text-center mb-12">
          <h1 className={`${poppins.className} text-6xl font-bold text-[#263238] mb-4`}>
            FocusFlow
          </h1>
          <p className={`${inter.className} text-xl text-[#455A64]`}>
            Your AI-powered productivity coach. Stay focused, achieve more.
          </p>
        </div>
      </AnimatedContainer>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Panel: Pomodoro Clock */}
        <div className="md:col-span-1">
          <PomodoroClock />
        </div>

        {/* Middle Panel: Chat */}
        <div className="md:col-span-1">
          <Chat />
        </div>

        {/* Right Panel: Task Input */}
        <div className="md:col-span-1">
          <TaskInput />
        </div>
      </div>
    </div>
  );
}