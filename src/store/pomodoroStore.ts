import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { PomodoroSession } from '../domain/entities/PomodoroSession';

interface PomodoroStore extends PomodoroSession {
  startFocus: (taskId?: string, duration?: number) => void;
  startBreak: (isLong?: boolean) => void;
  pause: () => void;
  resume: () => void;
  stop: () => void;
  tick: () => void;
  isPaused: boolean;
  startTime?: number;
  totalDuration?: number;
  pausedTime?: number;
}

const FOCUS_DURATION = 25 * 60; // 25 minutos
const SHORT_BREAK = 5 * 60; // 5 minutos
const LONG_BREAK = 15 * 60; // 15 minutos

export const usePomodoroStore = create<PomodoroStore>()(
  persist(
    (set, get) => ({
      isActive: false,
      isPaused: false,
      currentPhase: 'idle',
      timeRemaining: 0,
      sessionCount: 0,
      taskId: undefined,
      startTime: undefined,
      totalDuration: undefined,
      pausedTime: undefined,
      
      startFocus: (taskId, duration = FOCUS_DURATION) => {
        const now = Date.now();
        set({
          isActive: true,
          isPaused: false,
          currentPhase: 'focus',
          timeRemaining: duration,
          totalDuration: duration,
          startTime: now,
          pausedTime: undefined,
          taskId,
        });
      },
      
      startBreak: (isLong = false) => {
        const state = get();
        const now = Date.now();
        const duration = isLong ? LONG_BREAK : SHORT_BREAK;
        set({
          isActive: true,
          isPaused: false,
          currentPhase: isLong ? 'long-break' : 'break',
          timeRemaining: duration,
          totalDuration: duration,
          startTime: now,
          pausedTime: undefined,
          sessionCount: state.sessionCount,
        });
      },
      
      pause: () => {
        const state = get();
        set({ isPaused: true, pausedTime: state.timeRemaining });
      },
      
      resume: () => {
        const state = get();
        if (state.pausedTime !== undefined) {
          const now = Date.now();
          set({ 
            isPaused: false, 
            startTime: now,
            totalDuration: state.pausedTime,
            pausedTime: undefined 
          });
        }
      },
      
      stop: () =>
        set({
          isActive: false,
          isPaused: false,
          currentPhase: 'idle',
          timeRemaining: 0,
          startTime: undefined,
          totalDuration: undefined,
          pausedTime: undefined,
          taskId: undefined,
        }),
      
      tick: () => {
        const state = get();
        if (!state.isActive || state.isPaused || !state.startTime || !state.totalDuration) return;
        
        const now = Date.now();
        const elapsedSeconds = Math.floor((now - state.startTime) / 1000);
        const remaining = Math.max(0, state.totalDuration - elapsedSeconds);
        
        if (remaining > 0) {
          set({ timeRemaining: remaining });
        } else {
          const shouldCountSession = state.currentPhase === 'focus';
          // Timer acabou
          set({ 
            isActive: false, 
            currentPhase: 'idle',
            timeRemaining: 0,
            startTime: undefined,
            totalDuration: undefined,
            sessionCount: shouldCountSession ? state.sessionCount + 1 : state.sessionCount,
          });
        }
      },
    }),
    {
      name: 'pomodoro-storage',
    }
  )
);
