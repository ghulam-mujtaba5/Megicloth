"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './AdminLogin.module.css';

const ADMIN_USERNAME = process.env.NEXT_PUBLIC_ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin123';

export default function AdminLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      localStorage.setItem('admin_logged_in', 'true');
      router.push('/admin/dashboard');
    } else {
      setError('Invalid username or password');
    }
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form} aria-label="Admin Login Form">
        <h2>Admin Login</h2>
        <div>
          <label htmlFor="admin-username" className={styles.label}>Username</label>
          <input
            id="admin-username"
            name="username"
            type="text"
            className={styles.input}
            value={username}
            onChange={e => setUsername(e.target.value)}
            title="Admin username"
            placeholder="Enter admin username"
            autoComplete="username"
            required
          />
        </div>
        <div>
          <label htmlFor="admin-password" className={styles.label}>Password</label>
          <input
            id="admin-password"
            name="password"
            type="password"
            className={styles.input}
            value={password}
            onChange={e => setPassword(e.target.value)}
            title="Admin password"
            placeholder="Enter admin password"
            autoComplete="current-password"
            required
          />
        </div>
        {error && <div className={styles.error} role="alert">{error}</div>}
        <button type="submit" className={styles.button}>Login</button>
      </form>
    </div>
  );
}
