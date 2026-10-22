import { useState, type FormEvent } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../application/AuthProvider';
import { DEMO_ACCOUNT } from '../infrastructure/mock/auth';
import { loginAssets as art } from './login-assets';
import './login.css';

export function LoginPage() {
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState(() => localStorage.getItem('tealeaf.remembered-username') || '');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(() => !!localStorage.getItem('tealeaf.remembered-username'));
  const [visible, setVisible] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<{ username?: string; password?: string }>({});
  const [recoveryOpen, setRecoveryOpen] = useState(false);
  const from = (location.state as { from?: string } | null)?.from;
  const returnTo = from && /^\/(admin(?:\/|$)|profile$)/.test(from) ? from : '/admin';
  if (auth.session) return <Navigate to={returnTo} replace />;

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const errors = { username: username.trim() ? undefined : 'Enter your email or username.', password: password ? undefined : 'Enter your password.' };
    setFieldErrors(errors); setError('');
    if (errors.username || errors.password) return;
    setPending(true);
    try {
      await auth.signIn({ username, password });
      if (remember) localStorage.setItem('tealeaf.remembered-username', username.trim()); else localStorage.removeItem('tealeaf.remembered-username');
      setPassword(''); navigate(returnTo, { replace: true });
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Unable to sign in. Please try again.');
    } finally { setPending(false); }
  }

  return <main className="login-page" data-node-id="10:3">
    <section className="login-hero" aria-label="TeaLeaf Field Scout">
      <div className="tea-rows" aria-hidden="true">{Array.from({length:9},(_,index)=><div className="tea-row" key={index} style={{top:`${1000 + index * 130}rem`}}><img src={index%2 ? art.imgTeaRow2 : art.imgTeaRow1} alt="" /></div>)}</div>
      <div className="hero-fade" />
      <div className="login-hero-content">
        <div className="login-pill"><img src={art.imgFrame} alt="" />Field-to-expert crop health platform</div>
        <h1>Protecting Tea Health,<br />One Leaf at a Time</h1>
        <p>Evidence-based observation, review and expert diagnosis for every estate and division.</p>
        <ul className="login-features">
          <li><img src={art.imgFrame1} alt="" />Verified evidence</li>
          <li><img src={art.imgFrame2} alt="" />Expert diagnosis</li>
          <li><img src={art.imgFrame3} alt="" />Estate analytics</li>
        </ul>
      </div>
    </section>
    <section className="login-panel" aria-labelledby="login-title">
      <div className="login-card">
        <div className="login-brand"><div className="login-logo"><img src={art.imgFrame4} alt="" /></div><div><span>TeaLeaf </span><span>Field Scout</span></div></div>
        <header className="login-welcome"><h2 id="login-title">Welcome Back</h2><p>Sign in to access your dashboard</p></header>
        <form onSubmit={submit} noValidate aria-busy={pending}>
          {error && <div className="login-error" role="alert">{error}</div>}
          <div className="login-field"><label htmlFor="username">Email or username</label><div className={`login-input ${fieldErrors.username?'invalid':''}`}><img src={art.imgFrame5} alt="" /><input id="username" name="username" autoComplete="username" placeholder="name@estate.example" value={username} onChange={e=>{setUsername(e.target.value);setFieldErrors(v=>({...v,username:undefined}));setError('');}} aria-invalid={!!fieldErrors.username} aria-describedby={fieldErrors.username?'username-error':undefined} disabled={pending} /></div>{fieldErrors.username&&<p className="field-error" id="username-error">{fieldErrors.username}</p>}</div>
          <div className="login-field"><label htmlFor="password">Password</label><div className={`login-input ${fieldErrors.password?'invalid':''}`}><img src={art.imgFrame6} alt="" /><input id="password" name="password" type={visible?'text':'password'} autoComplete="current-password" placeholder="••••••••••" value={password} onChange={e=>{setPassword(e.target.value);setFieldErrors(v=>({...v,password:undefined}));setError('');}} aria-invalid={!!fieldErrors.password} aria-describedby={fieldErrors.password?'password-error':undefined} disabled={pending} /><button className="password-toggle" type="button" aria-label={visible?'Hide password':'Show password'} aria-pressed={visible} onClick={()=>setVisible(v=>!v)}><img src={art.imgFrame7} alt="" /></button></div>{fieldErrors.password&&<p className="field-error" id="password-error">{fieldErrors.password}</p>}</div>
          <div className="login-options"><label title="Remember your username on this device"><input type="checkbox" checked={remember} onChange={e=>setRemember(e.target.checked)} />Remember me</label><button type="button" onClick={()=>setRecoveryOpen(true)}>Forgot password?</button></div>
          <button className="login-submit" type="submit" disabled={pending}>{pending?'Signing in…':'Sign In'}{!pending&&<img src={art.imgFrame8} alt="" />}</button>
        </form>
        <div className="login-secure"><img src={art.imgFrame9} alt="" /><div><strong>Secure access</strong><p>Your session is protected. Contact your estate administrator for access.</p></div></div>
        <div className="login-demo"><p>Demonstration data · UI design only</p><details><summary>Administrator demo credentials</summary><p>Email: <code>{DEMO_ACCOUNT.username}</code><br />Password: <code>{DEMO_ACCOUNT.password}</code></p><button type="button" onClick={()=>{setUsername(DEMO_ACCOUNT.username);setPassword(DEMO_ACCOUNT.password);setFieldErrors({});setError('');}}>Use demo credentials</button><p>Demo sign-in only. “Remember me” saves your username.</p></details></div>
      </div>
    </section>
    {recoveryOpen&&<div className="modal-backdrop"><section className="portal-modal" role="dialog" aria-modal="true" aria-labelledby="recovery-title" onKeyDown={e=>{if(e.key==='Escape')setRecoveryOpen(false);}}><h2 id="recovery-title">Password assistance</h2><p>Contact your estate administrator to reset your password. Email recovery is not connected in this frontend demo.</p><button autoFocus onClick={()=>setRecoveryOpen(false)}>Back to sign in</button></section></div>}
  </main>;
}
