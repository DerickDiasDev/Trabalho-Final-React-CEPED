import styles from './AuthLayout.module.css';

export const AuthLayout = ({ children }) => {
  return (
    <div className={styles.container}>
      <main className={styles.content}>
        {children}
      </main>
    </div>
  );
};
