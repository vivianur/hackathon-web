import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Tarefas from '../Tarefas';
import { renderWithProviders } from '@mindease/shared/tests';
import { createSpacingMock } from '@mindease/shared/tests';

type TaskStatus = 'todo' | 'in-progress' | 'done';

type Task = {
    id: string;
    title: string;
    description?: string;
    status: TaskStatus;
};

const spacingMock = createSpacingMock();

const taskState: { tasks: Task[] } = { tasks: [] };
const accessibilityState: { detailedMode: boolean } = { detailedMode: false };
const themeState: { mode: 'light' | 'dark' } = { mode: 'light' };

vi.mock('../components/PomodoroTimer', () => ({
    default: () => <div data-testid="pomodoro">PomodoroTimer</div>,
}));

vi.mock('../components/TaskDialog', () => ({
    default: ({ editTask, onClose }: any) => (
        <div data-testid="task-dialog">
            <div>TaskDialog</div>
            <div data-testid="dialog-editing">
                {editTask ? `editing:${editTask.title}` : 'editing:none'}
            </div>
            <button type="button" onClick={onClose}>
                close-dialog
            </button>
        </div>
    ),
}));

vi.mock('../components/TaskCard', () => ({
    default: ({ task, onEdit }: any) => (
        <div data-testid="task-card">
            <div data-testid="task-title">{task.title}</div>
            <div data-testid="task-status">{task.status}</div>
            <button type="button" onClick={() => onEdit(task)}>
                edit
            </button>
        </div>
    ),
}));

vi.mock('@mindease/shared', async () => {
    const actual = await vi.importActual<any>('@mindease/shared');

    const useTaskStore = (selector?: (s: typeof taskState) => any) =>
        typeof selector === 'function' ? selector(taskState) : taskState;

    const useAccessibilityStore = (selector?: (s: typeof accessibilityState) => any) =>
        typeof selector === 'function' ? selector(accessibilityState) : accessibilityState;

    const useThemeStore = (selector?: (s: typeof themeState) => any) =>
        typeof selector === 'function' ? selector(themeState) : themeState;

    return {
        ...actual,
        AccessibleContainer: ({ children }: any) => <div>{children}</div>,
        useTaskStore,
        useSpacing: () => spacingMock,
        useAccessibilityStore,
        useThemeStore,
    };
});

function seedTasks(tasks: Task[]) {
    taskState.tasks = tasks;
}

