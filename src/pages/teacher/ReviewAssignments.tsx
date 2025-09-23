import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Download, Eye, CheckCircle, Clock, AlertCircle } from "lucide-react";

const ReviewAssignments = () => {
  const [selectedAssignment, setSelectedAssignment] = useState(null);

  const assignments = [
    {
      id: 1,
      studentName: "Alice Johnson",
      subject: "Mathematics",
      title: "Calculus Problem Set",
      submittedAt: "2024-01-15",
      status: "pending",
      fileType: "PDF",
      aiScore: null
    },
    {
      id: 2,
      studentName: "Bob Smith",
      subject: "Physics",
      title: "Motion Laws Assignment",
      submittedAt: "2024-01-14",
      status: "graded",
      fileType: "DOCX",
      aiScore: 8.5
    },
    {
      id: 3,
      studentName: "Carol Davis",
      subject: "Chemistry",
      title: "Organic Compounds Report",
      submittedAt: "2024-01-13",
      status: "reviewed",
      fileType: "PDF",
      aiScore: 7.2
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending": return <Clock className="h-4 w-4" />;
      case "graded": return <CheckCircle className="h-4 w-4" />;
      case "reviewed": return <Eye className="h-4 w-4" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "pending": return "secondary";
      case "graded": return "default";
      case "reviewed": return "outline";
      default: return "destructive";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Review Assignments</h1>
          <p className="text-muted-foreground">Review and grade student submissions</p>
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Assignments</TabsTrigger>
          <TabsTrigger value="pending">Pending Review</TabsTrigger>
          <TabsTrigger value="graded">AI Graded</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4">
            {assignments.map((assignment) => (
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
                    <Badge variant={getStatusVariant(assignment.status)} className="flex items-center gap-1">
                      {getStatusIcon(assignment.status)}
                      {assignment.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">
                        Submitted: {assignment.submittedAt}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Format: {assignment.fileType}
                      </p>
                      {assignment.aiScore && (
                        <p className="text-sm font-medium">
                          AI Score: {assignment.aiScore}/10
                        </p>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        Review
                      </Button>
                      {assignment.status === "pending" && (
                        <Button size="sm">
                          Grade with AI
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="pending">
          <div className="text-center py-8">
            <Clock className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No pending assignments</h3>
            <p className="text-muted-foreground">All assignments have been reviewed</p>
          </div>
        </TabsContent>

        <TabsContent value="graded">
          <div className="text-center py-8">
            <CheckCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No AI graded assignments</h3>
            <p className="text-muted-foreground">Assignments will appear here after AI grading</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ReviewAssignments;