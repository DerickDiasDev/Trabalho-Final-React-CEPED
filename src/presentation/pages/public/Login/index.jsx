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
 * Login page rendered inside the authentication layout.
 */
export const Login = () => {
  const navigate = useNavigate();
  const { login: authLogin } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
  });

  /**
   * Submit login credentials and start user session.
   * @param {{username: string, password: string}} data
   */
  const onSubmit = async (data) => {
    try {
      const response = await authService.login(data.username, data.password);

      // Persist authenticated user and redirect to home page.
      authLogin({ username: data.username }, response.token);
      navigate('/home');
    } catch {
      // Keep feedback in pt-BR for end users.
      alert('Credenciais inválidas ou erro de conexão. Tente novamente.');
    }
  };

  return (
    <AuthLayout>
      <div className={styles.card}>
        <header className={styles.branding}>
          <img src={logoImg} alt="Logo da Valy" className={styles.logo} />
          <h1 className={styles.title}>Valy</h1>
        </header>

        <section className={styles.formSection}>
          <span className={styles.subtitle}>Bem-vindo</span>

          <div className={styles.formBox}>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
              <Input
                icon={userIcon}
                type="text"
                placeholder="Login"
                id="username"
                autoComplete="username"
                aria-label="Login"
                aria-invalid={Boolean(errors.username)}
                aria-describedby={errors.username ? 'username-error' : undefined}
                register={register('username', { required: 'Login obrigatório.' })}
              />
              {errors.username && (
                <span id="username-error" className={styles.errorMessage} role="alert">
                  {errors.username.message}
                </span>
              )}
              <Input
                icon={passwordIcon}
                type="password"
                placeholder="Senha"
                id="password"
                autoComplete="current-password"
                aria-label="Senha"
                aria-invalid={Boolean(errors.password)}
                aria-describedby={errors.password ? 'password-error' : undefined}
                register={register('password', { required: 'Senha obrigatória.' })}
              />
              {errors.password && (
                <span id="password-error" className={styles.errorMessage} role="alert">
                  {errors.password.message}
                </span>
              )}

              <div className={styles.action}>
                <Button text="Entrar" type="submit" disabled={isSubmitting} />
              </div>
            </form>
          </div>
        </section>
      </div>
    </AuthLayout>
  );
};
