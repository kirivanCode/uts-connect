import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { toast } from '@/hooks/use-toast';
import { saveAuthData, clearAuthData } from '@/lib/auth';

// Validation schemas
export const loginSchema = z.object({
  email: z.string().trim().email({ message: "Email inválido" }),
  password: z.string().min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
});

export const registerSchema = z.object({
  name: z.string().trim().min(2, { message: "El nombre debe tener al menos 2 caracteres" }).max(100),
  email: z.string().trim().email({ message: "Email inválido" })
    .refine((email) => {
      return email.endsWith('@uts.edu.co') || email.endsWith('@correo.uts.edu.co');
    }, { message: "Debe usar un correo institucional (@uts.edu.co o @correo.uts.edu.co)" }),
  password: z.string().min(6, { message: "La contraseña debe tener al menos 6 caracteres" }).max(100),
});

export type LoginData = z.infer<typeof loginSchema>;
export type RegisterData = z.infer<typeof registerSchema>;

// Configure your backend URL here
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost/backend/api';

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const login = async (data: LoginData) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/auth.php?action=login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        toast({
          variant: "destructive",
          title: "Error de autenticación",
          description: result.error || "Credenciales inválidas",
        });
        return;
      }

      saveAuthData(result.token, result.role);
      
      toast({
        title: "¡Bienvenido!",
        description: result.message || "Inicio de sesión exitoso",
      });

      // Redirect based on role
      if (result.role === 'student') {
        navigate('/student');
      } else if (result.role === 'professor') {
        navigate('/professor');
      } else {
        navigate('/');
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error de conexión",
        description: "No se pudo conectar con el servidor",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterData) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/auth.php?action=register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        toast({
          variant: "destructive",
          title: "Error de registro",
          description: result.error || "No se pudo completar el registro",
        });
        return;
      }

      saveAuthData(result.token, result.role, data.name);
      
      toast({
        title: "¡Registro exitoso!",
        description: "Tu cuenta ha sido creada correctamente",
      });

      // Redirect based on role
      if (result.role === 'student') {
        navigate('/student');
      } else if (result.role === 'professor') {
        navigate('/professor');
      } else {
        navigate('/');
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error de conexión",
        description: "No se pudo conectar con el servidor",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    clearAuthData();
    navigate('/auth');
    toast({
      title: "Sesión cerrada",
      description: "Has cerrado sesión correctamente",
    });
  };

  return { login, register, logout, isLoading };
};
