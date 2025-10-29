import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { GraduationCap } from 'lucide-react';
import { isAuthenticated, getUserRole } from '@/lib/auth';

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated()) {
      const role = getUserRole();
      if (role === 'student') {
        navigate('/student');
      } else if (role === 'professor') {
        navigate('/professor');
      }
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-primary/10 via-background to-secondary/10 p-4">
      <div className="text-center max-w-2xl">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-primary rounded-3xl mb-6 shadow-soft">
          <GraduationCap className="w-10 h-10 text-primary-foreground" />
        </div>
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Portal Institucional UTS
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Sistema de gestión académica para estudiantes y profesores
        </p>
        <Button
          size="lg"
          onClick={() => navigate('/auth')}
          className="shadow-soft"
        >
          Acceder al Portal
        </Button>
      </div>
    </div>
  );
};

export default Index;
