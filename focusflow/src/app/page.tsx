// src/app/page.tsx - Refined AI Tech Startup UI (Without Three.js)
import Chat from '@/components/Chat';
import TaskInput from '@/components/TaskInput';
import PomodoroClock from '@/components/PomodoroClock';
import XPTracker from '@/components/XPTracker';
import Hero from '@/components/Hero';
import Leaderboard from '@/components/Leaderboard';
import Notifications from '@/components/Notifications';
import SocialFeed from '@/components/SocialFeed';
import PendingTasks from '@/components/PendingTasks';
import AnimatedContainer from '@/components/AnimatedContainer';
import { Container, Grid, Paper, Box } from '@mui/material';

export default function Home() {
  return (
    <Box className="relative min-h-screen w-full bg-gradient-to-br from-[#1E1E3F] via-[#3A86FF] to-[#00F5D4] text-white flex flex-col items-center overflow-hidden">
      {/* Background Glow Effect */}
      <Box className="absolute inset-0 w-full h-full bg-[radial-gradient(circle,#3A86FF,#1E1E3F)] opacity-40 blur-3xl" />
      
      <AnimatedContainer>
        <Hero />
      </AnimatedContainer>

      <Container maxWidth="xl" className="relative py-16 flex flex-col items-center space-y-12 z-10">
        <Grid container spacing={8} justifyContent="center">
          <Grid item xs={12} md={4}>
            <Paper elevation={10} className="p-8 rounded-2xl shadow-lg bg-opacity-95 backdrop-blur-lg border border-[#00F5D4] hover:shadow-cyan-500 transition-all duration-300">
              <PomodoroClock />
              <XPTracker />
              <Leaderboard />
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper elevation={10} className="p-8 rounded-2xl shadow-lg bg-opacity-95 backdrop-blur-lg border border-[#FF9F1C] hover:shadow-orange-500 transition-all duration-300">
              <Chat />
              <Notifications />
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper elevation={10} className="p-8 rounded-2xl shadow-lg bg-opacity-95 backdrop-blur-lg border border-[#8338EC] hover:shadow-purple-500 transition-all duration-300">
              <TaskInput />
              <SocialFeed />
            </Paper>
          </Grid>
        </Grid>

        <AnimatedContainer delay={0.5}>
          <PendingTasks />
        </AnimatedContainer>
      </Container>
    </Box>
  );
}