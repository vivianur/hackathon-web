import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Perfil from '../Perfil';
import { renderWithProviders } from '@mindease/shared/tests';

import {
  createProfileStoreMock,
  createAnimationsMock,
  createSpacingMock,
} from '@mindease/shared/tests';

const profileStoreMock = createProfileStoreMock();
const animationsMock = createAnimationsMock();
const spacingMock = createSpacingMock();

const accessibilityState = { detailedMode: false };
const themeState = { mode: 'light' as 'light' | 'dark' };

vi.mock('@mindease/shared', async () => {
  const actual = await vi.importActual<any>('@mindease/shared');

  const useAccessibilityStore = (selector?: (s: typeof accessibilityState) => any) =>
    typeof selector === 'function' ? selector(accessibilityState) : accessibilityState;

  const useThemeStore = (selector?: (s: typeof themeState) => any) =>
    typeof selector === 'function' ? selector(themeState) : themeState;

  return {
    ...actual,
    useProfileStore: () => profileStoreMock,
    useAnimations: () => animationsMock,
    useSpacing: () => spacingMock,
    useAccessibilityStore,
    useThemeStore,
  };
});


function setProfile(profile: any) {
  profileStoreMock.profile = profile;
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

  const hasInteractive =
    scope.queryAllByRole('button').length > 1 ||
    scope.queryAllByRole('switch').length > 0 ||
    scope.queryAllByRole('textbox').length > 0;

  if (hasInteractive) return scope;

  const toggle = scope.getByRole('button', { name: /Expandir|Recolher/i });
  await user.click(toggle);

  return scope;
}

async function changeMuiSelectByVisibleText(
  scope: ReturnType<typeof within>,
  currentValue: RegExp,
  optionText: RegExp,
  user: ReturnType<typeof userEvent.setup>,
) {
  const selectButton = scope.getByRole('button', { name: currentValue });
  await user.click(selectButton);

  const option = await screen.findByRole('option', { name: optionText });
  await user.click(option);
}

async function changeMuiSelectByIndex(
  scope: ReturnType<typeof within>,
  selectIndex: number,
  optionText: RegExp,
  user: ReturnType<typeof userEvent.setup>,
) {
  const comboboxes = scope.getAllByRole('combobox');
  const combo = comboboxes[selectIndex];

  await user.click(combo);

  const option = await screen.findByRole('option', { name: optionText });
  await user.click(option);
}

