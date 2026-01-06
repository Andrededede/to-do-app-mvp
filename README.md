# To-Do App - Arquitetura MVP com React

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)

Este projeto foi desenvolvido como parte de um estudo de Engenharia de Software (IFCE 2025.2) para comparar arquiteturas de frontend. O objetivo principal foi implementar o padrão arquitetural **MVP (Model-View-Presenter)**.

O objetivo é separar estritamente a camada de apresentação (View) da lógica de negócios e estado (Presenter).

## 📦 Como rodar o projeto

1. Clone o repositório.
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Execute o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

## ✨ Funcionalidades

* ✅ **CRUD Completo:** Criar, Ler, Atualizar e Deletar tarefas.
* ✋ **Drag and Drop Nativo:** Reordenação de tarefas com feedback visual.
* 🌙 **Dark/Light Mode:** Tema persistente com variáveis CSS nativas.
* 🔍 **Filtros:** Alternar visualização entre todas as tarefas ou pendentes.
* 🔔 **Feedback Visual:** Sistema de Toasts (notificações) para sucesso e erro.
* 📱 **Responsivo:** Layout fluido que se adapta a diferentes tamanhos de tela.

## 🏗️ Arquitetura (MVP)

1. A **View** é passiva e delega todas as ações do usuário para o Presenter.
2. O **Presenter** contém a lógica de decisões, atualiza o Model e decide o que a View deve exibir.
3. O **Model** define a estrutura dos dados.

A organização do código reflete a separação de responsabilidades:

```
src/
├── models/             # (M) Model
│   └── Task.ts         # Definição das interfaces de dados (Task)
│
├── pages/
│   └── to-do/
│       ├── ToDoPage.tsx        # (V) View Principal
│       ├── useToDoPresenter.ts # (P) Presenter (Lógica e Estado)
│       └── to-do-card/         # (V) Componentes visuais
│
└── ...
```

### 🧩 Papéis na Implementação:

#### 1. Model (`Task.ts`)
Responsável apenas pelas definições de tipo e estrutura dos dados. Não contém lógica de UI nem regras de negócio complexas.

#### 2. View (`ToDoPage.tsx`)
*   **Responsabilidade:** Renderizar a interface gráfica e capturar eventos do usuário.
*   **Comportamento:** É uma "View Passiva". Ela não toma decisões.
    *   Recebe dados prontos do Presenter e delega eventos (cliques, inputs) através de comandos imperativos (ex: `presenter.addTask()`).

#### 3. Presenter (`useToDoPresenter.ts`)
*   **Responsabilidade:** Atua como o "cérebro" da tela.
*   **Comportamento:**
    *   Gerencia o Estado da Aplicação (Tasks, Inputs, Filtros).
    *   Contém as Regras de Negócio (Validação de input, lógica de ordenação, persistência).
    *   Expõe uma interface pública com **Ações** (`addTask`, `removeTask`) e **Estado** final para a View.

---
