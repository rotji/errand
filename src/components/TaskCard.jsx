import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import UserCard from '../components/UserCard';
import styles from './TaskCard.module.css';
import apiClient from '../components/utils/api'; // Use centralized API client

const TaskCard = ({ task, onBid }) => {
  const [creator, setCreator] = useState(null);
  const [loadingCreator, setLoadingCreator] = useState(false);

  useEffect(() => {
    const fetchCreatorDetails = async () => {
      try {
        setLoadingCreator(true);
        const response = await apiClient.get(`/users/${task.creatorId}`);
        setCreator(response.data); // Ensure the response matches your backend
      } catch (error) {
        console.error("Error fetching creator details:", error);
      } finally {
        setLoadingCreator(false);
      }
    };

    if (task.creatorId) {
      fetchCreatorDetails();
    } else {
      console.warn("No creator ID provided for task:", task._id);
    }
  }, [task.creatorId]);

  return (
    <div className={styles.taskCard}>
      <h3 className={styles.taskTitle}>{task.title}</h3>
      <p className={styles.taskDescription}>{task.description}</p>
      <p className={styles.taskDetails}>
        <strong>From:</strong> {task.from} <br />
        <strong>To:</strong> {task.to} <br />
        <strong>Phone:</strong> {task.phone} <br />
        <strong>Amount:</strong> ${task.amount} <br />
        <strong>Transport Fees:</strong> ${task.transport}
      </p>
      <button className={styles.bidTaskButton} onClick={() => onBid(task._id)}>
        Bid Task
      </button>

      {/* Conditionally render UserCard or loading state */}
      {loadingCreator ? (
        <p>Loading creator details...</p>
      ) : (
        creator && <UserCard user={creator} />
      )}
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
    amount: PropTypes.string.isRequired, 
    transport: PropTypes.string.isRequired, 
    creatorId: PropTypes.string, // Optional if creatorId isn't always available
  }).isRequired,
  onBid: PropTypes.func.isRequired,
};

export default TaskCard;
