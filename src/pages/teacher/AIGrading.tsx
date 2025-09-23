import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Brain, Zap, CheckCircle, Clock, FileText, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AIGrading = () => {
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [customFeedback, setCustomFeedback] = useState("");
  const { toast } = useToast();

  const pendingAssignments = [
    {
      id: 1,
      studentName: "Alice Johnson",
      subject: "Mathematics",
      title: "Linear Algebra Assignment",
      submittedAt: "2024-01-15",
      content: "This assignment covers linear transformations and matrix operations...",
      aiAnalysis: null
    },
    {
      id: 2,
      studentName: "Bob Smith",
      subject: "Physics",
      title: "Quantum Mechanics Essay",
      submittedAt: "2024-01-14",
      content: "Quantum mechanics is a fundamental theory in physics...",
      aiAnalysis: null
    }
  ];

  const gradedAssignments = [
    {
      id: 3,
      studentName: "Carol Davis",
      subject: "Chemistry",
      title: "Organic Chemistry Lab Report",
      submittedAt: "2024-01-13",
      aiScore: 8.5,
      aiAnalysis: {
        strengths: ["Clear methodology", "Accurate calculations", "Good analysis"],
        improvements: ["Could expand on conclusions", "More detailed observations"],
        grammar: 85,
        content: 90,
        structure: 80
      },
      teacherFeedback: ""
    }
  ];

  const runAIGrading = async (assignmentId: number) => {
    toast({
      title: "AI Grading Started",
      description: "Processing assignment with AI grading system..."
    });

    // Simulate AI processing
    setTimeout(() => {
      toast({
        title: "AI Grading Complete",
        description: "Assignment has been graded successfully"
      });
    }, 3000);
  };

  const saveTeacherFeedback = () => {
    toast({
      title: "Feedback Saved",
      description: "Your feedback has been added to the assignment"
    });
    setCustomFeedback("");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">AI Grading System</h1>
          <p className="text-muted-foreground">Automated grading with AI analysis and feedback</p>
        </div>
        <Button className="flex items-center gap-2">
          <Zap className="h-4 w-4" />
          Grade All Pending
        </Button>
      </div>

      <Tabs defaultValue="pending" className="space-y-4">
        <TabsList>
          <TabsTrigger value="pending">Pending Review</TabsTrigger>
          <TabsTrigger value="graded">AI Graded</TabsTrigger>
          <TabsTrigger value="analytics">Grading Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          <div className="grid gap-4">
            {pendingAssignments.map((assignment) => (
              <Card key={assignment.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        {assignment.title}
                      </CardTitle>
                      <CardDescription>
                        By {assignment.studentName} • {assignment.subject}
                      </CardDescription>
                    </div>
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      Pending
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Submitted: {assignment.submittedAt}
                    </p>
                    <div className="bg-muted/50 p-3 rounded-lg">
                      <p className="text-sm">{assignment.content}</p>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="outline" 
                        onClick={() => setSelectedAssignment(assignment)}
                      >
                        View Full Content
                      </Button>
                      <Button 
                        onClick={() => runAIGrading(assignment.id)}
                        className="flex items-center gap-2"
                      >
                        <Brain className="h-4 w-4" />
                        Grade with AI
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="graded" className="space-y-4">
          <div className="grid gap-4">
            {gradedAssignments.map((assignment) => (
              <Card key={assignment.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        {assignment.title}
                      </CardTitle>
                      <CardDescription>
                        By {assignment.studentName} • {assignment.subject}
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="default" className="flex items-center gap-1">
                        <CheckCircle className="h-4 w-4" />
                        Graded
                      </Badge>
                      <Badge variant="outline" className="text-lg px-3 py-1">
                        {assignment.aiScore}/10
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm font-medium mb-1">Grammar</p>
                        <Progress value={assignment.aiAnalysis.grammar} className="h-2" />
                        <p className="text-xs text-muted-foreground mt-1">{assignment.aiAnalysis.grammar}%</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium mb-1">Content</p>
                        <Progress value={assignment.aiAnalysis.content} className="h-2" />
                        <p className="text-xs text-muted-foreground mt-1">{assignment.aiAnalysis.content}%</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium mb-1">Structure</p>
                        <Progress value={assignment.aiAnalysis.structure} className="h-2" />
                        <p className="text-xs text-muted-foreground mt-1">{assignment.aiAnalysis.structure}%</p>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-green-700 mb-2">Strengths</h4>
                        <ul className="text-sm space-y-1">
                          {assignment.aiAnalysis.strengths.map((strength, index) => (
                            <li key={index} className="flex items-center gap-2">
                              <CheckCircle className="h-3 w-3 text-green-600" />
                              {strength}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-orange-700 mb-2">Areas for Improvement</h4>
                        <ul className="text-sm space-y-1">
                          {assignment.aiAnalysis.improvements.map((improvement, index) => (
                            <li key={index} className="flex items-center gap-2">
                              <MessageSquare className="h-3 w-3 text-orange-600" />
                              {improvement}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-medium">Add Teacher Feedback</h4>
                      <Textarea
                        placeholder="Add your personal feedback and comments..."
                        value={customFeedback}
                        onChange={(e) => setCustomFeedback(e.target.value)}
                      />
                      <Button onClick={saveTeacherFeedback} size="sm">
                        Save Feedback
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="grid gap-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Total Graded</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">127</div>
                  <p className="text-sm text-muted-foreground">Assignments processed</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Average Score</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">7.8/10</div>
                  <p className="text-sm text-muted-foreground">Class average</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Time Saved</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">42h</div>
                  <p className="text-sm text-muted-foreground">Through AI grading</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Grading Distribution</CardTitle>
                <CardDescription>Score distribution across all assignments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">9-10 (Excellent)</span>
                    <div className="flex items-center gap-2">
                      <Progress value={25} className="w-32 h-2" />
                      <span className="text-sm">25%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">7-8 (Good)</span>
                    <div className="flex items-center gap-2">
                      <Progress value={45} className="w-32 h-2" />
                      <span className="text-sm">45%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">5-6 (Fair)</span>
                    <div className="flex items-center gap-2">
                      <Progress value={20} className="w-32 h-2" />
                      <span className="text-sm">20%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">0-4 (Needs Improvement)</span>
                    <div className="flex items-center gap-2">
                      <Progress value={10} className="w-32 h-2" />
                      <span className="text-sm">10%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AIGrading;