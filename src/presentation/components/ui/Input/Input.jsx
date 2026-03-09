import styles from './Input.module.css';

export const Input = ({ icon, register, className = '', ...inputProps }) => {
  const inputClassName = className
    ? `${styles.input} ${className}`
    : styles.input;

  return (
    <div className={styles.container}>
      {icon && <img src={icon} alt="" aria-hidden="true" className={styles.icon} />}
      <input
        className={inputClassName}
        {...inputProps}
        {...register}
      />
    </div>
  );
};
