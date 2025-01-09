import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import UserCard from '../components/UserCard'; 
import styles from './TaskCard.module.css'; 

const TaskCard = ({ task, onBid }) => {
  const [creator, setCreator] = useState(null);

  useEffect(() => {
    const fetchCreatorDetails = async () => {
      try {
        const response = await fetch(`/api/users/${task.creatorId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch creator details');
        }
        const data = await response.json();
        setCreator(data);
      } catch (error) {
        console.error('Error fetching creator details:', error);
      }
    };

    if (task.creatorId) {
      fetchCreatorDetails();
    }
  }, [task.creatorId]);

  return (
    <div className={styles.taskCard}>
      <h3 className={styles.taskTitle}>{task.title}</h3>
      <p className={styles.taskDescription}>{task.description}</p>
      <p className={styles.taskDetails}>
        <strong>From:</strong> {task.from} <br />
        <strong>To:</strong> {task.to} <br />
        <strong>Phone:</strong> {task.phone}
      </p>
      <button className={styles.bidTaskButton} onClick={() => onBid(task._id)}>
        Bid Task
      </button>

      {/* Conditionally render UserCard if creator details are fetched */}
      {creator && <UserCard user={creator} />}
    </div>
  );
};

TaskCard.propTypes = {
  task: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    from: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    creatorId: PropTypes.string.isRequired, // Assuming creatorId exists in task
  }).isRequired,
  onBid: PropTypes.func.isRequired,
};

export default TaskCard;
