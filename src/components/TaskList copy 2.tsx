import { useEffect, useState } from "react";
import Task from "./Task";
// import axios from "axios";

export interface ITask {
  title: string;
  isCompleted: boolean;
  updatedAt: number | string;
}

const TaskList = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [newTask, setNewTask] = useState<Omit<ITask, "updatedAt">>({
    title: "",
    isCompleted: false,
  });

  const sortByDate = (arr: ITask[]) => {
    return arr.sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );
  };

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        // const data = (await axios.get("https://jsonplaceholder.typicode.com/todos")).data;
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/todos"
        );
        const data = await response.json();
        setTasks(
          sortByDate(
            data
              .splice(0, 10)
              .map((e: { title: string; completed: boolean }) => ({
                title: e.title,
                isCompleted: e.completed,
                updatedAt: new Date(
                  Date.now() - Math.random() * 1000 * 60 * 60 * 24 * 30
                ),
              }))
          )
        );
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTodos();
  }, []);

  const addTask = () => {
    if (newTask.title.trim()) {
      const tasksCopy = [...tasks];
      tasksCopy.unshift({ ...newTask, updatedAt: new Date().toISOString() });
      setTasks(tasksCopy);
      setNewTask({
        title: "",
        isCompleted: false,
      });
    }
  };

  const deleteTask = (i: number) => {
    setTasks(tasks.filter((_, index) => i !== index));
  };

  const editTask = (i: number, updatedTask: ITask) => {
    if (
      tasks[i].title !== updatedTask.title ||
      tasks[i].isCompleted !== updatedTask.isCompleted
    ) {
      setTasks(
        sortByDate(tasks.map((e, index) => (index === i ? updatedTask : e)))
      );
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4 text-center">Task Manager App</h1>
      <div className="input-group mb-3">
        <input
          className="form-control"
          type="text"
          value={newTask.title}
          onChange={(e) =>
            setNewTask({
              title: e.target.value,
              isCompleted: false,
            })
          }
          placeholder="New Task"
        />
        <button className="btn btn-primary" onClick={addTask}>
          Add Task
        </button>
      </div>
      <div>
        {tasks.map((task, index) => (
          <Task
            key={Math.random()}
            task={task}
            deleteTask={() => deleteTask(index)}
            editTask={editTask}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskList;
