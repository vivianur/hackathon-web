import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Plataforma from '../Plataforma';
import { renderWithProviders } from '@mindease/shared/tests';
import { createSpacingMock } from '@mindease/shared/tests';

const spacingMock = createSpacingMock();

const accessibilityState = {
    complexityLevel: 'simple' as 'simple' | 'moderate' | 'detailed',
};

vi.mock('@mindease/shared', async () => {
    const actual = await vi.importActual<any>('@mindease/shared');

    const useAccessibilityStore = (selector?: (s: typeof accessibilityState) => any) =>
        typeof selector === 'function' ? selector(accessibilityState) : accessibilityState;

    return {
        ...actual,
        AccessibleContainer: ({ children }: any) => <div>{children}</div>,
        useSpacing: () => spacingMock,
        useAccessibilityStore,
    };
});

describe('Plataforma Page', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        spacingMock.gridSpacing = 2;
        accessibilityState.complexityLevel = 'simple';
    });

    it('deve renderizar cabeçalho e controles de visualização', () => {
        renderWithProviders(<Plataforma />);

        expect(screen.getByRole('heading', { name: /Plataforma/i })).toBeInTheDocument();
        expect(screen.getByText(/Descubra novos recursos e funcionalidades/i)).toBeInTheDocument();

        expect(screen.getByRole('button', { name: /Visualizar como cards/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Visualizar como lista/i })).toBeInTheDocument();
    });

    it('no modo cards (default) deve renderizar os cards com descrições (sem títulos)', () => {
        renderWithProviders(<Plataforma />);

        expect(screen.queryByRole('heading', { name: /^Inteligência Artificial$/i })).not.toBeInTheDocument();
        expect(screen.queryByRole('heading', { name: /^Análise de Dados$/i })).not.toBeInTheDocument();

        expect(
            screen.getByText(/Conheça ferramentas e recursos de IA para otimizar seu trabalho/i),
        ).toBeInTheDocument();

        expect(
            screen.getByText(/Descubra insights poderosos através da análise de dados/i),
        ).toBeInTheDocument();
    });

    it('ao trocar para modo lista, deve mostrar títulos e descrições dos tópicos', async () => {
        const user = userEvent.setup();

        renderWithProviders(<Plataforma />);

        await user.click(screen.getByRole('button', { name: /Visualizar como lista/i }));

        expect(screen.getByRole('heading', { name: /^Inteligência Artificial$/i })).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: /^Análise de Dados$/i })).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: /^Automação$/i })).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: /^Cloud Computing$/i })).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: /^DevOps$/i })).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: /^Segurança$/i })).toBeInTheDocument();

        expect(
            screen.getByText(/Conheça ferramentas e recursos de IA para otimizar seu trabalho/i),
        ).toBeInTheDocument();
    });

    it('clicar em um tópico no modo cards deve abrir a página de detalhes com aulas e botões', async () => {
        const user = userEvent.setup();

        renderWithProviders(<Plataforma />);

        await user.click(
            screen.getByText(/Conheça ferramentas e recursos de IA para otimizar seu trabalho/i),
        );

        expect(screen.getByRole('button', { name: /Voltar/i })).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: /Inteligência Artificial/i })).toBeInTheDocument();

        expect(screen.getByText(/Aula 1: Introdução à IA/i)).toBeInTheDocument();
        expect(screen.getByText(/Aula 2: Aprendizado Supervisionado/i)).toBeInTheDocument();
        expect(screen.getByText(/Aula 3: Redes Neurais/i)).toBeInTheDocument();

        const videoButtons = screen.getAllByRole('button', { name: /^Vídeo$/i });
        const textButtons = screen.getAllByRole('button', { name: /^Texto$/i });

        expect(videoButtons.length).toBe(3);
        expect(textButtons.length).toBe(3);
    });

    it('clicar em Voltar nos detalhes deve retornar para a listagem', async () => {
        const user = userEvent.setup();

        renderWithProviders(<Plataforma />);

        await user.click(
            screen.getByText(/Conheça ferramentas e recursos de IA para otimizar seu trabalho/i),
        );

        await user.click(screen.getByRole('button', { name: /Voltar/i }));

        expect(screen.queryByRole('button', { name: /Voltar/i })).not.toBeInTheDocument();
        expect(screen.queryByText(/Inteligência Artificial/i)).not.toBeInTheDocument();
        expect(
            screen.getByText(/Conheça ferramentas e recursos de IA para otimizar seu trabalho/i),
        ).toBeInTheDocument();
    });

    it('clicar em um tópico no modo lista deve abrir a página de detalhes', async () => {
        const user = userEvent.setup();

        renderWithProviders(<Plataforma />);

        await user.click(screen.getByRole('button', { name: /Visualizar como lista/i }));
        await user.click(screen.getByText(/DevOps/i));

        expect(screen.getByRole('button', { name: /Voltar/i })).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: /^DevOps$/i })).toBeInTheDocument();

        expect(screen.getByText(/Aula 1: Cultura DevOps/i)).toBeInTheDocument();
        expect(screen.getByText(/Aula 2: CI\/CD/i)).toBeInTheDocument();
        expect(screen.getByText(/Aula 3: Observabilidade/i)).toBeInTheDocument();
    });

    it('não deve quebrar ao variar complexityLevel (simple/moderate/detailed)', async () => {
        const user = userEvent.setup();

        accessibilityState.complexityLevel = 'simple';
        renderWithProviders(<Plataforma />);
        expect(screen.getByRole('heading', { name: /Plataforma/i })).toBeInTheDocument();

        accessibilityState.complexityLevel = 'moderate';
        await user.click(screen.getByRole('button', { name: /Visualizar como lista/i }));
        expect(screen.getByText(/Inteligência Artificial/i)).toBeInTheDocument();

        accessibilityState.complexityLevel = 'detailed';
        await user.click(screen.getByRole('heading', { name: /^Segurança$/i }));
        expect(screen.getByRole('heading', { name: /^Segurança$/i })).toBeInTheDocument();
    });
});