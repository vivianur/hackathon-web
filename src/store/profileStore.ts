import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { UserProfile, StudyRoutine, UserPreferences } from '../domain/entities/UserProfile';

interface ProfileStore {
  profile: UserProfile | null;
  setProfile: (profile: UserProfile) => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
  updateStudyRoutine: (routine: StudyRoutine) => void;
  updatePreferences: (preferences: Partial<UserPreferences>) => void;
  addNeurodivergence: (condition: string) => void;
  removeNeurodivergence: (condition: string) => void;
}

export const useProfileStore = create<ProfileStore>()(
  persist(
    (set) => ({
      profile: null,
      
      setProfile: (profile) => set({ profile }),
      
      updateProfile: (updates) =>
        set((state) => ({
          profile: state.profile ? { ...state.profile, ...updates } : null,
        })),
      
      updateStudyRoutine: (routine) =>
        set((state) => ({
          profile: state.profile
            ? { ...state.profile, studyRoutine: routine }
            : null,
        })),
      
      updatePreferences: (preferences) =>
        set((state) => ({
          profile: state.profile
            ? {
                ...state.profile,
                preferences: { ...state.profile.preferences, ...preferences },
              }
            : null,
        })),
      
      addNeurodivergence: (condition) =>
        set((state) => ({
          profile: state.profile
            ? {
                ...state.profile,
                neurodivergence: [
                  ...(state.profile.neurodivergence || []),
                  condition,
                ],
              }
            : null,
        })),
      
      removeNeurodivergence: (condition) =>
        set((state) => ({
          profile: state.profile
            ? {
                ...state.profile,
                neurodivergence: (state.profile.neurodivergence || []).filter(
                  (c) => c !== condition
                ),
              }
            : null,
        })),
    }),
    {
      name: 'profile-storage',
    }
  )
);
