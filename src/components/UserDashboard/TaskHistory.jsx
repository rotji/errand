import React from 'react';

const TaskHistory = ({ tasks }) => {
  if (!tasks || tasks.length === 0) return <p>No tasks available.</p>;

  return (
    <div className="task-history">
      <h2>Task History</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            <p>Description: {task.description}</p>
            <p>Status: {task.status}</p>
            {task.status === 'completed' && (
              <>
                <p>Transport Cost: ${task.transportCost}</p>
                <p>Completion Date: {new Date(task.completionDate).toLocaleDateString()}</p>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskHistory;
