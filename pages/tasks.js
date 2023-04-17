import React, { useState } from 'react';
import { useRouter } from 'next/router';

function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const router = useRouter();

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

  const handleEditTask = (taskId) => {
    router.push(`/test/${taskId}`);
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
          <div key={task}>
            <li>{task}</li>
            <button type="button" onClick={() => handleDeleteTask(index)}>Delete Task</button>
            <button type="button">Edit Task</button>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default TasksPage;
