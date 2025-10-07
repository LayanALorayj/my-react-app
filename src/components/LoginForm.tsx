import * as React from 'react';
import { authService } from '../services/LoginService';
import { useNavigate } from 'react-router-dom';

const LoginForm: React.FC = () => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const navigate = useNavigate();

  const handleSubmit = React.useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const user = await authService.login(username, password);
      console.log('[LoginForm] login success', user);
      // انتقلي للبروفايل بعد النجاح
      navigate('/profile');
    } catch (err: any) {
      console.error('[LoginForm] login error', err);
      setError(err.message || 'فشل تسجيل الدخول.');
    } finally {
      setIsLoading(false);
    }
  }, [username, password, navigate]);

  return (
    <div className="card mx-auto my-5" style={{ maxWidth: 400 }}>
      <h2 className="text-center mb-3">تسجيل الدخول</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">اسم المستخدم</label>
          <input className="form-control" value={username} onChange={e => setUsername(e.target.value)} required />
        </div>

        <div className="mb-3">
          <label className="form-label">كلمة المرور</label>
          <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} required />
        </div>

        <button className="btn btn-primary w-100" type="submit" disabled={isLoading}>
          {isLoading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
