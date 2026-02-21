import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Painel from '../Painel';
import { renderWithProviders } from '@mindease/shared/tests';

import {
  createAccessibilityPanelStoreMock,
  createThemePanelStoreMock,
  createAnimationsMock,
} from '@mindease/shared/tests';

const accessibilityMock = createAccessibilityPanelStoreMock();
const themeMock = createThemePanelStoreMock();
const animationsMock = createAnimationsMock();

vi.mock('@mindease/shared', async () => {
  const actual = await vi.importActual<any>('@mindease/shared');
  return {
    ...actual,
    useAccessibilityStore: () => accessibilityMock,
    useThemeStore: () => themeMock,
    useAnimations: () => ({
      fadeIn: animationsMock.fadeIn,
      staggerDelay: vi.fn(() => ({})),
    }),
  };
});

vi.mock('@mindease/shared', async () => {
  const actual = await vi.importActual<any>('@mindease/shared');

  return {
    ...actual,
    AccessibleContainer: ({ children }: any) => <div>{children}</div>,
    ThemedAlert: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    FocusCard: ({ title, icon, children }: any) => (
      <section aria-label={title}>
        <h2>{title}</h2>
        <div>{icon}</div>
        <div>{children}</div>
      </section>
    ),

    useAccessibilityStore: () => accessibilityMock,
    useThemeStore: () => themeMock,
    useAnimations: () => ({
      fadeIn: animationsMock.fadeIn ?? {},
      staggerDelay: vi.fn(() => ({})),
    }),
  };
});


function getSectionScopeByAriaLabel(sectionLabel: RegExp) {
  const section = screen.getByRole('region', { name: sectionLabel });
  return within(section);
}

async function openSelectInSectionByIndex(
  user: ReturnType<typeof userEvent.setup>,
  sectionLabel: RegExp,
  comboboxIndex = 0,
) {
  const scope = getSectionScopeByAriaLabel(sectionLabel);

  const comboboxes = scope.getAllByRole('combobox');
  const combo = comboboxes[comboboxIndex];

  await user.click(combo);
}

async function chooseOption(user: ReturnType<typeof userEvent.setup>, option: RegExp) {
  const opt =
    screen.queryByRole('option', { name: option }) ??
    screen.queryByRole('menuitem', { name: option });

  if (opt) {
    await user.click(opt);
    return;
  }

  const optAsync =
    (await screen.findByRole('option', { name: option }).catch(() => null)) ??
    (await screen.findByRole('menuitem', { name: option }));

  await user.click(optAsync);
}

async function chooseOptionExact(user: ReturnType<typeof userEvent.setup>, option: RegExp) {
  const opt = await screen.findByRole('option', { name: option, exact: false });
  await user.click(opt);
}

async function chooseOptionByIndex(user: ReturnType<typeof userEvent.setup>, index: number) {
  const options = await screen.findAllByRole('option');
  await user.click(options[index]);
}

describe('Painel Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    accessibilityMock.complexityLevel = 'simple';
    accessibilityMock.focusMode = false;
    accessibilityMock.detailedMode = false;
    accessibilityMock.fontSize = 'medium';
    accessibilityMock.spacing = 'comfortable';
    accessibilityMock.contrastLevel = 'medium';
    accessibilityMock.animationsEnabled = true;
    accessibilityMock.cognitiveAlerts = false;
    accessibilityMock.vlibrasEnabled = false;

    themeMock.mode = 'light';
  });

  it('deve renderizar título, subtítulo e alerta fixo', () => {
    renderWithProviders(<Painel />);

    expect(screen.getByRole('heading', { name: /Painel Cognitivo/i })).toBeInTheDocument();
    expect(
      screen.getByText(/Personalize sua experiência para atender suas necessidades cognitivas/i),
    ).toBeInTheDocument();

    expect(
      screen.getByText(/Todas as configurações são salvas automaticamente e aplicadas em tempo real/i),
    ).toBeInTheDocument();

    // Cards
    expect(screen.getByRole('heading', { name: /Nível de Complexidade/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Modos de Visualização/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Tamanho da Fonte/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Espaçamento/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Contraste/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Recursos Adicionais/i })).toBeInTheDocument();
  });

