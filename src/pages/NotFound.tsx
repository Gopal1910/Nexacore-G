import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Hexagon, Home, AlertTriangle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden p-4">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 -left-32 w-64 h-64 bg-destructive/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-neon-purple/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "-3s" }} />
      </div>

      {/* Grid overlay */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--destructive) / 0.3) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--destructive) / 0.3) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px"
        }}
      />

      <div className="text-center z-10 animate-fade-in">
        <div className="inline-flex items-center justify-center mb-6">
          <div className="relative">
            <Hexagon className="w-20 h-20 text-destructive animate-pulse" />
            <div className="absolute inset-0 flex items-center justify-center">
              <AlertTriangle className="w-8 h-8 text-destructive" />
            </div>
          </div>
        </div>
        
        <h1 className="text-6xl font-bold tracking-widest text-destructive mb-4">404</h1>
        <h2 className="text-2xl font-bold tracking-wider mb-2">SIGNAL LOST</h2>
        <p className="text-muted-foreground text-sm mb-8 max-w-md mx-auto">
          The requested coordinates could not be located in the system matrix. 
          This sector may have been decommissioned or relocated.
        </p>
        
        <Link to="/">
          <Button variant="outline" className="gap-2">
            <Home className="w-4 h-4" />
            Return to Base
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
