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
| **Arquitetura** | Microfrontend | ✅ Implementado |
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

### Sprint 2: Arquitetura Microfrontend ✅ CONCLUÍDO

> **Objetivo:** Migrar aplicação monolito para arquitetura Microfrontend

| Tarefa | Status | Detalhes |
|--------|--------|----------|
| Criar estrutura de workspaces | ✅ | `apps/` e `packages/` configurados |
| Configurar NPM Workspaces | ✅ | `package.json` com workspaces |
| Configurar Module Federation | ✅ | Vite plugin federation configurado |
| Criar pacote @mindease/shared | ✅ | Entities, stores, components compartilhados |
| Migrar app shell | ✅ | Host com Navbar, routing e lazy loading |
| Migrar app dashboard | ✅ | Painel.tsx + Explore.tsx |
| Migrar app tasks | ✅ | Tarefas.tsx + componentes (TaskCard, PomodoroTimer) |
| Migrar app profile | ✅ | Perfil.tsx + Config.tsx |

**Arquitetura implementada:**
- **Shell (porta 5000)**: Host container, Navbar, routing
- **Dashboard (porta 5001)**: Painel cognitivo, Explore
- **Tasks (porta 5002)**: Kanban, Pomodoro Timer
- **Profile (porta 5003)**: Perfil, Configurações
- **@mindease/shared**: Stores, entities, componentes base

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
| Microfrontend | ✅ | 4 apps + shared package configurados |
| Clean Architecture | ✅ | Entities isoladas em `src/domain/` |
| Acessibilidade Cognitiva | ✅ | Core diferencial implementado |

---

## Métricas de Progresso

```
Sprint 1 (Core):        ████████████████████ 100%
Sprint 2 (Microfrontend): ████████████████████ 100%
Sprint 3 (UX):          ░░░░░░░░░░░░░░░░░░░░   0%
Sprint 4 (Qualidade):   ░░░░░░░░░░░░░░░░░░░░   0%
Sprint 5 (Diferencial): ░░░░░░░░░░░░░░░░░░░░   0%

Progresso Geral: ████████████████░░░░  80%
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
# Monolito (aplicação legada)
npm run dev:legacy
# Acesse: http://localhost:5173

# Microfrontends (todos os apps)
npm run dev
# Shell: http://localhost:5000
# Dashboard: http://localhost:5001
# Tasks: http://localhost:5002
# Profile: http://localhost:5003
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
