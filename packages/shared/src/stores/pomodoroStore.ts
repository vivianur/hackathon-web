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

      startFocus: (taskId, duration = FOCUS_DURATION) => {
        set({
          isActive: true,
          isPaused: false,
          currentPhase: 'focus',
          timeRemaining: duration,
          taskId,
        });
      },

      startBreak: (isLong = false) => {
        const state = get();
        set({
          isActive: true,
          isPaused: false,
          currentPhase: isLong ? 'long-break' : 'break',
          timeRemaining: isLong ? LONG_BREAK : SHORT_BREAK,
          sessionCount: state.currentPhase === 'focus' ? state.sessionCount + 1 : state.sessionCount,
        });
      },

      pause: () => set({ isPaused: true }),

      resume: () => set({ isPaused: false }),

      stop: () =>
        set({
          isActive: false,
          isPaused: false,
          currentPhase: 'idle',
          timeRemaining: 0,
          taskId: undefined,
        }),

      tick: () => {
        const state = get();
        if (!state.isActive || state.isPaused) return;

        if (state.timeRemaining > 0) {
          set({ timeRemaining: state.timeRemaining - 1 });
        } else {
          // Timer acabou
          set({ isActive: false, currentPhase: 'idle' });
        }
      },
    }),
    {
      name: 'pomodoro-storage',
    }
  )
);
