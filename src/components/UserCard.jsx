import React from "react";
import PropTypes from "prop-types";
import styles from "./UserCard.module.css";

const UserCard = ({ user }) => {
  if (!user) {
    return <p className={styles.error}>User details not available.</p>;
  }

  return (
    <div className={styles.userCard}>
      <h3 className={styles.userName}>{user.name || "No name available"}</h3>
      <p className={styles.userDetails}>
        <strong>Phone:</strong> {user.phone || "No phone available"}
      </p>
      <p className={styles.userDetails}>
        <strong>Location:</strong> {user.location || "No location available"}
      </p>
    </div>
  );
};

UserCard.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    phone: PropTypes.string,
    location: PropTypes.string,
  }).isRequired,
};

export default UserCard;
