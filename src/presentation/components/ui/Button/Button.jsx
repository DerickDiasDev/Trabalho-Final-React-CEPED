import styles from './Button.module.css';
import arrowImg from '../../../../assets/icons/arrow-right.svg';

export const Button = ({ text, onClick, type = "button" }) => {
  return (
    <button className={styles.button} onClick={onClick} type={type}>
      {text}
      <img src={arrowImg} alt="Seta" className={styles.icon} />
    </button>
  );
};
