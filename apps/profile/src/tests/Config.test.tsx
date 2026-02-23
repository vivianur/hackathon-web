import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Config from '../Config';
import { renderWithProviders } from '@mindease/shared/tests';
import {
  createProfileStoreMock,
  createAccessibilityStoreMock,
  createThemeStoreMock,
  createAnimationsMock,
} from '@mindease/shared/tests';

const profileMock = createProfileStoreMock();
const accessibilityMock = createAccessibilityStoreMock();
const themeMock = createThemeStoreMock();
const animationsMock = createAnimationsMock();

vi.mock('@mindease/shared', async () => {
  const actual = await vi.importActual<any>('@mindease/shared');
  return {
    ...actual,
    useProfileStore: () => profileMock,
    useAccessibilityStore: () => accessibilityMock,
    useThemeStore: () => themeMock,
    useAnimations: () => animationsMock,
  };
});

function setProfilePreferences(prefs: {
  notifications: boolean;
  soundEffects: boolean;
  encouragementMessages: boolean;
  transitionWarnings: boolean;
}) {
  profileMock.profile = { preferences: { ...prefs } };
}

function getCardScopeByTitle(title: RegExp) {
  const heading = screen.getByRole('heading', { name: title });

  const card =
    (heading.closest('.MuiCard-root') as HTMLElement | null) ??
    (heading.closest('.MuiPaper-root') as HTMLElement | null) ??
    (heading.parentElement as HTMLElement | null);

  if (!card) {
    throw new Error(`Card não encontrado para título: ${String(title)}`);
  }

  return within(card);
}

async function ensureExpanded(title: RegExp, user: ReturnType<typeof userEvent.setup>) {
  const scope = getCardScopeByTitle(title);

  const switches = scope.queryAllByRole('switch');
  const resetButton = scope.queryByRole('button', { name: /Restaurar Configurações Padrão/i });

  if (switches.length > 0 || resetButton) {
    return scope;
  }

  const toggle = scope.getByRole('button', { name: /Expandir|Recolher/i });
  await user.click(toggle);

  return scope;
}

