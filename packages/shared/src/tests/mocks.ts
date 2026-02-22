import { vi } from 'vitest'

export const createSelectorMock =
  <T extends Record<string, any>>(state: T) =>
  (selector?: (s: T) => any) =>
    typeof selector === 'function' ? selector(state) : state;

export const createHomeAccessibilityState = (override: any = {}) => ({
  detailedMode: false,
  complexityLevel: 'simple',
  themeMode: 'light',
  ...override,
});

export const createHomeAnimationsState = (override: any = {}) => ({
  level: 'simple',
  getAnimation: () => ({}),
  ...override,
});

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

export const createAccessibilityPanelStoreMock = (override: any = {}) => ({
  complexityLevel: 'simple',
  setComplexityLevel: vi.fn(),

  focusMode: false,
  toggleFocusMode: vi.fn(),

  detailedMode: false,
  toggleDetailedMode: vi.fn(),

  fontSize: 'medium',
  setFontSize: vi.fn(),

  spacing: 'comfortable',
  setSpacing: vi.fn(),

  contrastLevel: 'medium',
  setContrastLevel: vi.fn(),

  animationsEnabled: true,
  toggleAnimations: vi.fn(),

  cognitiveAlerts: false,
  toggleCognitiveAlerts: vi.fn(),

  vlibrasEnabled: false,
  toggleVlibras: vi.fn(),

  ...override,
});

export const createThemePanelStoreMock = (override: any = {}) => ({
  mode: 'light' as 'light' | 'dark',
  toggleTheme: vi.fn(),
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

export const createTaskStoreSelectorMock = (state: any = { tasks: [] }) =>
  (selector?: (s: any) => any) => (typeof selector === 'function' ? selector(state) : state);