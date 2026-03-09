import styles from './Login.module.css';
import { AuthLayout } from '../../../layouts/AuthLayout/AuthLayout';
import { Input } from '../../../components/ui/Input/Input';
import { Button } from '../../../components/ui/Button/Button';

// Assets
import logoImg from '../../../../assets/branding/logo.svg';
import userIcon from '../../../../assets/icons/user.svg';
import passwordIcon from '../../../../assets/icons/password.svg';

export const Login = () => {
  return (
    <AuthLayout>
      <div className={styles.card}>
        <header className={styles.branding}>
          <img src={logoImg} alt="Valy Logo" className={styles.logo} />
          <h1 className={styles.title}>Valy</h1>
        </header>
        {/* Form section containing inputs and action button */}
        <section className={styles.formSection}>
          <span className={styles.subtitle}>Bem vindo</span>
          
          <div className={styles.formBox}>
            <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
              <Input 
                icon={userIcon} 
                type="text" 
                placeholder="Login" 
              />
              <Input 
                icon={passwordIcon} 
                type="password" 
                placeholder="Senha" 
              />
              
              <div className={styles.action}>
                <Button text="Entrar" type="submit" />
              </div>
            </form>
          </div>
        </section>
      </div>
    </AuthLayout>
  );
};
