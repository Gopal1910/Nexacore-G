import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Hexagon, Sparkles } from "lucide-react";

const Index = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect based on auth status
    const timer = setTimeout(() => {
      if (isAuthenticated) {
        navigate("/dashboard");
      } else {
        navigate("/auth");
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 -left-32 w-64 h-64 bg-neon-cyan/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-neon-purple/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "-3s" }} />
      </div>

      <div className="text-center z-10">
        <div className="inline-flex items-center justify-center mb-6 animate-pulse-neon">
          <div className="relative">
            <Hexagon className="w-24 h-24 text-primary" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Sparkles className="w-10 h-10 text-primary" />
            </div>
          </div>
        </div>
        
        <h1 className="text-4xl font-bold tracking-widest gradient-text mb-4 animate-fade-in">
          NEXACORE
        </h1>
        
        <div className="flex items-center justify-center gap-2 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
          <span className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: "0.2s" }} />
          <span className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: "0.4s" }} />
        </div>
        
        <p className="text-muted-foreground text-sm mt-4 tracking-wide animate-fade-in" style={{ animationDelay: "0.3s" }}>
          Initializing system...
        </p>
      </div>
    </div>
  );
};

export default Index;
