import React, { useState, useEffect } from "react";
import TaskTable from "./components/TaskTable";
import AddTaskForm from "./components/AddTaskForm";
import FilterTasks from "./components/FilterTasks";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => response.json())
      .then((data) => {
        const initialTasks = data.slice(0, 20).map((task) => ({
          id: task.id,
          title: task.title,
          description: `Description for task ${task.id}`,
          status: task.completed ? "Done" : "To Do",
        }));
        setTasks(initialTasks);
        setFilteredTasks(initialTasks);
      });
  }, []);

  const addTask = (newTask) => {
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    setFilteredTasks(updatedTasks);
  };

  const editTask = (updatedTask) => {
    const updatedTasks = tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );
    setTasks(updatedTasks);
    setFilteredTasks(updatedTasks);
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    setFilteredTasks(updatedTasks);
  };

  const filterTasks = (status) => {
    if (status === "All") {
      setFilteredTasks(tasks);
    } else {
      setFilteredTasks(tasks.filter((task) => task.status === status));
    }
  };

  return (
    <div className="app">
      <h1>Task List Manager</h1>
      <AddTaskForm addTask={addTask} />
      <FilterTasks filterTasks={filterTasks} />
      <TaskTable
        tasks={filteredTasks}
        setTasks={setTasks}
        editTask={editTask}
        deleteTask={deleteTask}
      />
    </div>
  );
};

export default App;
