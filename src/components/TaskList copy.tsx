import { useEffect, useState } from "react";
import Task from "./Task";
import axios from "axios";

const TaskList = () => {
  const [tasks, setTasks] = useState([
    {
      title: "Task 1",
      isCompleted: false,
      updatedAt: new Date().toISOString(),
    },
    {
      title: "Task 2",
      isCompleted: false,
      updatedAt: new Date().toISOString(),
    },
    {
      title: "Task 3",
      isCompleted: false,
      updatedAt: new Date().toISOString(),
    },
  ]);
  const [newTask, setNewTask] = useState({
    title: "",
    isCompleted: false,
  });

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const data = (
          await axios.get("https://jsonplaceholder.typicode.com/todos")
        ).data;
        console.log(data);
        for (let i = 0; i < 10; i++) {
          setTasks({ title: data[i].title, isCompleted: data[i].isCompleted });
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchTodos();
  }, []);

  const addTask = () => {
    if (newTask.title.trim()) {
      const tasksCopy = [...tasks];
      tasksCopy.push({ ...newTask, updatedAt: new Date().toISOString });
      setTasks(tasksCopy);
    }
  };

  const deleteTask = (i) => {
    setTasks(tasks.filter((_, index) => i !== index));
  };

  const editTask = (i, updatedTask) => {
    setTasks(tasks.map((e, index) => (index === i ? updatedTask : e)));
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
              updatedAt: new Date().toISOString,
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
          // eslint-disable-next-line react/jsx-no-undef
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
