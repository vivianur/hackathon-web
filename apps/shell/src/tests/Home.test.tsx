import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Home from '../pages/Home';
import { renderWithProviders } from '@mindease/shared/tests';

const navigateMock = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<any>('react-router-dom');
  return {
    ...actual,
    useNavigate: () => navigateMock,
  };
});

const accessibilityState = {
  detailedMode: false,
  complexityLevel: 'simple' as 'simple' | 'moderate' | 'detailed',
};

vi.mock('@mindease/shared', async () => {
  const actual = await vi.importActual<any>('@mindease/shared');

  return {
    ...actual,

    AccessibleContainer: ({ children }: any) => <div data-testid="accessible-container">{children}</div>,

    AnimatedCard: ({ children, onClick, ...props }: any) => (
      <div
        role="button"
        tabIndex={0}
        onClick={onClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') onClick?.();
        }}
        data-testid="animated-card"
        {...props}
      >
        {children}
      </div>
    ),

    useAccessibilityStore: (selector?: (s: any) => any) =>
      (typeof selector === 'function' ? selector(accessibilityState) : accessibilityState),
  };
});

describe('Home Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    accessibilityState.detailedMode = false;
    accessibilityState.complexityLevel = 'simple';
  });

  it('deve renderizar todos os cards de funcionalidades', () => {
    renderWithProviders(<Home />);

    const cards = screen.getAllByTestId('animated-card');
    expect(cards).toHaveLength(5);

    expect(screen.getByText(/^Plataforma$/i)).toBeInTheDocument();
    expect(screen.getByText(/Explore ferramentas e recursos disponíveis na plataforma/i)).toBeInTheDocument();

    expect(screen.getByText(/Organizador de Tarefas/i)).toBeInTheDocument();
    expect(screen.getByText(/Gerencie atividades com suporte Kanban e timer Pomodoro/i)).toBeInTheDocument();

    expect(screen.getByText(/Painel Cognitivo/i)).toBeInTheDocument();
    expect(screen.getByText(/Personalize a interface de acordo com suas necessidades cognitivas/i)).toBeInTheDocument();

    expect(screen.getByText(/^Perfil$/i)).toBeInTheDocument();
    expect(screen.getByText(/Configure suas preferências e rotina de estudos/i)).toBeInTheDocument();

    expect(screen.getByText(/Configurações/i)).toBeInTheDocument();
    expect(screen.getByText(/Ajuste notificações e preferências do sistema/i)).toBeInTheDocument();
  });

  it('ao clicar em "Plataforma" deve navegar para /plataforma', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Home />);

    const cardTitle = screen.getByRole('heading', { name: /^Plataforma$/i });
    const cardButton = cardTitle.closest('[role="button"]');
    expect(cardButton).toBeTruthy();

    await user.click(cardButton as HTMLElement);
    expect(navigateMock).toHaveBeenCalledWith('/plataforma');
  });

  it('ao clicar em "Organizador de Tarefas" deve navegar para /tarefas', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Home />);

    await user.click(screen.getByText(/Organizador de Tarefas/i));
    expect(navigateMock).toHaveBeenCalledWith('/tarefas');
  });

  it('ao clicar em "Painel Cognitivo" deve navegar para /painel', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Home />);

    await user.click(screen.getByText(/Painel Cognitivo/i));
    expect(navigateMock).toHaveBeenCalledWith('/painel');
  });

  it('ao clicar em "Perfil" deve navegar para /perfil', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Home />);

    await user.click(screen.getByText(/^Perfil$/i));
    expect(navigateMock).toHaveBeenCalledWith('/perfil');
  });

  it('ao clicar em "Configurações" deve navegar para /config', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Home />);

    await user.click(screen.getByText(/Configurações/i));
    expect(navigateMock).toHaveBeenCalledWith('/config');
  });

  it('deve exibir a seção de neurodivergências quando complexityLevel for detailed', () => {
    accessibilityState.detailedMode = true;
    accessibilityState.complexityLevel = 'detailed';

    renderWithProviders(<Home />);

    expect(screen.getByRole('heading', { name: /Suporte para Neurodivergências/i })).toBeInTheDocument();
    expect(screen.getByText(/TDAH/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Configure seu Perfil/i })).toBeInTheDocument();
  });
});