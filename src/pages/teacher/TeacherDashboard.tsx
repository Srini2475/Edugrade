import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  FileText, 
  Brain, 
  BarChart3, 
  Trophy,
  Clock,
  GraduationCap,
  TrendingUp,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { Link } from "react-router-dom";

export default function TeacherDashboard() {
  const stats = [
    { label: "Students Enrolled", value: "156", icon: Users, color: "text-primary" },
    { label: "Assignments to Review", value: "23", icon: FileText, color: "text-warning" },
    { label: "Quizzes Generated", value: "47", icon: Brain, color: "text-secondary" },
    { label: "Average Class Grade", value: "82%", icon: BarChart3, color: "text-success" },
  ];

  const pendingReviews = [
    { id: 1, student: "Alice Johnson", assignment: "History Essay: Renaissance", subject: "History", submittedAt: "2 hours ago", aiScore: 88 },
    { id: 2, student: "Bob Smith", assignment: "Math Problem Set #5", subject: "Mathematics", submittedAt: "4 hours ago", aiScore: 75 },
    { id: 3, student: "Carol Davis", assignment: "Science Lab Report", subject: "Science", submittedAt: "1 day ago", aiScore: 92 },
    { id: 4, student: "David Wilson", assignment: "English Literature Analysis", subject: "English", submittedAt: "1 day ago", aiScore: 85 },
  ];

  const recentActivity = [
    { id: 1, action: "Quiz generated for Chemistry", time: "30 min ago", type: "quiz" },
    { id: 2, action: "Assignment graded for Math Class", time: "1 hour ago", type: "grade" },
    { id: 3, action: "New student enrolled: Emma Brown", time: "2 hours ago", type: "student" },
    { id: 4, action: "Quiz completed by 25 students", time: "3 hours ago", type: "completion" },
  ];

  const getGradeColor = (score: number) => {
    if (score >= 90) return "text-success";
    if (score >= 80) return "text-info";
    if (score >= 70) return "text-warning";
    return "text-destructive";
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'quiz': return Brain;
      case 'grade': return CheckCircle;
      case 'student': return Users;
      case 'completion': return Trophy;
      default: return AlertCircle;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold mb-2">Teacher Dashboard</h1>
        <p className="text-muted-foreground">Manage your classes, review assignments, and track student progress.</p>
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
        {/* Pending Reviews */}
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Pending Reviews
            </CardTitle>
            <CardDescription>
              Assignments waiting for your review and feedback
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {pendingReviews.map((review) => (
              <div key={review.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium">{review.assignment}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm text-muted-foreground">by {review.student}</span>
                    <Badge variant="outline">{review.subject}</Badge>
                    <span className="text-xs text-muted-foreground">{review.submittedAt}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-lg font-bold ${getGradeColor(review.aiScore)}`}>
                    AI: {review.aiScore}%
                  </div>
                  <Button size="sm" className="mt-2">Review</Button>
                </div>
              </div>
            ))}
            <Button asChild className="w-full" variant="outline">
              <Link to="/teacher/assignments">View All Assignments</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Recent Activity
            </CardTitle>
            <CardDescription>
              Latest updates from your classes
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivity.map((activity) => {
              const IconComponent = getActivityIcon(activity.type);
              return (
                <div key={activity.id} className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                  <IconComponent className="h-4 w-4 text-primary" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              );
            })}
            <Button asChild className="w-full" variant="outline">
              <Link to="/teacher/activity">View All Activity</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Class Performance Overview */}
      <Card className="shadow-medium">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Class Performance Overview
          </CardTitle>
          <CardDescription>
            Average performance across your subjects
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { subject: "Mathematics", average: 85, students: 45, improvement: "+5%" },
              { subject: "Science", average: 88, students: 52, improvement: "+8%" },
              { subject: "History", average: 82, students: 38, improvement: "+3%" },
            ].map((subject) => (
              <div key={subject.subject} className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{subject.subject}</span>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-gradient-secondary">{subject.average}%</Badge>
                    <span className="text-sm text-success">{subject.improvement}</span>
                  </div>
                </div>
                <Progress value={subject.average} className="h-2" />
                <p className="text-sm text-muted-foreground">{subject.students} students enrolled</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Button asChild size="lg" className="bg-gradient-primary hover:opacity-90 h-16">
          <Link to="/teacher/assignments" className="flex items-center gap-3">
            <FileText className="h-6 w-6" />
            <div className="text-left">
              <div className="font-semibold">Review Assignments</div>
              <div className="text-sm opacity-90">Grade student submissions</div>
            </div>
          </Link>
        </Button>
        <Button asChild size="lg" variant="outline" className="h-16 border-2">
          <Link to="/teacher/quiz-generator" className="flex items-center gap-3">
            <Brain className="h-6 w-6" />
            <div className="text-left">
              <div className="font-semibold">Generate Quiz</div>
              <div className="text-sm opacity-70">Create AI-powered quizzes</div>
            </div>
          </Link>
        </Button>
        <Button asChild size="lg" variant="outline" className="h-16 border-2">
          <Link to="/teacher/progress" className="flex items-center gap-3">
            <Users className="h-6 w-6" />
            <div className="text-left">
              <div className="font-semibold">Student Progress</div>
              <div className="text-sm opacity-70">Track performance</div>
            </div>
          </Link>
        </Button>
      </div>
    </div>
  );
}