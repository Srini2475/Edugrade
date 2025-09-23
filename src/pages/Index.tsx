import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  Brain, 
  Users, 
  BarChart3, 
  Zap, 
  Shield, 
  Clock,
  GraduationCap,
  FileText,
  Award,
  ArrowRight,
  CheckCircle
} from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-education.jpg";

const Index = () => {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Grading",
      description: "Intelligent assessment with detailed feedback and scoring using advanced AI models.",
      color: "text-primary"
    },
    {
      icon: FileText,
      title: "Smart Quiz Generation",
      description: "Automatically create personalized quizzes based on course content and student progress.",
      color: "text-secondary"
    },
    {
      icon: BarChart3,
      title: "Progress Analytics",
      description: "Comprehensive insights into student performance and learning patterns.",
      color: "text-accent"
    },
    {
      icon: Users,
      title: "Collaborative Learning",
      description: "Connect students and teachers in an interactive educational environment.",
      color: "text-info"
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Enterprise-grade security with complete data privacy protection.",
      color: "text-success"
    },
    {
      icon: Clock,
      title: "Real-time Feedback",
      description: "Instant grading and feedback to accelerate the learning process.",
      color: "text-warning"
    }
  ];

  const benefits = [
    "Reduce grading time by 90%",
    "Personalized learning paths",
    "24/7 AI teaching assistant",
    "Detailed progress tracking",
    "Automated quiz generation",
    "Multi-format file support"
  ];

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-gradient-primary rounded-lg">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold">EduGrade</span>
          </div>
          <div className="flex items-center gap-4">
            <Button asChild variant="ghost">
              <Link to="/auth">Login</Link>
            </Button>
            <Button asChild className="bg-gradient-primary hover:opacity-90">
              <Link to="/auth">Get Started</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-slide-up">
              <div className="space-y-4">
                <Badge className="bg-white/20 text-white border-white/30">
                  🚀 Next-Generation Education Platform
                </Badge>
                <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
                  EduGrade - AI-Powered
                  <span className="block bg-gradient-to-r from-accent to-accent-glow bg-clip-text text-transparent">
                    Education Platform
                  </span>
                </h1>
                <p className="text-xl text-white/90 leading-relaxed">
                  Transform education with intelligent grading, automated quiz generation, 
                  and personalized learning experiences powered by advanced AI technology.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  asChild 
                  size="lg" 
                  className="bg-white text-primary hover:bg-white/90 shadow-strong"
                >
                  <Link to="/auth" className="flex items-center gap-2">
                    Get Started Free
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
                <Button 
                  asChild 
                  size="lg" 
                  variant="outline" 
                  className="border-white/30 text-white hover:bg-white/10"
                >
                  
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/20">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">50K+</div>
                  <div className="text-sm text-white/70">Students</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">5K+</div>
                  <div className="text-sm text-white/70">Teachers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">1M+</div>
                  <div className="text-sm text-white/70">Assignments Graded</div>
                </div>
              </div>
            </div>

            <div className="relative animate-scale-in" style={{ animationDelay: '0.3s' }}>
              <img 
                src={heroImage} 
                alt="Educational platform illustration" 
                className="rounded-2xl shadow-strong"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <Badge variant="outline" className="text-primary border-primary/20">
              Platform Features
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold">
              Everything you need for
              <span className="block text-primary">smart education</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive tools designed to enhance learning outcomes and streamline educational processes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={feature.title} 
                className="shadow-soft hover:shadow-medium transition-shadow duration-300 hover-scale"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg bg-gradient-primary/10 flex items-center justify-center mb-4`}>
                    <feature.icon className={`h-6 w-6 ${feature.color}`} />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="outline" className="text-secondary border-secondary/20">
                  Why Choose EduGrade
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold">
                  Revolutionize your
                  <span className="block text-secondary">teaching experience</span>
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Join thousands of educators who have transformed their classrooms with 
                  AI-powered tools that save time and improve learning outcomes.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={benefit} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-success" />
                    <span className="text-lg">{benefit}</span>
                  </div>
                ))}
              </div>

              <Button asChild size="lg" className="bg-gradient-secondary hover:opacity-90">
                <Link to="/auth" className="flex items-center gap-2">
                  Start Your Free Trial
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <Card className="shadow-medium">
                <CardContent className="p-6 text-center">
                  <GraduationCap className="h-12 w-12 text-primary mx-auto mb-4" />
                  <div className="text-3xl font-bold mb-2">95%</div>
                  <div className="text-muted-foreground">Grading Accuracy</div>
                </CardContent>
              </Card>
              <Card className="shadow-medium mt-8">
                <CardContent className="p-6 text-center">
                  <Zap className="h-12 w-12 text-accent mx-auto mb-4" />
                  <div className="text-3xl font-bold mb-2">10x</div>
                  <div className="text-muted-foreground">Faster Feedback</div>
                </CardContent>
              </Card>
              <Card className="shadow-medium -mt-4">
                <CardContent className="p-6 text-center">
                  <Award className="h-12 w-12 text-secondary mx-auto mb-4" />
                  <div className="text-3xl font-bold mb-2">90%</div>
                  <div className="text-muted-foreground">Time Saved</div>
                </CardContent>
              </Card>
              <Card className="shadow-medium mt-4">
                <CardContent className="p-6 text-center">
                  <Users className="h-12 w-12 text-info mx-auto mb-4" />
                  <div className="text-3xl font-bold mb-2">100K+</div>
                  <div className="text-muted-foreground">Happy Users</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl md:text-5xl font-bold text-white">
              Ready to transform education?
            </h2>
            <p className="text-xl text-white/90">
              Join the AI education revolution and experience the future of learning today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild 
                size="lg" 
                className="bg-white text-primary hover:bg-white/90 shadow-strong"
              >
                <Link to="/auth">Start Free Trial</Link>
              </Button>
              <Button 
                asChild 
                size="lg" 
                variant="outline" 
                className="border-white/30 text-white hover:bg-white/10"
              >
                <Link to="#contact">Contact Sales</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <div className="p-2 bg-gradient-primary rounded-lg">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold">EduGrade</span>
            </div>
            <div className="text-muted-foreground">
              ©EduGrade. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
