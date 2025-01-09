import React from "react";
import PropTypes from "prop-types";
import styles from "./UserCard.module.css";

const UserCard = ({ user }) => {
  return (
    <div className={styles.userCard}>
      <h3 className={styles.userName}>{user.name}</h3>
      <p className={styles.userDetails}>
        <strong>Phone:</strong> {user.phone}
      </p>
      <p className={styles.userDetails}>
        <strong>Location:</strong> {user.location}
      </p>
    </div>
  );
};

UserCard.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
  }).isRequired,
};

export default UserCard;
