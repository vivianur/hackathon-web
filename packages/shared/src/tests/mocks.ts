import { vi } from 'vitest'

export const createProfileStoreMock = (override: any = {}) => ({
  profile: {
    id: 'p1',
    name: 'Usuário',
    email: 'usuario@fiap.com.br',
    neurodivergence: [],
    preferences: {
      notifications: true,
      soundEffects: false,
      encouragementMessages: true,
      transitionWarnings: false,
    },
    studyRoutine: {
      preferredStudyTime: 'morning',
      focusTechnique: 'pomodoro',
      sessionDuration: 25,
      breakDuration: 5,
    },
  },
  setProfile: vi.fn(),
  updateProfile: vi.fn(),
  updatePreferences: vi.fn(),
  updateStudyRoutine: vi.fn(),
  addNeurodivergence: vi.fn(),
  removeNeurodivergence: vi.fn(),
  ...override,
});

export const createAccessibilityStoreMock = (override = {}) => {
  const resetToDefaults = vi.fn()
  return {
    resetToDefaults,
    ...override,
  }
}

export const createThemeStoreMock = (override = {}) => {
  const resetToDefault = vi.fn()
  return {
    resetToDefault,
    ...override,
  }
}

export const createAnimationsMock = () => ({
  fadeIn: {},
})

export const createSpacingMock = (override = {}) => ({
  gridSpacing: 2,
  ...override,
});

export const createAccessibilitySelectorMock = (state = { detailedMode: false }) =>
  (selector?: (s: any) => any) => (typeof selector === 'function' ? selector(state) : state);

export const createThemeSelectorMock = (state = { mode: 'light' as 'light' | 'dark' }) =>
  (selector?: (s: any) => any) => (typeof selector === 'function' ? selector(state) : state);