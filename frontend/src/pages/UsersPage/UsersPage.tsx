import { useUsersStore } from "../../store/usersStore"
import styles from './UsersPage.module.css'
import { useEffect } from "react";

export const UsersPage = () => {
  const { users, isLoading, getUsers, deleteUser } = useUsersStore();

  useEffect(() => {
    getUsers();
  }, []);

  if (isLoading) {
    return <div>Loading ...</div>
  }

  const handleButtonDelete = async (id: number) => {
    await deleteUser(id);
  }

  return (
    <div className={styles.users_page}>
      <div className={styles.users_page__table}>
        {users.length === 0 ? (
          <div className={styles.empty}>
            No users found
          </div>
        ) : (
          users.map(user => (
            <div key={user.id} className={styles.users_page__row}>
              <span className={styles.username}>{user.username}</span>
              <div className={styles.email}>{user.email}</div>
              <div className={styles.location}>{user.country}, {user.city}</div>
              <span className={styles.role}>
                {user.role}
              </span>
              <div className={styles.date}>
                {new Date(user.createdAt).toLocaleDateString()}
              </div>
              <div>
                {
                  user.role !== 'ADMIN' && (
                    <button className={styles.delete_btn} onClick={() => { handleButtonDelete(user.id) }}>
                      Delete
                    </button>
                  )
                }
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}