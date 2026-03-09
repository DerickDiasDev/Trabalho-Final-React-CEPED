import styles from './Input.module.css';

export const Input = ({ icon, type, placeholder, register }) => {
  return (
    <div className={styles.container}>
      {icon && <img src={icon} alt="" className={styles.icon} />}
      <input 
        type={type} 
        placeholder={placeholder} 
        className={styles.input} 
        {...register}
      />
    </div>
  );
};