describe('Tarefas Page', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        spacingMock.gridSpacing = 2;
        accessibilityState.detailedMode = false;
        themeState.mode = 'light';
        seedTasks([]);
    });

    it('deve renderizar cabeçalho, toggle de view, dialog, pomodoro e seção de dicas', () => {
        renderWithProviders(<Tarefas />);

        expect(screen.getByRole('heading', { name: /Organizador de Tarefas/i })).toBeInTheDocument();
        expect(screen.getByText(/Gerencie suas atividades com suporte cognitivo/i)).toBeInTheDocument();

        expect(screen.getByRole('button', { name: /Kanban/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Lista/i })).toBeInTheDocument();

        expect(screen.getByTestId('task-dialog')).toBeInTheDocument();
        expect(screen.getByTestId('pomodoro')).toBeInTheDocument();

        expect(screen.getByText(/Dicas para Melhor Produtividade/i)).toBeInTheDocument();
        expect(screen.getByText(/Divida tarefas grandes/i)).toBeInTheDocument();
    });

    it('modo kanban (default): deve mostrar 3 colunas e "Nenhuma tarefa" em todas quando vazio', () => {
        renderWithProviders(<Tarefas />);

        expect(screen.getByText(/^A Fazer$/i)).toBeInTheDocument();
        expect(screen.getByText(/^Em Progresso$/i)).toBeInTheDocument();
        expect(screen.getByText(/^Concluído$/i)).toBeInTheDocument();

        const emptyTexts = screen.getAllByText(/Nenhuma tarefa/i);
        expect(emptyTexts.length).toBe(3);

        const zeros = screen.getAllByText('0');
        expect(zeros.length).toBeGreaterThanOrEqual(3);
    });

    it('modo lista: quando não houver tasks, deve mostrar mensagem de vazio da lista', async () => {
        const user = userEvent.setup();

        renderWithProviders(<Tarefas />);

        await user.click(screen.getByRole('button', { name: /Lista/i }));

        expect(screen.getByText(/Nenhuma tarefa criada ainda/i)).toBeInTheDocument();
        expect(screen.getByText(/Clique em "Nova Tarefa" para começar/i)).toBeInTheDocument();
    });

    it('kanban: deve renderizar TaskCard apenas nas colunas correspondentes ao status', () => {
        seedTasks([
            { id: '1', title: 'T1', status: 'todo' },
            { id: '2', title: 'T2', status: 'in-progress' },
            { id: '3', title: 'T3', status: 'done' },
            { id: '4', title: 'T4', status: 'done' },
        ]);

        renderWithProviders(<Tarefas />);

        const cards = screen.getAllByTestId('task-card');
        expect(cards.length).toBe(4);

        expect(screen.getByText('T1')).toBeInTheDocument();
        expect(screen.getByText('T2')).toBeInTheDocument();
        expect(screen.getByText('T3')).toBeInTheDocument();
        expect(screen.getByText('T4')).toBeInTheDocument();
    });

    it('clicar em "edit" em um TaskCard deve setar editingTask e repassar para TaskDialog', async () => {
        const user = userEvent.setup();

        seedTasks([{ id: '1', title: 'Editar Essa', status: 'todo' }]);

        renderWithProviders(<Tarefas />);

        expect(screen.getByTestId('dialog-editing')).toHaveTextContent('editing:none');

        await user.click(screen.getByRole('button', { name: /^edit$/i }));

        expect(screen.getByTestId('dialog-editing')).toHaveTextContent('editing:Editar Essa');

        await user.click(screen.getByRole('button', { name: /close-dialog/i }));

        expect(screen.getByTestId('dialog-editing')).toHaveTextContent('editing:none');
    });

    it('modo lista: deve renderizar tasks ordenadas por status (todo -> in-progress -> done)', async () => {
        const user = userEvent.setup();

        seedTasks([
            { id: 'a', title: 'Done 1', status: 'done' },
            { id: 'b', title: 'Todo 1', status: 'todo' },
            { id: 'c', title: 'InProg 1', status: 'in-progress' },
            { id: 'd', title: 'Todo 2', status: 'todo' },
            { id: 'e', title: 'Done 2', status: 'done' },
        ]);

        renderWithProviders(<Tarefas />);

        await user.click(screen.getByRole('button', { name: /Lista/i }));

        const titles = screen.getAllByTestId('task-title').map((el) => el.textContent);

        const firstDoneIndex = titles.findIndex((t) => t?.startsWith('Done'));
        const firstInProgIndex = titles.findIndex((t) => t?.startsWith('InProg'));
        const firstTodoIndex = titles.findIndex((t) => t?.startsWith('Todo'));

        expect(firstTodoIndex).toBe(0);
        expect(firstInProgIndex).toBeGreaterThan(firstTodoIndex);
        expect(firstDoneIndex).toBeGreaterThan(firstInProgIndex);

        expect(screen.getByText('Todo 1')).toBeInTheDocument();
        expect(screen.getByText('Todo 2')).toBeInTheDocument();
        expect(screen.getByText('InProg 1')).toBeInTheDocument();
        expect(screen.getByText('Done 1')).toBeInTheDocument();
        expect(screen.getByText('Done 2')).toBeInTheDocument();
    });

    it('não deve quebrar ao alternar detailedMode e theme mode (getColumnColor)', () => {
        seedTasks([{ id: '1', title: 'T1', status: 'todo' }]);

        accessibilityState.detailedMode = false;
        themeState.mode = 'light';

        const { rerender } = renderWithProviders(<Tarefas />);
        expect(screen.getAllByText('T1').length).toBeGreaterThanOrEqual(1);

        accessibilityState.detailedMode = true;
        themeState.mode = 'dark';

        rerender(<Tarefas />);
        expect(screen.getAllByText('T1').length).toBeGreaterThanOrEqual(1);
    });
});