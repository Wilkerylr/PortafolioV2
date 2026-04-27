import { useState, useEffect } from "react";
// Hook personalizado para manejar el login de usuarios
// El frontend llama al servidor Express que maneja la conexión con Supabase
// En dev: Vite proxy redirige /api -> localhost:4321

const API_URL = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/api/login`
  : "/api/login";

export const useLogin = (onSuccessCallback) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [rol, setRol] = useState(null);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Error en el login");
            }

            // Guardar el token y el rol en sessionStorage
            sessionStorage.setItem("authToken", data.token);
            if (data.rol) {
                sessionStorage.setItem("userRol", data.rol);
                setRol(data.rol);
            }

            // Login exitoso, cualquier usuario registrado en BD tiene acceso
            setRol(data.rol);
            sessionStorage.setItem("userRol", data.rol);
            if (onSuccessCallback) {
                setTimeout(() => onSuccessCallback(), 100);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return { email, setEmail, password, setPassword, handleLogin, error, loading, rol };
};
