import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { AuthForm } from "./components/auth/AuthForm";
import { DashboardLayout } from "./components/layout/DashboardLayout";
import StudentDashboard from "./pages/student/StudentDashboard";
import StudentGrades from "./pages/student/StudentGrades";
import StudentQuiz from "./pages/student/StudentQuiz";
import UploadAssignment from "./pages/student/UploadAssignment";
import TeacherDashboard from "./pages/teacher/TeacherDashboard";
import ReviewAssignments from "./pages/teacher/ReviewAssignments";
import QuizGenerator from "./pages/teacher/QuizGenerator";
import StudentProgress from "./pages/teacher/StudentProgress";
import AIGrading from "./pages/teacher/AIGrading";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<AuthForm />} />
            
            {/* Student Routes */}
            <Route path="/student" element={<DashboardLayout><StudentDashboard /></DashboardLayout>} />
            <Route path="/student/upload" element={<DashboardLayout><UploadAssignment /></DashboardLayout>} />
            <Route path="/student/grades" element={<DashboardLayout><StudentGrades /></DashboardLayout>} />
            <Route path="/student/quiz" element={<DashboardLayout><StudentQuiz /></DashboardLayout>} />
            
            {/* Teacher Routes */}
            <Route path="/teacher" element={<DashboardLayout><TeacherDashboard /></DashboardLayout>} />
            <Route path="/teacher/assignments" element={<DashboardLayout><ReviewAssignments /></DashboardLayout>} />
            <Route path="/teacher/quiz-generator" element={<DashboardLayout><QuizGenerator /></DashboardLayout>} />
            <Route path="/teacher/progress" element={<DashboardLayout><StudentProgress /></DashboardLayout>} />
            <Route path="/teacher/grading" element={<DashboardLayout><AIGrading /></DashboardLayout>} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
