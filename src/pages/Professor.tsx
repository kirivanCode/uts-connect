import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, GraduationCap, LogOut, Users } from 'lucide-react';
import { isAuthenticated, getUserRole, getUserName } from '@/lib/auth';
import { useAuth } from '@/hooks/use-auth';

const Professor = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const userName = getUserName();

  useEffect(() => {
    if (!isAuthenticated() || getUserRole() !== 'professor') {
      navigate('/auth');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary/5 via-background to-primary/5">
      <header className="border-b bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-secondary" />
            <h1 className="text-xl font-bold">Portal Profesor</h1>
          </div>
          <Button variant="outline" onClick={logout} size="sm">
            <LogOut className="w-4 h-4 mr-2" />
            Cerrar Sesión
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Bienvenido, Prof. {userName || 'Profesor'}</h2>
          <p className="text-muted-foreground">Gestiona tus cursos y estudiantes</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="shadow-soft hover:shadow-lg transition-shadow">
            <CardHeader>
              <BookOpen className="w-8 h-8 text-secondary mb-2" />
              <CardTitle>Mis Materias</CardTitle>
              <CardDescription>Administra tus cursos</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="secondary" className="w-full">Ver Materias</Button>
            </CardContent>
          </Card>

          <Card className="shadow-soft hover:shadow-lg transition-shadow">
            <CardHeader>
              <Users className="w-8 h-8 text-primary mb-2" />
              <CardTitle>Estudiantes</CardTitle>
              <CardDescription>Lista de estudiantes inscritos</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">Ver Estudiantes</Button>
            </CardContent>
          </Card>

          <Card className="shadow-soft hover:shadow-lg transition-shadow">
            <CardHeader>
              <BookOpen className="w-8 h-8 text-accent mb-2" />
              <CardTitle>Calificar</CardTitle>
              <CardDescription>Registra evaluaciones</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">Gestionar Notas</Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Professor;
