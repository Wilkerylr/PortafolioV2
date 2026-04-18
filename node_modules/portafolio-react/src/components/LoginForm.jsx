import React, { useState } from 'react';


const LoginForm = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría tu lógica de validación o llamada a API
    console.log("Iniciando sesión con:", credentials);
    onLogin(); 
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <h3>Iniciar Sesión</h3>
      <input 
        name="email" 
        type="email" 
        placeholder="Correo" 
        onChange={handleChange} 
        required 
      />
      <input 
        name="password" 
        type="password" 
        placeholder="Contraseña" 
        onChange={handleChange} 
        required 
      />
      <button type="submit">Entrar</button>
    </form>
  );
};

export default LoginForm;