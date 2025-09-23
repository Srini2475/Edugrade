import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Mail, Lock, User, GraduationCap } from "lucide-react";
import { Badge } from "@/components/ui/badge";

import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { auth, provider } from "@/lib/firebase";
import { signInWithPopup } from "firebase/auth";

export function AuthForm() {
  const [role, setRole] = useState<'student' | 'teacher'>('student');
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const { login, signup } = useAuth();
  const { toast } = useToast();

  // Google Sign-In handler
  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      await signInWithPopup(auth, provider);
      toast({
        title: "Google Login Successful",
        description: `Welcome to EduAI!`,
      });
      // You may want to redirect or update UI here
      navigate("/student"); // or handle role if needed
    } catch (error) {
      toast({
        title: "Google Login Error",
        description: "Google sign-in failed. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        await login(email, password, role);
        toast({
          title: "Login Successful",
          description: `Welcome back, ${role}!`,
        });
      } else {
        await signup(email, password, name, role);
        toast({
          title: "Account Created",
          description: `Welcome to EduAI, ${name}!`,
        });
      }
      
      // Redirect based on role
      navigate(role === 'student' ? '/student' : '/teacher');
    } catch (error) {
      toast({
        title: "Authentication Error",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-strong animate-scale-in">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto p-3 bg-gradient-primary rounded-full w-fit">
            <BookOpen className="h-8 w-8 text-white" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold">Welcome to EduAI</CardTitle>
            <CardDescription>
              AI-powered educational platform for smart learning
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <Tabs value={isLogin ? 'login' : 'signup'} onValueChange={(value) => setIsLogin(value === 'login')}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="space-y-4">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label>Role</Label>
                  <div className="flex gap-2">
                    <Badge 
                      variant={role === 'student' ? 'default' : 'secondary'}
                      className="cursor-pointer p-2 flex items-center gap-1"
                      onClick={() => setRole('student')}
                    >
                      <User className="h-3 w-3" />
                      Student
                    </Badge>
                    <Badge 
                      variant={role === 'teacher' ? 'default' : 'secondary'}
                      className="cursor-pointer p-2 flex items-center gap-1"
                      onClick={() => setRole('teacher')}
                    >
                      <GraduationCap className="h-3 w-3" />
                      Teacher
                    </Badge>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="Enter your email" 
                      className="pl-10"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="password" 
                      type="password" 
                      placeholder="Enter your password" 
                      className="pl-10"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <Button 
                  type="submit"
                  className="w-full bg-gradient-primary hover:opacity-90 transition-opacity"
                  disabled={loading}
                >
                  {loading ? 'Signing In...' : `Sign In as ${role}`}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup" className="space-y-4">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label>Role</Label>
                  <div className="flex gap-2">
                    <Badge 
                      variant={role === 'student' ? 'default' : 'secondary'}
                      className="cursor-pointer p-2 flex items-center gap-1"
                      onClick={() => setRole('student')}
                    >
                      <User className="h-3 w-3" />
                      Student
                    </Badge>
                    <Badge 
                      variant={role === 'teacher' ? 'default' : 'secondary'}
                      className="cursor-pointer p-2 flex items-center gap-1"
                      onClick={() => setRole('teacher')}
                    >
                      <GraduationCap className="h-3 w-3" />
                      Teacher
                    </Badge>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="name" 
                      placeholder="Enter your full name" 
                      className="pl-10"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="signup-email" 
                      type="email" 
                      placeholder="Enter your email" 
                      className="pl-10"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="signup-password" 
                      type="password" 
                      placeholder="Create a password" 
                      className="pl-10"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <Button 
                  type="submit"
                  className="w-full bg-gradient-secondary hover:opacity-90 transition-opacity"
                  disabled={loading}
                >
                  {loading ? 'Creating Account...' : `Create ${role} Account`}
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <div className="text-center">
            <Button 
              variant="outline" 
              className="w-full flex items-center justify-center gap-2"
              onClick={handleGoogleSignIn}
              disabled={loading}
            >
              <svg width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_17_40)">
                  <path d="M47.5 24.5C47.5 22.6 47.3 20.8 47 19H24V29.1H37.4C36.7 32.2 34.7 34.7 31.8 36.4V42.1H39.5C44 38.1 47.5 32.1 47.5 24.5Z" fill="#4285F4"/>
                  <path d="M24 48C30.6 48 36.1 45.9 39.5 42.1L31.8 36.4C29.9 37.6 27.3 38.4 24 38.4C17.7 38.4 12.2 34.3 10.3 28.7H2.3V34.6C5.7 41.1 14.1 48 24 48Z" fill="#34A853"/>
                  <path d="M10.3 28.7C9.7 26.5 9.7 24.2 10.3 22V16.1H2.3C-0.2 20.6-0.2 27.4 2.3 34.6L10.3 28.7Z" fill="#FBBC05"/>
                  <path d="M24 9.6C27.6 9.6 30.6 10.8 32.7 12.7L39.7 6.1C36.1 2.6 30.6 0 24 0C14.1 0 5.7 6.9 2.3 16.1L10.3 22C12.2 16.4 17.7 12.3 24 12.3V9.6Z" fill="#EA4335"/>
                </g>
                <defs>
                  <clipPath id="clip0_17_40">
                    <rect width="48" height="48" fill="white"/>
                  </clipPath>
                </defs>
              </svg>
              Continue with Google
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}