import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Package, 
  BarChart3, 
  Upload, 
  LogOut,
  Menu,
  X,
  Hexagon
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const navItems = [
  { path: "/dashboard", label: "Analytics", icon: BarChart3 },
  { path: "/products", label: "Products", icon: Package },
  { path: "/upload", label: "Media", icon: Upload },
];

export const Sidebar = () => {
  const location = useLocation();
  const { logout, user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden p-2 rounded-lg bg-card/80 backdrop-blur-sm border border-border/50"
      >
        {isOpen ? <X className="w-6 h-6 text-primary" /> : <Menu className="w-6 h-6 text-primary" />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 h-full w-64 bg-sidebar border-r border-sidebar-border z-40 transition-transform duration-300 lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full p-4">
          {/* Logo */}
          <div className="flex items-center gap-3 px-2 py-4 mb-6">
            <div className="relative">
              <Hexagon className="w-10 h-10 text-primary animate-pulse-neon" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-bold text-primary">N</span>
              </div>
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-wider gradient-text">NEXACORE</h1>
              <p className="text-xs text-muted-foreground">Admin Portal</p>
            </div>
          </div>

          {/* User info */}
          <div className="glass-panel p-3 mb-6">
            <p className="text-xs text-muted-foreground">Welcome back,</p>
            <p className="text-sm font-semibold text-primary truncate">{user?.name || "Commander"}</p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 group",
                    isActive
                      ? "bg-primary/10 border border-primary/30 shadow-neon text-primary"
                      : "text-muted-foreground hover:text-primary hover:bg-muted/50"
                  )}
                >
                  <item.icon className={cn(
                    "w-5 h-5 transition-all duration-300",
                    isActive && "neon-text"
                  )} />
                  <span className="font-medium tracking-wide">{item.label}</span>
                  {isActive && (
                    <div className="ml-auto w-2 h-2 rounded-full bg-primary animate-pulse" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Logout */}
          <div className="pt-4 border-t border-border/30">
            <Button
              variant="ghost"
              onClick={logout}
              className="w-full justify-start gap-3 text-muted-foreground hover:text-destructive"
            >
              <LogOut className="w-5 h-5" />
              <span>Disconnect</span>
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
};