it('Complexidade: deve chamar setComplexityLevel ao alterar select', async () => {
  const user = userEvent.setup();
  renderWithProviders(<Painel />);

  await openSelectInSectionByIndex(user, /Nível de Complexidade/i, 0);
  await chooseOptionByIndex(user, 1); 

  expect(accessibilityMock.setComplexityLevel).toHaveBeenCalledTimes(1);

});

  it('deve exibir Chip "Atual: Simples" quando complexityLevel = simple', () => {
    accessibilityMock.complexityLevel = 'simple';
    renderWithProviders(<Painel />);

    expect(screen.getByText(/Atual:\s*Simples/i)).toBeInTheDocument();
  });

  it('Modos de Visualização: togglar "Modo Foco" chama toggleFocusMode', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Painel />);

    const focusSwitch = screen.getByRole('switch', { name: /Modo Foco/i });
    await user.click(focusSwitch);

    expect(accessibilityMock.toggleFocusMode).toHaveBeenCalledTimes(1);
  });

  it('Modos de Visualização: togglar "Modo Monocromático" chama toggleDetailedMode', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Painel />);

    const monoSwitch = screen.getByRole('switch', { name: /Modo Monocromático/i });
    await user.click(monoSwitch);

    expect(accessibilityMock.toggleDetailedMode).toHaveBeenCalledTimes(1);
  });

  it('Modos de Visualização: togglar "Modo Escuro" chama toggleTheme', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Painel />);

    const darkSwitch = screen.getByRole('switch', { name: /Modo Escuro/i });
    await user.click(darkSwitch);

    expect(themeMock.toggleTheme).toHaveBeenCalledTimes(1);
  });

it('Tamanho da Fonte: alterar select chama setFontSize', async () => {
  const user = userEvent.setup();
  renderWithProviders(<Painel />);

  await openSelectInSectionByIndex(user, /Tamanho da Fonte/i, 0);
  await chooseOption(user, /^Grande$/i);

  expect(accessibilityMock.setFontSize).toHaveBeenCalledTimes(1);
  expect(accessibilityMock.setFontSize).toHaveBeenCalledWith('large');
});

  it('Espaçamento: alterar select chama setSpacing', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Painel />);

    await openSelectInSectionByIndex(user, /^Espaçamento$/i, 0);
    await chooseOption(user, /Espaçoso/i);

    expect(accessibilityMock.setSpacing).toHaveBeenCalledTimes(1);
    expect(accessibilityMock.setSpacing).toHaveBeenCalledWith('spacious');
  });

  it('Contraste: alterar select chama setContrastLevel', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Painel />);

    await openSelectInSectionByIndex(user, /^Contraste$/i, 0);
    await chooseOption(user, /Baixo/i);

    expect(accessibilityMock.setContrastLevel).toHaveBeenCalledTimes(1);
    expect(accessibilityMock.setContrastLevel).toHaveBeenCalledWith('low');
  });

  it('Recursos Adicionais: togglar "Animações" chama toggleAnimations', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Painel />);

    const animSwitch = screen.getByRole('switch', { name: /^Animações$/i });
    await user.click(animSwitch);

    expect(accessibilityMock.toggleAnimations).toHaveBeenCalledTimes(1);
  });

  it('Alertas Cognitivos: ao ativar (cognitiveAlerts=false), deve abrir snackbar com mensagem de ativação (success)', async () => {
    const user = userEvent.setup();

    accessibilityMock.cognitiveAlerts = false;
    renderWithProviders(<Painel />);

    const cognitiveSwitch = screen.getByRole('switch', { name: /^Alertas Cognitivos$/i });
    await user.click(cognitiveSwitch);

    expect(accessibilityMock.toggleCognitiveAlerts).toHaveBeenCalledTimes(1);

    expect(await screen.findByText(/Alertas cognitivos ativados/i)).toBeInTheDocument();

    expect(screen.getByText(/Alertas cognitivos ativados/i)).toBeInTheDocument();
  });

  it('Alertas Cognitivos: ao desativar (cognitiveAlerts=true), deve abrir snackbar com mensagem de desativação', async () => {
    const user = userEvent.setup();

    accessibilityMock.cognitiveAlerts = true;
    renderWithProviders(<Painel />);

    const cognitiveSwitch = screen.getByRole('switch', { name: /^Alertas Cognitivos$/i });
    await user.click(cognitiveSwitch);

    expect(accessibilityMock.toggleCognitiveAlerts).toHaveBeenCalledTimes(1);
    expect(await screen.findByText(/Alertas cognitivos desativados/i)).toBeInTheDocument();
  });

  it('Recursos Adicionais: togglar "VLibras (Libras)" chama toggleVlibras', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Painel />);

    const vlibrasSwitch = screen.getByRole('switch', { name: /VLibras/i });
    await user.click(vlibrasSwitch);

    expect(accessibilityMock.toggleVlibras).toHaveBeenCalledTimes(1);
  });
});