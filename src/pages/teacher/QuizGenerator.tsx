import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Brain, Plus, Trash2, Save, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const QuizGenerator = () => {
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("medium");
  const [questions, setQuestions] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const generateQuiz = async () => {
    if (!topic.trim()) {
      toast({
        title: "Error",
        description: "Please enter a topic for the quiz",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulate AI generation
    setTimeout(() => {
      const mockQuestions = [
        {
          id: 1,
          question: `What is the main concept in ${topic}?`,
          options: ["Option A", "Option B", "Option C", "Option D"],
          correct: 0,
          explanation: "This is the correct answer because..."
        },
        {
          id: 2,
          question: `Which principle applies to ${topic}?`,
          options: ["Principle 1", "Principle 2", "Principle 3", "Principle 4"],
          correct: 1,
          explanation: "Principle 2 is correct because..."
        },
        {
          id: 3,
          question: `How does ${topic} relate to real-world applications?`,
          options: ["Application A", "Application B", "Application C", "Application D"],
          correct: 2,
          explanation: "Application C demonstrates the practical use..."
        }
      ];
      
      setQuestions(mockQuestions);
      setIsGenerating(false);
      toast({
        title: "Quiz Generated!",
        description: "3 questions have been generated successfully"
      });
    }, 2000);
  };

  const saveQuiz = () => {
    toast({
      title: "Quiz Saved",
      description: "Quiz has been saved and is available for students"
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Quiz Generator</h1>
          <p className="text-muted-foreground">Create AI-powered quizzes for your students</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Quiz Setup */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5" />
              Generate Quiz
            </CardTitle>
            <CardDescription>
              Enter a topic and let AI create quiz questions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="topic">Topic</Label>
              <Input
                id="topic"
                placeholder="e.g., Photosynthesis, Calculus, World War II"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="difficulty">Difficulty Level</Label>
              <select 
                className="w-full p-2 border rounded-md"
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>

            <Button 
              onClick={generateQuiz} 
              disabled={isGenerating}
              className="w-full"
            >
              {isGenerating ? "Generating..." : "Generate Quiz with AI"}
            </Button>
          </CardContent>
        </Card>

        {/* Quiz Preview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Quiz Preview
            </CardTitle>
            <CardDescription>
              Preview generated questions
            </CardDescription>
          </CardHeader>
          <CardContent>
            {questions.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Brain className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Generate a quiz to see questions here</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Badge variant="secondary">{questions.length} Questions</Badge>
                  <Button onClick={saveQuiz} size="sm">
                    <Save className="h-4 w-4 mr-2" />
                    Save Quiz
                  </Button>
                </div>
                
                <div className="space-y-4">
                  {questions.map((q, index) => (
                    <div key={q.id} className="border rounded-lg p-4">
                      <h4 className="font-medium mb-3">
                        {index + 1}. {q.question}
                      </h4>
                      <div className="space-y-2">
                        {q.options.map((option, optIndex) => (
                          <div 
                            key={optIndex}
                            className={`p-2 rounded border ${
                              optIndex === q.correct ? 'bg-green-50 border-green-200' : 'bg-gray-50'
                            }`}
                          >
                            {String.fromCharCode(65 + optIndex)}. {option}
                            {optIndex === q.correct && (
                              <Badge variant="default" className="ml-2 text-xs">Correct</Badge>
                            )}
                          </div>
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">
                        <strong>Explanation:</strong> {q.explanation}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent Quizzes */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Quizzes</CardTitle>
          <CardDescription>Your previously created quizzes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between items-center p-3 border rounded">
              <div>
                <p className="font-medium">Mathematics - Algebra</p>
                <p className="text-sm text-muted-foreground">3 questions • Created 2 days ago</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">View</Button>
                <Button variant="outline" size="sm">Edit</Button>
              </div>
            </div>
            <div className="flex justify-between items-center p-3 border rounded">
              <div>
                <p className="font-medium">Physics - Motion</p>
                <p className="text-sm text-muted-foreground">3 questions • Created 1 week ago</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">View</Button>
                <Button variant="outline" size="sm">Edit</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuizGenerator;