import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, GraduationCap, LogOut } from 'lucide-react';
import { isAuthenticated, getUserRole, getUserName } from '@/lib/auth';
import { useAuth } from '@/hooks/use-auth';

const Student = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const userName = getUserName();

  useEffect(() => {
    if (!isAuthenticated() || getUserRole() !== 'student') {
      navigate('/auth');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <header className="border-b bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-primary" />
            <h1 className="text-xl font-bold">Portal Estudiante</h1>
          </div>
          <Button variant="outline" onClick={logout} size="sm">
            <LogOut className="w-4 h-4 mr-2" />
            Cerrar Sesión
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Bienvenido, {userName || 'Estudiante'}</h2>
          <p className="text-muted-foreground">Accede a tus recursos académicos</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="shadow-soft hover:shadow-lg transition-shadow">
            <CardHeader>
              <BookOpen className="w-8 h-8 text-primary mb-2" />
              <CardTitle>Mis Cursos</CardTitle>
              <CardDescription>Accede a tus materias inscritas</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">Ver Cursos</Button>
            </CardContent>
          </Card>

          <Card className="shadow-soft hover:shadow-lg transition-shadow">
            <CardHeader>
              <BookOpen className="w-8 h-8 text-secondary mb-2" />
              <CardTitle>Calificaciones</CardTitle>
              <CardDescription>Consulta tu rendimiento académico</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="secondary" className="w-full">Ver Notas</Button>
            </CardContent>
          </Card>

          <Card className="shadow-soft hover:shadow-lg transition-shadow">
            <CardHeader>
              <BookOpen className="w-8 h-8 text-accent mb-2" />
              <CardTitle>Horarios</CardTitle>
              <CardDescription>Revisa tu calendario académico</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">Ver Horarios</Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Student;
