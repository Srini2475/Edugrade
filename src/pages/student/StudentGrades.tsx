import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  FileText, 
  BarChart3, 
  TrendingUp,
  Calendar,
  Award
} from "lucide-react";

export default function StudentGrades() {
  const submissions = [
    { 
      id: 1, 
      title: "Mathematics Assignment #3", 
      subject: "Mathematics", 
      grade: 92, 
      maxGrade: 100,
      submittedAt: "2024-01-15",
      feedback: "Excellent work! Your understanding of quadratic equations is very strong.",
      status: "Graded"
    },
    { 
      id: 2, 
      title: "History Essay: WWII", 
      subject: "History", 
      grade: 88, 
      maxGrade: 100,
      submittedAt: "2024-01-12",
      feedback: "Good analysis of historical events. Could improve on citing sources.",
      status: "Graded"
    },
    { 
      id: 3, 
      title: "Science Lab Report", 
      subject: "Science", 
      grade: null, 
      maxGrade: 100,
      submittedAt: "2024-01-16",
      feedback: null,
      status: "Pending"
    },
    { 
      id: 4, 
      title: "English Literature Analysis", 
      subject: "English", 
      grade: 85, 
      maxGrade: 100,
      submittedAt: "2024-01-10",
      feedback: "Strong character analysis. Work on essay structure for higher marks.",
      status: "Graded"
    },
  ];

  const subjectAverages = [
    { subject: "Mathematics", average: 89, totalAssignments: 4 },
    { subject: "Science", average: 87, totalAssignments: 3 },
    { subject: "History", average: 84, totalAssignments: 3 },
    { subject: "English", average: 82, totalAssignments: 2 },
  ];

  const getGradeColor = (grade: number) => {
    if (grade >= 90) return "text-success";
    if (grade >= 80) return "text-info";
    if (grade >= 70) return "text-warning";
    return "text-destructive";
  };

  const getStatusBadge = (status: string) => {
    return status === "Graded" 
      ? <Badge className="bg-success/10 text-success">Graded</Badge>
      : <Badge variant="secondary">Pending</Badge>;
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold mb-2">My Grades</h1>
        <p className="text-muted-foreground">Track your academic performance and assignment feedback.</p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Overall Average</p>
                <p className="text-2xl font-bold text-success">85.5%</p>
              </div>
              <Award className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Assignments Graded</p>
                <p className="text-2xl font-bold">9/12</p>
              </div>
              <FileText className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Improvement</p>
                <p className="text-2xl font-bold text-success">+7%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>
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
            {submissions.map((submission) => (
              <div key={submission.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium">{submission.title}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline">{submission.subject}</Badge>
                      {getStatusBadge(submission.status)}
                      <span className="text-sm text-muted-foreground flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {submission.submittedAt}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    {submission.grade !== null ? (
                      <div className={`text-lg font-bold ${getGradeColor(submission.grade)}`}>
                        {submission.grade}/{submission.maxGrade}
                      </div>
                    ) : (
                      <div className="text-lg font-bold text-muted-foreground">
                        Pending
                      </div>
                    )}
                  </div>
                </div>
                {submission.feedback && (
                  <div className="bg-muted/30 p-3 rounded text-sm">
                    <strong>Feedback:</strong> {submission.feedback}
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Subject Averages */}
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Subject Performance
            </CardTitle>
            <CardDescription>
              Your average grades by subject
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {subjectAverages.map((subject) => (
              <div key={subject.subject} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{subject.subject}</span>
                  <div className="flex items-center gap-2">
                    <span className={`font-bold ${getGradeColor(subject.average)}`}>
                      {subject.average}%
                    </span>
                    <span className="text-sm text-muted-foreground">
                      ({subject.totalAssignments} assignments)
                    </span>
                  </div>
                </div>
                <Progress value={subject.average} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}