describe('Perfil Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    accessibilityState.detailedMode = false;
    themeState.mode = 'light';

    profileStoreMock.setProfile = vi.fn((p: any) => {
      profileStoreMock.profile = p;
    });
    profileStoreMock.updateProfile = vi.fn();
    profileStoreMock.updateStudyRoutine = vi.fn();
    profileStoreMock.addNeurodivergence = vi.fn();
    profileStoreMock.removeNeurodivergence = vi.fn();

    setProfile({
      ...createProfileStoreMock().profile,
      id: 'p1',
      name: 'Junior',
      email: 'junior@fiap.com.br',
      neurodivergence: [],
    });

    if (globalThis.crypto?.randomUUID) {
      vi.spyOn(globalThis.crypto, 'randomUUID').mockReturnValue('uuid-fixed-123');
    }
  });

  it('quando profile não existe, deve criar perfil inicial via setProfile (useEffect)', () => {
    setProfile(null);

    renderWithProviders(<Perfil />);

    expect(profileStoreMock.setProfile).toHaveBeenCalledTimes(1);

    const arg = profileStoreMock.setProfile.mock.calls[0][0];

    expect(arg).toMatchObject({
      id: 'uuid-fixed-123',
      name: 'Usuário',
      email: 'usuario@fiap.com.br',
      neurodivergence: [],
      preferences: {
        notifications: true,
        soundEffects: true,
        encouragementMessages: true,
        transitionWarnings: true,
      },
    });
  });

  it('com profile existente, deve renderizar título e dados do usuário', () => {
    renderWithProviders(<Perfil />);

    expect(screen.getByRole('heading', { name: /Perfil do Usuário/i })).toBeInTheDocument();
    expect(screen.getByText(/Gerencie suas informações/i)).toBeInTheDocument();

    expect(screen.getByText('Junior')).toBeInTheDocument();
    expect(screen.getByText('junior@fiap.com.br')).toBeInTheDocument();

    expect(screen.getByRole('button', { name: /Editar Perfil/i })).toBeInTheDocument();
  });

  it('clicar em "Editar Perfil" habilita inputs e exibe "Cancelar" e "Salvar Alterações"', async () => {
    const user = userEvent.setup();

    renderWithProviders(<Perfil />);

    const nameInput = screen.getByLabelText(/Nome/i) as HTMLInputElement;
    const emailInput = screen.getByLabelText(/Email/i) as HTMLInputElement;

    expect(nameInput).toBeDisabled();
    expect(emailInput).toBeDisabled();

    await user.click(screen.getByRole('button', { name: /Editar Perfil/i }));

    expect(nameInput).toBeEnabled();
    expect(emailInput).toBeEnabled();

    expect(screen.getByRole('button', { name: /Cancelar/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Salvar Alterações/i })).toBeInTheDocument();
  });

  it('Salvar Alterações chama updateProfile com dados e sai do modo edição', async () => {
    const user = userEvent.setup();

    renderWithProviders(<Perfil />);

    await user.click(screen.getByRole('button', { name: /Editar Perfil/i }));

    const nameInput = screen.getByLabelText(/Nome/i) as HTMLInputElement;
    const emailInput = screen.getByLabelText(/Email/i) as HTMLInputElement;

    await user.clear(nameInput);
    await user.type(nameInput, 'Junior Nascimento');

    await user.clear(emailInput);
    await user.type(emailInput, 'junior.nascimento@fiap.com.br');

    await user.click(screen.getByRole('button', { name: /Salvar Alterações/i }));

    expect(profileStoreMock.updateProfile).toHaveBeenCalledTimes(1);
    expect(profileStoreMock.updateProfile).toHaveBeenCalledWith({
      name: 'Junior Nascimento',
      email: 'junior.nascimento@fiap.com.br',
    });

    expect(screen.getByRole('button', { name: /Editar Perfil/i })).toBeInTheDocument();
  });

  it('Cancelar descarta alterações, não chama updateProfile e sai do modo edição', async () => {
    const user = userEvent.setup();

    renderWithProviders(<Perfil />);

    await user.click(screen.getByRole('button', { name: /Editar Perfil/i }));

    const nameInput = screen.getByLabelText(/Nome/i) as HTMLInputElement;
    const emailInput = screen.getByLabelText(/Email/i) as HTMLInputElement;

    await user.clear(nameInput);
    await user.type(nameInput, 'Mudado');

    await user.clear(emailInput);
    await user.type(emailInput, 'mudado@fiap.com.br');

    await user.click(screen.getByRole('button', { name: /Cancelar/i }));

    expect(profileStoreMock.updateProfile).not.toHaveBeenCalled();

    expect((screen.getByLabelText(/Nome/i) as HTMLInputElement).value).toBe('Junior');
    expect((screen.getByLabelText(/Email/i) as HTMLInputElement).value).toBe('junior@fiap.com.br');

    expect(screen.getByRole('button', { name: /Editar Perfil/i })).toBeInTheDocument();
  });

  it('Neurodivergências: clicar em chip não selecionado chama addNeurodivergence', async () => {
    const user = userEvent.setup();

    setProfile({
      ...profileStoreMock.profile,
      neurodivergence: [],
    });

    renderWithProviders(<Perfil />);

    const neuroScope = await ensureExpanded(/Neurodivergências/i, user);
    await user.click(neuroScope.getByRole('button', { name: /TDAH/i }));

    expect(profileStoreMock.addNeurodivergence).toHaveBeenCalledTimes(1);
    expect(profileStoreMock.addNeurodivergence).toHaveBeenCalledWith('TDAH');
    expect(profileStoreMock.removeNeurodivergence).not.toHaveBeenCalled();
  });

  it('Neurodivergências: clicar em chip já selecionado chama removeNeurodivergence', async () => {
    const user = userEvent.setup();

    setProfile({
      ...profileStoreMock.profile,
      neurodivergence: ['TDAH'],
    });

    renderWithProviders(<Perfil />);

    const neuroScope = await ensureExpanded(/Neurodivergências/i, user);
    await user.click(neuroScope.getByRole('button', { name: /TDAH/i }));

    expect(profileStoreMock.removeNeurodivergence).toHaveBeenCalledTimes(1);
    expect(profileStoreMock.removeNeurodivergence).toHaveBeenCalledWith('TDAH');
    expect(profileStoreMock.addNeurodivergence).not.toHaveBeenCalled();
  });

  it('Rotina de Estudo: trocar "Período Preferido" chama updateStudyRoutine', async () => {
    const user = userEvent.setup();

    renderWithProviders(<Perfil />);

    const routineScope = await ensureExpanded(/Rotina de Estudo/i, user);
    await changeMuiSelectByIndex(routineScope, 0, /Noite/i, user);

    expect(profileStoreMock.updateStudyRoutine).toHaveBeenCalled();
  });
});