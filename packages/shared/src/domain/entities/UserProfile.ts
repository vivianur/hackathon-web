export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  neurodivergence?: string[];
  studyRoutine?: StudyRoutine;
  preferences: UserPreferences;
}

export interface StudyRoutine {
  preferredStudyTime: 'morning' | 'afternoon' | 'evening' | 'night';
  sessionDuration: number; // em minutos
  breakDuration: number; // em minutos
  focusTechnique: 'pomodoro' | 'custom' | 'flexible';
}

export interface UserPreferences {
  notifications: boolean;
  soundEffects: boolean;
  encouragementMessages: boolean;
  transitionWarnings: boolean;
}
