import React, { useState } from 'react';

function TasksPage() {
  const [tasks, setTasks] = useState([]);

  const handleNewTask = (e) => {
    e.preventDefault(); // prevent page refresh
    setTasks([...tasks, e.target.task.value]); // add new task to tasks
    e.target.reset();
  };

  const handleDeleteTask = (index) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1); // remove 1 item at index
    setTasks(newTasks);
  };

  return (
    <div>
      <h1>Tasks Page</h1>
      <form onSubmit={handleNewTask}>
        <input type="text" name="task" id="task" placeholder="Add task" />
        <button type="submit">Create Task</button>
      </form>
      <ul>
        {tasks.map((task, index) => (
          <div>
            <li key={task}>{task}</li>
            <button type="submit" onClick={() => handleDeleteTask(index)}>Delete Task</button>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default TasksPage;
