import React, { useState } from "react";

const TaskTable = ({ tasks, setTasks, editTask, deleteTask }) => {
  const [editMode, setEditMode] = useState(null);
  const [editedTask, setEditedTask] = useState({});

  const handleEdit = (task) => {
    setEditMode(task.id);
    setEditedTask({ ...task });
  };

  const handleSave = () => {
    editTask(editedTask);
    setEditMode(null); 
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTask((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div>
      <h3>Task List</h3>
      <table>
        <thead>
          <tr>
            <th>Task ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.id}</td>
              <td>
                {editMode === task.id ? (
                  <input
                    type="text"
                    name="title"
                    value={editedTask.title}
                    onChange={handleChange}
                  />
                ) : (
                  task.title
                )}
              </td>
              <td>
                {editMode === task.id ? (
                  <input
                    type="text"
                    name="description"
                    value={editedTask.description}
                    onChange={handleChange}
                  />
                ) : (
                  task.description
                )}
              </td>
              <td>
                {editMode === task.id ? (
                  <select
                    name="status"
                    value={editedTask.status}
                    onChange={handleChange}
                  >
                    <option value="To Do">To Do</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Done">Done</option>
                  </select>
                ) : (
                  task.status
                )}
              </td>
              <td>
                {editMode === task.id ? (
                  <button onClick={handleSave}>Save</button>
                ) : (
                  <>
                    <button onClick={() => handleEdit(task)}>Edit</button>
                    <button onClick={() => deleteTask(task.id)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskTable;
