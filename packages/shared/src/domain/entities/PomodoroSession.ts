export interface PomodoroSession {
  isActive: boolean;
  currentPhase: 'focus' | 'break' | 'long-break' | 'idle';
  timeRemaining: number; // em segundos
  sessionCount: number;
  taskId?: string;
}
