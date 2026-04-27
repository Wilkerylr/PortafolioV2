import React, { useState } from 'react';
import { useLogin } from '../hooks/useLogin';

const LoginForm = ({ onLogin }) => {
  const { email, setEmail, password, setPassword, handleLogin, error, loading } = useLogin(onLogin);

  const handleChange = (e) => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log("Iniciando sesión con:", { email, password });
    handleLogin(e);
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <h3>Iniciar Sesión</h3>
      <input 
        name="email" 
        type="email" 
        placeholder="Correo" 
        onChange={handleChange}
        autoComplete="email"
        value={email}
        required 
      />
      <input 
        name="password" 
        type="password" 
        placeholder="Contraseña" 
        onChange={handleChange}
        autoComplete="current-password"
        value={password}
        required 
      />

      {error && <p className="login-error">{error}</p>}

      <button type="submit" disabled={loading}>
        {loading ? "Iniciando sesión..." : "Entrar"}
      </button>
    </form>
  );
};

export default LoginForm;