import { useState } from "react";

import "../styles/tasklist.scss";

import { FiTrash, FiCheckSquare } from "react-icons/fi";

type Task = {
  id: number;
  title: string;
  isComplete: boolean;
};

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [isEmptyTitleTask, setIsEmptyTitleTask] = useState(false);

  function handleCreateNewTask() {
    if (!newTaskTitle) {
      setIsEmptyTitleTask(true);
      return;
    }

    const task = {
      id: Math.round(Math.random() * 1000),
      title: newTaskTitle,
      isComplete: false,
    };

    setTasks((tasks) => [...tasks, task]);
    setIsEmptyTitleTask(false);
    setNewTaskTitle("");
  }

  function handleToggleTaskCompletion(id: number) {
    return () => {
      setTasks((tasks) =>
        tasks.map((task) => {
          if (task.id === id) {
            return {
              ...task,
              isComplete: !task.isComplete,
            };
          }

          return task;
        })
      );
    };
  }

  function handleRemoveTask(id: number) {
    return () => {
      setTasks((tasks) => tasks.filter((task) => task.id !== id));
    };
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input
            type="text"
            placeholder="Adicionar novo todo"
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
            required
          />
          <button
            type="submit"
            data-testid="add-task-button"
            onClick={handleCreateNewTask}
          >
            <FiCheckSquare size={16} color="#fff" />
          </button>
          {isEmptyTitleTask && <p>Campo vazio, digite o título da tarefa</p>}
        </div>
      </header>

      <main>
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <div
                className={task.isComplete ? "completed" : ""}
                data-testid="task"
              >
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button
                type="button"
                data-testid="remove-task-button"
                onClick={handleRemoveTask(task.id)}
              >
                <FiTrash size={16} />
              </button>
            </li>
          ))}
        </ul>
      </main>
    </section>
  );
}

