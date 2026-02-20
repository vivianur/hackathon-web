import { vi } from 'vitest'

export const createProfileStoreMock = (override = {}) => ({
  profile: {
    preferences: {
      notifications: true,
      soundEffects: false,
      encouragementMessages: true,
      transitionWarnings: false,
    },
  },
  updatePreferences: vi.fn(),
  ...override,
})

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