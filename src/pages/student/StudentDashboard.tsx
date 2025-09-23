import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Upload, 
  ClipboardList, 
  BarChart3, 
  Trophy,
  Clock,
  BookOpen,
  TrendingUp
} from "lucide-react";
import { Link } from "react-router-dom";

export default function StudentDashboard() {
  const stats = [
    { label: "Assignments Submitted", value: "12", icon: Upload, color: "text-primary" },
    { label: "Quizzes Completed", value: "8", icon: ClipboardList, color: "text-secondary" },
    { label: "Average Grade", value: "85%", icon: BarChart3, color: "text-accent" },
    { label: "Achievement Points", value: "2,450", icon: Trophy, color: "text-warning" },
  ];

  const recentSubmissions = [
    { id: 1, title: "Mathematics Assignment #3", subject: "Mathematics", grade: 92, status: "Graded", date: "2 days ago" },
    { id: 2, title: "History Essay: WWII", subject: "History", grade: 88, status: "Graded", date: "3 days ago" },
    { id: 3, title: "Science Lab Report", subject: "Science", grade: null, status: "Pending", date: "1 day ago" },
  ];

  const upcomingQuizzes = [
    { id: 1, title: "Algebra Basics", subject: "Mathematics", dueDate: "Tomorrow", difficulty: "Easy" },
    { id: 2, title: "World History", subject: "History", dueDate: "In 3 days", difficulty: "Medium" },
    { id: 3, title: "Chemistry Fundamentals", subject: "Science", dueDate: "Next week", difficulty: "Hard" },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold mb-2">Welcome back, John!</h1>
        <p className="text-muted-foreground">Track your academic progress and continue learning with AI-powered insights.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={stat.label} className="animate-slide-up hover-scale shadow-soft" style={{ animationDelay: `${index * 0.1}s` }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Submissions */}
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Recent Submissions
            </CardTitle>
            <CardDescription>
              Your latest assignment submissions and grades
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentSubmissions.map((submission) => (
              <div key={submission.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium">{submission.title}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline">{submission.subject}</Badge>
                    <span className="text-sm text-muted-foreground">{submission.date}</span>
                  </div>
                </div>
                <div className="text-right">
                  {submission.grade ? (
                    <div className="text-lg font-bold text-success">{submission.grade}%</div>
                  ) : (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {submission.status}
                    </Badge>
                  )}
                </div>
              </div>
            ))}
            <Button asChild className="w-full" variant="outline">
              <Link to="/student/grades">View All Submissions</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Upcoming Quizzes */}
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ClipboardList className="h-5 w-5" />
              Upcoming Quizzes
            </CardTitle>
            <CardDescription>
              AI-generated quizzes based on your coursework
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingQuizzes.map((quiz) => (
              <div key={quiz.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium">{quiz.title}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline">{quiz.subject}</Badge>
                    <Badge 
                      variant={quiz.difficulty === 'Easy' ? 'default' : quiz.difficulty === 'Medium' ? 'secondary' : 'destructive'}
                    >
                      {quiz.difficulty}
                    </Badge>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">{quiz.dueDate}</div>
                  <Button size="sm" className="mt-2">Start Quiz</Button>
                </div>
              </div>
            ))}
            <Button asChild className="w-full" variant="outline">
              <Link to="/student/quiz">Browse All Quizzes</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Progress Overview */}
      <Card className="shadow-medium">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Academic Progress
          </CardTitle>
          <CardDescription>
            Your performance across different subjects
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { subject: "Mathematics", progress: 85, grade: "A-" },
              { subject: "Science", progress: 92, grade: "A" },
              { subject: "History", progress: 78, grade: "B+" },
            ].map((subject) => (
              <div key={subject.subject} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{subject.subject}</span>
                  <Badge className="bg-gradient-secondary">{subject.grade}</Badge>
                </div>
                <Progress value={subject.progress} className="h-2" />
                <p className="text-sm text-muted-foreground">{subject.progress}% Complete</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Button asChild size="lg" className="bg-gradient-primary hover:opacity-90 h-16">
          <Link to="/student/upload" className="flex items-center gap-3">
            <Upload className="h-6 w-6" />
            <div className="text-left">
              <div className="font-semibold">Upload Assignment</div>
              <div className="text-sm opacity-90">Submit your work for AI grading</div>
            </div>
          </Link>
        </Button>
        <Button asChild size="lg" variant="outline" className="h-16 border-2">
          <Link to="/student/quiz" className="flex items-center gap-3">
            <BookOpen className="h-6 w-6" />
            <div className="text-left">
              <div className="font-semibold">Practice Quiz</div>
              <div className="text-sm opacity-70">Test your knowledge</div>
            </div>
          </Link>
        </Button>
      </div>
    </div>
  );
}

const FileText = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);