export type ComplexityLevel = 'simple' | 'moderate' | 'detailed';
export type ContrastLevel = 'low' | 'medium' | 'high';
export type FontSize = 'small' | 'medium' | 'large' | 'extra-large';
export type Spacing = 'compact' | 'comfortable' | 'spacious';

export interface AccessibilitySettings {
  complexityLevel: ComplexityLevel;
  focusMode: boolean;
  detailedMode: boolean;
  contrastLevel: ContrastLevel;
  fontSize: FontSize;
  spacing: Spacing;
  animationsEnabled: boolean;
  cognitiveAlerts: boolean;
  vlibrasEnabled: boolean;
}
