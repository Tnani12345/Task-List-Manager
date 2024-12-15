
import React from "react";

const FilterTasks = ({ filterTasks }) => {
  const handleFilterChange = (e) => {
    filterTasks(e.target.value);
  };

  return (
    <div className="filter-tasks">
      <select onChange={handleFilterChange}>
        <option value="All">All</option>
        <option value="To Do">To Do</option>
        <option value="In Progress">In Progress</option>
        <option value="Done">Done</option>
      </select>
    </div>
  );
};

export default FilterTasks;