describe('Página de Configurações', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    setProfilePreferences({
      notifications: true,
      soundEffects: true,
      encouragementMessages: true,
      transitionWarnings: true,
    });

    profileMock.updatePreferences = vi.fn();
  });

  it('deve exibir "Carregando configurações..." quando profile é null/undefined', () => {
    profileMock.profile = null as any;

    renderWithProviders(<Config />);

    expect(screen.getByRole('alert')).toHaveTextContent(/Carregando configurações/i);
  });

  it('deve renderizar cabeçalho e textos fixos quando profile existe', () => {
    renderWithProviders(<Config />);

    expect(screen.getByRole('heading', { name: /Configurações/i })).toBeInTheDocument();
    expect(
      screen.getByText(/Ajuste preferências de notificações e comportamento do sistema/i),
    ).toBeInTheDocument();

    expect(
      screen.getByText(/As configurações de acessibilidade estão disponíveis no Painel Cognitivo/i),
    ).toBeInTheDocument();

    expect(screen.getByRole('heading', { name: /Notificações/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Sons e Efeitos/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Apoio Cognitivo/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Restaurar Padrões/i })).toBeInTheDocument();

    expect(screen.getByText(/Dica: Configurações Salvas Automaticamente/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Todas as suas configurações são salvas automaticamente no seu navegador/i),
    ).toBeInTheDocument();
  });

  it('deve iniciar com cards colapsados (conteúdos não acessíveis sem expandir)', () => {
    renderWithProviders(<Config />);

    expect(screen.queryByRole('switch', { name: /Ativar notificações/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('switch', { name: /Efeitos sonoros/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('switch', { name: /Mensagens de incentivo/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('switch', { name: /Avisos de transição/i })).not.toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: /Restaurar Configurações Padrão/i }),
    ).not.toBeInTheDocument();
  });

  it('deve expandir o card "Notificações" e permitir togglar "Ativar notificações"', async () => {
    const user = userEvent.setup();

    renderWithProviders(<Config />);

    const notifScope = await ensureExpanded(/Notificações/i, user);
    const notificationsSwitch = notifScope.getByRole('switch', { name: /Ativar notificações/i });

    expect(notificationsSwitch).toBeChecked();

    await user.click(notificationsSwitch);

    expect(profileMock.updatePreferences).toHaveBeenCalledTimes(1);
    expect(profileMock.updatePreferences).toHaveBeenCalledWith({ notifications: false });
  });

  it('deve expandir o card "Sons e Efeitos" e permitir togglar "Efeitos sonoros"', async () => {
    const user = userEvent.setup();

    renderWithProviders(<Config />);

    const soundScope = await ensureExpanded(/Sons e Efeitos/i, user);
    const soundSwitch = soundScope.getByRole('switch', { name: /Efeitos sonoros/i });

    expect(soundSwitch).toBeChecked();

    await user.click(soundSwitch);

    expect(profileMock.updatePreferences).toHaveBeenCalledTimes(1);
    expect(profileMock.updatePreferences).toHaveBeenCalledWith({ soundEffects: false });
  });

  it('deve expandir o card "Apoio Cognitivo" e permitir togglar "Mensagens de incentivo"', async () => {
    const user = userEvent.setup();

    renderWithProviders(<Config />);

    const cogScope = await ensureExpanded(/Apoio Cognitivo/i, user);
    const encouragementSwitch = cogScope.getByRole('switch', { name: /Mensagens de incentivo/i });

    expect(encouragementSwitch).toBeChecked();

    await user.click(encouragementSwitch);

    expect(profileMock.updatePreferences).toHaveBeenCalledTimes(1);
    expect(profileMock.updatePreferences).toHaveBeenCalledWith({ encouragementMessages: false });
  });

  it('deve expandir o card "Apoio Cognitivo" e permitir togglar "Avisos de transição"', async () => {
    const user = userEvent.setup();

    renderWithProviders(<Config />);

    const cogScope = await ensureExpanded(/Apoio Cognitivo/i, user);
    const transitionSwitch = cogScope.getByRole('switch', { name: /Avisos de transição/i });

    expect(transitionSwitch).toBeChecked();

    await user.click(transitionSwitch);

    expect(profileMock.updatePreferences).toHaveBeenCalledTimes(1);
    expect(profileMock.updatePreferences).toHaveBeenCalledWith({ transitionWarnings: false });
  });

  it('não deve resetar padrões quando usuário cancela o confirm', async () => {
    const user = userEvent.setup();
    const confirmSpy = vi.spyOn(window, 'confirm').mockReturnValue(false);

    renderWithProviders(<Config />);

    const restoreScope = await ensureExpanded(/Restaurar Padrões/i, user);
    const resetBtn = restoreScope.getByRole('button', { name: /Restaurar Configurações Padrão/i });

    await user.click(resetBtn);

    expect(confirmSpy).toHaveBeenCalledTimes(1);
    expect(accessibilityMock.resetToDefaults).not.toHaveBeenCalled();
    expect(themeMock.resetToDefault).not.toHaveBeenCalled();
    expect(profileMock.updatePreferences).not.toHaveBeenCalled();
  });

  it('deve resetar padrões quando usuário confirma o confirm (chama resets e set defaults)', async () => {
    const user = userEvent.setup();
    const confirmSpy = vi.spyOn(window, 'confirm').mockReturnValue(true);

    setProfilePreferences({
      notifications: false,
      soundEffects: false,
      encouragementMessages: false,
      transitionWarnings: false,
    });

    renderWithProviders(<Config />);

    const restoreScope = await ensureExpanded(/Restaurar Padrões/i, user);
    const resetBtn = restoreScope.getByRole('button', { name: /Restaurar Configurações Padrão/i });

    await user.click(resetBtn);

    expect(confirmSpy).toHaveBeenCalledTimes(1);
    expect(accessibilityMock.resetToDefaults).toHaveBeenCalledTimes(1);
    expect(themeMock.resetToDefault).toHaveBeenCalledTimes(1);

    expect(profileMock.updatePreferences).toHaveBeenCalledTimes(1);
    expect(profileMock.updatePreferences).toHaveBeenCalledWith({
      notifications: true,
      soundEffects: true,
      encouragementMessages: true,
      transitionWarnings: true,
    });
  });

  it('deve refletir estado inicial dos switches baseado no profile.preferences', async () => {
    const user = userEvent.setup();

    setProfilePreferences({
      notifications: false,
      soundEffects: true,
      encouragementMessages: false,
      transitionWarnings: true,
    });

    renderWithProviders(<Config />);

    const notifScope = await ensureExpanded(/Notificações/i, user);
    expect(notifScope.getByRole('switch', { name: /Ativar notificações/i })).not.toBeChecked();

    const soundScope = await ensureExpanded(/Sons e Efeitos/i, user);
    expect(soundScope.getByRole('switch', { name: /Efeitos sonoros/i })).toBeChecked();

    const cogScope = await ensureExpanded(/Apoio Cognitivo/i, user);
    expect(cogScope.getByRole('switch', { name: /Mensagens de incentivo/i })).not.toBeChecked();
    expect(cogScope.getByRole('switch', { name: /Avisos de transição/i })).toBeChecked();
  });

  it('deve permitir múltiplas alterações e chamar updatePreferences com deltas independentes', async () => {
    const user = userEvent.setup();

    renderWithProviders(<Config />);

    const notifScope = await ensureExpanded(/Notificações/i, user);
    await user.click(notifScope.getByRole('switch', { name: /Ativar notificações/i }));

    const soundScope = await ensureExpanded(/Sons e Efeitos/i, user);
    await user.click(soundScope.getByRole('switch', { name: /Efeitos sonoros/i }));

    const cogScope = await ensureExpanded(/Apoio Cognitivo/i, user);
    await user.click(cogScope.getByRole('switch', { name: /Mensagens de incentivo/i }));
    await user.click(cogScope.getByRole('switch', { name: /Avisos de transição/i }));

    expect(profileMock.updatePreferences).toHaveBeenCalledTimes(4);

    expect(profileMock.updatePreferences).toHaveBeenNthCalledWith(1, { notifications: false });
    expect(profileMock.updatePreferences).toHaveBeenNthCalledWith(2, { soundEffects: false });
    expect(profileMock.updatePreferences).toHaveBeenNthCalledWith(3, { encouragementMessages: false });
    expect(profileMock.updatePreferences).toHaveBeenNthCalledWith(4, { transitionWarnings: false });
  });
});