import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Brain, 
  Clock, 
  Trophy,
  CheckCircle,
  XCircle,
  Play,
  RefreshCw
} from "lucide-react";

export default function StudentQuiz() {
  const [activeQuiz, setActiveQuiz] = useState<number | null>(null);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [completed, setCompleted] = useState<number[]>([]);

  const availableQuizzes = [
    { 
      id: 1, 
      title: "Algebra Basics", 
      subject: "Mathematics", 
      difficulty: "Easy",
      questions: 5,
      timeLimit: 10,
      bestScore: 80
    },
    { 
      id: 2, 
      title: "World History", 
      subject: "History", 
      difficulty: "Medium",
      questions: 8,
      timeLimit: 15,
      bestScore: null
    },
    { 
      id: 3, 
      title: "Chemistry Fundamentals", 
      subject: "Science", 
      difficulty: "Hard",
      questions: 10,
      timeLimit: 20,
      bestScore: 95
    },
  ];

  const sampleQuestions = [
    {
      id: 1,
      question: "What is the value of x in the equation 2x + 5 = 15?",
      options: ["x = 5", "x = 10", "x = 7", "x = 3"],
      correct: 0
    },
    {
      id: 2,
      question: "Which property states that a + b = b + a?",
      options: ["Distributive Property", "Associative Property", "Commutative Property", "Identity Property"],
      correct: 2
    },
    {
      id: 3,
      question: "What is the slope of the line y = 3x + 2?",
      options: ["2", "3", "5", "1"],
      correct: 1
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-success/10 text-success';
      case 'Medium': return 'bg-warning/10 text-warning';
      case 'Hard': return 'bg-destructive/10 text-destructive';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const startQuiz = (quizId: number) => {
    setActiveQuiz(quizId);
    setAnswers({});
  };

  const selectAnswer = (questionId: number, answerIndex: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: answerIndex }));
  };

  const submitQuiz = () => {
    if (activeQuiz) {
      setCompleted(prev => [...prev, activeQuiz]);
      setActiveQuiz(null);
      setAnswers({});
    }
  };

  if (activeQuiz) {
    const quiz = availableQuizzes.find(q => q.id === activeQuiz);
    const progress = (Object.keys(answers).length / sampleQuestions.length) * 100;

    return (
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">{quiz?.title}</h1>
            <p className="text-muted-foreground">Answer all questions to complete the quiz.</p>
          </div>
          <Button variant="outline" onClick={() => setActiveQuiz(null)}>
            Exit Quiz
          </Button>
        </div>

        <Card className="shadow-medium">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Progress</CardTitle>
              <Badge className={getDifficultyColor(quiz?.difficulty || '')}>
                {quiz?.difficulty}
              </Badge>
            </div>
            <Progress value={progress} className="h-2" />
            <CardDescription>
              {Object.keys(answers).length} of {sampleQuestions.length} questions answered
            </CardDescription>
          </CardHeader>
        </Card>

        <div className="space-y-6">
          {sampleQuestions.map((question, index) => (
            <Card key={question.id} className="shadow-soft">
              <CardHeader>
                <CardTitle className="text-lg">
                  Question {index + 1}: {question.question}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {question.options.map((option, optionIndex) => (
                  <button
                    key={optionIndex}
                    onClick={() => selectAnswer(question.id, optionIndex)}
                    className={`w-full p-3 text-left rounded-lg border transition-colors ${
                      answers[question.id] === optionIndex
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-border hover:border-primary/50 hover:bg-muted/50'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex justify-center">
          <Button 
            onClick={submitQuiz}
            disabled={Object.keys(answers).length < sampleQuestions.length}
            size="lg"
            className="bg-gradient-primary hover:opacity-90"
          >
            Submit Quiz
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold mb-2">Available Quizzes</h1>
        <p className="text-muted-foreground">Test your knowledge with AI-generated quizzes.</p>
      </div>

      {/* Quiz Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Quizzes Completed</p>
                <p className="text-2xl font-bold">{completed.length}</p>
              </div>
              <Trophy className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Average Score</p>
                <p className="text-2xl font-bold">87%</p>
              </div>
              <CheckCircle className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Time Spent</p>
                <p className="text-2xl font-bold">2.5h</p>
              </div>
              <Clock className="h-8 w-8 text-info" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Available Quizzes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {availableQuizzes.map((quiz) => (
          <Card key={quiz.id} className="shadow-medium hover-scale">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{quiz.title}</CardTitle>
                  <CardDescription>{quiz.subject}</CardDescription>
                </div>
                <Badge className={getDifficultyColor(quiz.difficulty)}>
                  {quiz.difficulty}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Brain className="h-4 w-4 text-muted-foreground" />
                  {quiz.questions} questions
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  {quiz.timeLimit} min
                </div>
              </div>
              
              {quiz.bestScore && (
                <div className="flex items-center gap-2 text-sm">
                  <Trophy className="h-4 w-4 text-success" />
                  Best Score: {quiz.bestScore}%
                </div>
              )}

              <Button 
                onClick={() => startQuiz(quiz.id)}
                className="w-full"
                disabled={completed.includes(quiz.id)}
              >
                {completed.includes(quiz.id) ? (
                  <>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Completed
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 mr-2" />
                    Start Quiz
                  </>
                )}
              </Button>
              
              {completed.includes(quiz.id) && (
                <Button 
                  onClick={() => startQuiz(quiz.id)}
                  variant="outline"
                  className="w-full"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Retake
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}