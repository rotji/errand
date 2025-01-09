import React from "react";
import styles from "../../pages/AgentDashboard.module.css";

const AccountManagement = (props) => {
  // Provide safe defaults for props to avoid undefined errors
  const user = props.user || { name: "Guest" }; // Default to a guest user object
  const { profile = {}, onUpdateProfile = () => {}, onChangePassword = () => {} } = props;

  const handleProfileSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    onUpdateProfile(Object.fromEntries(formData)); // Placeholder handler
  };

  const handlePasswordSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    onChangePassword(Object.fromEntries(formData)); // Placeholder handler
  };

  return (
    <div className={styles.accountManagement}>
      <h2 className={styles.sectionTitle}>Account Management</h2>

      <div className={styles.updateProfile}>
        <h3>Update Profile</h3>
        <form onSubmit={handleProfileSubmit}>
          <label>
            Name: <input name="name" defaultValue={profile.name || ""} />
          </label>
          <label>
            Email: <input name="email" defaultValue={profile.email || ""} />
          </label>
          <label>
            Phone: <input name="phone" defaultValue={profile.phone || ""} />
          </label>
          <button type="submit">Update Profile</button>
        </form>
      </div>

      <div className={styles.changePassword}>
        <h3>Change Password</h3>
        <form onSubmit={handlePasswordSubmit}>
          <label>
            Old Password: <input name="oldPassword" type="password" />
          </label>
          <label>
            New Password: <input name="newPassword" type="password" />
          </label>
          <button type="submit">Change Password</button>
        </form>
      </div>
    </div>
  );
};

export default AccountManagement;
