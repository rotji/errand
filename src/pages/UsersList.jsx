import React, { useEffect, useState } from "react";
import styles from "./UserList.module.css";

const UserList = () => {
  const [users, setUsers] = useState([]);


  useEffect(() => {
    
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/users");
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className={styles.container}>
      <h2>Registered Users</h2>
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <ul className={styles.list}>
          {users.map((user) => (
            <li key={user._id} className={styles.user}>
              <p>Name: {user.name}</p>
              <p>Phone: {user.phone}</p>
              <p>Location: {user.location}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserList;
