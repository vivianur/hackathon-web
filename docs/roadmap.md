# Roadmap de Implementação - MindEase

> **Última atualização:** 13 Janeiro 2026
> **Status geral:** Funcionalidades core implementadas (monolito), migração para Microfrontend em andamento

---

## Visão Geral do Projeto

O **MindEase** é uma plataforma de acessibilidade cognitiva desenvolvida para o Hackathon FIAP, focada em facilitar a vida acadêmica e profissional de pessoas neurodivergentes (TDAH, TEA, Dislexia, Burnout, Ansiedade).

### Requisitos do Briefing

| Categoria | Requisito | Status |
|-----------|-----------|--------|
| **Funcional** | Painel Cognitivo Personalizável | ✅ Implementado |
| **Funcional** | Organizador de Tarefas com Suporte Cognitivo | ✅ Implementado |
| **Funcional** | Perfil + Configurações Persistentes | ✅ Implementado |
| **Arquitetura** | Microfrontend | ⏳ Estrutura criada, migração pendente |
| **Arquitetura** | Clean Architecture | ✅ Implementado |
| **Qualidade** | Testes | ⏳ Pendente |
| **Qualidade** | CI/CD | ⏳ Pendente |

---

## Progresso por Sprint

### Sprint 1: Funcionalidades Core ✅ CONCLUÍDO

> **Objetivo:** Implementar todas as funcionalidades principais do briefing

| Tarefa | Status | Detalhes |
|--------|--------|----------|
| Painel Cognitivo Personalizável | ✅ | `src/pages/Painel.tsx` |
| Organizador de Tarefas Kanban | ✅ | `src/pages/Tarefas.tsx` |
| Timer Pomodoro | ✅ | `src/components/PomodoroTimer.tsx` |
| Perfil do Usuário | ✅ | `src/pages/Perfil.tsx` |
| Configurações de Acessibilidade | ✅ | `src/pages/Config.tsx` |
| Persistência com Zustand | ✅ | `src/store/*.ts` |
| Clean Architecture (domínio) | ✅ | `src/domain/entities/` |
| Componentes de Acessibilidade | ✅ | AccessibleContainer, FocusCard, etc |

**Entregáveis do Sprint 1:**
- [x] Aplicação funcional completa (monolito)
- [x] Todas as funcionalidades do briefing implementadas
- [x] Clean Architecture com entidades de domínio isoladas
- [x] Persistência de estado no localStorage

---

### Sprint 2: Arquitetura Microfrontend ⏳ EM ANDAMENTO

> **Objetivo:** Migrar aplicação monolito para arquitetura Microfrontend

| Tarefa | Status | Detalhes |
|--------|--------|----------|
| Criar estrutura de workspaces | ✅ | `apps/` e `packages/` configurados |
| Configurar NPM Workspaces | ✅ | `package.json` com workspaces |
| Configurar Module Federation | ✅ | Vite plugin federation instalado |
| Criar pacote @mindease/shared | ⏳ Parcial | Estrutura criada, migração pendente |
| Migrar app shell | ⏳ Pendente | `apps/shell/src/` vazio |
| Migrar app dashboard | ⏳ Pendente | `apps/dashboard/src/` vazio |
| Migrar app tasks | ⚠️ Parcial | `apps/tasks/src/` parcialmente migrado |
| Migrar app profile | ⏳ Pendente | `apps/profile/src/` vazio |

**Status atual:**
- Estrutura de diretórios criada
- Configuração de workspaces pronta
- **Aplicação roda via `npm run dev:legacy`** (monolito em `src/`)
- Migração dos componentes para microfrontends pendente

---

### Sprint 3: Melhorias de UX ⏳ PENDENTE

> **Objetivo:** Refinamentos de acessibilidade cognitiva

| Tarefa | Status | Prioridade |
|--------|--------|------------|
| Avisos de Transição Suave | ⏳ Pendente | Alta |
| Melhorar Alertas Cognitivos | ⏳ Pendente | Alta |
| Integração VLibras | ⏳ Pendente | Alta |

---

### Sprint 4: Qualidade ⏳ PENDENTE

