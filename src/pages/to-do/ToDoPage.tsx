import React from "react";
import { useToDoPresenter } from "./useToDoPresenter";
import { useTheme } from "../../hooks/useTheme";
import { ToDoCard } from "./to-do-card/ToDoCard";
import { ToDoLog } from "./to-do-log/ToDoLog";
import { Plus, ListChecks, Sun, Moon, Filter } from "lucide-react";
import "./to-do-page.css";

export const ToDoPage: React.FC = () => {
  const presenter = useToDoPresenter();
  const { isDark, toggleTheme } = useTheme();

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") presenter.addTask();
  };

  return (
    <div className="page-wrapper">
      <div className="todo-container">
        <button
          className="theme-toggle-btn"
          onClick={toggleTheme}
          title={isDark ? "Mudar para Modo Claro" : "Mudar para Modo Escuro"}
        >
          {isDark ? <Sun size={24} /> : <Moon size={24} />}
        </button>

        <header className="todo-header">
          <h1>To Do App MVP</h1>
          <ListChecks size={32} className="header-icon" />
        </header>

        <div className="input-group">
          <input
            type="text"
            placeholder="Adicione uma nova tarefa..."
            value={presenter.newTaskText}
            onChange={(e) => presenter.setNewTaskText(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            onClick={presenter.addTask}
            className="add-btn"
            title="Adicionar nova tarefa"
          >
            <Plus size={24} color="white" />
          </button>
        </div>

        <ToDoLog
          key={presenter.logState?.id}
          message={presenter.logState?.message || null}
          type={presenter.logState?.type || null}
        />

        <div className="tasks-toolbar">
          <button
            className={`filter-btn ${presenter.hideCompleted ? "active" : ""}`}
            onClick={presenter.toggleHideCompleted}
            title={
              presenter.hideCompleted
                ? "Mostrar todas as tarefas"
                : "Ocultar tarefas concluídas"
            }
          >
            <Filter size={20} />
          </button>
        </div>

        <div className="tasks-list">
          {presenter.tasks.map((task, index) => (
            <ToDoCard
              key={task.id}
              index={index}
              task={task}
              onDelete={() => presenter.removeTask(task.id)}
              onToggle={() => presenter.toggleTask(task.id)}
              onUpdate={presenter.updateTask}
              // MUDANÇA: Drag habilitado sempre, pois agora usa IDs
              onDragStart={presenter.onDragStart}
              onDragEnter={presenter.onDragEnter}
              onDragEnd={presenter.onDragEnd}
            />
          ))}

          {presenter.tasks.length === 0 && (
            <p className="empty-msg">
              {presenter.hideCompleted
                ? "Nenhuma tarefa pendente."
                : "Nenhuma tarefa por enquanto."}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
