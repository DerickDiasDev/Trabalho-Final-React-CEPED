import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import styles from './Login.module.css';
import { AuthLayout } from '../../../layouts/AuthLayout/AuthLayout';
import { Input } from '../../../components/ui/Input/Input';
import { Button } from '../../../components/ui/Button/Button';
import { useAuth } from '../../../../context/AuthContext';
import * as authService from '../../../../services/authService';

// Assets
import logoImg from '../../../../assets/branding/logo.svg';
import userIcon from '../../../../assets/icons/user.svg';
import passwordIcon from '../../../../assets/icons/password.svg';

/**
 * Login Page component
 * Responsible for rendering the authentication form within the AuthLayout
 */
export const Login = () => {
  const navigate = useNavigate();
  const { login: authLogin } = useAuth();
  
  const { register, handleSubmit, formState: { isSubmitting } } = useForm({
    defaultValues: {
      username: '',
      password: ''
    }
  });

  /**
   * Handles the login form submission
   * @param {Object} data - Form data (username, password)
   */
  const onSubmit = async (data) => {
    try {
      const response = await authService.login(data.username, data.password);
      
      // Update global auth state and persist session
      authLogin({ username: data.username }, response.token);
      
      // Success: Redirect to home immediately
      navigate('/home');
    } catch {
      // Error: Show alert to user
      alert('Credenciais inválidas ou erro de conexão. Tente novamente.');
    }
  };

  return (
    <AuthLayout>
      <div className={styles.card}>
        <header className={styles.branding}>
          <img src={logoImg} alt="Valy Logo" className={styles.logo} />
          <h1 className={styles.title}>Valy</h1>
        </header>

        <section className={styles.formSection}>
          <span className={styles.subtitle}>Bem vindo</span>
          
          <div className={styles.formBox}>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
              <Input 
                icon={userIcon} 
                type="text" 
                placeholder="Login"
                register={register('username', { required: true })}
              />
              <Input 
                icon={passwordIcon} 
                type="password" 
                placeholder="Senha"
                register={register('password', { required: true })}
              />
              
              <div className={styles.action}>
                <Button 
                  text="Entrar" 
                  type="submit" 
                  disabled={isSubmitting}
                />
              </div>
            </form>
          </div>
        </section>
      </div>
    </AuthLayout>
  );
};