> **Objetivo:** Demonstrar boas práticas de desenvolvimento

| Tarefa | Status | Prioridade |
|--------|--------|------------|
| Testes Unitários | ⏳ Pendente | Alta |
| CI/CD com GitHub Actions | ⏳ Pendente | Alta |

**Cobertura de testes planejada:**
- Entidades de domínio
- Stores (actions e state)
- Componentes críticos (Timer, TaskCard)

---

### Sprint 5: Diferencial Competitivo 📋 PLANEJADO

> **Objetivo:** Features que destacam o projeto na competição

| Tarefa | Status | Prioridade |
|--------|--------|------------|
| Melhoria Kanban (drag & drop) | 📋 Planejado | Média |
| Resumo/Relatório Diário | 📋 Planejado | Média |
| Gamificação Leve | 📋 Planejado | Baixa |

---

## Análise de Requisitos

### Painel Cognitivo Personalizável ✅

| Requisito | Status | Localização |
|-----------|--------|-------------|
| Nível de complexidade | ✅ | `src/pages/Painel.tsx` |
| Modo de foco | ✅ | `src/components/AccessibleContainer.tsx` |
| Modo resumo/detalhado | ✅ | `src/pages/Painel.tsx` |
| Contraste | ✅ | `src/components/AccessibleContainer.tsx` |
| Espaçamento | ✅ | `src/components/AccessibleContainer.tsx` |
| Tamanho de fonte | ✅ | `src/components/AccessibleContainer.tsx` |
| Alertas cognitivos | ✅ | `src/components/CognitiveAlerts.tsx` |

### Organizador de Tarefas ✅

| Requisito | Status | Localização |
|-----------|--------|-------------|
| Kanban simplificado | ✅ | `src/pages/Tarefas.tsx` |
| Timer Pomodoro | ✅ | `src/components/PomodoroTimer.tsx` |
| Checklist inteligente | ✅ | `src/components/TaskCard.tsx` |
| Avisos de transição | ⏳ Pendente | - |

### Perfil + Configurações Persistentes ✅

| Requisito | Status | Localização |
|-----------|--------|-------------|
| Modo de foco | ✅ | `src/store/accessibilityStore.ts` |
| Contraste/espaçamento | ✅ | `src/store/accessibilityStore.ts` |
| Perfil de navegação | ✅ | `src/store/profileStore.ts` |
| Necessidades específicas | ✅ | `src/pages/Perfil.tsx` |
| Rotinas de estudo | ✅ | `src/pages/Perfil.tsx` |

### Arquitetura ✅

| Requisito | Status | Observação |
|-----------|--------|------------|
| Microfrontend | ⏳ | Estrutura criada, migração em andamento |
| Clean Architecture | ✅ | Entities isoladas em `src/domain/` |
| Acessibilidade Cognitiva | ✅ | Core diferencial implementado |

---

## Métricas de Progresso

```
Sprint 1 (Core):        ████████████████████ 100%
Sprint 2 (Microfrontend): ████░░░░░░░░░░░░░░░░  20%
Sprint 3 (UX):          ░░░░░░░░░░░░░░░░░░░░   0%
Sprint 4 (Qualidade):   ░░░░░░░░░░░░░░░░░░░░   0%
Sprint 5 (Diferencial): ░░░░░░░░░░░░░░░░░░░░   0%

Progresso Geral: ████████░░░░░░░░░░░░  40%
```

---

## Entregáveis do Hackathon

- [x] Código no GitHub
- [ ] Vídeo explicativo (máx 15min) demonstrando:
  - [x] Clean Architecture implementada
  - [x] Features de acessibilidade cognitiva
  - [ ] Demonstração do fluxo do usuário
  - [ ] Diferencial técnico e de inovação

---

## Como Executar

```bash
# Aplicação principal (monolito funcional)
npm run dev:legacy

# Acesse: http://localhost:5173
```

---

## Legenda

| Símbolo | Significado |
|---------|-------------|
| ✅ | Concluído |
| ⏳ | Em andamento / Pendente |
| ⚠️ | Parcialmente implementado |
| 📋 | Planejado |
| ❌ | Não implementado |
