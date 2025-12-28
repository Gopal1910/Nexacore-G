import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { Hexagon, Sparkles, Shield, Zap } from "lucide-react";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [mobile, setMobile] = useState("");
  const [name, setName] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [nameError, setNameError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const validateMobile = (value: string) => {
    const cleaned = value.replace(/\D/g, "");
    if (!cleaned) {
      return "Mobile number is required";
    }
    if (cleaned.length < 10) {
      return "Mobile number must be at least 10 digits";
    }
    if (cleaned.length > 15) {
      return "Mobile number is too long";
    }
    return "";
  };

  const validateName = (value: string) => {
    if (!isLogin && !value.trim()) {
      return "Name is required";
    }
    if (!isLogin && value.trim().length < 2) {
      return "Name must be at least 2 characters";
    }
    return "";
  };

  const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMobile(value);
    setMobileError(validateMobile(value));
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);
    setNameError(validateName(value));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const mobileErr = validateMobile(mobile);
    const nameErr = validateName(name);
    
    setMobileError(mobileErr);
    setNameError(nameErr);
    
    if (mobileErr || (!isLogin && nameErr)) return;

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    login(mobile, isLogin ? "Commander" : name);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-32 w-64 h-64 bg-neon-cyan/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-neon-purple/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "-3s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-neon-blue/5 rounded-full blur-3xl" />
      </div>

      {/* Grid overlay */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--neon-cyan) / 0.3) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--neon-cyan) / 0.3) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px"
        }}
      />

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center justify-center mb-4">
            <div className="relative">
              <Hexagon className="w-16 h-16 text-primary animate-pulse-neon" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
            </div>
          </div>
          <h1 className="text-3xl font-bold tracking-widest gradient-text mb-2">NEXACORE</h1>
          <p className="text-muted-foreground text-sm tracking-wide">Next-Gen Admin Portal</p>
        </div>

        <Card variant="neon" className="animate-scale-in" style={{ animationDelay: "0.1s" }}>
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-xl tracking-wider">
              {isLogin ? "SYSTEM ACCESS" : "REGISTER IDENTITY"}
            </CardTitle>
            <div className="cyber-line mt-4" />
          </CardHeader>

          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-5">
              {!isLogin && (
                <div className="space-y-2 animate-fade-in">
                  <label className="text-xs tracking-wider text-muted-foreground uppercase flex items-center gap-2">
                    <Shield className="w-3 h-3" />
                    Identity Name
                  </label>
                  <Input
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={handleNameChange}
                    className={nameError ? "border-destructive focus:ring-destructive/30" : ""}
                  />
                  {nameError && (
                    <p className="text-xs text-destructive animate-fade-in flex items-center gap-1">
                      <Zap className="w-3 h-3" />
                      {nameError}
                    </p>
                  )}
                </div>
              )}

              <div className="space-y-2">
                <label className="text-xs tracking-wider text-muted-foreground uppercase flex items-center gap-2">
                  <Zap className="w-3 h-3" />
                  Mobile Frequency
                </label>
                <Input
                  type="tel"
                  placeholder="Enter mobile number"
                  value={mobile}
                  onChange={handleMobileChange}
                  className={mobileError ? "border-destructive focus:ring-destructive/30" : ""}
                />
                {mobileError && (
                  <p className="text-xs text-destructive animate-fade-in flex items-center gap-1">
                    <Zap className="w-3 h-3" />
                    {mobileError}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                variant="neon"
                className="w-full mt-6"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Authenticating...
                  </span>
                ) : (
                  isLogin ? "Initialize Connection" : "Create Identity"
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setMobileError("");
                  setNameError("");
                }}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {isLogin ? "New user? Register identity" : "Already registered? Access system"}
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Footer text */}
        <p className="text-center text-xs text-muted-foreground mt-6 tracking-wide animate-fade-in" style={{ animationDelay: "0.3s" }}>
          Secure connection • Encrypted data • v2.0.47
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
