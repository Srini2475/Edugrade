import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BarChart3, Users, TrendingUp, Award } from "lucide-react";

const StudentProgress = () => {
  const students = [
    {
      id: 1,
      name: "Alice Johnson",
      email: "alice@email.com",
      assignmentsCompleted: 8,
      totalAssignments: 10,
      averageGrade: 8.5,
      quizzesCompleted: 5,
      totalQuizzes: 6,
      subjects: ["Mathematics", "Physics"]
    },
    {
      id: 2,
      name: "Bob Smith",
      email: "bob@email.com",
      assignmentsCompleted: 7,
      totalAssignments: 10,
      averageGrade: 7.8,
      quizzesCompleted: 4,
      totalQuizzes: 6,
      subjects: ["Physics", "Chemistry"]
    },
    {
      id: 3,
      name: "Carol Davis",
      email: "carol@email.com",
      assignmentsCompleted: 9,
      totalAssignments: 10,
      averageGrade: 9.2,
      quizzesCompleted: 6,
      totalQuizzes: 6,
      subjects: ["Chemistry", "Biology"]
    }
  ];

  const classStats = {
    totalStudents: 24,
    averageGrade: 8.1,
    assignmentCompletion: 85,
    quizCompletion: 78
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 90) return "bg-green-500";
    if (percentage >= 70) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getGradeColor = (grade: number) => {
    if (grade >= 9) return "default";
    if (grade >= 7) return "secondary";
    return "destructive";
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Student Progress</h1>
          <p className="text-muted-foreground">Track your students' academic performance</p>
        </div>
      </div>

      {/* Class Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{classStats.totalStudents}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Class Average</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{classStats.averageGrade}/10</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Assignment Completion</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{classStats.assignmentCompletion}%</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Quiz Completion</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{classStats.quizCompletion}%</div>
          </CardContent>
        </Card>
      </div>

      {/* Individual Student Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Individual Student Progress</CardTitle>
          <CardDescription>Detailed progress tracking for each student</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {students.map((student) => {
              const assignmentProgress = (student.assignmentsCompleted / student.totalAssignments) * 100;
              const quizProgress = (student.quizzesCompleted / student.totalQuizzes) * 100;
              
              return (
                <div key={student.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={`/placeholder-avatar-${student.id}.jpg`} />
                        <AvatarFallback>
                          {student.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium">{student.name}</h3>
                        <p className="text-sm text-muted-foreground">{student.email}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {student.subjects.map((subject) => (
                        <Badge key={subject} variant="outline">{subject}</Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Assignments</span>
                        <span>{student.assignmentsCompleted}/{student.totalAssignments}</span>
                      </div>
                      <Progress value={assignmentProgress} className="h-2" />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Quizzes</span>
                        <span>{student.quizzesCompleted}/{student.totalQuizzes}</span>
                      </div>
                      <Progress value={quizProgress} className="h-2" />
                    </div>
                    
                    <div className="flex items-center justify-center">
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">Average Grade</p>
                        <Badge variant={getGradeColor(student.averageGrade)} className="text-lg px-3 py-1">
                          {student.averageGrade}/10
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentProgress;